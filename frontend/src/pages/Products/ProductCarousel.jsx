import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="w-full max-w-[700px] bg-white/40 backdrop-blur-xl rounded-[48px] premium-shadow p-8 overflow-hidden border border-white/20 animate-fade-in">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(({ image, _id, name, price, description }) => (
            <div key={_id} className="relative outline-none cursor-grab active:cursor-grabbing">
              <Link to={`/product/${_id}`}>
                <div className="relative w-full h-[400px] rounded-[36px] overflow-hidden bg-[#fbfbfd] mb-8 group">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </Link>

              <div className="px-2 text-left flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="flex-1">
                    <Link to={`/product/${_id}`}>
                    <h2 className="text-[32px] md:text-[38px] font-bold tracking-tight text-[#1d1d1f] mb-2 leading-tight">{name}</h2>
                    </Link>
                    <p className="text-[#86868b] text-base max-w-[450px] line-clamp-2 leading-relaxed">
                    {description}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[24px] font-bold text-[#1d1d1f] mb-3">${price}</span>
                    <Link 
                        to={`/product/${_id}`}
                        className="bg-[#1d1d1f] text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-[#000] transition-all transform hover:scale-105 active:scale-95"
                    >
                        Shop Now <AiOutlineArrowRight />
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
