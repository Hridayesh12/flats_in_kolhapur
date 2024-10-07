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
    <div className="container  px-2 py-4 mx-auto">
      {/* Favorite Count Section */}
      <div className="bg-base-600 text-base-100 p-4 flex justify-between items-center">
      <span className='text-lg font-bold'>Favorite</span>
      <span className='text-lg font-bold'>{favProject.length}</span> 
                    </div>

      
      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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