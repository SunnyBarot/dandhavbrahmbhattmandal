import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { GalleryImage } from "@/types";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse community photo gallery.",
};

export default async function GalleryPage() {
  let images: GalleryImage[] = [];
  let albums: string[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    images = (data as GalleryImage[]) || [];
    albums = [...new Set(images.map((img) => img.album))];
  } catch {
    // Supabase not configured
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Photo Gallery</h1>
      <p className="text-gray-600 mb-8">Memories from our community events and activities.</p>
      <GalleryClient images={images} albums={albums} />
    </div>
  );
}
