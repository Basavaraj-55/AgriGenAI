import type { FieldError, UseFormRegister } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

type EmailInputProps = {
  register: UseFormRegister<LoginForm>;
  error?: FieldError;
};

function EmailInput({ register, error }: EmailInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Email Address
      </label>

      <input
        type="email"
        placeholder="example@gmail.com"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
        className="w-full rounded-xl border border-gray-300 p-3 focus:border-green-600 focus:outline-none"
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default EmailInput;