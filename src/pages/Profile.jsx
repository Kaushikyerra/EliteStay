import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, firestore } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { updateProfile, signOut } from 'firebase/auth';
import { UserIcon, HomeIcon, IdentificationIcon, CalendarIcon, TicketIcon, GiftIcon, LifebuoyIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const SIDEBAR_ITEMS = [
  { key: 'overview', label: 'Overview', icon: <HomeIcon className="w-5 h-5 mr-2" /> },
  { key: 'personal', label: 'Personal Details', icon: <IdentificationIcon className="w-5 h-5 mr-2" /> },
  { key: 'bookings', label: 'Bookings', icon: <CalendarIcon className="w-5 h-5 mr-2" /> },
  { key: 'vouchers', label: 'Vouchers', icon: <TicketIcon className="w-5 h-5 mr-2" /> },
  { key: 'offers', label: 'Offers', icon: <GiftIcon className="w-5 h-5 mr-2" /> },
  { key: 'support', label: 'Member Support', icon: <LifebuoyIcon className="w-5 h-5 mr-2" /> },
];

export default function Profile() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
  });
  const sectionParam = searchParams.get('section');
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const handleSidebarClick = (key) => {
    setSearchParams({ section: key });
  };

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData({ ...userData, ...userDoc.data() });
        } else {
          setUserData({
            displayName: user.displayName || '',
            email: user.email || '',
            phone: user.phoneNumber || '',
            address: '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      setBookingsLoading(true);
      try {
        const q = query(
          collection(firestore, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched bookings for user:', bookingsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setBookingsLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateProfile(user, { displayName: userData.displayName });
      await setDoc(doc(firestore, 'users', user.uid), {
        displayName: userData.displayName,
        email: user.email,
        phone: userData.phone,
        address: userData.address,
        updatedAt: new Date(),
      }, { merge: true });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSupportSent(true);
    setSupportMsg('');
    setTimeout(() => setSupportSent(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-elitestay-beige to-white py-0 md:py-12 flex flex-col">
      <div className="w-full h-40 md:h-56 bg-gradient-to-r from-[#FF8D41] to-elitestay-teal relative flex items-end justify-center shadow-lg z-0">
        {/* Avatar and user info */}
        <div className="absolute left-1/2 top-full md:top-[80%] transform -translate-x-1/2 md:-translate-y-1/2 flex flex-col md:flex-row items-center gap-4 z-10">
          <div className="w-32 h-32 rounded-full bg-white border-4 border-elitestay-teal flex items-center justify-center text-5xl text-elitestay-teal font-bold shadow-xl -mt-16 md:mt-0">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-serif text-elitestay-teal font-bold">{user.displayName || 'User'}</div>
            <div className="text-gray-600 text-base md:text-lg">{user.email}</div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4 pt-32 md:pt-24 z-10">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col min-h-[500px] md:mt-8 md:sticky md:top-32">
          <nav className="flex-1 flex flex-col justify-center gap-2 mt-8 mb-12">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.key}
                className={`flex items-center w-full text-left px-4 py-2 rounded-lg font-medium transition-colors text-base ${(sectionParam || 'personal') === item.key ? 'bg-[#FF8D41]/90 text-white border-l-4 border-[#FF8D41] shadow' : 'text-elitestay-teal hover:bg-gray-100'}`}
                onClick={() => handleSidebarClick(item.key)}
              >
                {item.icon}{item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <button
              onClick={async () => { await signOut(auth); navigate('/auth'); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-elitestay-teal rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center">
          {/* Section Content */}
          {(sectionParam || 'personal') === 'personal' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 w-full max-w-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-8">
                <IdentificationIcon className="w-7 h-7 text-[#FF8D41]" />
                <h1 className="text-3xl font-serif text-elitestay-teal mb-0">Personal Details</h1>
              </div>
              {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>
              )}
              <form onSubmit={handlePersonalSubmit} className="space-y-8 w-full">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={userData.displayName}
                      onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-8">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Details'}
                  </button>
                </div>
              </form>
            </div>
          )}
          {(sectionParam || 'personal') === 'support' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 w-full max-w-2xl flex flex-col items-center">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-serif text-elitestay-teal mb-2">Member Support</h1>
                <div className="w-20 h-1 bg-[#FF8D41] mx-auto rounded"></div>
                <p className="mt-4 text-gray-600">For any assistance, please contact us:</p>
                <div className="mt-2 text-gray-700">
                  <div>Email: <a href="mailto:support@elitestay.com" className="text-[#FF8D41] underline">support@elitestay.com</a></div>
                  <div>Phone: <a href="tel:+919999999999" className="text-[#FF8D41] underline">+91-9999999999</a></div>
                </div>
              </div>
              <form onSubmit={handleSupportSubmit} className="space-y-6 w-full">
                <textarea
                  value={supportMsg}
                  onChange={e => setSupportMsg(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-elitestay-teal transition-colors"
                  rows={4}
                  placeholder="Describe your issue or question..."
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF8D41] text-white rounded-lg border border-[#FF8D41] shadow-lg hover:bg-white hover:text-[#FF8D41] hover:border-[#FF8D41] transition duration-300 font-semibold"
                >
                  Submit
                </button>
                {supportSent && <div className="text-green-600 text-center">Your message has been sent!</div>}
              </form>
            </div>
          )}
          {(sectionParam || 'personal') === 'overview' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 w-full max-w-2xl flex flex-col items-center">
              <h2 className="text-2xl font-serif text-elitestay-teal font-bold mb-4">Welcome, {user.displayName || 'User'}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
                <div className="bg-elitestay-beige rounded-xl p-6 text-center shadow">
                  <div className="text-4xl font-bold text-elitestay-teal mb-2">{bookings.length}</div>
                  <div className="text-gray-600">Bookings</div>
                </div>
                <div className="bg-elitestay-beige rounded-xl p-6 text-center shadow">
                  <div className="text-4xl font-bold text-elitestay-teal mb-2">0</div>
                  <div className="text-gray-600">Vouchers</div>
                </div>
                <div className="bg-elitestay-beige rounded-xl p-6 text-center shadow">
                  <div className="text-4xl font-bold text-elitestay-teal mb-2">0</div>
                  <div className="text-gray-600">Offers</div>
                </div>
              </div>
              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold text-elitestay-teal mb-2">Upcoming Bookings</h3>
                {bookingsLoading ? (
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">Loading bookings...</div>
                ) : bookings.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">There are no bookings under your account.</div>
                ) : (
                  <div className="grid gap-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="bg-white rounded-lg shadow border p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-bold text-elitestay-teal text-lg">{booking.roomName}</div>
                          <div className="text-gray-600 text-sm">{booking.checkInDate} - {booking.checkOutDate}</div>
                          <div className="text-gray-600 text-sm">Guests: {booking.adults} adults, {booking.children} children</div>
                        </div>
                        <div className="text-xl font-bold text-[#FF8D41] mt-2 md:mt-0">{booking.roomPrice}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold text-elitestay-teal mb-2">My Vouchers</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">There are no vouchers under your account.</div>
              </div>
              <div className="w-full">
                <h3 className="text-xl font-semibold text-elitestay-teal mb-2">My Offers</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">No offers available at the moment.</div>
              </div>
            </div>
          )}
          {(sectionParam || 'personal') === 'bookings' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif text-elitestay-teal font-bold mb-4">Bookings</h2>
              {bookingsLoading ? (
                <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">There are no bookings under your account.</div>
              ) : (
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow border p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-bold text-elitestay-teal text-lg">{booking.roomName}</div>
                        <div className="text-gray-600 text-sm">{booking.checkInDate} - {booking.checkOutDate}</div>
                        <div className="text-gray-600 text-sm">Guests: {booking.adults} adults, {booking.children} children</div>
                      </div>
                      <div className="text-xl font-bold text-[#FF8D41] mt-2 md:mt-0">{booking.roomPrice}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {(sectionParam || 'personal') === 'vouchers' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif text-elitestay-teal font-bold mb-4">Vouchers</h2>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">There are no vouchers under your account.</div>
            </div>
          )}
          {(sectionParam || 'personal') === 'offers' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-serif text-elitestay-teal font-bold mb-4">Offers</h2>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">No offers available at the moment.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 