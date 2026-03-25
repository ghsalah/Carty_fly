import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto px-6 py-8 md:px-12 w-full max-w-[1440px]">
      <div className="mb-10 text-center md:text-left border-b border-[#e5e5ea] pb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-2">
          Favorite Products
        </h1>
        <p className="text-[#86868b] text-[15px]">
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-[#e5e5ea]">
          <h2 className="text-2xl font-medium text-[#1d1d1f] mb-3">No favorites yet</h2>
          <p className="text-[#86868b] text-center max-w-md">
            Click the heart icon on any product to save it to your favorites list.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center sm:justify-items-start">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
