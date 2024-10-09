import React, { useState } from 'react';
import { loginAndOtpRoutes } from '../services/authService';
import { useAuth } from '../contexts/AuthProvider';
import { assetsUrl } from '../config/url';

const Login = () => {
  const { loginOpen, closeLogin, setIsLoggedIn, isLoggedIn } = useAuth();
  const [step, setStep] = useState(1); // Step 1: Enter Name & Phone, Step 2: Enter OTP
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');


  // Send OTP or Login if Lead exists
  const sendOtp = async (event) => {
    event.stopPropagation(); // Prevent event bubbling
    if (phone === '' || name === '') {
      setError('Phone number and name are required.');
      return;
    }
    try {
      const response = await loginAndOtpRoutes({ phone, name, otp });
      if (response.message === 'OTP Sent') {
        setError('');
        setStep(2); // Proceed to OTP input step
      } else {
        setIsLoggedIn(true);closeLogin();
        setStep(1);
        setPhone('');
        setName('');
        // You can change this as per logic if lead exists or continue with OTP flow
      }
    } catch (err) {
      setError('An error occurred while sending OTP or logging in.');
    }
  };

  // Verify OTP
  const verifyOtp = async (event) => {
    event.stopPropagation(); // Prevent event bubbling
    event.preventDefault();
    if (otp === '') {
      setError('Please enter the OTP.');
      return;
    }
    try {
      const response = await loginAndOtpRoutes({ phone, name, otp });
      if (response.status < 250 || response.status === 'success') {
        setIsLoggedIn(true);
        closeLogin();
        setStep(1);      
        setPhone('');
        setName('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during OTP verification.');
    }
  };

  const handleChangeNumber = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setStep(1);
    setPhone('');
    setOtp('');
    setError('');
  };

  if (!loginOpen) return null; // Only render if isOpen is true

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-[2.5px]">
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeLogin}></div>

      {/* Login Modal */}
      <div className="relative bg-base-100 rounded-[24px] shadow-lg border-[1px] border-base-800 p-10 pb-14 z-50 w-96 mx-5">
        {/* Close button */}
        <button
          onClick={(event) => { event.stopPropagation(); closeLogin(); }} // Prevent event bubbling
          className="absolute top-3 right-4 text-base-600 text-2xl font-bold"
        >
          <img src={`${assetsUrl}/assets/svgs/close.svg`} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={`${assetsUrl}/assets/svgs/monogram.svg`} alt="Logo" className="h-15 w-15" />
        </div>

        {/* Welcome Message */}
        <h2 className="text-xl font-semibold text-center mb-4 text-base-600">WELCOME</h2>
        <p className="text-center text-base-600 mb-14">Please enter your details to login</p>

        {/* Step 1: Enter Phone and Name */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); sendOtp(e); }}>
            <div className="mb-4">
              <label className="text-base-600 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-base-1100 text-base-600 bg-white p-2 w-full rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="text-base-600 mb-2" htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-2 border-base-1100 text-base-600 bg-white p-2 w-full rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-base-600 text-base-100 font-semibold py-1.5 rounded-md hover:bg-gray-800"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={verifyOtp}>
            <div className="mb-4">
              <label className="text-base-600 mb-2" htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border-2 border-base-1100 text-base-600 bg-white p-2 w-full rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Enter OTP"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-base-600 text-base-100 font-semibold py-1.5 rounded-md hover:bg-gray-800"
            >
              Verify OTP
            </button>

            {/* Change number link */}
            <div className="mt-4 text-center">
              <button onClick={handleChangeNumber} className="text-blue-500 underline">
                Change Number
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;