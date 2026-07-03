function Header() {
  return (
    <header className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

      <div>
        <h2 className="text-3xl font-bold text-green-700">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back to AgriGenAI 🌾
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
          🔔 Notifications
        </button>

        <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
          B
        </div>

      </div>

    </header>
  );
}

export default Header;