import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFilteredProducts } from "../../redux/slices/filtersSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { AuthBtn } from "../AuthBtn";

const MobileCover = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    categories: [],
    ratings: [],
    brands: [],
    sizes: [],
    priceRange: [0, 100000],
    discountRange: [0, 100],
    stockAvailability: false,
  });
  const [error, setError] = useState("");

  const categories = useSelector((state) => state.filterParameter.categories);
  const brands = useSelector((state) => state.filterParameter.brands);
  const sizes = useSelector((state) => state.filterParameter.sizes);

  const handleCategory = (event) => {
    const category = JSON.parse(event.target.value);
    setFilters((prevFilters) => {
      const newCategories = event.target.checked
        ? [...prevFilters.categories, category]
        : prevFilters.categories.filter((cat) => cat._id !== category._id);
      return { ...prevFilters, categories: newCategories };
    });
  };

  const handleBrand = (event) => {
    const brand = JSON.parse(event.target.value);
    setFilters((prevFilters) => {
      const newBrands = event.target.checked
        ? [...prevFilters.brands, brand]
        : prevFilters.brands.filter((br) => br._id !== brand._id);
      return { ...prevFilters, brands: newBrands };
    });
  };

  const handleSize = (event) => {
    const size = JSON.parse(event.target.value);
    setFilters((prevFilters) => {
      const newSizes = event.target.checked
        ? [...prevFilters.sizes, size]
        : prevFilters.sizes.filter((sz) => sz._id !== size._id);
      return { ...prevFilters, sizes: newSizes };
    });
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value, 10);
    setFilters((prevFilters) => {
      const newRatings = event.target.checked
        ? [...prevFilters.ratings, rating]
        : prevFilters.ratings.filter((rate) => rate !== rating);
      return { ...prevFilters, ratings: newRatings };
    });
  };

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();
    filters.categories.forEach((cat) =>
      queryParams.append("category", cat.name)
    );
    filters.ratings.forEach((rating) => queryParams.append("rating", rating));
    filters.brands.forEach((br) => queryParams.append("brand", br.name));
    filters.sizes.forEach((size) => queryParams.append("size", size.name));
    if (filters.priceRange) {
      queryParams.append("priceRange", filters.priceRange.join(","));
    }
    if (filters.discountRange) {
      queryParams.append("discountRange", filters.discountRange.join(","));
    }
    if (filters.stockAvailability) {
      queryParams.append("stockAvailability", filters.stockAvailability);
    }

    navigate(`/filter?${queryParams.toString()}`);
    dispatch(fetchFilteredProducts(filters));
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sm:hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="absolute top-4 right-4">
        <button
          className="text-white text-xl focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-4/5 w-full">
        <div className="bg-[bisque] p-4 rounded-lg w-full h-full">
          <p className="text-center text-xl font-bold mb-2 border-b-2 border-black">
            Filters
          </p>
          <div className="flex gap-4 h-[90%]">
            <div className="filter-dashboard overflow-y-scroll h-[90%]">
              <div className="categories-filter">
                <label>Categories</label>
                <div className="category-options-container bg-white p-2 rounded flex flex-wrap gap-2 h-16 overflow-y-scroll">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id={category.name}
                        name="category"
                        value={JSON.stringify(category)}
                        checked={filters.categories?.some(
                          (cat) => cat._id === category._id
                        )}
                        onChange={handleCategory}
                      />
                      <label htmlFor={category.name}>{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="brand-filter">
                <label>Brands</label>
                <div className="brand-options-container bg-white p-2 rounded flex flex-wrap gap-2 h-16 overflow-y-scroll">
                  {brands.map((brand, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id={brand.name}
                        name="category"
                        value={JSON.stringify(brand)}
                        checked={filters.brands?.some(
                          (br) => br._id === brand._id
                        )}
                        onChange={handleBrand}
                      />
                      <label htmlFor={brand.name}>{brand.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sizes-filter">
                <label>Size</label>
                <div className="size-options-container bg-white p-2 rounded flex flex-wrap gap-2 h-16 overflow-y-scroll">
                  {sizes.map((size, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id={size.name}
                        name="size"
                        value={JSON.stringify(size)}
                        checked={filters.sizes?.some(
                          (sz) => sz._id === size._id
                        )}
                        onChange={handleSize}
                      />
                      <label htmlFor={size.name}>{size.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label>Price Range</label>
                <div className="bg-white p-2 rounded">
                  <Slider
                    range
                    min={0}
                    max={100000}
                    defaultValue={[0, 1000]}
                    onChange={(value) =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        priceRange: value,
                      }))
                    }
                    value={filters.priceRange || [0, 100000]}
                    className="bg-white p-2 rounded"
                  />
                  <div className="flex justify-between mt-2">
                    <input
                      type="number"
                      value={filters.priceRange ? filters.priceRange[0] : 0}
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          priceRange: [
                            parseInt(e.target.value, 10) || 0,
                            prevFilters.priceRange
                              ? prevFilters.priceRange[1]
                              : 1000,
                          ],
                        }))
                      }
                      min={0}
                      max={filters.priceRange ? filters.priceRange[1] : 1000}
                      className="mr-2 p-1 border rounded"
                    />
                    <input
                      type="number"
                      value={filters.priceRange ? filters.priceRange[1] : 1000}
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          priceRange: [
                            prevFilters.priceRange
                              ? prevFilters.priceRange[0]
                              : 0,
                            parseInt(e.target.value, 10) || 1000,
                          ],
                        }))
                      }
                      min={filters.priceRange ? filters.priceRange[0] : 0}
                      max={1000}
                      className="ml-2 p-1 border rounded"
                    />
                  </div>
                  {/* <div>
                        {filters.priceRange
                          ? `${filters.priceRange[0]} - ${filters.priceRange[1]}`
                          : "0 - 1000"}
                      </div> */}
                </div>
              </div>
              <div>
                <label>Discount%</label>
                <div className="bg-white p-2 rounded">
                  <Slider
                    range
                    min={0}
                    max={100}
                    defaultValue={[0, 100]}
                    onChange={(value) =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        discountRange: value,
                      }))
                    }
                    value={filters.discountRange || [0, 100]}
                  />
                  <div className="flex justify-between mt-2">
                    <input
                      type="number"
                      value={
                        filters.discountRange ? filters.discountRange[0] : 0
                      }
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          discountRange: [
                            parseInt(e.target.value, 10) || 0,
                            prevFilters.discountRange
                              ? prevFilters.discountRange[1]
                              : 100,
                          ],
                        }))
                      }
                      min={0}
                      max={
                        filters.discountRange ? filters.discountRange[1] : 100
                      }
                      className="mr-2 p-1 border rounded"
                    />
                    <input
                      type="number"
                      value={
                        filters.discountRange ? filters.discountRange[1] : 100
                      }
                      onChange={(e) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          discountRange: [
                            prevFilters.discountRange
                              ? prevFilters.discountRange[0]
                              : 0,
                            parseInt(e.target.value, 10) || 100,
                          ],
                        }))
                      }
                      min={filters.discountRange ? filters.discountRange[0] : 0}
                      max={100}
                      className="ml-2 p-1 border rounded"
                    />
                  </div>
                  {/* <div>
                        {filters.discountRange
                          ? `${filters.discountRange[0]}% - ${filters.discountRange[1]}%`
                          : "0% - 100%"}
                      </div> */}
                </div>
              </div>

              <div>
                <label>Ratings:</label>
                <div className="bg-white p-2 rounded flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        name={`rating-${rating}`}
                        value={rating}
                        checked={filters.ratings?.includes(rating)}
                        onChange={handleRatingChange}
                      />
                      <label htmlFor={`rating-${rating}`}>{rating} Stars</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="p-2">Stock Availability:</label>
                <input
                  type="checkbox"
                  name="stockAvailability"
                  checked={filters.stockAvailability}
                  onChange={() =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      stockAvailability: !prevFilters.stockAvailability,
                    }))
                  }
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="btn bg-black text-white"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
        <div>
          <AuthBtn />
        </div>
      </div>
    </div>
  );
};

export default MobileCover;
