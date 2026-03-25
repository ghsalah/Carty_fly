import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full bg-white rounded-3xl p-3 shadow-sm hover:shadow-md transition-shadow duration-300 relative group border border-[#e5e5ea]">
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="pt-4 pb-2 px-2">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center text-[#1d1d1f]">
            <h2 className="text-[15px] font-medium truncate pr-2">{product.name}</h2>
            <span className="text-sm font-semibold bg-[#f5f5f7] px-2.5 py-1 rounded-full whitespace-nowrap">
              ${product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
