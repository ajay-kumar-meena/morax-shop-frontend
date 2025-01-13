import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../ProductCard.jsx'
import { sliderSettings } from '../../config/config.js'

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../store/slices/cart.js";
import toast from "react-hot-toast";

import {
    getlatestProducts
} from '../../store/slices/product.js'




const LastestProductSlider = () => {
    const[latestproducts,setLatestProducts] = useState([]);
    const[loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    const { user } = useSelector(state=> state.auth);
    sliderSettings.slidesToShow = 4;
    sliderSettings.slidesToScroll = 4;

    const addCartHandler = async(productId, quantity) => {
        
       if(user){
           const userId = user._id;
           dispatch(
            addToCart({userId, productId, quantity})
            ).then(data =>{
            if(data?.payload.success){
                  toast.success("Add Item successfully")
            }
            else{
                 toast.error(data?.payload.message);
            }
         })
       }
       
    }

    useEffect(()=>{    
        dispatch(
            getlatestProducts()
        ).then(data=>{
           if(data?.payload?.success){
               setLatestProducts(data.payload.products)
               setLoading(false);
           } 
        })
    },[]);


    return (
        <div className="w-full mx-auto">
            {loading &&  (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                    </div>
                </div>
            )}

            {loading && latestproducts.length === 0 ?
                (
                    <div> Products Not found </div>
                ):
                (<div className="mt-1">
                    <Slider {...sliderSettings}>
                        {latestproducts.map(({ _id, name, photos, description, stock, salePrice, price }) => (
                            <ProductCard
                                key={_id}
                                productId={_id}
                                name={`${name.substring(0,35)} ....`}
                                image={photos[0]?.url} 
                                stock={stock}
                                salePrice={salePrice}
                                price={price}
                                description={`${description.substring(0,20)} ...`}
                                addCartHandler={addCartHandler}
                            />
                        ))}
                    </Slider>
                </div>
            )} 
        </div>
    );
}


export default LastestProductSlider;



{/* <div className="mt-1">
   <Slider {...sliderSettings}>
     {latestproducts.map(({_id,name,photos,description,stock,salePrice,price }) => (
       <ProductCard 
         key={_id}
         productId={_id}
         name={name}
         image={photos[0].url}
         stock={stock}
         salePrice={salePrice}
         price={price}
         description={description}
         onClickHandler={redirectProduct}
         addCartHandler={addCartHandler}
      />
   ))}
</Slider>
</div> */}