'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.15 } },
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut({ redirect: false });
  };

  return (
    <div className='navbar bg-secondarylp text-primarylp px-4 md:px-8 shadow-md fixed w-full z-50'>
      {/* Start */}
      <div className='navbar-start'>
        <Link href='/' className='text-2xl font-bold'>
          Carlos Tech
        </Link>
      </div>

      {/* Center menu (desktop) */}
      <div className='navbar-center hidden md:flex space-x-8'>
        <Link
          href='/'
          className='px-4 py-2 rounded hover:bg-accentlp hover:text-primarylp transition'
        >
          Home
        </Link>
        <Link
          href='/reservation'
          className='px-4 py-2 rounded hover:bg-accentlp hover:text-primarylp transition'
        >
          Reservation
        </Link>
        <Link
          href='/aboutus'
          className='px-4 py-2 rounded hover:bg-accentlp hover:text-primarylp transition'
        >
          About Us
        </Link>
      </div>

      {/* End */}
      <div className='navbar-end'>
        {status === 'loading' ? (
          <div className='text-gray-500'>Loading...</div>
        ) : (
          <>
            {/* Desktop login state */}
            {!session ? (
              <div className='hidden md:flex space-x-4'>
                <Link
                  href='/register'
                  className='px-4 py-2 rounded hover:bg-accentlp hover:text-primarylp transition'
                >
                  Daftar
                </Link>
                <Link
                  href='/login'
                  className='px-4 py-2 rounded hover:bg-accentlp hover:text-primarylp transition'
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
                  <div className='w-10 rounded-full border-2 border-secondary overflow-hidden'>
                    <img
                      src={session.user.image || '/profile.jpg'}
                      alt='User Profile'
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      variants={dropdownVariants}
                      className='absolute right-0 mt-3 z-[1] p-2 shadow bg-secondarylp text-primarylp rounded-box w-48'
                    >
                      <li>
                        <Link
                          href='/profile'
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu */}
            <div className='relative md:hidden'>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className='btn btn-ghost p-2'
              >
                &#9776;
              </button>

              <AnimatePresence>
                {mobileOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-2 w-48 bg-secondarylp text-primarylp rounded shadow-lg overflow-hidden z-50'
                  >
                    <li>
                      <Link
                        href='/'
                        className='block px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/reservation'
                        className='block px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
                      >
                        Reservation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/aboutus'
                        className='block px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
                      >
                        About Us
                      </Link>
                    </li>

                    {!session ? (
                      <>
                        <li>
                          <Link
                            href='/register'
                            className='block px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
                          >
                            Daftar
                          </Link>
                        </li>
                        <li>
                          <Link
                            href='/login'
                            className='block px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
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
                            className='block px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className='w-full text-left px-4 py-2 hover:bg-primarylp hover:text-secondarylp'
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
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
