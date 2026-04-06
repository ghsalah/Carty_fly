import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="w-full relative overflow-hidden">
      {!keyword ? (
        <div className="pt-24 pb-12">
           <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                <Header />
           </div>
        </div>
      ) : null}
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
                <Loader />
            </div>
        ) : isError ? (
            <Message variant="danger">
            {isError?.data?.message || isError.error}
            </Message>
        ) : (
            <div className="mt-8 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="animate-fade-in">
                    <h1 className="text-[42px] md:text-[56px] font-bold tracking-tight text-[#1d1d1f] leading-tight mb-4">
                    The Modern <br />
                    <span className="text-[#0071e3]">Tech Essentials</span>
                    </h1>
                    <p className="text-[#86868b] text-[19px] max-w-[500px]">
                        Curated collection of the finest gadgets and lifestyle products designed for the future.
                    </p>
                </div>
                <Link
                to="/shop"
                className="bg-[#0071e3] text-white text-[15px] font-semibold rounded-full py-4 px-10 hover:bg-[#0077ED] transition-all transform hover:scale-105 active:scale-95 premium-shadow flex items-center gap-2"
                >
                Explore Full Shop <AiOutlineArrowRight />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                {data.products.map((product, idx) => (
                    <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                        <Product product={product} />
                    </div>
                ))}
            </div>
            
            <div className="mt-20 text-center">
                 <Link 
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[#1d1d1f] font-bold text-[18px] hover:text-[#0071e3] transition-colors group"
                 >
                    View more products <span className="transform transition-transform group-hover:translate-x-2">→</span>
                 </Link>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;
