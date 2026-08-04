// ==========================================================
// 🌾 AgriGenAI Marketplace API
// File: src/pages/marketplace/marketApi.ts
// ==========================================================

import api from "../../services/api";

// ==========================================================
// Interfaces
// ==========================================================

export interface Product {
  _id: string;
  product_name: string;
  category: string;
  description?: string;

  price: number;
  quantity: number;
  unit?: string;

  seller_id?: string;
  seller_name?: string;

  image_url?: string;
  location?: string;

  rating?: number;

  createdAt?: string;
}

export interface CartItem {
  _id?: string;

  product_id: string;

  quantity: number;
}

export interface Order {
  _id: string;

  product_id: string;
  product_name: string;

  seller_id: string;
  user_id: string;

  quantity: number;

  price: number;

  total_amount: number;

  address?: string;

  payment_method?: string;

  status: string;

  created_at?: string;
}

// ==========================================================
// Product APIs
// ==========================================================

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getCategoryProducts = async (
  category: string
) => {
  const { data } = await api.get(
    `/products/category/${category}`
  );

  return data;
};

export const searchProducts = async (
  keyword: string
) => {
  const { data } = await api.get(
    "/products/search",
    {
      params: {
        search: keyword,
      },
    }
  );

  return data;
};

// ==========================================================
// Seller Product APIs
// ==========================================================

export const getSellerProducts = async (
  sellerId: string
) => {
  const { data } = await api.get(
    `/products/seller/${sellerId}`
  );

  return data;
};

export const addProduct = async (
  product: Product
) => {
  const { data } = await api.post(
    "/products",
    product
  );

  return data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
) => {
  const { data } = await api.put(
    `/products/${id}`,
    product
  );

  return data;
};

export const deleteProduct = async (
  id: string
) => {
  const { data } = await api.delete(
    `/products/${id}`
  );

  return data;
};

export const updateProductStock = async (
  id: string,
  quantity: number
) => {
  const { data } = await api.put(
    `/products/${id}/stock`,
    {
      quantity,
    }
  );

  return data;
};

// ==========================================================
// Cart APIs
// ==========================================================

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const addToCart = async (
  productId: string,
  quantity: number = 1
) => {
  const { data } = await api.post(
    "/cart",
    {
      product_id: productId,
      quantity,
    }
  );

  return data;
};

export const updateCartItem = async (
  cartId: string,
  quantity: number
) => {
  const { data } = await api.put(
    `/cart/${cartId}`,
    {
      quantity,
    }
  );

  return data;
};

export const removeCartItem = async (
  cartId: string
) => {
  const { data } = await api.delete(
    `/cart/${cartId}`
  );

  return data;
};

export const clearCart = async () => {
  const { data } = await api.delete("/cart");
  return data;
};

// ==========================================================
// Order APIs
// ==========================================================

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const placeOrder = async (
  order: Partial<Order>
) => {
  const { data } = await api.post(
    "/orders",
    order
  );

  return data;
};

// ==========================================================
// Wishlist APIs
// ==========================================================

export const getWishlist = async () => {
  const { data } = await api.get(
    "/wishlist"
  );

  return data;
};

export const addToWishlist = async (
  productId: string
) => {
  const { data } = await api.post(
    "/wishlist",
    {
      product_id: productId,
    }
  );

  return data;
};

export const removeWishlistItem = async (
  id: string
) => {
  const { data } = await api.delete(
    `/wishlist/${id}`
  );

  return data;
};