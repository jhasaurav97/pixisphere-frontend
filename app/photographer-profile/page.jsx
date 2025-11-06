"use client";
import Image from "next/image";
import { useState } from "react";
import { Star, X } from "lucide-react";
import { usePhotographerStore } from "../store/photographerStore";

export default function PhotographerProfilePage() {
  const { selectedPhotographer: photographer } = usePhotographerStore();
  const [showInquiry, setShowInquiry] = useState(false);

  if (!photographer)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No photographer selected.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative w-60 h-60 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={photographer.profilePic}
            alt={photographer.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {photographer.name}
          </h1>
          <p className="text-gray-600">{photographer.bio}</p>

          <div className="flex flex-wrap gap-2">
            {photographer.styles?.map((style, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {style}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-2">
            <p className="text-lg font-semibold text-pink-600">
              ₹{photographer.price.toLocaleString()}
            </p>
            <div className="flex items-center">
              <Star size={20} className="text-yellow-500 mr-1" />
              <span className="font-medium text-gray-700">
                {photographer.rating}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowInquiry(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium mt-4"
          >
            Send Inquiry
          </button>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photographer.portfolio?.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-48 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <Image
                src={img}
                alt={`Portfolio ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h2>
        <div className="space-y-4">
          {photographer.reviews?.map((review, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-800">{review.name}</p>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="mr-1" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[400px] relative">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Send Inquiry
            </h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-pink-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-pink-600"
              />
              <textarea
                placeholder="Your Message"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-pink-600"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
