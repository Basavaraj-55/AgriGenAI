function Settings() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-[500px]">

        <div className="text-7xl mb-4">
          ⚙️
        </div>

        <h1 className="text-3xl font-bold text-green-800">
          Settings
        </h1>

        <p className="mt-4 text-gray-600">
          Customize your AgriGenAI experience.
        </p>

        <div className="mt-8 space-y-3 text-left">

          <div className="bg-green-50 p-4 rounded-lg">
            🌍 Language Settings
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            🔔 Notifications
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            🎨 Theme
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            🔒 Privacy & Security
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            ℹ️ About AgriGenAI
          </div>

        </div>

        <button className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold">
          Coming Soon 🚀
        </button>

      </div>

    </div>
  );
}

export default Settings;