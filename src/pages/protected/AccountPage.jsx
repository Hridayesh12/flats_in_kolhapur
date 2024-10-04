import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getCurrentLead } from '../../services/authService';

const AccountPage = () => {
  const navigate = useNavigate();
   const [userInfo, setUserInfo] = useState([]);
  const { openLogin, setIsLoggedIn, isLoggedIn } = useAuth();

 const getUserInfo = async()=>{
		const resp = await getCurrentLead();
		console.log("Resp",resp);
		if(resp.status > 250){
			setIsLoggedIn(false);
			openLogin();
		}
		else{
      setIsLoggedIn(true);
			setUserInfo(resp.data);
		}
 }
 useEffect(()=>{
  getUserInfo();
 },[isLoggedIn]);


  if(!isLoggedIn) return navigate("/");
  return (
    <div>AccountPage</div>
  )
}

export default AccountPage