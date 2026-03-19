"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryImage } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1));
  const next = () => setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0));

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No photos yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => openLightbox(index)}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={img.url}
              alt={img.caption || "Gallery image"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm truncate">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-lg z-10">
            <X className="h-6 w-6" />
          </button>
          <button onClick={prev} className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-lg">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button onClick={next} className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-lg">
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh] mx-4">
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].caption || "Gallery image"}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {images[lightboxIndex].caption && (
            <p className="absolute bottom-6 text-white text-center w-full">{images[lightboxIndex].caption}</p>
          )}
        </div>
      )}
    </>
  );
}
