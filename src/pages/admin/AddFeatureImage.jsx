import React, { useState } from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { useDispatch } from 'react-redux'
import { addFeatureImage } from '../../store/slices/featureImages.js'
import toast from 'react-hot-toast';

const AddFeatureImage = () => {
  const [featureImage, setFeatureImage] = useState(null);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    setFeatureImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append("photo", featureImage)
     dispatch(addFeatureImage(formData))
     .then(data =>{
          if(data?.payload?.success){
               toast.success("Feature added successfully")
          }
          else{
             toast.error("Feature not added successfully")
          }
     })
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full items-center justify-center p-4">
        <div className="w-full md:w-2/5 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Add Feature Image</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Feature Image:</label>
              {featureImage ? (
                <div className="mb-4">
                  <img
                    src={URL.createObjectURL(featureImage)}
                    alt="Feature Preview"
                    className="w-full h-64 object-cover rounded-md"
                  />
                </div>
              ) : (
                <p className="text-gray-500">No image selected</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
            >
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeatureImage;
