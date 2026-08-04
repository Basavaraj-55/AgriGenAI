// ======================================================
// 🌾 AgriGenAI Admin Products
// File:
// frontend/src/pages/marketplace/Admin/Products.tsx
// ======================================================

import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../../components/layout/MainLayout";

import {

  FiSearch,

  FiEye,

  FiEdit,

  FiTrash2,

  FiLoader,

  FiRefreshCw,

  FiPackage,

  FiAlertCircle,

} from "react-icons/fi";

import {

  getProducts,

  deleteProduct,

} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface Product {

  _id: string;

  product_name: string;

  category: string;

  seller_name: string;

  seller_id: string;

  price: number;

  quantity?: number;

  stock?: number;

  image_url?: string;

  status?: string;

  created_at?: string;

}

interface ProductsApiResponse {

  success: boolean;

  message: string;

  data: {

    products: Product[];

    total?: number;

    page?: number;

    limit?: number;

  };

}

// ======================================================
// Component
// ======================================================

export default function Products() {

  const navigate = useNavigate();

  // ====================================================
  // State
  // ====================================================

  const [products, setProducts] =

    useState<Product[]>([]);

  const [loading, setLoading] =

    useState(true);

  const [refreshing, setRefreshing] =

    useState(false);

  const [error, setError] =

    useState("");

  const [search, setSearch] =

    useState("");

  const [deleteId, setDeleteId] =

    useState<string | null>(null);

  // ====================================================
  // Statistics
  // ====================================================

  const totalProducts =

    products.length;

  const availableProducts =

    products.filter(

      (product) =>

        (product.stock ??

          product.quantity ??

          0) > 0

    ).length;

  const outOfStockProducts =

    products.filter(

      (product) =>

        (product.stock ??

          product.quantity ??

          0) <= 0

    ).length;

  // ====================================================
  // Search Filter
  // ====================================================

  const filteredProducts =

    useMemo(() => {

      const keyword =

        search

          .trim()

          .toLowerCase();

      if (!keyword) {

        return products;

      }

      return products.filter(

        (product) =>

          product.product_name

            ?.toLowerCase()

            .includes(keyword) ||

          product.category

            ?.toLowerCase()

            .includes(keyword) ||

          product.seller_name

            ?.toLowerCase()

            .includes(keyword)

      );

    }, [

      products,

      search,

    ]);
      // ====================================================
  // Fetch Products
  // ====================================================

  const fetchProducts = async () => {

    try {

      setError("");

      const response = await getProducts();

      const result: ProductsApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      setProducts(

        result.data.products ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Products Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load products."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadProducts = async () => {

      setLoading(true);

      await fetchProducts();

      setLoading(false);

    };

    loadProducts();

  }, []);

  // ====================================================
  // Refresh
  // ====================================================

  const refreshProducts = async () => {

    setRefreshing(true);

    await fetchProducts();

    setRefreshing(false);

  };

  // ====================================================
  // Delete Product
  // ====================================================

  const handleDelete = async () => {

    if (!deleteId) {

      return;

    }

    try {

      await deleteProduct(deleteId);

      setDeleteId(null);

      await fetchProducts();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to delete product."

      );

    }

  };

  // ====================================================
  // Navigation
  // ====================================================

  const viewProduct = (

    productId: string

  ) => {

    navigate(

      `/marketplace/product/${productId}`

    );

  };

  const editProduct = (

    productId: string

  ) => {

    navigate(

      `/marketplace/admin/products/edit/${productId}`

    );

  };

  // ====================================================
  // Loading Screen
  // ====================================================

  if (loading) {

    return (

      <MainLayout>

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <FiLoader

              size={60}

              className="mx-auto animate-spin text-green-600"

            />

            <h2 className="mt-6 text-2xl font-bold text-gray-700">

              Loading Products...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while products are loading.

            </p>

          </div>

        </div>

      </MainLayout>

    );

  }

  // ====================================================
  // Error Screen
  // ====================================================

  if (error) {

    return (

      <MainLayout>

        <div className="flex min-h-screen items-center justify-center">

          <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">

            <FiAlertCircle

              size={70}

              className="mx-auto text-red-600"

            />

            <h2 className="mt-5 text-3xl font-bold text-gray-800">

              Unable to Load Products

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchProducts}

              className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

            >

              Retry

            </button>

          </div>

        </div>

      </MainLayout>

    );

  }
    // ====================================================
  // Main UI
  // ====================================================

  return (

    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">

        <div className="mx-auto max-w-7xl">

          {/* ==========================================
              Header
          ========================================== */}

          <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-extrabold text-gray-800">

                📦 Product Management

              </h1>

              <p className="mt-3 text-gray-500">

                Manage all marketplace products from one place.

              </p>

            </div>

            <button

              onClick={refreshProducts}

              disabled={refreshing}

              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-70"

            >

              <FiRefreshCw

                className={

                  refreshing

                    ? "animate-spin"

                    : ""

                }

              />

              Refresh Products

            </button>

          </div>

          {/* ==========================================
              Statistics
          ========================================== */}

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Total Products

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-green-600">

                    {totalProducts}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <FiPackage

                    size={36}

                    className="text-green-700"

                  />

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Available

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-blue-600">

                    {availableProducts}

                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FiPackage

                    size={36}

                    className="text-blue-700"

                  />

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Out of Stock

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-red-600">

                    {outOfStockProducts}

                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">

                  <FiPackage

                    size={36}

                    className="text-red-700"

                  />

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              Search
          ========================================== */}

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">

            <div className="relative">

              <FiSearch

                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"

                size={22}

              />

              <input

                type="text"

                placeholder="Search by product, category or seller..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

                className="w-full rounded-2xl border border-gray-300 py-4 pl-14 pr-5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

              />

            </div>

          </div>
                    {/* ==========================================
              Products Table
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            {filteredProducts.length === 0 ? (

              <div className="py-24 text-center">

                <FiPackage
                  size={70}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">

                  No Products Found

                </h2>

                <p className="mt-3 text-gray-500">

                  Try another search keyword.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-5 text-left">

                        Image

                      </th>

                      <th className="px-6 py-5 text-left">

                        Product

                      </th>

                      <th className="px-6 py-5 text-left">

                        Category

                      </th>

                      <th className="px-6 py-5 text-left">

                        Seller

                      </th>

                      <th className="px-6 py-5 text-center">

                        Price

                      </th>

                      <th className="px-6 py-5 text-center">

                        Stock

                      </th>

                      <th className="px-6 py-5 text-center">

                        Status

                      </th>

                      <th className="px-6 py-5 text-center">

                        Actions

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      filteredProducts.map(

                        (product) => {

                          const stock =

                            product.stock ??

                            product.quantity ??

                            0;

                          return (

                            <tr

                              key={product._id}

                              className="border-t transition hover:bg-green-50"

                            >

                              {/* Image */}

                              <td className="px-6 py-5">

                                <img

                                  src={

                                    product.image_url ||

                                    "https://placehold.co/80x80"

                                  }

                                  alt={

                                    product.product_name

                                  }

                                  className="h-16 w-16 rounded-xl border object-cover"

                                />

                              </td>

                              {/* Product */}

                              <td className="px-6 py-5">

                                <h3 className="font-semibold text-gray-800">

                                  {

                                    product.product_name

                                  }

                                </h3>

                                <p className="text-sm text-gray-500">

                                  ID: {

                                    product._id.slice(

                                      0,

                                      8

                                    )

                                  }...

                                </p>

                              </td>

                              {/* Category */}

                              <td className="px-6 py-5">

                                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                  {

                                    product.category

                                  }

                                </span>

                              </td>

                              {/* Seller */}

                              <td className="px-6 py-5">

                                {

                                  product.seller_name

                                }

                              </td>

                              {/* Price */}

                              <td className="px-6 py-5 text-center font-bold text-green-700">

                                ₹{

                                  Number(

                                    product.price

                                  ).toLocaleString()

                                }

                              </td>

                              {/* Stock */}

                              <td className="px-6 py-5 text-center font-semibold">

                                {stock}

                              </td>

                              {/* Status */}

                              <td className="px-6 py-5 text-center">

                                {

                                  stock > 0 ? (

                                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                      Available

                                    </span>

                                  ) : (

                                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

                                      Out of Stock

                                    </span>

                                  )

                                }

                              </td>

                              {/* Actions */}

                              <td className="px-6 py-5">

                                <div className="flex justify-center gap-3">

                                  {/* View */}

                                  <button

                                    onClick={() =>

                                      viewProduct(

                                        product._id

                                      )

                                    }

                                    className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200"

                                    title="View Product"

                                  >

                                    <FiEye />

                                  </button>

                                  {/* Edit */}

                                  <button

                                    onClick={() =>

                                      editProduct(

                                        product._id

                                      )

                                    }

                                    className="rounded-xl bg-blue-100 p-3 text-blue-600 transition hover:bg-blue-200"

                                    title="Edit Product"

                                  >

                                    <FiEdit />

                                  </button>

                                  {/* Delete */}

                                  <button

                                    onClick={() =>

                                      setDeleteId(

                                        product._id

                                      )

                                    }

                                    className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"

                                    title="Delete Product"

                                  >

                                    <FiTrash2 />

                                  </button>

                                </div>

                              </td>

                            </tr>

                          );

                        }

                      )

                    }

                  </tbody>

                </table>

              </div>

            )}

          </div>
                    {/* ==========================================
              Delete Confirmation Modal
          ========================================== */}

          {deleteId && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                  <FiTrash2
                    size={40}
                    className="text-red-600"
                  />

                </div>

                <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">

                  Delete Product

                </h2>

                <p className="mt-4 text-center text-gray-500">

                  Are you sure you want to permanently
                  delete this product?

                </p>

                <p className="mt-2 text-center text-sm text-red-500">

                  This action cannot be undone.

                </p>

                <div className="mt-8 flex gap-4">

                  <button

                    onClick={() =>

                      setDeleteId(null)

                    }

                    className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"

                  >

                    Cancel

                  </button>

                  <button

                    onClick={handleDelete}

                    className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"

                  >

                    Delete

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );

}

