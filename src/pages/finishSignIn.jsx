import React, { useEffect, useState } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function FinishSignIn() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem('emailForSignIn');
      if (!emailForSignIn) {
        setShowPrompt(true);
        setMessage('Please enter your email to complete sign-in.');
        return;
      }
      signInWithEmailLink(auth, emailForSignIn, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          setMessage('Sign-in successful! Redirecting...');
          setTimeout(() => navigate('/profile'), 1500);
        })
        .catch(err => {
          setMessage('Error: ' + err.message);
        });
    } else {
      setMessage('Invalid or expired sign-in link.');
    }
  }, [auth, navigate]);

  const handleManual = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      setMessage('Sign-in successful! Redirecting...');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-elitestay-beige">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Email Link Sign-In</h2>
        {showPrompt ? (
          <form onSubmit={handleManual} className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="w-full px-6 py-2 bg-elitestay-teal text-white rounded">Sign In</button>
          </form>
        ) : null}
        <div className="mt-4 text-gray-700">{message}</div>
      </div>
    </div>
  );
} 