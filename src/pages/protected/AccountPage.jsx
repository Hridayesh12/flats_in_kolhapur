import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getCurrentLead } from "../../services/authService";
import { assetsUrl } from "../../config/url";

const AccountPage = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState(null);
	const { openLogin, setIsLoggedIn, isLoggedIn } = useAuth();

	const getUserInfo = async () => {
		const resp = await getCurrentLead();
		// console.log("Resp", resp);
		if (resp.status > 250) {
			setIsLoggedIn(false);
			openLogin();
		} else {
			setIsLoggedIn(true);
			setUserInfo(resp.data);
		}
	};
	useEffect(() => {
		getUserInfo();
	}, [isLoggedIn]);

	if (!isLoggedIn) return navigate("/");
	return (
		<div className='px-10 pt-12 flex flex-col items-start gap-8 h-full max-w-[320px] mx-auto'>
				<div className="flex flex-col gap-4">
        <img
					src={`${assetsUrl}/assets/svgs/monogram.svg`}
					alt='Logo'
					className='h-[70px] w-[70px]'
				/>
      <p className="text-xl font-bold ml-2.5 mb-6">Flats in KOLHAPUR</p>
        </div>
      
      {userInfo && 
     <div className="flex flex-col w-[90%]">
      <p className="text-md font-bold ml-2.5">Personal Information</p>
      <div className="mx-2.5 w-full border-[1px] border-base-1100 rounded-lg text-sm px-2 py-1">
        {userInfo?.name}
      </div>
     </div>
      }
      {userInfo && 
      <div className="flex flex-col w-[90%]">
       <p className="text-sm ml-2.5">Phone Number</p>
      <div className="mx-2.5 w-full border-[1px] border-base-1100 rounded-lg text-sm px-2 py-1">
        +91{" "}{userInfo?.phone}
      </div>
      </div>
      }
		</div>
	);
};

export default AccountPage;
