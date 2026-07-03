import { useState } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type LoginForm = {
  email: string;
  password: string;
};

type PasswordInputProps = {
  register: UseFormRegister<LoginForm>;
  error?: FieldError;
};

function PasswordInput({ register, error }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            validate: {
              minLength: (value) =>
                value.length >= 8 || "Password must be at least 8 characters",
              uppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain one uppercase letter",
              lowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must contain one lowercase letter",
              number: (value) =>
                /\d/.test(value) ||
                "Password must contain one number",
              special: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                "Password must contain one special character",
            },
          })}
          className="w-full rounded-xl border border-gray-300 p-3 pr-12 focus:border-green-600 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;