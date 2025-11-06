"use client";

import { useParams } from "next/navigation";
import { usePhotographerStore } from "../../store/photographerStore";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import Image from "next/image";

export default function PhotographerProfile() {
  const { id } = useParams();
  const { photographers, getPhotographerById } = usePhotographerStore();
  const [photographer, setPhotographer] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    const found = getPhotographerById(id)({ photographers });
    setPhotographer(found);
  }, [id, photographers, getPhotographerById]);

  if (!photographer) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between border-b pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {photographer.name}
            </h1>
            <p className="text-gray-600 mt-2">{photographer.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {photographer.styles?.map((s) => (
                <span
                  key={s}
                  className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-700">
              ₹{photographer.price}
            </p>
            <p className="text-sm text-gray-500">per session</p>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="bg-pink-600 text-white px-5 py-2 mt-3 rounded-full hover:bg-pink-700 transition"
            >
              Send Inquiry
            </button>
          </div>
        </div>

        {/* Gallery */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {photographer.gallery?.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Gallery ${i}`}
              className="rounded-lg object-cover w-full h-48 hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Reviews */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h2>
        <div className="space-y-5">
          {photographer.reviews?.length ? (
            photographer.reviews.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-800">{r.name}</p>
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {r.rating}
                  </span>
                </div>
                <p className="text-gray-600">{r.comment}</p>
                <p className="text-gray-400 text-sm mt-1">{r.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Send Inquiry</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Inquiry sent!");
                setShowInquiryModal(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full border px-3 py-2 rounded-lg outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full border px-3 py-2 rounded-lg outline-none"
              />
              <textarea
                placeholder="Message"
                required
                rows={4}
                className="w-full border px-3 py-2 rounded-lg outline-none"
              ></textarea>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
