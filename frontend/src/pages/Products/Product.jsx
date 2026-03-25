import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[280px] p-4 bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 ease-in-out relative flex flex-col items-center group mb-6 mx-auto sm:mx-0">
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="pt-5 pb-2 w-full text-center">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-1 truncate px-2">
            {product.name}
          </h2>
          <p className="text-[#86868b] font-normal text-sm">
            $ {product.price}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Product;
