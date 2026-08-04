import API from "../api";

// ==============================
// Get All Products
// ==============================
export const getProducts = async () => {
  const { data } = await API.get("/products");
  return data;
};

// ==============================
// Get Product By ID
// ==============================
export const getProductById = async (productId: string) => {
  const { data } = await API.get(`/products/${productId}`);
  return data;
};

// ==============================
// Create New Product
// ==============================
export const createProduct = async (productData: FormData) => {
  const { data } = await API.post("/products", productData);
  return data;
};

// ==============================
// Update Product
// ==============================
export const updateProduct = async (
  productId: string,
  productData: FormData
) => {
  const { data } = await API.put(
    `/products/${productId}`,
    productData
  );

  return data;
};

// ==============================
// Delete Product
// ==============================
export const deleteProduct = async (productId: string) => {
  const { data } = await API.delete(`/products/${productId}`);
  return data;
};