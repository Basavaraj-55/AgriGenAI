// ======================================================
// 🌾 AgriGenAI Admin Users
// File:
// frontend/src/pages/marketplace/Admin/Users.tsx
// ======================================================

import { useEffect, useMemo, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import {

  FiEdit,

  FiTrash2,

  FiSearch,

  FiLoader,

  FiRefreshCw,

  FiUserX,

  FiUsers,

} from "react-icons/fi";

import {

  getUsers,

  deleteUser,

  updateUserStatus,

} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface User {

  _id: string;

  name: string;

  email: string;

  role: string;

  status: string;

  created_at: string;

}

interface UsersApiResponse {

  success: boolean;

  message: string;

  data: {

    users: User[];

    total?: number;

    page?: number;

    limit?: number;

  };

}

// ======================================================
// Component
// ======================================================

export default function Users() {

  // ====================================================
  // States
  // ====================================================

  const [users, setUsers] =

    useState<User[]>([]);

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

  const [selectedUser, setSelectedUser] =

    useState<User | null>(null);

  // ====================================================
  // Statistics
  // ====================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(

    (user) =>

      user.status?.toLowerCase() ===

      "active"

  ).length;

  const blockedUsers =

    totalUsers - activeUsers;

  // ====================================================
  // Search Filter
  // ====================================================

  const filteredUsers = useMemo(() => {

    const keyword =

      search.toLowerCase().trim();

    if (!keyword) {

      return users;

    }

    return users.filter((user) =>

      user.name

        ?.toLowerCase()

        .includes(keyword) ||

      user.email

        ?.toLowerCase()

        .includes(keyword) ||

      user.role

        ?.toLowerCase()

        .includes(keyword)

    );

  }, [users, search]);
    // ====================================================
  // Fetch Users
  // ====================================================

  const fetchUsers = async () => {

    try {

      setError("");

      const response = await getUsers();

      const result: UsersApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      setUsers(

        result.data.users ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Users Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load users."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadUsers = async () => {

      setLoading(true);

      await fetchUsers();

      setLoading(false);

    };

    loadUsers();

  }, []);

  // ====================================================
  // Refresh
  // ====================================================

  const refreshUsers = async () => {

    setRefreshing(true);

    await fetchUsers();

    setRefreshing(false);

  };

  // ====================================================
  // Delete User
  // ====================================================

  const handleDelete = async () => {

    if (!deleteId) {

      return;

    }

    try {

      await deleteUser(deleteId);

      setDeleteId(null);

      await fetchUsers();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to delete user."

      );

    }

  };

  // ====================================================
  // Update Status
  // ====================================================

  const handleStatus = async (

    id: string,

    status: string

  ) => {

    try {

      await updateUserStatus(

        id,

        status

      );

      await fetchUsers();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to update user status."

      );

    }

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

              Loading Users...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while user information is loading.

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

            <FiUserX

              size={70}

              className="mx-auto text-red-600"

            />

            <h2 className="mt-5 text-3xl font-bold text-gray-800">

              Unable to Load Users

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchUsers}

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

                👥 User Management

              </h1>

              <p className="mt-3 text-gray-500">

                View, search and manage all registered
                AgriGenAI users.

              </p>

            </div>

            <button

              onClick={refreshUsers}

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

              Refresh Users

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

                    Total Users

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-green-600">

                    {totalUsers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <FiUsers

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

                    Active Users

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-blue-600">

                    {activeUsers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FiUsers

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

                    Blocked Users

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-red-600">

                    {blockedUsers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">

                  <FiUserX

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

                placeholder="Search by name, email or role..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

                className="w-full rounded-2xl border border-gray-300 py-4 pl-14 pr-5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

              />

            </div>

          </div>
                    {/* ==========================================
              Users Table
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            {

              filteredUsers.length === 0 ? (

                <div className="py-24 text-center">

                  <FiUserX

                    size={70}

                    className="mx-auto text-gray-300"

                  />

                  <h2 className="mt-5 text-3xl font-bold text-gray-700">

                    No Users Found

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

                          User

                        </th>

                        <th className="px-6 py-5 text-left">

                          Email

                        </th>

                        <th className="px-6 py-5 text-left">

                          Role

                        </th>

                        <th className="px-6 py-5 text-left">

                          Status

                        </th>

                        <th className="px-6 py-5 text-left">

                          Joined

                        </th>

                        <th className="px-6 py-5 text-center">

                          Actions

                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredUsers.map(

                          (user) => (

                            <tr

                              key={user._id}

                              className="border-t transition hover:bg-green-50"

                            >

                              {/* User */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-4">

                                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-lg font-bold text-white">

                                    {

                                      user.name

                                        ?.charAt(0)

                                        .toUpperCase()

                                    }

                                  </div>

                                  <div>

                                    <h3 className="font-semibold text-gray-800">

                                      {user.name}

                                    </h3>

                                  </div>

                                </div>

                              </td>

                              {/* Email */}

                              <td className="px-6 py-5 text-gray-600">

                                {user.email}

                              </td>

                              {/* Role */}

                              <td className="px-6 py-5">

                                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                  {user.role}

                                </span>

                              </td>

                              {/* Status */}

                              <td className="px-6 py-5">

                                <span

                                  className={`rounded-full px-4 py-2 text-sm font-semibold ${

                                    user.status?.toLowerCase() === "active"

                                      ? "bg-green-100 text-green-700"

                                      : "bg-red-100 text-red-700"

                                  }`}

                                >

                                  {user.status}

                                </span>

                              </td>

                              {/* Joined */}

                              <td className="px-6 py-5 text-gray-500">

                                {

                                  user.created_at

                                    ? new Date(

                                        user.created_at

                                      ).toLocaleDateString()

                                    : "--"

                                }

                              </td>

                              {/* Actions */}

                              <td className="px-6 py-5">

                                <div className="flex justify-center gap-3">

                                  {/* Edit */}

                                  <button

                                    onClick={() =>

                                      setSelectedUser(

                                        user

                                      )

                                    }

                                    className="rounded-xl bg-blue-100 p-3 text-blue-600 transition hover:bg-blue-200"

                                    title="Edit User"

                                  >

                                    <FiEdit />

                                  </button>

                                  {/* Status */}

                                  <button

                                    onClick={() =>

                                      handleStatus(

                                        user._id,

                                        user.status

                                          ?.toLowerCase() ===

                                        "active"

                                          ? "blocked"

                                          : "active"

                                      )

                                    }

                                    className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${

                                      user.status

                                        ?.toLowerCase() ===

                                      "active"

                                        ? "bg-orange-500 hover:bg-orange-600"

                                        : "bg-green-600 hover:bg-green-700"

                                    }`}

                                  >

                                    {

                                      user.status

                                        ?.toLowerCase() ===

                                      "active"

                                        ? "Block"

                                        : "Activate"

                                    }

                                  </button>

                                  {/* Delete */}

                                  <button

                                    onClick={() =>

                                      setDeleteId(

                                        user._id

                                      )

                                    }

                                    className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"

                                    title="Delete User"

                                  >

                                    <FiTrash2 />

                                  </button>

                                </div>

                              </td>

                            </tr>

                          )

                        )

                      }

                    </tbody>

                  </table>

                </div>

              )

            }

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

                  Delete User

                </h2>

                <p className="mt-4 text-center text-gray-500">

                  Are you sure you want to permanently
                  delete this user?

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

          {/* ==========================================
              User Details Modal
          ========================================== */}

          {selectedUser && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

                <div className="flex items-center gap-5">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-3xl font-bold text-white">

                    {

                      selectedUser.name

                        ?.charAt(0)

                        .toUpperCase()

                    }

                  </div>

                  <div>

                    <h2 className="text-3xl font-bold text-gray-800">

                      {selectedUser.name}

                    </h2>

                    <p className="mt-1 text-gray-500">

                      {selectedUser.email}

                    </p>

                  </div>

                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <h3 className="font-semibold text-gray-700">

                      Role

                    </h3>

                    <p className="mt-2 text-lg text-blue-600">

                      {selectedUser.role}

                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <h3 className="font-semibold text-gray-700">

                      Status

                    </h3>

                    <p className="mt-2 text-lg text-green-600">

                      {selectedUser.status}

                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5 md:col-span-2">

                    <h3 className="font-semibold text-gray-700">

                      Joined

                    </h3>

                    <p className="mt-2 text-gray-600">

                      {

                        selectedUser.created_at

                        ? new Date(

                            selectedUser.created_at

                          ).toLocaleString()

                        : "--"

                      }

                    </p>

                  </div>

                </div>

                <div className="mt-8 flex justify-end">

                  <button

                    onClick={() =>
                      setSelectedUser(null)
                    }

                    className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

                  >

                    Close

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
