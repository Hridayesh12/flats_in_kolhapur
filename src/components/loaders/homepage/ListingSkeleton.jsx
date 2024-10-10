import React from 'react'
import ProjectCardSkeleton from './ProjectCardSkeleton'

const ListingSkeleton = () => {
  const listing = [1,2,3,4,5,6];
  return (
    <div className="flex w-screen flex-wrap relative gap-2 px-0 sm:px-8 mx-auto">
      {listing?.map((index)=>(
        <div className=' mx-auto'>

        <ProjectCardSkeleton key={index}/>
        </div>
      ))}
    </div>
  )
}

export default ListingSkeleton
