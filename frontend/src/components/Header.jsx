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
    return <h1 className="text-center py-10 text-red-500 font-bold">Failed to load content</h1>;
  }

  return (
    <div className="flex flex-col xl:flex-row justify-between w-full mb-20 gap-12 items-center xl:items-start animate-fade-in">
      <div className="w-full xl:w-1/2 flex justify-center">
        <ProductCarousel />
      </div>
      <div className="hidden lg:grid w-full xl:w-1/2 grid-cols-2 gap-8">
        {data.slice(0, 4).map((product) => (
          <div key={product._id} className="animate-slide-in" style={{ animationDelay: `${data.indexOf(product) * 100}ms` }}>
            <SmallProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
