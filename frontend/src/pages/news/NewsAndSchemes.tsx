import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import SchemeCard from "./SchemeCard";
import {
  getAgricultureNews,
  getGovernmentSchemes,
} from "./newsApi";

interface NewsItem {
  title: string;
  link: string;
  source: string;
  published: string;
}

interface SchemeItem {
  id: number;
  name: string;
  status: string;
  benefit: string;
  category: string;
  state: string;
  last_date: string;
  description: string;
  apply_link: string;
}

function NewsAndSchemes() {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
    // ==========================================
  // Load News & Government Schemes
  // ==========================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Fetch Agriculture News
      const newsResponse = await getAgricultureNews();

      if (newsResponse.success) {
        setNews(newsResponse.news);
      }

      // Fetch Government Schemes
      const schemeResponse = await getGovernmentSchemes();

      if (schemeResponse.success) {
        setSchemes(schemeResponse.schemes);
      }

      setLoading(false);

    } catch (err) {

      console.error(err);

      setError("Unable to load farmer information.");

      setLoading(false);

    }
  };

  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="mt-5 text-2xl font-bold text-green-700">
            Loading Farmer Information...
          </h2>

          <p className="text-gray-600 mt-2">
            Please wait...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // Error Screen
  // ==========================================

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">

        <div className="bg-white shadow-xl rounded-xl p-10 text-center">

          <h2 className="text-3xl font-bold text-red-600">
            ⚠ Error
          </h2>

          <p className="mt-4 text-gray-700">
            {error}
          </p>

          <button
            onClick={loadData}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>

        </div>

      </div>
    );
  }
    // ==========================================
  // Filter News
  // ==========================================

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">

      {/* ==========================================
          Hero Section
      ========================================== */}

      <div className="bg-gradient-to-r from-green-900 via-green-700 to-green-600 text-white rounded-b-3xl shadow-xl">

        <div className="max-w-7xl mx-auto px-8 py-12">

          <h1 className="text-5xl font-extrabold">
            🌾 Farmer Information Center
          </h1>

          <p className="mt-4 text-lg text-green-100">
            Stay updated with the latest Agriculture News,
            Government Schemes and Farming Information.
          </p>

        </div>

      </div>

      {/* ==========================================
          Statistics Cards
      ========================================== */}

      <div className="max-w-7xl mx-auto px-8 mt-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* News */}

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

            <h3 className="text-green-700 font-semibold text-xl">
              📰 Agriculture News
            </h3>

            <p className="text-5xl font-bold mt-4 text-green-800">
              {news.length}
            </p>

            <p className="text-gray-500 mt-2">
              Live Articles
            </p>

          </div>

          {/* Schemes */}

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

            <h3 className="text-green-700 font-semibold text-xl">
              🏛 Government Schemes
            </h3>

            <p className="text-5xl font-bold mt-4 text-green-800">
              {schemes.length}
            </p>

            <p className="text-gray-500 mt-2">
              Active Schemes
            </p>

          </div>

          {/* Status */}

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

            <h3 className="text-green-700 font-semibold text-xl">
              🌱 System Status
            </h3>

            <p className="text-3xl font-bold mt-4 text-green-700">
              Live
            </p>

            <p className="text-gray-500 mt-2">
              Real-Time Updates
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          Search Box
      ========================================== */}

      <div className="max-w-7xl mx-auto px-8 mt-10">

        <input
          type="text"
          placeholder="🔍 Search Agriculture News..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-green-300 px-5 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />

      </div>
            {/* ==========================================
          Agriculture News
      ========================================== */}

      <div className="max-w-7xl mx-auto px-8 mt-12">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold text-green-800">
            📰 Latest Agriculture News
          </h2>

          <span className="text-gray-500">
            {filteredNews.length} Articles
          </span>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredNews.length > 0 ? (

            filteredNews.map((item, index) => (

              <NewsCard
                key={index}
                title={item.title}
                source={item.source}
                published={item.published}
                link={item.link}
              />

            ))

          ) : (

            <div className="col-span-full bg-white rounded-xl shadow-md p-10 text-center">

              <h2 className="text-2xl font-bold text-gray-600">
                No News Found
              </h2>

            </div>

          )}

        </div>

      </div>

      {/* ==========================================
          Government Schemes
      ========================================== */}

      <div className="max-w-7xl mx-auto px-8 mt-16">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold text-green-800">
            🏛 Government Schemes
          </h2>

          <span className="text-gray-500">
            {schemes.length} Schemes
          </span>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {schemes.map((scheme) => (

            <SchemeCard
              key={scheme.id}
              name={scheme.name}
              status={scheme.status}
              benefit={scheme.benefit}
              category={scheme.category}
              state={scheme.state}
              last_date={scheme.last_date}
              description={scheme.description}
              apply_link={scheme.apply_link}
            />

          ))}

        </div>

      </div>

      {/* ==========================================
          Footer
      ========================================== */}

      <footer className="mt-20 bg-green-900 text-white">

        <div className="max-w-7xl mx-auto py-10 px-8 text-center">

          <h2 className="text-3xl font-bold">
            🌾 AgriGenAI
          </h2>

          <p className="mt-4 text-green-200">
            AI Powered Smart Farming Platform
          </p>

          <p className="mt-2 text-green-300">
            Agriculture News • Government Schemes • AI Assistant
          </p>

        </div>

      </footer>

    </div>

  );
}

export default NewsAndSchemes;