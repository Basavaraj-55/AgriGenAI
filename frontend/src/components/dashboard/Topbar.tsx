function Topbar() {
  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-green-700">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back to AgriGenAI 🌾
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
          Notifications
        </button>

        <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
          B
        </div>

      </div>

    </div>
  );
}

export default Topbar;