function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-green-700">
          🌾 AgriGenAI
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg font-medium text-gray-700">
          <li className="cursor-pointer hover:text-green-600">Home</li>
          <li className="cursor-pointer hover:text-green-600">Features</li>
          <li className="cursor-pointer hover:text-green-600">About</li>
          <li className="cursor-pointer hover:text-green-600">Contact</li>
        </ul>

        {/* Login Button */}
        <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
          Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;