import Image from "next/image";
import { Star } from "lucide-react";

export default function PhotographerCard({ photographer }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5">
      <div className="relative w-full h-56 rounded-xl overflow-hidden">
        <Image
          src={photographer.profilePic || "/images/default.jpg"}
          alt={photographer.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {photographer.name}
        </h2>
        <p className="text-sm text-gray-500">{photographer.location}</p>

        <div className="flex items-center justify-between">
          <p className="text-pink-600 font-semibold">
            ₹{photographer.price.toLocaleString()}
          </p>
          <div className="flex items-center">
            <Star size={18} className="text-yellow-500 mr-1" />
            <span className="text-gray-700 font-medium">
              {photographer.rating}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {photographer.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-pink-100 text-pink-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-medium">
          View Profile
        </button>
      </div>
    </div>
  );
}
