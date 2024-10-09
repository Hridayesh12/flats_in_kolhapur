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
		// console.log("Resp",resp);
		if(resp.status > 250){
			setIsLoggedIn(false);
			openLogin();
		}
		else{
      setIsLoggedIn(true);
			const getFav = await getFavorites();
      // console.log("Favorite", getFav);
      setFavProject(getFav.data);
		}
 }
 useEffect(()=>{
  getAllFavorites();
 },[isLoggedIn]);

 if(!isLoggedIn) return navigate("/");
  return (
    <div className="container  px-2 py-4 mx-auto h-full overflow-auto">
      {/* Favorite Count Section */}
      <div className="bg-base-600 text-base-100 p-4 flex justify-between items-center">
      <span className='text-lg font-bold'>Favorite</span>
      <span className='text-lg font-bold'>{favProject.length}</span> 
                    </div>

      
      {/* Card Section */}
    {favProject.length > 0 ? 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {favProject?.map((card, index) => (
        <FavCard
          key={index}
          price={(() => {
            if (card.projectId.configurations?.length > 0) {
              const price = card.projectId.configurations[0]?.price;

              if (price < 1) {
                // Convert price less than 1 to Lakh (e.g., 0.123 becomes 12.3 Lakh)
                return `${(price * 100).toFixed(1)} Lakh`;
              } else {
                // Convert price greater than or equal to 1 to Cr (e.g., 1.234 becomes 1.2 Cr)
                return `${price.toFixed(1)} Cr`;
              }
            }
            return null; // Return null if no configurations exist
          })()}
          bhk={(() => {
            const bhkConfigurations = card.projectId.configurations
              .map((item) => item.config.match(/\d+/)) // Extract numbers
              .filter((config) => config) // Filter valid numbers
              .map(Number) // Convert to numbers
              .sort((a, b) => a - b); // Sort the configurations in ascending order

            if (bhkConfigurations.length === 1) {
              // Single configuration
              return `${bhkConfigurations[0]} BHK`;
            } else if (
              bhkConfigurations.length > 1 &&
              bhkConfigurations[bhkConfigurations.length - 1] -
                bhkConfigurations[0] ===
                bhkConfigurations.length - 1
            ) {
              // Continuous range of configurations
              return `${bhkConfigurations[0]} - ${
                bhkConfigurations[bhkConfigurations.length - 1]
              } BHK`;
            } else {
              // Multiple non-continuous configurations
              return bhkConfigurations.join(", ") + " BHK";
            }
          })()}
          name={card.projectId.title}
          description={card.projectId.description}
          img={card.projectId.displayImage}
          location={card.projectId.location.area}
        />
      ))}
     
    </div>
  : <>Loading...</>
  }
    </div>
  );
};

export default FavoritesPage