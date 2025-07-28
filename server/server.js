        // server/server.js
        require('dotenv').config(); // Load environment variables at the very top
        const express = require('express');
        const cors = require('cors');
        const axios = require('axios');
        const Razorpay = require('razorpay');

        const app = express();
        const PORT = process.env.PORT || 5000;
        const OTP_EXPIRY_SECONDS = parseInt(process.env.OTP_EXPIRY_SECONDS || '300', 10); 

        app.use(cors()); 
        app.use(express.json()); 

        const otpStore = {}; 

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Route to send OTP
        app.post('/api/send-otp', async (req, res) => {
            const { phoneNumber } = req.body; 

            if (!phoneNumber) {
                return res.status(400).json({ success: false, message: 'Phone number is required.' });
            }
            if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
                return res.status(400).json({ success: false, message: 'Invalid phone number format. Must be 10 digits.' });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const timestamp = Date.now(); 

            otpStore[phoneNumber] = { otp, timestamp }; 

            console.log(`Generated OTP for ${phoneNumber}: ${otp} (Expires in ${OTP_EXPIRY_SECONDS} seconds)`); 

            try {
                const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
                    params: {
                        authorization: process.env.FAST2SMS_API_KEY, 
                        variables_values: otp, 
                        route: 'otp', 
                        numbers: phoneNumber, 
                    },
                    headers: {
                        'cache-control': 'no-cache' 
                    }
                });

                if (response.data && response.data.return === true) {
                    return res.status(200).json({ success: true, message: 'OTP sent successfully!' });
                } else {
                    // Log the full Fast2SMS response data for debugging
                    console.error('Fast2SMS API responded with success: false. Full response:', response.data);
                    delete otpStore[phoneNumber]; 
                    return res.status(500).json({ success: false, message: 'Failed to send OTP.', details: response.data });
                }
            } catch (error) {
                // Log the full Axios error object for more details
                console.error('Error sending OTP to Fast2SMS:', error.message);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Fast2SMS Response Data:', error.response.data);
                    console.error('Fast2SMS Response Status:', error.response.status);
                    console.error('Fast2SMS Response Headers:', error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received from Fast2SMS:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up request to Fast2SMS:', error.message);
                }
                delete otpStore[phoneNumber]; 
                return res.status(500).json({ success: false, message: 'Server error while sending OTP.' });
            }
        });

        // Route to verify OTP (no changes needed here, as the issue is with sending)
        app.post('/api/verify-otp', (req, res) => {
            const { phoneNumber, otp } = req.body; 

            if (!phoneNumber || !otp) {
                return res.status(400).json({ success: false, message: 'Phone number and OTP are required.' });
            }
            if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
                return res.status(400).json({ success: false, message: 'Invalid phone number format. Must be 10 digits.' });
            }
            if (otp.length !== 6 || !/^\d+$/.test(otp)) {
                return res.status(400).json({ success: false, message: 'Invalid OTP format. Must be 6 digits.' });
            }

            const storedOtpData = otpStore[phoneNumber];

            if (!storedOtpData) {
                return res.status(404).json({ success: false, message: 'No OTP found for this number. Please request a new one.' });
            }

            const { otp: storedOtp, timestamp } = storedOtpData; 
            const currentTime = Date.now();
            const otpAge = (currentTime - timestamp) / 1000; 

            if (otpAge > OTP_EXPIRY_SECONDS) {
                delete otpStore[phoneNumber]; 
                return res.status(401).json({ success: false, message: 'OTP expired. Please request a new one.' });
            }

            if (storedOtp === otp) {
                delete otpStore[phoneNumber]; 
                return res.status(200).json({ success: true, message: 'OTP verified successfully!' });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid OTP.' });
            }
        });

        // Create Razorpay order endpoint
        app.post('/api/create-order', async (req, res) => {
            const { amount, currency = 'INR', receipt } = req.body;
            if (!amount) {
                return res.status(400).json({ success: false, message: 'Amount is required' });
            }
            try {
                const options = {
                    amount: Math.round(amount * 100), // amount in paise
                    currency,
                    receipt: receipt || `rcpt_${Date.now()}`,
                };
                const order = await razorpay.orders.create(options);
                res.json({ success: true, order });
            } catch (error) {
                console.error('Error creating Razorpay order:', error);
                res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
            }
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`OTP Expiry set to ${OTP_EXPIRY_SECONDS} seconds.`);
        });
        