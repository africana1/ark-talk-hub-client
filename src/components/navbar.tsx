import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {APP_NAME} from '../constants/app.config';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {pathname} = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-gray-800 text-white'>
      <div className='container mx-auto px-4 py-2 flex justify-between items-center'>
        <div className='flex items-center'>
          <h1 className='text-2xl flex'>
            <Link to='/'>
              <img src='/favicon.ico' alt='Ark Store Company' width='40px' height='40px' />
            </Link>
            <Link to='/' className='hover:text-gray-300 ml-5 mt-1'>
              {APP_NAME}
            </Link>
          </h1>
        </div>
        <div className='hidden md:flex items-center space-x-10'>
          {pathname === '/register' && (
            <Link to='/login' className='hover:text-gray-300'>
              Login
            </Link>
          )}

          {pathname === '/admin' && (
            <Link to='/login' className='hover:text-gray-300'>
              Login
            </Link>
          )}

          {pathname === '/login' && (
            <Link to='/register' className='hover:text-gray-300'>
              Register
            </Link>
          )}

          {pathname === '/admin' && (
            <Link to='/register' className='hover:text-gray-300'>
              Register
            </Link>
          )}

          {pathname !== '/admin' && (
            <Link to='/admin' className='hover:text-gray-300'>
              Admin
            </Link>
          )}
        </div>

        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
          <div
            className={`absolute top-full left-0 w-full bg-gray-800 p-4 mt-2 rounded-md shadow-md ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            {pathname === '/register' && (
              <Link to='/login' className='hover:text-gray-300'>
                Login
              </Link>
            )}
            {pathname === '/login' && (
              <Link to='/register' className='hover:text-gray-300'>
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
