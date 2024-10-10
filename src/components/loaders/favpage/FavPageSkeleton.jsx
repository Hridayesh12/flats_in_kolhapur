import React from 'react'
import FavCardSkeleton from './FavCardSkeleton'

const FavPageSkeleton = () => {
    const favListing = [1,2,3,4,5,6];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
      {favListing.map((favIndex)=>(
        <FavCardSkeleton key={favIndex}/>
      ))}
    </div>
  )
}

export default FavPageSkeleton
