import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-rose-500 rounded-full shadow-sm">
          {favoriteCount}
        </span>
      )}
    </>
  );
};

export default FavoritesCount;
