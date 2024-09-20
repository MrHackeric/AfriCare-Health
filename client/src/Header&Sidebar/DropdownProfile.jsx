import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Transition from '../utils/Transition';
import { auth } from '../projectmodules/Auth/firebase-config';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore'; 
import { db } from '../projectmodules/Auth/firebase-config'; 
import UserAvatar from '../images/user-avatar-32.png';

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ 
              username: userData.username, 
              email: currentUser.email 
            });
          } else {
            setUser({
              username: currentUser.email,
              email: currentUser.email
            });
            console.log('No such user document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser({
            username: currentUser.email,
            email: currentUser.email
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/SignIn");
    } catch (error) {
      console.error("Sign-out error:", error.message || error);
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full border-2 border-pink-500" src={UserAvatar} width="32" height="32" alt="User" />
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-pink-200 dark:border-pink-600 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-2 pb-2 px-3 mb-1 border-b border-pink-200 dark:border-pink-600">
            <div className="text-lg text-gray-800 dark:text-gray-100">{user ? user.username : 'Loading...'}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">{user ? user.email : 'Loading...'}</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 flex items-center py-1 px-3 transition-colors duration-200"
                to="/Account"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 flex items-center py-1 px-3 transition-colors duration-200"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  handleLogout();
                }}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
