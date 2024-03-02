
'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {getUser, loginUser, setUserSession} from '../../services/index'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loggedEmail = "tiara@tinaapartment.ng"
  const loggedPassword = "TiaraAdmin@"

  React.useEffect(() => {
		if (getUser()) {
			window.location.href = "/apartments";
		}
	}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      if (loggedEmail === email && loggedPassword === password) {
        // Successful login
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setUserSession('sampleToken',{name: 'Tiara', email: 'tiara@tinaapartment.ng'})
        window.location='/apartments'
      } else {
        // Failed login
        toast.error("Login failed. Please check your email and password.", {
          position: "top-right",
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="min-h-screen flex items-center justify-center bg-dark-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div></>
  );
};

export default Login;