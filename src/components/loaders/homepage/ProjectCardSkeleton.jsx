import React from 'react'
import { assetsUrl } from '../../../config/url'

const ProjectCardSkeleton = () => {
  return (
    <div 
    style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
      className="w-[320px] sm:w-[340px] flex flex-col items-center justify-center bg-base-200 relative mx-auto my-5"
    >
  <div className="animate-pulse flex w-full h-full flex-col">
  <div className="h-[320px] sm:h-[340px] w-[320px] sm:w-[340px] bg-base-700">
      </div>
      <div
        style={{ boxShadow: "0px 2px 5px 0px #00000040" }}
        className="w-full bg-base-100 flex flex-col items-start py-3 pl-2 gap-2 h-full"
      >
        <div className='w-[60%] h-6 bg-base-500'></div>
        <div className="w-full flex items-start justify-around">
          <div className=" max-w-[55%] min-w-[55%] flex flex-wrap">
            <p className="w-[60%] h-5 bg-base-700"></p>
          </div>
          <p className="max-w-[45%] min-w-[45%] flex items-end flex-wrap">
          <p className="w-[60%] h-5 bg-base-700"></p>
          </p>
        </div>
        <div className="w-full flex items-end justify-around">
          <p className="text-base leading-none max-w-[50%] min-w-[55%] flex items-end flex-wrap">
            <p className='w-[70%] h-6 bg-base-500'></p>
          </p>
          <div className="flex items-center gap-2 min-h-full max-w-[45%] min-w-[45%]">
                <img
                  src={`${assetsUrl}/assets/svgs/project_card_icons/empty_heart.svg`}
                  alt="Heart"
                  className="w-4"
                />
              {/* Share Button */}
              
                <img
                  src={`${assetsUrl}/assets/svgs/project_card_icons/share.svg`}
                  alt="Share"
                  className="w-[16px]"
                />
             
          </div>
        </div>






        </div>
        
  </div>
</div>
  )
}

export default ProjectCardSkeleton
