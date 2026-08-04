import API from "../api";

// Get all sellers
export const getSellers = async () => {
  const { data } = await API.get("/sellers");
  return data;
};

// Get seller by ID
export const getSellerById = async (sellerId: string) => {
  const { data } = await API.get(`/sellers/${sellerId}`);
  return data;
};

// Create seller
export const createSeller = async (sellerData: unknown) => {
  const { data } = await API.post("/sellers", sellerData);
  return data;
};

// Update seller
export const updateSeller = async (
  sellerId: string,
  sellerData: unknown
) => {
  const { data } = await API.put(
    `/sellers/${sellerId}`,
    sellerData
  );

  return data;
};

// Delete seller
export const deleteSeller = async (sellerId: string) => {
  const { data } = await API.delete(`/sellers/${sellerId}`);
  return data;
};

// Get products by seller
export const getSellerProducts = async (sellerId: string) => {
  const { data } = await API.get(
    `/sellers/${sellerId}/products`
  );

  return data;
};