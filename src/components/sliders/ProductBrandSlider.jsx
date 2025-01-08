import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from '../../config/config.js'
import { brands } from '../../config/config.js'

const ProductBrandSlider = () => {
   
    return (
        <div className="w-full mx-auto">
            <div className="mt-1">
                <Slider {...sliderSettings}>
                    {brands.map((brand,idx) => (
                       <div key={idx} className="bg-indigo-200 text-black rounded-xl p-4">
                       <div className="flex flex-col items-center justify-center gap-4">
                           {/* Rectangular Image */}
                           <img src={brand.imgUrl} className="h-56 w-80 object-fit rounded-md" alt={brand.brand} />
                           
                           {/* Brand Name */}
                           <p className="text-xl font-semibold">{brand.name}</p>
                           
                           {/* Styled Button */}
                           <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                               View More
                           </button>
                       </div>
                   </div>   
                    ))}
                </Slider>
            </div>
        </div>
    );
}


export default ProductBrandSlider;
