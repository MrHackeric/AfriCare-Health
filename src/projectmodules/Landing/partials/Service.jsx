function Service({ url, title, text }) {
  return (
    <article className="flex flex-col bg-gray-600 rounded-lg shadow-md overflow-hidden w-full md:w-[300px]">
      <img
        src={url}
        alt={title}
        className="w-full object-cover h-[200px]"
      />
      <div className="p-4 flex flex-col justify-center bg-gray-800">
        <h3 className="text-2xl font-semibold text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-100">{text}</p>
      </div>
    </article>
  );
}

export default Service;
