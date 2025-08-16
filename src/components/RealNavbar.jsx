'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // simulasi login
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.15 } },
  };

  return (
    <div className='navbar bg-secondary text-primary px-4 md:px-8 shadow-md fixed z-99'>
      {/* Start */}
      <div className='navbar-start'>
        <Link href='/' className='text-2xl font-bold'>
          Carlos Tech
        </Link>
      </div>

      {/* Center */}
      <div className='navbar-center hidden md:flex space-x-8'>
        <Link
          href='/'
          className='px-4 py-2 rounded hover:bg-accent hover:text-primary transition'
        >
          Home
        </Link>
        <Link
          href='/services'
          className='px-4 py-2 rounded hover:bg-accent hover:text-primary transition'
        >
          Services
        </Link>
        <Link
          href='/aboutus'
          className='px-4 py-2 rounded hover:bg-accent hover:text-primary transition'
        >
          About Us
        </Link>
      </div>

      {/* End */}
      <div className='navbar-end'>
        {!isLoggedIn ? (
          <div className='hidden md:flex space-x-4'>
            <Link
              href='/signup'
              className='px-4 py-2 rounded hover:bg-accent hover:text-primary transition'
            >
              Daftar
            </Link>
            <Link
              href='/login'
              className='px-4 py-2 rounded hover:bg-accent hover:text-primary transition'
            >
              Masuk
            </Link>
          </div>
        ) : (
          <div className='relative hidden md:block'>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full border-2 border-secondary'>
                <img src='/profile.jpg' alt='User' />
              </div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={dropdownVariants}
                  className='menu menu-sm dropdown-content absolute right-0 mt-3 z-[1] p-2 shadow bg-secondary text-primary rounded-box w-48'
                >
                  <li>
                    <Link href='/profile'>Profile</Link>
                  </li>
                  <li>
                    <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Mobile Menu */}
        <div className='relative md:hidden'>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className='btn btn-ghost p-2'
          >
            &#9776;
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 mt-2 w-48 bg-secondary text-primary rounded shadow-lg overflow-hidden z-50'
              >
                <li>
                  <Link
                    href='/'
                    className='block px-4 py-2 hover:bg-primary hover:text-secondary'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services'
                    className='block px-4 py-2 hover:bg-primary hover:text-secondary'
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href='/aboutus'
                    className='block px-4 py-2 hover:bg-primary hover:text-secondary'
                  >
                    About Us
                  </Link>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        href='/signup'
                        className='block px-4 py-2 hover:bg-primary hover:text-secondary'
                      >
                        Daftar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/login'
                        className='block px-4 py-2 hover:bg-primary hover:text-secondary'
                      >
                        Masuk
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href='/profile'
                        className='block px-4 py-2 hover:bg-primary hover:text-secondary'
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className='w-full text-left px-4 py-2 hover:bg-primary hover:text-secondary'
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
