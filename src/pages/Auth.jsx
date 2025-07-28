import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  // Removed RecaptchaVerifier and signInWithPhoneNumber as Fast2SMS is used for OTP
  getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, sendEmailVerification, sendPasswordResetEmail
} from 'firebase/auth';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Ensure this CSS is imported for PhoneInput
import { useAuthState } from 'react-firebase-hooks/auth';

function Auth() {
  const [user] = useAuthState(auth);
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Stores number like "+919876543210"
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const [isPasswordless, setIsPasswordless] = useState(false);
  const [emailLinkSent, setEmailLinkSent] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  // Add state for unverified email
  const [unverified, setUnverified] = useState(false);
  const [resent, setResent] = useState(false);
  // Add state for checking verification after signup
  const [checkingVerification, setCheckingVerification] = useState(false);

  // Backend API base URL - ensure this matches your Node.js server port and path
  const API_BASE_URL = 'http://localhost:5000/api';

  // Redirect if already logged in and verified (for email/password)
  useEffect(() => {
    if (user) {
      // If user signed up with email/password, check emailVerified
      if (user.providerData.some(p => p.providerId === 'password')) {
        if (user.emailVerified) {
          navigate('/profile');
        }
      } else {
        // For other providers (Google, phone), allow immediate access
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  // Add this function after your imports
  const getFriendlyErrorMessage = (error) => {
    if (!error || !error.code) return "An unexpected error occurred. Please try again.";
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please log in or use a different email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up first.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/missing-password":
        return "Please enter your password.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  // Update handleEmailAuth for sign-up to send verification email
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUnverified(false);
    setResent(false);
    setCheckingVerification(false);
    try {
      let userCredential;
      if (isLogin) {
        const loginCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!loginCredential.user.emailVerified) {
          setUnverified(true);
          setLoading(false);
          return;
        }
        navigate('/');
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);
        setVerificationSent(true);
        // Do NOT navigate away after signup
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
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
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Passwordless sign-in handler
  const handlePasswordless = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const actionCodeSettings = {
      url: window.location.origin + '/finishSignIn',
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setEmailLinkSent(true);
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Function to clean phone number for Fast2SMS (removes +91 for Indian numbers)
  const getCleanPhoneNumber = (fullNumber) => {
    if (!fullNumber) return '';
    // Assuming defaultCountry="IN", so we strip "+91"
    // This is a simple approach for Indian numbers. For international, more robust parsing is needed.
    return fullNumber.startsWith('+91') ? fullNumber.substring(3) : fullNumber;
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhoneSuccess(false);

    const cleanPhoneNumber = getCleanPhoneNumber(phoneNumber);

    if (!cleanPhoneNumber || cleanPhoneNumber.length !== 10) {
        setError('Please enter a valid 10-digit Indian phone number.');
        setLoading(false);
        return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/send-otp`, { // Corrected URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: cleanPhoneNumber }) // Use 'phoneNumber' key matching backend
      });
      const data = await res.json();
      if (res.ok && data.success) { // Check res.ok for HTTP status (200-299)
        setShowVerification(true);
        setError(null); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhoneSuccess(false);

    const cleanPhoneNumber = getCleanPhoneNumber(phoneNumber);

    if (!cleanPhoneNumber || cleanPhoneNumber.length !== 10) {
        setError('Phone number format error. Please re-enter.');
        setLoading(false);
        return;
    }
    if (verificationCode.length !== 6) {
        setError('Please enter a 6-digit OTP.');
        setLoading(false);
        return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, { // Corrected URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: cleanPhoneNumber, otp: verificationCode }) // Use 'phoneNumber' and 'otp' keys
      });
      const data = await res.json();
      if (res.ok && data.success) { // Check res.ok for HTTP status (200-299)
        setPhoneSuccess(true);
        setError(null); // Clear any previous errors
        // In a real app, you might want to link this phone number to a Firebase user
        // or create a new user in Firestore here.
        setTimeout(() => navigate('/profile'), 1000);
      } else {
        setError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Failed to verify OTP. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const handleResendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setVerificationSent(true);
      setResent(true);
    }
  };

  // Add margin-top to push box below navbar
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-12 mt-24">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-bold text-yellow-800 mb-2">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <div className="w-16 h-1 mx-auto bg-gradient-to-r from-yellow-700 to-yellow-400 rounded"></div>
        </div>
        {/* Tabs */}
        <div className="flex mb-8 bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 text-lg font-semibold transition ${authMethod === 'email' ? 'bg-yellow-50 text-yellow-800 border-b-4 border-yellow-700' : 'text-gray-500 hover:text-yellow-700'}`}
            onClick={() => setAuthMethod('email')}
          >Email</button>
          <button
            className={`flex-1 py-3 text-lg font-semibold transition ${authMethod === 'phone' ? 'bg-yellow-50 text-yellow-800 border-b-4 border-yellow-700' : 'text-gray-500 hover:text-yellow-700'}`}
            onClick={() => setAuthMethod('phone')}
          >Phone</button>
        </div>
        {/* Show only one form at a time */}
        {showForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-elitestay-teal">Reset Password</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await sendPasswordResetEmail(auth, resetEmail);
                  setResetSent(true);
                } catch (err) {
                  setError(getFriendlyErrorMessage(err));
                }
              }}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
              />
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
              >
                Send Reset Link
              </button>
              {resetSent && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2">
                  Password reset email sent! Please check your inbox.
                </div>
              )}
              <button
                type="button"
                className="text-elitestay-teal underline text-sm mt-2"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                  setResetEmail('');
                  setError(null);
                }}
              >
                ← Back to Login
              </button>
            </form>
          </>
        ) : authMethod === 'email' ? (
          <form onSubmit={handleEmailAuth} className="space-y-6">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-elitestay-gold"
              />
            )}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-700 material-icons">mail</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-yellow-700 text-lg"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-700 material-icons">lock</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-yellow-700 text-lg"
              />
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            {verificationSent && !isLogin && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                A verification email has been sent to your email address. Please check your inbox.<br/>
                <button onClick={handleResendVerification} className="block mt-2 text-elitestay-teal underline text-sm">Resend Verification Email</button>
                <button
                  onClick={async () => {
                    setCheckingVerification(true);
                    setError(null);
                    await auth.currentUser.reload();
                    const refreshedUser = auth.currentUser;
                    if (refreshedUser && refreshedUser.emailVerified) {
                      navigate('/');
                    } else {
                      setError('Email not verified yet. Please check your inbox and try again.');
                    }
                    setCheckingVerification(false);
                  }}
                  className="block mt-2 text-elitestay-teal underline text-sm"
                  disabled={checkingVerification}
                >
                  {checkingVerification ? 'Checking...' : "I've verified my email"}
                </button>
              </div>
            )}
            {unverified && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative mb-4">
                Your email is not verified. Please check your inbox for a verification link.<br/>
                <button onClick={handleResendVerification} className="block mt-2 text-elitestay-teal underline text-sm">Resend Verification Email</button>
                {resent && <div className="text-green-700 mt-2">Verification email resent!</div>}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-700 to-yellow-500 text-white font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-400 transition"
              disabled={loading}
            >
              {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
            </button>
            <button
              type="button"
              className="block w-full text-right text-yellow-700 hover:underline text-sm font-medium"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <form onSubmit={handlePhoneAuth} className="space-y-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <PhoneInput
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="IN"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {showVerification && (
              <div>
                <label htmlFor="verificationCode" className="block text-gray-700 text-sm font-bold mb-2">Verification Code</label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-700 to-yellow-500 text-white font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-400 transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        <button onClick={handleGoogleLogin} className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold shadow hover:bg-gray-50 flex items-center justify-center gap-2">
          <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>
        <div className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setPhoneSuccess(false);
              setShowVerification(false);
            }}
            className="text-yellow-700 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
