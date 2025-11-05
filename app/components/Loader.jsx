export default function Loader() {
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-gray-200 h-72 rounded-2xl shadow-md"></div>
      ))}
    </div>
  );
}
