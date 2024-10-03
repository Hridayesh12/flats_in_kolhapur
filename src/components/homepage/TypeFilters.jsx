import { assetsUrl } from '../../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/features/filterSlice';

const TypeFilters = () => {
  const activeType = useSelector((state) => state.filters.type);
  const dispatch = useDispatch();

  const handleTypeChange = (selectedFilter) => {
    dispatch(
      setFilters({
        type: selectedFilter,
      })
    );
  };

  const types = [
    { name: "Flat", value: "flat", icon: `${assetsUrl}/assets/svgs/type_icons/flat.svg` },
    { name: "Bungalow", value: "bungalow", icon: `${assetsUrl}/assets/svgs/type_icons/bungalow.svg` },
    { name: "Row House", value: "rowhouse", icon: `${assetsUrl}/assets/svgs/type_icons/rowhouse.svg` },
    { name: "Plot", value: "plot", icon: `${assetsUrl}/assets/svgs/type_icons/plot.svg` },
    { name: "Shop", value: "shop", icon: `${assetsUrl}/assets/svgs/type_icons/shop.svg` },
    { name: "Office", value: "office", icon: `${assetsUrl}/assets/svgs/type_icons/office.svg` },
  ];

  return (
    <div
      className='flex flex-row flex-nowrap items-center justify-center gap-[3px] sm:gap-6 md:gap-16 pt-4 pb-4 w-full overflow-auto filter'
      style={{ boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.25)" }}
    >
      {types.map((type) => (
        <div
          key={type.value}
          className={`flex flex-col items-center justify-between cursor-pointer min-w-14 sm:min-w-24 min-h-14 max-h-14 sm:max-h-24`}
          onClick={() => handleTypeChange(type.value)} // Handle click
        >
          <img src={type.icon} className='w-8 md:w-10 h-full object-cover' alt={type.name} />
          {type.value === 'rowhouse' ? 
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap ml-1'>{type.name}</p>
        :
        <p className='text-[11px] sm:text-sm md:text-base font-normal text-nowrap'>{type.name}</p>  
        }
          <div
            className={`h-px font-bold transition-all duration-300  delay-300 ${
              activeType === type.value ? "bg-base-600 w-4 sm:w-8" : "bg-base-100 w-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default TypeFilters;
