import React, { useState, useRef, useEffect } from 'react';
import { fileUrl } from '../../config/url';
const RenderCarousel = ({ file }) => {
 const [currentIndex, setCurrentIndex] = useState(0);
    const [currentViewerIndex, setCurrentViewerIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === file.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? file.length - 1 : prevIndex - 1
        );
    };

    // Viewer Navigation Functions
    const goToNextViewer = () => {
        setCurrentViewerIndex((prevIndex) =>
            prevIndex === file.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevViewer = () => {
        setCurrentViewerIndex((prevIndex) =>
            prevIndex === 0 ? file.length - 1 : prevIndex - 1
        );
    };

    const openImageViewer = (index) => {
        setCurrentViewerIndex(index); // Set the viewer index when opening
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
    };

    // Adjust the container width dynamically on load and on window resize
    useEffect(() => {
        const adjustWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        adjustWidth();
        window.addEventListener('resize', adjustWidth);
        return () => {
            window.removeEventListener('resize', adjustWidth);
        };
    }, []);

  return (
   <>
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden" // Set to full width and hide overflow
      style={{ height: 'auto' }}
    >
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * containerWidth}px)`,
          width: `${file.length * 100}%`, // Set width according to number of images
        }}
      >
        {file.map((image, index) => (
          <img
            key={index}
            src={`${image}`}
            alt={`file item ${index + 1}`}
            className="object-contain cursor-pointer" // Ensure the full image is visible
            style={{
              width: `${containerWidth}px`, // Set image width to match container width
              height: 'auto',
            }}
             onClick={() => openImageViewer(index)}
          />
        ))}
      </div>
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-base-600 text-base-100 p-2 px-3.5 text-2xl rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-base-600 text-base-100 p-2 px-3.5 text-2xl rounded-full"
      >
        &#10095;
      </button>
    </div>
    {isViewerOpen && (
                <div className="fixed inset-0 bg-base-600 bg-opacity-75 flex items-center justify-center z-50">
                    <span
                        className="absolute top-5 right-5 text-white cursor-pointer text-base-100 bg-base-600 p-1 px-3.5 text-4xl rounded-full"
                        onClick={closeImageViewer}
                    >
                        &times;
                    </span>
                    <button
                        className="absolute left-5 text-base-100 bg-base-600 p-2 px-3.5 text-2xl rounded-full"
                        onClick={goToPrevViewer}
                        disabled={file.length <= 1}
                    >
                        &#10094; {/* Left Arrow */}
                    </button>
                   <div className="border-2 border-base-500 w-[100vh]">
                     <img
                        src={`${file[currentViewerIndex]}`}
                        className="w-full rounded-lg"
                        alt=""
                    />
                   </div>
                    <button
                        className="absolute right-5 text-base-100 text-2xl bg-base-600 p-2 px-3.5 rounded-full"
                        onClick={goToNextViewer}
                        disabled={file.length <= 1}
                    >
                        &#10095; {/* Right Arrow */}
                    </button>
                </div>
            )}
   </>
  );
};

export default RenderCarousel;