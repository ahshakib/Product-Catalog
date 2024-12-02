import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { RootState } from "../../redux/store";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import SortBar from "../SortBar/SortBar";

interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Hero() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state: RootState) => state.product
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState({ field: "", order: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const sortProducts = useMemo(() => {
    if (!sortConfig.field) return filteredProducts;

    const sorted = [...filteredProducts].sort((a, b) => {
      const x = sortConfig.field === "price" ? parseFloat(a.price) : a.rating.rate;
      const y = sortConfig.field === "price" ? parseFloat(b.price) : b.rating.rate;

      if (sortConfig.order === "asc") {
        return x - y;
      } else {
        return y - x;
      }
    });
    return sorted
  }, [filteredProducts, sortConfig]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortProducts.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, sortProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSortChange = (field: string, order: string) => {
    setSortConfig({ field, order });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, sortConfig]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">No products found.</span>
      </div>
    );
  }

  return (
    <div className="container w-11/12 p-4 pt-6 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">All Products</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex justify-between items-center">
        <SortBar onSortChange={handleSortChange} currentSort={sortConfig} />
        <div className="flex items-center mb-4">
          <label className="mr-2">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border px-3 py-2 rounded dark:text-black"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition duration-500"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4 rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Price: ${product.price}
              </p>
              <p className="text-yellow-500 dark:text-yellow-400 mb-2">
                Rating: {product.rating.rate} stars out of 5 (
                {product.rating.count} reviews)
              </p>
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Hero;