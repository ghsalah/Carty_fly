import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="w-[300px] flex flex-col bg-white rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative border border-[#f5f5f7] overflow-hidden group">
      <section className="relative overflow-hidden bg-[#fbfbfd]">
        <Link to={`/product/${p._id}`}>
          <span className="absolute top-3 left-3 bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold px-3 py-1 rounded-full z-10">
            {p?.brand}
          </span>
          <img
            className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${p._id}`} className="block w-2/3">
             <h5 className="text-[17px] font-semibold text-[#1d1d1f] leading-tight line-clamp-1 truncate">{p?.name}</h5>
          </Link>

          <p className="text-[#1d1d1f] font-semibold text-right">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-4 font-normal text-[#86868b] text-[13px] line-clamp-2">
          {p?.description}
        </p>

        <section className="flex justify-between items-center mt-auto">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center text-[14px] font-medium text-[#0071e3] hover:text-[#005bb5] transition-colors"
          >
            Learn More
            <svg
              className="w-3.5 h-3.5 ml-1 mt-[2px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-colors"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
