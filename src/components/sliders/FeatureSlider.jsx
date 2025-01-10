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
      {images.length > 1 ? (
        <div className="w-[100%] mx-auto h-3/6">
          <div className="mt-1">
            <Slider {...settings}>
              {images.map((d) => (
                <div key={d.image.url} className="bg-white text-black rounded-xl">
                  {/* Image section */}
                  <div className="h-70 bg-indigo-500 flex justify-center items-center rounded-t-xl">
                    <img
                      src={d.image.url}
                      className="h-full w-full"
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
