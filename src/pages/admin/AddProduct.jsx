import React, { useState } from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import { addNewProduct } from '../../store/slices/admin/AdminProduct.js';
import { useSelector } from 'react-redux';

const initialProductValue = { 
  name: '',
  salePrice: '',
  price: '',
  brand: '',
  stock: '',
  category: '',
  description: '',
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialProductValue);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if an image has been selected
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    // Create FormData object and append form data
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('salePrice', product.salePrice);
    formData.append('price', product.price);
    formData.append('brand', product.brand);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('photos', image);

    setIsSubmitting(true);

    // Dispatch the async thunk
    dispatch(
      addNewProduct(formData)
    ).then((response) => {
        if (response.payload?.success) {
          setProduct(initialProductValue);
          setImage(null);
          toast.success('Product added successfully!');
        }
        else {
          toast.error('Failed to add product');
        }
        setIsSubmitting(false);
      })
  };

  return (
    <div className="flex h-screen bg-gray-100 p-1">
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="flex w-full h-full">
        {/* Unified Container */}
        <div className="flex flex-col md:flex-row w-full bg-white shadow-md rounded-md overflow-hidden">
          {/* Left Section (Image and Upload) */}
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-300">
            <h3 className="text-lg font-semibold mb-4 text-center">Product Image</h3>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Product"
                className="w-full h-64 object-cover rounded-md"
              />
            ) : (
              <p className="text-gray-500 text-center">No image selected</p>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-4 block w-full border border-gray-300 rounded p-2"
              accept="image/*"
            />
          </div>

          {/* Right Section (Form) */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-full">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Add Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Sale Price:</label>
                <input
                  type="number"
                  name="salePrice"
                  value={product.salePrice}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Brand:</label>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock:</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  required
                />
              </div>

              {
                isSubmitting ? <div className='text-center'> submiting product ...</div>
                :
                (
                  <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
                >
                  Add Product
                </button>
                )
              }
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
