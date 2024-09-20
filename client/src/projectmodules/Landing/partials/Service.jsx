function Service({ url, title, text, cta }) {
  return (
    <div className="w-full md:w-[30%] bg-white rounded-lg shadow-lg p-6">
      <img src={url} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h4 className="text-2xl font-bold text-pink-700 mb-2">{title}</h4>
      <p className="text-gray-700 mb-4">{text}</p>
      {cta && (
        <a href="#" className="inline-block bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300">
          {cta}
        </a>
      )}
    </div>
  );
}

export default Service;

