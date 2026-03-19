"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GalleryImage } from "@/types";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Plus, Trash2, Upload } from "lucide-react";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [album, setAlbum] = useState("general");
  const [file, setFile] = useState<File | null>(null);

  const supabase = createClient();

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    setImages((data as GalleryImage[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);

    await supabase.from("gallery_images").insert({
      url: publicUrl,
      caption: caption || null,
      album,
    });

    setModalOpen(false);
    setCaption("");
    setAlbum("general");
    setFile(null);
    setUploading(false);
    fetchImages();
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm("Delete this image?")) return;

    const fileName = image.url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("gallery_images").delete().eq("id", image.id);
    fetchImages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Upload Image
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />)}
        </div>
      ) : images.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No images yet. Upload your first photo!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
              <Image src={img.url} alt={img.caption || "Gallery"} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <Button
                  variant="danger"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(img)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/50 p-2 text-white text-xs truncate">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Image">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">{file ? file.name : "Click to select an image"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <Input id="gallery-caption" label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Optional caption" />
          <Input id="gallery-album" label="Album" value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="general" />
          <Button onClick={handleUpload} loading={uploading} disabled={!file} className="w-full">
            Upload
          </Button>
        </div>
      </Modal>
    </div>
  );
}
