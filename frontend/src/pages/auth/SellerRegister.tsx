import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiHome,
} from "react-icons/fi";
import MainLayout from "../../components/layout/MainLayout";

const API_URL = "http://127.0.0.1:5000/api/auth";

interface SellerForm {
  name: string;
  shop_name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
}

export default function SellerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SellerForm>({
    name: "",
    shop_name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/seller/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert(data.message || "Seller account created successfully");

      navigate("/seller/login");
    } catch (error) {
      console.error("Seller Register Error:", error);
      alert("Unable to register seller.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-center text-4xl font-bold text-gray-800">
            Create Seller Account
          </h1>

          <p className="mt-3 text-center text-gray-500">
            Register your farm and start selling products.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">

            <InputField
              icon={<FiUser />}
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <InputField
              icon={<FiHome />}
              name="shop_name"
              placeholder="Farm / Shop Name"
              value={formData.shop_name}
              onChange={handleChange}
            />

            <InputField
              icon={<FiMail />}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              icon={<FiPhone />}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <InputField
              icon={<FiMapPin />}
              name="location"
              placeholder="Farm Location"
              value={formData.location}
              onChange={handleChange}
            />

            <InputField
              icon={<FiLock />}
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Creating Account..." : "Create Seller Account"}
            </button>
          </form>

          <button
            onClick={() => navigate("/seller/login")}
            className="mt-6 w-full text-center text-green-700 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

function InputField({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: any) {
  return (
    <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
      <span className="text-gray-400">{icon}</span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full outline-none"
      />
    </div>
  );
}