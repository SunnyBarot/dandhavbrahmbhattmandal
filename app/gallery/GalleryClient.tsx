"use client";

import { useState } from "react";
import { GalleryImage } from "@/types";
import ImageGallery from "@/components/gallery/ImageGallery";

export default function GalleryClient({ images, albums }: { images: GalleryImage[]; albums: string[] }) {
  const [selectedAlbum, setSelectedAlbum] = useState("all");

  const filtered = selectedAlbum === "all" ? images : images.filter((img) => img.album === selectedAlbum);

  return (
    <>
      {albums.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedAlbum("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedAlbum === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedAlbum === album ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {album}
            </button>
          ))}
        </div>
      )}
      <ImageGallery images={filtered} />
    </>
  );
}
