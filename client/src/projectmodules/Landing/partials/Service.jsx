function Service({ url, title, text }) {
  return (
    <article className="flex flex-col dark:bg-gray-700 bg-gray-800 rounded-lg shadow-md overflow-hidden w-full md:w-[300px]">
      <img
        src={url}
        alt={title}
        className="w-full object-cover h-[200px]"
      />
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-2xl font-bold dark:text-gray-200 text-gray-800 mb-2">{title}</h3>
        <p className="text-[white]">{text}</p>
      </div>
    </article>
  );
}

export default Service;
