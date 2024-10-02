import React from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    "image": "/images/project1.jpg",
    "name": "Luxury Apartment",
    "price": 5000000,
    "bhk": 3,
    "location": "Downtown City",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "1",
    "isFav": true
  },
  {
    "image": "/images/project2.jpg",
    "name": "Cozy Studio",
    "price": 3000000,
    "bhk": 1,
    "location": "Suburb Area",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "2",
    "isFav": false
  },
  {
    "image": "/images/project3.jpg",
    "name": "Modern Villa",
    "price": 12000000,
    "bhk": 4,
    "location": "Beachfront",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "3",
    "isFav": true
  },
  {
    "image": "/images/project4.jpg",
    "name": "Affordable Housing",
    "price": 2500000,
    "bhk": 2,
    "location": "New Development",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "4",
    "isFav": false
  },
  {
    "image": "/images/project5.jpg",
    "name": "Penthouse Suite",
    "price": 20000000,
    "bhk": 5,
    "location": "City Center",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "5",
    "isFav": true
  },
  {
    "image": "/images/project6.jpg",
    "name": "Eco-Friendly House",
    "price": 3500000,
    "bhk": 2,
    "location": "Green Valley",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "6",
    "isFav": false
  },
  {
    "image": "/images/project7.jpg",
    "name": "Family Home",
    "price": 4500000,
    "bhk": 3,
    "location": "Suburban Area",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "7",
    "isFav": true
  },
  {
    "image": "/images/project8.jpg",
    "name": "High-Rise Apartment",
    "price": 9000000,
    "bhk": 2,
    "location": "City Skyline",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "8",
    "isFav": false
  },
  {
    "image": "/images/project9.jpg",
    "name": "Charming Cottage",
    "price": 3000000,
    "bhk": 1,
    "location": "Countryside",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "9",
    "isFav": true
  },
  {
    "image": "/images/project10.jpg",
    "name": "Spacious Bungalow",
    "price": 7500000,
    "bhk": 4,
    "location": "Lakeside",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "10",
    "isFav": false
  },
  {
    "image": "/images/project11.jpg",
    "name": "Designer Flat",
    "price": 6000000,
    "bhk": 3,
    "location": "Urban Area",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "11",
    "isFav": true
  },
  {
    "image": "/images/project12.jpg",
    "name": "Luxury Condo",
    "price": 13000000,
    "bhk": 2,
    "location": "Uptown",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "12",
    "isFav": false
  },
  {
    "image": "/images/project13.jpg",
    "name": "Chic Apartment",
    "price": 5000000,
    "bhk": 2,
    "location": "Downtown",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "13",
    "isFav": true
  },
  {
    "image": "/images/project14.jpg",
    "name": "Mountain Retreat",
    "price": 8500000,
    "bhk": 3,
    "location": "Hillside",
    "domain": "Residential",
    "priceUnit": "INR",
    "projectId": "14",
    "isFav": false
  }
]

const Listings = () => {
  return (
    <div className='w-full flex flex-col items-start justify-center relative'>
      <div className='flex items-center justify-between w-full border-2 border-base-600 py-2 px-4 sm:px-12 absolute z-50 top-0 bg-base-100'>
        {/* Set a width that matches the ProjectCard */}
        <p className='text-left w-80'>Total Properties: {projects.length}</p>
      </div>
      <div className='flex w-full flex-wrap border-2 border-whatsapp relative'>
        {projects.map((project) => (
          <div className='border-2 border-base-600 mx-auto m-2' key={project.projectId}>
            <ProjectCard
              image={project.image}
              name={project.name}
              price={project.price}
              bhk={project.bhk}
              location={project.location}
              domain={project.domain}
              priceUnit={project.priceUnit}
              projectId={project.projectId}
              isFav={project.isFav}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;

