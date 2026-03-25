import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="px-6 py-12 md:px-12 lg:px-24 w-full mx-auto max-w-[1440px]">
      {!keyword ? <Header /> : null}
      
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <div className="mt-12 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-[#d2d2d7] pb-6">
            <h1 className="text-4xl md:text-[40px] font-semibold tracking-tight text-[#1d1d1f] text-center md:text-left mb-6 md:mb-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-[#0071e3] text-white text-[15px] font-normal rounded-full py-2 px-6 hover:bg-[#0077ED] transition-colors"
            >
              Shop All
            </Link>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-between gap-x-4 gap-y-10">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
