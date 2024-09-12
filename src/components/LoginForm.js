// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logoutUser, clearMessages } from '../features/auth/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const dispatch = useDispatch();
  const { loggedInUser, message, errorMessage } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      dispatch(loginUser({ email, password }));
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      dispatch(registerUser({ email, password, name, mobileNumber, gender }));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearMessages()); // Clear messages after showing
    }
    if (errorMessage) {
      alert(errorMessage);
      dispatch(clearMessages()); // Clear messages after showing
    }
  }, [message, errorMessage, dispatch]);

  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        )}
        {isLoginMode && (
          <>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
      </form>

      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
      </button>

      {loggedInUser && (
        <div>
          <h3>Welcome, {loggedInUser.name}</h3>
          <p>Email: {loggedInUser.email}</p>
          <p>Mobile Number: {loggedInUser.mobileNumber}</p>
          <p>Gender: {loggedInUser.gender}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
