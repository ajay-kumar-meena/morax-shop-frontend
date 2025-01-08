import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { useDispatch } from 'react-redux';
import { fetchAllProducts, deleteProduct } from '../../store/slices/admin/AdminProduct.js';
import toast from 'react-hot-toast';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();


  const loadProducts = () => {
    dispatch(fetchAllProducts())
      .then((data) => {
        if (data?.payload?.success) {
          setProducts(data.payload.products);
        } else {
          toast.error('Something went wrong. Try again');
        }
      })
  };

  const handleDeleteProduct = (productId) => {
    dispatch(
      deleteProduct(productId)
    ).then(data => {
      if (data?.payload?.success) {
        toast.success('Product deleted successfully');
        loadProducts();
      } else {
        cosole.log("Data Is : ", data);
      }
    })
  };

  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">View Products</h1>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 overflow-y-auto h-full max-h-[80vh]">
          {products.length > 0 ? (
            <div className="flex flex-col gap-4">
              {products.map(({
                _id,
                photos = [], 
                name = "Unknown Product",
                salePrice,
                stock = 0,
      
              }) => (
                <ProductCart
                  key={_id}
                  productId={_id}
                  name={name}
                  salePrice={salePrice}
                  stock={stock}
                  removeProductHandler={handleDeleteProduct}
                  photo={photos[0].url}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No products available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;

const ProductCart = ({ productId, name, salePrice, photo, stock, removeProductHandler }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-300 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300">
      {/* Product Details */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        {/* Id */}
        <div className="text-lg font-semibold text-gray-700">#{productId}</div>

        {/* Photo */}
        {photo && (
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img
              src={photo}
              alt={`${name}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Name */}
        <div className="text-lg font-semibold text-gray-700">{name}</div>

        {/* Sale Price */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Price:</span> ${salePrice.toFixed(2)}
        </div>

        {/* Stock */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Stock:</span> {stock}
        </div>
      </div>

      {/* Delete Button */}
      <div className="mt-4 sm:mt-0">
        <button
          onClick={() => removeProductHandler(productId)}
          className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
