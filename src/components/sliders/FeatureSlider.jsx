import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeatureSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {images.length > 0 ? (
        <div className="w-[100%] mx-auto">
          <div className="mt-1">
            <Slider {...settings}>
              {images.map((d) => (
                <div key={d.name} className="bg-white text-black rounded-xl">
                  {/* Image section */}
                  <div className="h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl">
                    <img
                      src={d.img}
                      className="h-44 w-44 rounded-full"
                      alt="slider-img"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
         null
      )}
    </>
  );
};

export default FeatureSlider;
