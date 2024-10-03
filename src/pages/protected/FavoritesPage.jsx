import { useEffect, useState } from 'react';
import FavCard from '../../components/favoritespage/FavCard.jsx';
import { getCurrentLead } from '../../services/authService.js';
import { useAuth } from '../../contexts/AuthProvider.js';
import { getFavorites } from '../../services/projectService.js';
import { useNavigate } from 'react-router-dom';



const FavoritesPage = () => {
  const [favProject, setFavProject] = useState([]);
  const navigate = useNavigate();
  const { openLogin, setIsLoggedIn, isLoggedIn } = useAuth();

 const getAllFavorites = async()=>{
		const resp = await getCurrentLead();
		console.log("Resp",resp);
		if(resp.status > 250){
			setIsLoggedIn(false);
			openLogin();
		}
		else{
      setIsLoggedIn(true);
			const getFav = await getFavorites();
      setFavProject(getFav.data);
		}
 }
 useEffect(()=>{
  getAllFavorites();
 },[isLoggedIn]);

 if(!isLoggedIn) return navigate("/");
  return (
    <div className="container  px-2 py-4">
      {/* Favorite Count Section */}
      <div className="bg-base-600 text-base-100 flex justify-between items-center p-3">
        <span className='text-lg font-bold'>Favorite</span>
        <span className='text-lg font-bold'>{favProject.length}</span> {/* Adjust the count dynamically if needed */}
      </div>
      
      {/* Card Section */}
      <div className="mt-6 ">
        {favProject?.map((card, index) => (
          <FavCard
            key={index}
            price={card.projectId.configurations.map((item) => item.price).filter((config) => config).join("-")}
            bhk={card.projectId.configurations.map((item) => item.config.match(/\d+/)).filter((config) => config).join(", ")}
            location={card.projectId.location.area}
            name={card.projectId.title}
            priceUnit={card.projectId.configurations[0].priceUnit}
            description={card.projectId.description}
            img={card.projectId.displayImage}
          />
        ))}
       
      </div>
    
    </div>
  );
};

export default FavoritesPage