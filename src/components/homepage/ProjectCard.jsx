import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { assetsUrl } from '../../config/url';
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaWhatsapp,
	FaTelegram,
} from "react-icons/fa";
import { MdClose } from "react-icons/md"; 
import { useAuth } from "../../contexts/AuthProvider";
import { getCurrentLead } from "../../services/authService";
import { postPutFavoriteProject } from "../../services/projectService";
import { setLikeProject } from "../../store/features/projectSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({
	image,
	name,
	price,
	bhk,
	location,
	domain,
	projectId,
	desc,
	isFav
}) => {
const description = desc;
	// Assuming you have a project object with necessary fields


	const navigate = useNavigate();

	const { openLogin, isLoggedIn, setIsLoggedIn } = useAuth();
	const dispatch = useDispatch();
	
	const [isNameOverflowed, setIsNameOverflowed] = useState(false);
	const [isDescriptionOverflowed, setIsDescriptionOverflowed] = useState(false);
	const [isShareOpen, setIsShareOpen] = useState(false); // State for controlling share popup visibility

	const nameRef = useRef(null);
	const descriptionRef = useRef(null);

	const toggleSharePopup = (event) => {
		event.stopPropagation()
		setIsShareOpen((prev) => !prev);
	};

	const favCallBack = async(projectId)=>{
		const resp = await postPutFavoriteProject(projectId);
			console.log("This Ran");
	}
	const handleFavLogic = async(event, projectId) => {
		event.stopPropagation()
		const resp = await getCurrentLead();
		console.log("Resp",resp);
		if(resp.status > 250){
			setIsLoggedIn(false);
			openLogin();
			if(isLoggedIn){
				await favCallBack();
			}
		}
		else{
			const resp = await postPutFavoriteProject(projectId);
			dispatch(
				setLikeProject({projectId: projectId})
			)
		}
	}
const shareUrl = `http://flatsinkolhapur.com/${domain}`;
    const shareMessage = `Check out this project: ${name}\nLocation: ${location}\nDescription: ${description}`;

    const handleWhatsAppShare = (event) => {
        event.stopPropagation();
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleFacebookShare = (event) => {
        event.stopPropagation();
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, "_blank");
    };

    const handleTwitterShare = (event) => {
        event.stopPropagation();
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank");
    };

    const handleInstagramShare = (event) => {
        event.stopPropagation();
        // Instagram does not support sharing via URL, redirecting to Instagram app
        alert("Please share directly on Instagram!");
    };

    const handleTelegramShare = (event) => {
        event.stopPropagation();
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
        window.open(telegramUrl, "_blank");
    };


	useEffect(() => {
		const checkOverflow = () => {
			if (nameRef.current) {
				setIsNameOverflowed(
					nameRef.current.scrollWidth > nameRef.current.clientWidth
				);
			}
			if (descriptionRef.current) {
				setIsDescriptionOverflowed(
					descriptionRef.current.scrollHeight >
						descriptionRef.current.clientHeight
				);
			}
		};
		checkOverflow();
		window.addEventListener("resize", checkOverflow);

		return () => window.removeEventListener("resize", checkOverflow);
	}, []);
	return (
		<motion.div whileHover={{scale:1.05}}
		style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
			className='w-[340px] flex flex-col items-center justify-center bg-base-200 relative mx-auto my-5'
			onClick={()=>{navigate(`/${domain}`)}}
		>
			<div className='h-[340px] w-[340px]'>
				<img
					src={`${image}`}
					className='h-full w-full object-cover'
					alt='Card'
				/>
			</div>
			<div
				style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
				className='w-full bg-base-100 flex flex-col items-center py-3 px-2 pl-4 gap-1'>
				<div className='w-full flex items-start justify-start'>
					<p
						className='text-base font-bold leading-none flex flex-wrap overflow-hidden whitespace-nowrap text-left'>
						{name.toUpperCase()}
						
					</p>

				</div>
				<div className='w-full flex items-start justify-around '>
					<p className='text-base text-base-900 leading-none font-normal max-w-[55%] min-w-[55%] flex flex-wrap'>
						{location}
					</p>
					<p className='text-base leading-none max-w-[45%] min-w-[45%] flex items-end flex-wrap'>
						₹ {price}<p className='text-[10px] leading-3 text-base-900'>&nbsp;onwards</p>
					</p>
					
				</div>
				<div className='w-full flex items-end justify-around'>
					<p className='text-base leading-none max-w-[50%] min-w-[55%] flex items-end flex-wrap'>
						{bhk} <p className='text-[10px] leading-[11px] text-base-900'>&nbsp;posted by owner</p>
					</p>
					<div className='flex items-center gap-2 min-h-full max-w-[45%] min-w-[45%]'>
						<span 
                        onClick={(e)=>{handleFavLogic(e,projectId)}}
                        >
							{isFav ? 
								<img
								src={`${assetsUrl}/assets/svgs/project_card_icons/filled_heart.svg`}
								alt='Heart'
								className='w-4'
							/>:
							<img
								src={`${assetsUrl}/assets/svgs/project_card_icons/empty_heart.svg`}
								alt='Heart'
								className='w-4'
							/>
							}
						</span>
						<span className='relative cursor-pointer'>
							{/* Share Button */}
							<button
								onClick={toggleSharePopup}
								className='bg-blue-500 text-white rounded-full flex items-center justify-center relative'>
								<img
									src={`${assetsUrl}/assets/svgs/project_card_icons/share.svg`}
									alt='Share'
									className='w-[16px]'
								/>
							</button>

							{/* Share Icons */}
							{isShareOpen && (
								<motion.div
									initial={{ scale: 0 }} // Initial scale
									animate={{ scale: 1 }} // Animate to scale 1
									transition={{
										type: "spring", // Use spring for a more natural movement
										stiffness: 300, // Higher stiffness makes it faster and bouncier
										damping: 20, // Damping controls how oscillations decay; lower = more bounces
									}}
									className='absolute -top-12 -left-14 transform -translate-x-1/2 flex justify-center items-center rounded-full p-2'
									style={{
										background: "radial-gradient(circle, gray,white, white)",
										backdropFilter: "blur(2.5px)",
									}}>
									{/* Orbiting icons around the share button */}
									<div className='relative w-28 h-28'>
										{/* Facebook icon */}
										<motion.div
											initial={{ scale: 0 }} // Initial scale
											animate={{ scale: 1 }} // Animate to scale 1
											transition={{
												type: "spring", // Use spring for a more natural movement
												stiffness: 300, // Higher stiffness makes it faster and bouncier
												damping: 20, // Damping controls how oscillations decay; lower = more bounces
											}}
											onClick={handleFacebookShare}
											className='absolute -top-2 left-[35%] transform -translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-full p-1 h-fit w-fit'>
											<FaFacebook className='w-6 h-6 text-facebook' />{" "}
											{/* Facebook Color */}
										</motion.div>

										{/* Twitter icon */}
										<motion.div
											initial={{ scale: 0 }} // Initial scale
											animate={{ scale: 1 }} // Animate to scale 1
											transition={{
												type: "spring", // Use spring for a more natural movement
												stiffness: 300, // Higher stiffness makes it faster and bouncier
												damping: 20, // Damping controls how oscillations decay; lower = more bounces
											}}
											onClick={handleTwitterShare}
											className='absolute -left-0 top-[23%] transform -translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-full p-1 h-fit w-fit'>
											<FaTwitter className='w-5 h-5 text-twitter' />{" "}
											{/* Twitter Color */}
										</motion.div>

										{/* Instagram icon */}
										<motion.div
											initial={{ scale: 0 }} // Initial scale
											animate={{ scale: 1 }} // Animate to scale 1
											transition={{
												type: "spring", // Use spring for a more natural movement
												stiffness: 300, // Higher stiffness makes it faster and bouncier
												damping: 20, // Damping controls how oscillations decay; lower = more bounces
											}}
											onClick={handleInstagramShare}
											className='absolute right-0 top-[20%] transform translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-full p-1 h-fit w-fit'>
											<FaInstagram className='w-6 h-6 text-instagram' />{" "}
											{/* Instagram Color */}
										</motion.div>

										{/* WhatsApp icon */}
										<motion.div
											initial={{ scale: 0 }} // Initial scale
											animate={{ scale: 1 }} // Animate to scale 1
											transition={{
												type: "spring", // Use spring for a more natural movement
												stiffness: 300, // Higher stiffness makes it faster and bouncier
												damping: 20, // Damping controls how oscillations decay; lower = more bounces
											}}
											onClick={handleWhatsAppShare}
											className='absolute bottom-0 left-[60%] transform -translate-x-1/2 translate-y-1/2 bg-base-300 rounded-full p-1 h-fit w-fit'>
											<FaWhatsapp className='w-6 h-6 text-whatsapp' />{" "}
											{/* WhatsApp Color */}
										</motion.div>

										{/* Telegram icon */}
										<motion.div
											initial={{ scale: 0 }} // Initial scale
											animate={{ scale: 1 }} // Animate to scale 1
											transition={{
												type: "spring", // Use spring for a more natural movement
												stiffness: 300, // Higher stiffness makes it faster and bouncier
												damping: 20, // Damping controls how oscillations decay; lower = more bounces
											}}
											onClick={handleTelegramShare}
											className='absolute bottom-0 left-4 bg-base-300 rounded-full p-1 h-fit w-fit'>
											<FaTelegram className='w-6 h-6 text-telegram' />{" "}
											{/* Telegram Color */}
										</motion.div>

										{/* Close button */}
										<motion.div className='absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-full p-1 h-fit w-fit'>
											<MdClose
												onClick={toggleSharePopup}
												className='w-6 h-6 text-gray-600 cursor-pointer'
											/>
										</motion.div>
									</div>
								</motion.div>
							)}
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;