function Profile() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-[450px]">

        <div className="text-7xl mb-4">
          👨‍🌾
        </div>

        <h1 className="text-3xl font-bold text-green-800">
          Farmer Profile
        </h1>

        <p className="mt-4 text-gray-600">
          This page is currently under development.
        </p>

        <p className="mt-2 text-gray-500">
          Soon you will be able to:
        </p>

        <div className="mt-6 text-left space-y-3">

          <p>✅ View Personal Information</p>

          <p>✅ Edit Profile Details</p>

          <p>✅ Change Language</p>

          <p>✅ View Farming History</p>

          <p>✅ Manage Account Settings</p>

        </div>

        <button
          className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
        >
          Coming Soon 🚀
        </button>

      </div>

    </div>
  );
}

export default Profile;