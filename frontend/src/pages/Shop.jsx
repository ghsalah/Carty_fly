import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        let filteredProducts = filteredProductsQuery.data;
        if (priceFilter) {
          filteredProducts = filteredProducts?.filter((product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          });
        }
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-6 py-8 md:px-12 w-full max-w-[1440px]">
      <div className="flex flex-col lg:flex-row gap-10 relative">
        <div className="w-full lg:w-[300px] flex-shrink-0 bg-white rounded-3xl p-6 shadow-sm border border-[#e5e5ea] static lg:sticky top-24 lg:self-start max-h-[350px] lg:max-h-[calc(100vh-120px)] overflow-y-auto z-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#d2d2d7] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="mb-8">
            <h2 className="text-[#1d1d1f] text-[17px] font-semibold mb-4 border-b border-[#e5e5ea] pb-2">
              Categories
            </h2>
            <div className="space-y-3">
              {categories?.map((c) => (
                <div key={c._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${c._id}`}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-[#0071e3] bg-white border-[#d2d2d7] rounded focus:ring-[#0071e3] cursor-pointer"
                  />
                  <label
                    htmlFor={`checkbox-${c._id}`}
                    className="ml-3 text-[15px] text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
                  >
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-[#1d1d1f] text-[17px] font-semibold mb-4 border-b border-[#e5e5ea] pb-2">
              Brands
            </h2>
            <div className="space-y-3">
              {uniqueBrands?.map((brand) => (
                <div className="flex items-center" key={brand}>
                  <input
                    type="radio"
                    id={`radio-${brand}`}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-[#0071e3] bg-white border-[#d2d2d7] focus:ring-[#0071e3] cursor-pointer"
                  />
                  <label
                    htmlFor={`radio-${brand}`}
                    className="ml-3 text-[15px] text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-[#1d1d1f] text-[17px] font-semibold mb-4 border-b border-[#e5e5ea] pb-2">
              Price Range
            </h2>
            <input
              type="text"
              placeholder="Max Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3] text-[#1d1d1f] placeholder-[#86868b] text-[15px] transition-all"
            />
          </div>

          <button
            className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-medium py-3 rounded-xl transition-colors"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>

        <div className="flex-1">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-2 md:mb-0">Shop All</h1>
            <span className="text-[#86868b] text-[15px] font-medium">{products?.length || 0} Products</span>
          </div>

          {products?.length === 0 ? (
            <div className="w-full flex justify-center py-20">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center sm:justify-items-start">
              {products?.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
