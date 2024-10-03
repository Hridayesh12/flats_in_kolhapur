import React from 'react'
import { useAuth } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();
  const { openLogin, setIsLoggedIn, isLoggedIn } = useAuth();
  if(!isLoggedIn) return navigate("/");
  return (
    <div>AccountPage</div>
  )
}

export default AccountPage