import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useAuthState } from 'react-firebase-hooks/auth';

function Auth() {
  const [user] = useAuthState(auth);
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile'); // Redirect to profile page if already logged in
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhoneSuccess(false);
    try {
      const res = await fetch('http://localhost:8000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber })
      });
      const data = await res.json();
      if (data.success) {
        setShowVerification(true);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhoneSuccess(false);
    try {
      const res = await fetch('http://localhost:8000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber, otp: verificationCode })
      });
      const data = await res.json();
      if (data.success) {
        setPhoneSuccess(true);
        setTimeout(() => navigate('/profile'), 1000);
      } else {
        setError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-elitestay-beige py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-serif text-elitestay-teal mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        {/* Auth Method Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setAuthMethod('email');
              setError(null);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              authMethod === 'email'
                ? 'bg-white text-elitestay-teal shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => {
              setAuthMethod('phone');
              setError(null);
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              authMethod === 'phone'
                ? 'bg-white text-elitestay-teal shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Phone
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        
        {phoneSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            Phone verified successfully!
          </div>
        )}
        
        {authMethod === 'email' ? (
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
              />
            )}
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 px-6 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
        ) : (
          <div>
            {!showVerification ? (
              <form onSubmit={handlePhoneAuth} className="space-y-4">
                {!isLogin && (
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
                  />
                )}
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="IN"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
                />
                <button 
                  type="submit" 
                  disabled={loading || !phoneNumber}
                  className="w-full py-3 px-6 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
                >
                  {loading ? 'Sending Code...' : 'Send Verification Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerificationCode} className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-gray-600">Enter the 6-digit code sent to</p>
                  <p className="font-medium">{phoneNumber}</p>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit code" 
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold text-center text-lg tracking-widest"
                />
                <button 
                  type="submit" 
                  disabled={loading || verificationCode.length !== 6}
                  className="w-full py-3 px-6 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowVerification(false);
                    setVerificationCode('');
                  }}
                  className="w-full py-2 px-6 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back to Phone Number
                </button>
              </form>
            )}
          </div>
        )}
        
        {authMethod === 'email' && (
          <div className="mt-4 text-center">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-6 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
            >
              Continue with Google
            </button>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-elitestay-teal hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth; 