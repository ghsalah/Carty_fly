import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { AiOutlineArrowRight } from "react-icons/ai";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[300px] p-5 bg-white/60 backdrop-blur-md rounded-[32px] border border-black/5 premium-shadow hover:premium-shadow-hover transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex flex-col group mb-8 mx-auto sm:mx-0 animate-fade-in">
      <div className="relative w-full overflow-hidden rounded-[24px] bg-[#f5f5f7] aspect-square">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-4 right-4 z-10">
          <HeartIcon product={product} />
        </div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
             <Link 
                to={`/product/${product._id}`}
                className="bg-white/90 backdrop-blur-md text-[#1d1d1f] px-6 py-2.5 rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 premium-shadow flex items-center gap-2"
             >
                View Details <AiOutlineArrowRight />
             </Link>
        </div>
      </div>

      <div className="pt-6 pb-2 w-full flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <Link to={`/product/${product._id}`} className="flex-1">
            <h2 className="text-[17px] font-bold text-[#1d1d1f] transition-colors group-hover:text-[#0071e3] line-clamp-1 pr-2">
                {product.name}
            </h2>
            </Link>
            <p className="text-[#1d1d1f] font-bold text-[17px] whitespace-nowrap">
                ${product.price}
            </p>
        </div>
        
        <p className="text-[#86868b] text-[13px] line-clamp-2 mb-4 leading-relaxed h-[38px]">
            {product.description}
        </p>
        
        <Link 
            to={`/product/${product._id}`}
            className="mt-auto text-[14px] font-semibold text-[#0071e3] flex items-center gap-1 group/link"
        >
            Explore <span className="transform transition-transform group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Product;
