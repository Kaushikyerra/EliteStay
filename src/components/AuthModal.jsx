import React, { useState, useEffect } from 'react';
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

const AuthModal = ({ isOpen, onClose, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Close modal if user is logged in
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  if (!isOpen) return null;

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onClose();
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
      onClose();
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
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'normal',
          'callback': (response) => {},
        });
      }
      const formattedPhone = phoneNumber;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setVerificationId(confirmationResult);
      setShowVerification(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await verificationId.confirm(verificationCode);
      onClose();
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setAuthMethod('email');
              setError(null);
              resetRecaptcha();
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              authMethod === 'email'
                ? 'bg-white text-yellow-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => {
              setAuthMethod('phone');
              setError(null);
              resetRecaptcha();
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              authMethod === 'phone'
                ? 'bg-white text-yellow-700 shadow-sm'
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
        {authMethod === 'email' ? (
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-700"
              />
            )}
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-700"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-700"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 px-6 bg-yellow-700 text-white rounded-lg border border-yellow-700 shadow-lg hover:bg-white hover:text-yellow-700 hover:border-yellow-700 transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
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
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-700"
                  />
                )}
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-700"
                />
                <div id="recaptcha-container" className="flex justify-center"></div>
                <button 
                  type="submit" 
                  disabled={loading || !phoneNumber}
                  className="w-full py-3 px-6 bg-yellow-700 text-white rounded-lg border border-yellow-700 shadow-lg hover:bg-white hover:text-yellow-700 hover:border-yellow-700 transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
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
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-700 text-center text-lg tracking-widest"
                />
                <button 
                  type="submit" 
                  disabled={loading || verificationCode.length !== 6}
                  className="w-full py-3 px-6 bg-yellow-700 text-white rounded-lg border border-yellow-700 shadow-lg hover:bg-white hover:text-yellow-700 hover:border-yellow-700 transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowVerification(false);
                    setVerificationCode('');
                    resetRecaptcha();
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
              className="w-full py-3 px-6 bg-yellow-700 text-white rounded-lg border border-yellow-700 shadow-lg hover:bg-white hover:text-yellow-700 hover:border-yellow-700 transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
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
                resetRecaptcha();
              }}
              className="text-yellow-700 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 