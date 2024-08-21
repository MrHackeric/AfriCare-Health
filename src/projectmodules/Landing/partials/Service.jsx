function Service({ url, title, text }) {
  return (
    <article className="flex flex-col bg-[#a06e91] rounded-lg shadow-md overflow-hidden w-full md:w-[300px]">
      <img
        src={url}
        alt={title}
        className="w-full object-cover h-[200px]"
      />
      <div className="p-4 flex flex-col justify-center bg-[#a06e91s]">
        <h3 className="text-2xl font-bold text-[white] mb-2">{title}</h3>
        <p className="text-[white]">{text}</p>
      </div>
    </article>
  );
}

export default Service;
