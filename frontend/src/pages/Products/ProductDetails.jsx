import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaChevronLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-6 py-8 md:px-12 w-full max-w-[1200px]">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-[#86868b] hover:text-[#1d1d1f] font-medium text-[15px] transition-colors"
        >
          <FaChevronLeft className="mr-2" size={14} /> Back to Products
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader /></div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col gap-12">
          {/* Main Top Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left: Image Box */}
            <div className="w-full lg:w-1/2 relative bg-[#f5f5f7] rounded-3xl p-8 flex justify-center items-center overflow-hidden min-h-[300px] lg:min-h-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[400px] max-h-[400px] object-contain drop-shadow-sm mix-blend-multiply"
              />
              <HeartIcon product={product} />
            </div>

            {/* Right: Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-xs font-bold text-[#86868b] uppercase tracking-wider mb-2">
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <div className="text-[40px] leading-none font-bold text-[#1d1d1f] mb-6">
                ${product.price}
              </div>

              <p className="text-[15px] text-[#424245] mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Grid of stats */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-white p-6 rounded-2xl border border-[#e5e5ea] mb-8 shadow-sm">
                <div className="flex items-center text-[14px]">
                  <div className="bg-[#f5f5f7] p-2 rounded-full mr-3"><FaStore className="text-[#1d1d1f]" /></div>
                  <span className="text-[#86868b] w-16">Brand:</span>
                  <span className="font-medium text-[#1d1d1f] ml-2 truncate">{product.brand}</span>
                </div>
                <div className="flex items-center text-[14px]">
                  <div className="bg-[#f5f5f7] p-2 rounded-full mr-3"><FaStar className="text-rose-500" /></div>
                  <span className="text-[#86868b] w-16">Rating:</span>
                  <span className="font-medium text-[#1d1d1f] ml-2">{product.rating ? Math.round(product.rating * 10) / 10 : 0}</span>
                </div>
                <div className="flex items-center text-[14px]">
                  <div className="bg-[#f5f5f7] p-2 rounded-full mr-3"><FaBox className="text-[#1d1d1f]" /></div>
                  <span className="text-[#86868b] w-16">Stock:</span>
                  <span className="font-medium text-[#1d1d1f] ml-2">{product.countInStock}</span>
                </div>
                <div className="flex items-center text-[14px]">
                  <div className="bg-[#f5f5f7] p-2 rounded-full mr-3"><FaShoppingCart className="text-[#1d1d1f]" /></div>
                  <span className="text-[#86868b] w-16">Sold:</span>
                  <span className="font-medium text-[#1d1d1f] ml-2">{product.quantity || 0}</span>
                </div>
                <div className="flex items-center text-[14px] col-span-2">
                  <div className="bg-[#f5f5f7] p-2 rounded-full mr-3"><FaClock className="text-[#1d1d1f]" /></div>
                  <span className="text-[#86868b] w-16">Added:</span>
                  <span className="font-medium text-[#1d1d1f] ml-2">{moment(product.createAt).fromNow()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {product.countInStock > 0 ? (
                  <div className="flex items-center w-full sm:w-auto bg-[#f5f5f7] rounded-xl border border-[#e5e5ea] overflow-hidden">
                    <span className="px-4 text-[#86868b] font-medium text-[15px]">Qty</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="bg-transparent text-[#1d1d1f] font-medium px-4 py-3.5 pr-8 focus:outline-none cursor-pointer w-full"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="w-full sm:w-auto px-6 py-3.5 bg-[#f5f5f7] text-[#86868b] font-medium rounded-xl text-center border border-[#e5e5ea]">
                    Out of Stock
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`w-full sm:flex-1 py-3.5 px-6 rounded-xl font-medium text-[17px] transition-colors flex justify-center items-center ${
                    product.countInStock === 0 
                      ? 'bg-[#e5e5ea] text-[#86868b] cursor-not-allowed' 
                      : 'bg-[#0071e3] hover:bg-[#005cbf] text-white'
                  }`}
                >
                  {product.countInStock === 0 ? "Unavailable" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section: Tabs / Reviews */}
          <div className="mt-8 border-t border-[#e5e5ea] pt-12">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
