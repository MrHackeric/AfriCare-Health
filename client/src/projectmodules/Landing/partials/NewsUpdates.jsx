import React, { useEffect, useState } from 'react';

function NewsUpdates() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3030/api/news', {
        method: 'POST',
      });
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const items = xml.getElementsByTagName('item');
      const articles = Array.from(items).map(item => ({
        title: item.getElementsByTagName('title')[0].textContent,
        url: item.getElementsByTagName('link')[0].textContent,
        // Add a placeholder image URL or a real one if available
        image: "https://via.placeholder.com/150", // Replace this with the actual image URL if available
      }));
      setNews(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-pink-700 mb-4 text-center">
          News and Updates
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-600">No news available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((article, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-t-lg" />
                  <h3 className="text-xl font-semibold text-pink-700 mt-2">
                    {article.title}
                  </h3>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsUpdates;
