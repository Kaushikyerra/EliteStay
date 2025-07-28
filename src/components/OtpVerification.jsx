// src/components/OtpVerification.jsx
import React, { useState } from 'react';

const OtpVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Replace with your backend URL. If running locally, it's this:
    const API_BASE_URL = 'http://localhost:5000/api';

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch(`${API_BASE_URL}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });
            const data = await response.json();

            if (response.ok && data.success) { // Check response.ok for HTTP status codes in 200s
                setOtpSent(true);
                setMessage('OTP sent! Please check your phone.');
            } else {
                // Handle non-successful API response (e.g., 400, 500 status codes)
                setMessage(`Error sending OTP: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch(`${API_BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp }),
            });
            const data = await response.json();

            if (response.ok && data.success) { // Check response.ok for HTTP status codes in 200s
                setMessage('Phone number verified successfully!');
                // Here, you would typically proceed with user login/registration
                // or redirect them to the next step of your hotel booking process.
                console.log('OTP verified for:', phoneNumber);
                setPhoneNumber(''); // Clear form fields after successful verification
                setOtp('');
                setOtpSent(false); // Reset to allow new phone number entry
            } else {
                // Handle non-successful API response (e.g., 401, 404 status codes)
                setMessage(`Verification failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Phone Verification</h2>

            {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel" // Use type="tel" for phone numbers
                            id="phoneNumber"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., 9876543210 (without country code for Fast2SMS)"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., 123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setOtpSent(false);
                            setMessage(''); // Clear message when going back
                            setOtp(''); // Clear OTP field
                        }}
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2 rounded-md"
                        disabled={loading}
                    >
                        Edit Phone Number
                    </button>
                </form>
            )}

            {message && (
                <p className={`mt-4 text-center text-sm ${message.includes('Error') || message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default OtpVerification;
