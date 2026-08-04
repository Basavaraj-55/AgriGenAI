// ======================================================
// 🌾 AgriGenAI Admin API Service
// File: src/services/adminApi.ts
// ======================================================

import axios from "axios";

// ======================================================
// API Configuration
// ======================================================

const API_URL =
    import.meta.env.VITE_API_URL ??
    "http://127.0.0.1:5000/api";

// ======================================================
// Axios Instance
// ======================================================

const adminApi = axios.create({

    baseURL: API_URL,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json"

    }

});

// ======================================================
// Request Interceptor
// ======================================================

adminApi.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (token) {

            config.headers = config.headers ?? {};

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

// ======================================================
// Response Interceptor
// ======================================================

adminApi.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("admin");

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("admin");

            window.location.href =
                "/marketplace/admin/login";

        }

        return Promise.reject(error);

    }

);

// ======================================================
// Authentication
// ======================================================

export const adminLogin = (

    email: string,

    password: string

) =>

    adminApi.post(

        "/auth/admin/login",

        {

            email,

            password

        }

    );

// ======================================================
// Dashboard
// ======================================================

export const getDashboard = () =>

    adminApi.get(

        "/admin/dashboard"

    );

export const getProfile = () =>

    adminApi.get(

        "/admin/profile"

    );

export const adminHealth = () =>

    adminApi.get(

        "/admin/health"

    );

// ======================================================
// Users
// ======================================================

export const getUsers = (

    page = 1,

    limit = 10,

    search = ""

) =>

    adminApi.get(

        "/admin/users",

        {

            params: {

                page,

                limit,

                search

            }

        }

    );

export const getUserById = (

    userId: string

) =>

    adminApi.get(

        `/admin/user/${userId}`

    );

export const updateUser = (

    userId: string,

    data: unknown

) =>

    adminApi.put(

        `/admin/user/${userId}`,

        data

    );

export const updateUserStatus = (

    userId: string,

    status: string

) =>

    adminApi.put(

        `/admin/user/${userId}/status`,

        {

            status

        }

    );

export const deleteUser = (

    userId: string

) =>

    adminApi.delete(

        `/admin/user/${userId}`

    );

// ======================================================
// Sellers
// ======================================================

export const getSellers = (

    page = 1,

    limit = 10,

    search = ""

) =>

    adminApi.get(

        "/admin/sellers",

        {

            params: {

                page,

                limit,

                search

            }

        }

    );

export const getSellerById = (

    sellerId: string

) =>

    adminApi.get(

        `/admin/seller/${sellerId}`

    );

export const getSellerStats = () =>

    adminApi.get(

        "/admin/seller-stats"

    );

export const approveSeller = (

    sellerId: string

) =>

    adminApi.put(

        `/admin/seller/approve/${sellerId}`

    );

export const rejectSeller = (

    sellerId: string

) =>

    adminApi.put(

        `/admin/seller/reject/${sellerId}`

    );

export const deleteSeller = (

    sellerId: string

) =>

    adminApi.delete(

        `/admin/seller/${sellerId}`

    );

// ======================================================
// Products
// ======================================================

export const getProducts = (

    page = 1,

    limit = 10,

    search = ""

) =>

    adminApi.get(

        "/admin/products",

        {

            params: {

                page,

                limit,

                search

            }

        }

    );

export const getProductById = (

    productId: string

) =>

    adminApi.get(

        `/admin/product/${productId}`

    );

export const createProduct = (

    data: unknown

) =>

    adminApi.post(

        "/admin/product",

        data

    );

export const updateProduct = (

    productId: string,

    data: unknown

) =>

    adminApi.put(

        `/admin/product/${productId}`,

        data

    );

export const deleteProduct = (

    productId: string

) =>

    adminApi.delete(

        `/admin/product/${productId}`

    );

// ======================================================
// Orders
// ======================================================

export const getOrders = (

    page = 1,

    limit = 10,

    search = ""

) =>

    adminApi.get(

        "/admin/orders",

        {

            params: {

                page,

                limit,

                search

            }

        }

    );

export const updateOrderStatus = (

    orderId: string,

    status: string

) =>

    adminApi.put(

        `/admin/order/${orderId}/status`,

        {

            status

        }

    );

export const deleteOrder = (

    orderId: string

) =>

    adminApi.delete(

        `/admin/order/${orderId}`

    );

// ======================================================
// Categories
// ======================================================

export const getCategories = () =>

    adminApi.get(

        "/admin/categories"

    );

export const createCategory = (

    data: unknown

) =>

    adminApi.post(

        "/admin/categories",

        data

    );

export const updateCategory = (

    categoryId: string,

    data: unknown

) =>

    adminApi.put(

        `/admin/categories/${categoryId}`,

        data

    );

export const deleteCategory = (

    categoryId: string

) =>

    adminApi.delete(

        `/admin/categories/${categoryId}`

    );

// ======================================================
// Reports
// ======================================================

export const getReports = (

    startDate?: string,

    endDate?: string

) =>

    adminApi.get(

        "/admin/reports",

        {

            params: {

                startDate,

                endDate

            }

        }

    );

// ======================================================
// Settings
// ======================================================

export const getSettings = () =>

    adminApi.get(

        "/admin/settings"

    );

export const updateSettings = (

    settings: unknown

) =>

    adminApi.put(

        "/admin/settings",

        settings

    );

// ======================================================
// Export Axios Instance
// ======================================================

export default adminApi;