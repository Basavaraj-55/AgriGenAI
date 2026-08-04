// ======================================================
// 🌾 AgriGenAI Admin Categories
// File:
// frontend/src/pages/marketplace/Admin/Categories.tsx
// ======================================================

import { useEffect, useMemo, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import {

  FiEdit,

  FiTrash2,

  FiPlus,

  FiLoader,

  FiRefreshCw,

  FiSearch,

  FiGrid,

  FiAlertCircle,

} from "react-icons/fi";

import {

  getCategories,

  createCategory,

  updateCategory,

  deleteCategory,

} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface Category {

  _id: string;

  name: string;

  description?: string;

  status: string;

  created_at: string;

}

interface CategoriesApiResponse {

  success: boolean;

  message: string;

  data: {

    categories: Category[];

    total?: number;

    page?: number;

    limit?: number;

  };

}

// ======================================================
// Component
// ======================================================

export default function Categories() {

  // ====================================================
  // State
  // ====================================================

  const [categories, setCategories] =

    useState<Category[]>([]);

  const [category, setCategory] =

    useState("");

  const [description, setDescription] =

    useState("");

  const [search, setSearch] =

    useState("");

  const [loading, setLoading] =

    useState(true);

  const [refreshing, setRefreshing] =

    useState(false);

  const [error, setError] =

    useState("");

  const [editId, setEditId] =

    useState<string | null>(null);

  const [deleteId, setDeleteId] =

    useState<string | null>(null);

  const [actionLoading, setActionLoading] =

    useState(false);

  // ====================================================
  // Statistics
  // ====================================================

  const totalCategories =

    categories.length;

  const activeCategories =

    categories.filter(

      (item) =>

        item.status

          ?.toLowerCase() ===

        "active"

    ).length;

  const inactiveCategories =

    totalCategories -

    activeCategories;

  // ====================================================
  // Search Filter
  // ====================================================

  const filteredCategories =

    useMemo(() => {

      const keyword =

        search

          .trim()

          .toLowerCase();

      if (!keyword) {

        return categories;

      }

      return categories.filter(

        (item) =>

          item.name

            ?.toLowerCase()

            .includes(keyword)

          ||

          item.description

            ?.toLowerCase()

            .includes(keyword)

          ||

          item.status

            ?.toLowerCase()

            .includes(keyword)

      );

    }, [

      categories,

      search,

    ]);
      // ====================================================
  // Fetch Categories
  // ====================================================

  const fetchCategories = async () => {

    try {

      setError("");

      const response = await getCategories();

      const result: CategoriesApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      setCategories(

        result.data.categories ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Categories Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load categories."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadCategories = async () => {

      setLoading(true);

      await fetchCategories();

      setLoading(false);

    };

    loadCategories();

  }, []);

  // ====================================================
  // Refresh
  // ====================================================

  const refreshCategories = async () => {

    setRefreshing(true);

    await fetchCategories();

    setRefreshing(false);

  };

  // ====================================================
  // Add / Update Category
  // ====================================================

  const handleSubmit = async () => {

    if (!category.trim()) {

      alert("Category name is required.");

      return;

    }

    try {

      setActionLoading(true);

      if (editId) {

        await updateCategory(

          editId,

          {

            name: category,

            description,

          }

        );

      }

      else {

        await createCategory({

          name: category,

          description,

          status: "active",

        });

      }

      setCategory("");

      setDescription("");

      setEditId(null);

      await fetchCategories();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to save category."

      );

    }

    finally {

      setActionLoading(false);

    }

  };

  // ====================================================
  // Edit Category
  // ====================================================

  const handleEdit = (

    item: Category

  ) => {

    setEditId(item._id);

    setCategory(item.name);

    setDescription(

      item.description ?? ""

    );

  };

  // ====================================================
  // Delete Category
  // ====================================================

  const handleDelete = async () => {

    if (!deleteId) {

      return;

    }

    try {

      setActionLoading(true);

      await deleteCategory(deleteId);

      setDeleteId(null);

      await fetchCategories();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to delete category."

      );

    }

    finally {

      setActionLoading(false);

    }

  };

  // ====================================================
  // Cancel Edit
  // ====================================================

  const cancelEdit = () => {

    setEditId(null);

    setCategory("");

    setDescription("");

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

              Loading Categories...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while categories are loading.

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

              Unable to Load Categories

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchCategories}

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

                🗂️ Category Management

              </h1>

              <p className="mt-3 text-gray-500">

                Create, update and organize marketplace categories.

              </p>

            </div>

            <button

              onClick={refreshCategories}

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

              Refresh Categories

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

                    Total Categories

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-green-600">

                    {totalCategories}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <FiGrid

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

                    Active Categories

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-blue-600">

                    {activeCategories}

                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FiGrid

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

                    Inactive Categories

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-red-600">

                    {inactiveCategories}

                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">

                  <FiGrid

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

                placeholder="Search category name, description or status..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

                className="w-full rounded-2xl border border-gray-300 py-4 pl-14 pr-5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

              />

            </div>

          </div>
                    {/* ==========================================
              Add / Update Category
          ========================================== */}

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">

              {editId

                ? "✏️ Update Category"

                : "➕ Add New Category"}

            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium text-gray-700">

                  Category Name

                </label>

                <input

                  type="text"

                  value={category}

                  onChange={(e) =>

                    setCategory(e.target.value)

                  }

                  placeholder="Enter category name"

                  className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

                />

              </div>

              <div>

                <label className="mb-2 block font-medium text-gray-700">

                  Description

                </label>

                <input

                  type="text"

                  value={description}

                  onChange={(e) =>

                    setDescription(e.target.value)

                  }

                  placeholder="Enter description"

                  className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

                />

              </div>

            </div>

            <div className="mt-8 flex gap-4">

              <button

                onClick={handleSubmit}

                disabled={actionLoading}

                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white transition hover:scale-105 disabled:opacity-70"

              >

                <FiPlus />

                {editId

                  ? "Update Category"

                  : "Add Category"}

              </button>

              {editId && (

                <button

                  onClick={cancelEdit}

                  className="rounded-2xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100"

                >

                  Cancel

                </button>

              )}

            </div>

          </div>

          {/* ==========================================
              Categories Table
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            {filteredCategories.length === 0 ? (

              <div className="py-24 text-center">

                <FiGrid

                  size={70}

                  className="mx-auto text-gray-300"

                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">

                  No Categories Found

                </h2>

                <p className="mt-3 text-gray-500">

                  Create your first category to get started.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-5 text-left">

                        Category

                      </th>

                      <th className="px-6 py-5 text-left">

                        Description

                      </th>

                      <th className="px-6 py-5 text-center">

                        Status

                      </th>

                      <th className="px-6 py-5 text-center">

                        Created

                      </th>

                      <th className="px-6 py-5 text-center">

                        Actions

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredCategories.map((item) => (

                      <tr

                        key={item._id}

                        className="border-t transition hover:bg-green-50"

                      >

                        {/* Category */}

                        <td className="px-6 py-5">

                          <div>

                            <h3 className="font-semibold text-gray-800">

                              {item.name}

                            </h3>

                            <p className="text-xs text-gray-500">

                              ID: {item._id.slice(-8)}

                            </p>

                          </div>

                        </td>

                        {/* Description */}

                        <td className="px-6 py-5 text-gray-600">

                          {item.description?.trim()

                            ? item.description

                            : "No description"}

                        </td>

                        {/* Status */}

                        <td className="px-6 py-5 text-center">

                          <span

                            className={`rounded-full px-4 py-2 text-sm font-semibold ${

                              item.status?.toLowerCase() === "active"

                                ? "bg-green-100 text-green-700"

                                : "bg-red-100 text-red-700"

                            }`}

                          >

                            {item.status}

                          </span>

                        </td>

                        {/* Created */}

                        <td className="px-6 py-5 text-center text-gray-600">

                          {new Date(

                            item.created_at

                          ).toLocaleDateString()}

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex justify-center gap-3">

                            <button

                              onClick={() =>

                                handleEdit(item)

                              }

                              className="rounded-xl bg-blue-100 p-3 text-blue-600 transition hover:bg-blue-200"

                              title="Edit Category"

                            >

                              <FiEdit />

                            </button>

                            <button

                              onClick={() =>

                                setDeleteId(item._id)

                              }

                              className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"

                              title="Delete Category"

                            >

                              <FiTrash2 />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

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

                  Delete Category

                </h2>

                <p className="mt-4 text-center text-gray-500">

                  Are you sure you want to permanently
                  delete this category?

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

                    disabled={actionLoading}

                    className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

                  >

                    {actionLoading

                      ? "Deleting..."

                      : "Delete"}

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