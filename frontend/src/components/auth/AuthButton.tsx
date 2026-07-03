type AuthButtonProps = {
  text: string;
  loading?: boolean;
};

function AuthButton({
  text,
  loading = false,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
    >
      {loading ? "Please Wait..." : text}
    </button>
  );
}

export default AuthButton;