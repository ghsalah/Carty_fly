import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full bg-white/50 backdrop-blur-md rounded-[28px] p-4 premium-shadow hover:premium-shadow-hover transition-all duration-500 relative group border border-black/5 flex flex-col gap-4">
      <div className="relative w-full overflow-hidden rounded-[20px] bg-[#f5f5f7] aspect-square">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 right-2 z-10 scale-90">
            <HeartIcon product={product} />
        </div>
      </div>

      <div className="flex flex-col">
        <Link to={`/product/${product._id}`}>
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-bold text-[#1d1d1f] truncate group-hover:text-[#0071e3] transition-colors">{product.name}</h2>
            <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-[#1d1d1f]">
                    ${product.price}
                </span>
                <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded-full">
                    {product.brand}
                </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
