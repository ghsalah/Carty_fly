import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <div className="w-full max-w-[600px] bg-white rounded-[40px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 overflow-hidden border border-[#f5f5f7]">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(({ image, _id, name, price, description }) => (
            <div key={_id} className="relative outline-none cursor-grab active:cursor-grabbing pb-8">
              <Link to={`/product/${_id}`}>
                <div className="relative w-full h-[350px] rounded-[32px] overflow-hidden bg-[#fbfbfd] mb-6">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </Link>

              <div className="px-4 text-center">
                <Link to={`/product/${_id}`}>
                  <h2 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">{name}</h2>
                  <p className="text-[#86868b] font-medium text-[17px] mb-4"> $ {price}</p>
                </Link>
                <p className="text-[#1d1d1f] text-sm opacity-80 max-w-[400px] mx-auto line-clamp-2">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
