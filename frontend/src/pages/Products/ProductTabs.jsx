import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <section className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:w-[250px] shrink-0 no-scrollbar">
        <button
          className={`flex-1 lg:flex-none text-left px-6 py-4 rounded-2xl whitespace-nowrap transition-all font-medium text-[15px] ${
            activeTab === 1 
              ? "bg-[#1d1d1f] text-white shadow-sm" 
              : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </button>
        <button
          className={`flex-1 lg:flex-none text-left px-6 py-4 rounded-2xl whitespace-nowrap transition-all font-medium text-[15px] ${
            activeTab === 2 
              ? "bg-[#1d1d1f] text-white shadow-sm" 
              : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </button>
        <button
          className={`flex-1 lg:flex-none text-left px-6 py-4 rounded-2xl whitespace-nowrap transition-all font-medium text-[15px] ${
            activeTab === 3 
              ? "bg-[#1d1d1f] text-white shadow-sm" 
              : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </button>
      </section>

      {/* Content Section */}
      <section className="flex-1">
        {activeTab === 1 && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e5e5ea] shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-[#1d1d1f]">Share your thoughts</h3>
            {userInfo ? (
              <form onSubmit={submitHandler} className="max-w-2xl">
                <div className="mb-6">
                  <label htmlFor="rating" className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                    Rating
                  </label>
                  <div className="relative">
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#f5f5f7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3] text-[#1d1d1f] appearance-none cursor-pointer"
                    >
                      <option value="">Select a rating</option>
                      <option value="1">1 - Inferior</option>
                      <option value="2">2 - Decent</option>
                      <option value="3">3 - Great</option>
                      <option value="4">4 - Excellent</option>
                      <option value="5">5 - Exceptional</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="comment" className="block text-[15px] font-medium text-[#1d1d1f] mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full px-4 py-3 border-0 bg-[#f5f5f7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3] text-[#1d1d1f] placeholder-[#86868b] resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-[#0071e3] hover:bg-[#005cbf] text-white font-medium py-3 px-8 rounded-full transition-colors inline-block"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <p className="text-[#86868b] text-[15px]">
                Please <Link to="/login" className="text-[#0071e3] hover:underline font-medium">sign in</Link> to write a review.
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-6">
            {product.reviews.length === 0 ? (
              <div className="bg-[#f5f5f7] p-8 rounded-3xl text-center text-[#86868b]">
                No reviews yet. Be the first to share your thoughts!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white p-6 rounded-3xl border border-[#e5e5ea] shadow-sm flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <strong className="text-[#1d1d1f] font-medium block text-[15px] mb-1">{review.name}</strong>
                        <Ratings value={review.rating} />
                      </div>
                      <span className="text-[#86868b] text-[12px]">
                        {review.createdAt.substring(0, 10)}
                      </span>
                    </div>

                    <p className="text-[#424245] text-[15px] leading-relaxed flex-grow">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id} className="flex justify-center">
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
