import React from 'react'

const FavCardSkeleton = () => {
  return (
    <div className="bg-base-100 shadow-xl flex border-[1px] border-base-300 animate-pulse h-[110px]" >
    <div className="w-[20%] h-[100%] bg-base-700">
       {/* Img Card */}
    </div>

    <div className='flex flex-col items-start justify-between p-2 w-[42%]'>
      <div className='flex flex-col items-start w-full gap-1'>
      <p className='w-[25%] border-2 border-base-700 h-5 bg-base-700'></p>
      <p className='w-[20%] border-2 border-base-700 h-2 bg-base-700'></p>
      </div>
      <div className='flex flex-col items-start w-full gap-1'>
      <p className='w-[25%] border-2 border-base-700 h-5 bg-base-700'></p>
      <p className='w-[40%] border-2 border-base-700 h-2 bg-base-700'></p>
      </div>
      
    </div>

    <div className='flex flex-col items-start justify-around p-2 w-[42%] bg-base-600 text-base-100'>
      <p className='border-2 border-base-100 h-5 bg-base-100 w-[70%]'></p>
      <p className='h-4 bg-base-100 w-[40%]'></p>
     <div className='flex flex-col w-full gap-1'>
     <p
          className='h-2 w-full bg-base-100 flex flex-wrap overflow-hidden text-ellipsis group relative'
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
        </p>
        <p
          className='h-2 w-full bg-base-100 flex flex-wrap overflow-hidden text-ellipsis group relative'
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
        </p>
     </div>
    </div>

</div>
  )
}

export default FavCardSkeleton
