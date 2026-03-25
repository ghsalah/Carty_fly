import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="flex flex-col xl:flex-row justify-between w-full mb-12 gap-8 items-center xl:items-start">
      <div className="w-full xl:w-2/5 flex justify-center">
        <ProductCarousel />
      </div>
      <div className="hidden md:grid w-full xl:w-3/5 grid-cols-2 gap-6 pb-8">
        {data.map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Header;
