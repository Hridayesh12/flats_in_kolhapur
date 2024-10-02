import React from "react";

const ConfigFilters = () => {
    const configurations = [
		{
			name: "Flats",
			configs: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "6BHK"],
		},
		{ name: "Bungalow", configs: ["2BHK", "3BHK", "4BHK", "5BHK"] },
		{ name: "Row House", configs: ["2BHK", "3BHK", "4BHK"] },
		{
			name: "Plots",
			configs: ["1000 sqft", "1500 sqft", "2000 sqft", "3000 sqft"],
		},
		{ name: "Shops", configs: ["Small", "Medium", "Large"] },
		{
			name: "Office",
			configs: ["Private Cabin", "Shared Space", "Conference Room"],
		},
	];
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center pt-4 pb-3 w-full max-w-96 mx-auto gap-1.5 ">
      {configurations[0].configs?.map((config, index) => (
        <div
          key={index}
          className={`px-2 py-0.5 text-[11px] border-[1px] border-base-400 cursor-pointer transition-all duration-300`}
         
        >
          {config}
        </div>
      ))}
    </div>
  );
};

export default ConfigFilters;
// ${activeConfig === config ? "bg-base-400 text-white" : ""}