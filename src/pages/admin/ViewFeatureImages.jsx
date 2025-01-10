import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { useDispatch } from 'react-redux';
import { getFeatureImages, deleteFeatureImage } from '../../store/slices/featureImages.js';
import toast from 'react-hot-toast';

function ViewFeatureImages() {
  const [featureImages, setFeatureImages] = useState([]);
  const dispatch = useDispatch();

  const loadFeatureImages = () => {
    dispatch(getFeatureImages())
      .then((data) => {
        if (data?.payload?.success) {
          setFeatureImages(data.payload.images);
        } else {
          toast.error('Something went wrong');
        }
      });
  };

  useEffect(() => {
    loadFeatureImages();
  }, [dispatch]);

  const handleDeleteImage = async (imageId) => {
    dispatch(deleteFeatureImage(imageId))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success('Image Deleted Successfully');
          loadFeatureImages();
        } else {
          toast.error('Something Went Wrong, Try Again');
        }
        console.log(data)
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">View Feature Images</h1>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 overflow-y-auto">
          {featureImages.length > 0 ? (
            <div className="flex flex-wrap justify-start gap-6">
              {featureImages.map((image) => (
                <FeatureImageCard
                  key={image._id}
                  imageId={image._id}
                  image={image.image.url}
                  removeHandler={handleDeleteImage}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No feature images available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewFeatureImages;

const FeatureImageCard = ({ imageId, image, removeHandler }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
      {/* Image Display */}
      <div className="w-full h-48 mb-4 flex justify-center items-center">
        <img src={image} alt="Feature" className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Delete Button */}
      <div className="flex justify-center">
        <button
          onClick={() => removeHandler(imageId)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
