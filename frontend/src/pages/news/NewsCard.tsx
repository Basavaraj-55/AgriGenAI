import React from "react";

interface NewsCardProps {
  title: string;
  source: string;
  published: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  source,
  published,
  link,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-center gap-2 mb-3">
        <div className="text-2xl">📰</div>

        <h2 className="font-bold text-green-800 text-lg">
          Agriculture News
        </h2>
      </div>

      <h3 className="font-semibold text-gray-800 text-base leading-6">
        {title}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-gray-600">

        <p>
          🌐 <span className="font-medium">{source}</span>
        </p>

        <p>
          📅 {published}
        </p>

      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition"
      >
        Read More →
      </a>

    </div>
  );
};

export default NewsCard;