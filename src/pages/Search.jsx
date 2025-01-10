import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SearchProductCard from "../components/SearchProductCard.jsx";
import { fetchAllFilteredProducts } from '../store/slices/product.js'
import { brands } from "../config/config.js"
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from "../components/Loader.jsx";
const Search = () => {
  
  const { productList, isLoading, totalPage,error } = useSelector(state=> state.product);


  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();


 

  // useEffect for change of search,sort,price,cate
  useEffect(()=>{   
    console.log("state product list: "+ productList)
    const fetchProducts = ()=>{
      dispatch(fetchAllFilteredProducts({search,price:maxPrice,brand: brand.toLowerCase(),sort,page}))
    }
    const fetchProudctId = setTimeout(fetchProducts,1000) ;
  
    return ()=>{
         clearTimeout(fetchProudctId);
    }
   
  },[search,page,sort, maxPrice,brand,page]);

  // for managing the error
  useEffect(()=>{
      if(error) toast.error(error)
  },[error])

  


  const isPrevPage = page > 1;
  const isNextPage = page < totalPage;



  return (
    <div className="flex flex-row p-8 min-h-screen">
      <aside className="w-72 shadow-md p-4"> {/* Decreased width of filter container */}
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <h4 className="font-semibold">Sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Max Price: {maxPrice}</h4>
          <input
            type="range"
            min={100}
            max={10000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Brands</h4>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">ALL</option>
            {Array.from(new Set(brands.map(brands => brands.name))).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </aside>
      
      <main className="flex-1 px-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

       

       {isLoading && <Loader /> }

       {!isLoading && productList.length === 0 ? (< NoProductsFound />)
        :
        (<div className="flex flex-wrap gap-5 overflow-y-auto h-[60vh] scrollbar-hidden w-full">
          {productList.map(({_id,photos,name,salePrice,price,description}) => (
             <SearchProductCard
               key={_id}
               productId={_id}
               image={photos[0].url}
               name={name}
               salePrice={salePrice}
               description={description}
               originalPrice={price}
             />
          ))}
        </div>)
       }


        {totalPage > 1 && (
          <div className="flex justify-between mt-4">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className={`p-2 rounded ${!isPrevPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
            >
              Prev
            </button>
            <span>
              {page} of {totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className={`p-2 rounded ${!isNextPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;



const NoProductsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-2xl font-semibold mb-4">No Products Found</h1>
      <p className="text-gray-500 mb-4">
        Oops! It seems there are no products available.
      </p>
      <Link 
        to="/" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

