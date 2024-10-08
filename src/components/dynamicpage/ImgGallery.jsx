import { useCallback, useState } from "react";
import { fileUrl } from "../../config/url";

const ImgGallery = ({ imagesArray, url, title }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const allImages = imagesArray.map((url) => `${fileUrl}${url}`);

  const openImageViewer = useCallback((index) => {
    // Uncomment to enable Google Analytics
    // ReactGA.initialize("G-FSJZ5HF909");
    // ReactGA.event({
    //   category: `construction_gallery ${title}`,
    //   action: "Construction Gallery Viewed",
    //   label: `${url}`,
    // });
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, [url, title]);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleNext = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + imagesArray.length) % imagesArray.length);
  };

  return (
    <div className="mt-2 flex flex-col w-full min-h-full">
      <div className="grid grid-cols-2 gap-2 w-full h-full">
        {imagesArray.map((file, index) => (
          <div
            key={index}
            className="w-full h-[150px] overflow-hidden relative cursor-pointer"
            onClick={() => openImageViewer(index)}
          >
            <img
              src={`${file}`}
              alt={`File Preview ${index + 1}`}
              className="w-full h-full object-cover "
            />
          </div>
        ))}
      </div>
      {isViewerOpen && (
        <div className="fixed inset-0 bg-base-600 bg-opacity-75 flex items-center justify-center z-50">
          <span className="absolute top-5 right-5 text-white cursor-pointer text-base-100 bg-base-600 p-1 px-3 rounded-full" onClick={closeImageViewer}>
            &times;
          </span>
          <button
            className="absolute left-5 text-base-100 text-2xl bg-base-600 p-1 px-3 rounded-full"
            onClick={handlePrev}
            disabled={imagesArray.length <= 1}
          >
            &#10094; {/* Left Arrow */}
          </button>
          <img
            src={`${imagesArray[currentImage]}`}
            className="max-w-full h-[50vh] sm:h-[70vh] rounded-lg"
            alt=""
          />
          <button
            className="absolute right-5 text-base-100 text-2xl bg-base-600 p-1 px-3 rounded-full"
            onClick={handleNext}
            disabled={imagesArray.length <= 1}
          >
            &#10095; {/* Right Arrow */}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImgGallery;