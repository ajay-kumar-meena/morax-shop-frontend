import ProductBrandSlider from '../components/sliders/ProductBrandSlider'
import  LastestProductSlider from '../components/sliders/LastestProductSlider'
import FeatureSlider from '../components/sliders/FeatureSlider'
import { useState, useEffect } from 'react';
import  { useDispatch } from 'react-redux'
import { getFeatureImages } from '../store/slices/featureImages.js';
const Home = ()=>{
    
    const[featureImages,setFeatureImages] = useState([]);
      
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getFeatureImages())
        .then(data => {
              if(data?.payload?.success){
                  setFeatureImages(data.payload.images)
              }
        })
    },[]);

    return (<>
    <div className="w-[95%] mx-auto my-5">
        <FeatureSlider images={featureImages} />
        {/* top Brands Product*/}
        <div className="flex flex-col my-5">
            <h2 className='mx-2 text-bold text-3xl'>Top Brand's</h2>
            <ProductBrandSlider />
        </div>


        <div className="flex flex-col my-5">
            <h2 className='mx-2 text-bold text-3xl'>Lastest Products</h2>
            <LastestProductSlider />
        </div>

    </div>
    </>)
};


export default Home;