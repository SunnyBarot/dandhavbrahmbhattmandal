"use client";

import { useEffect, useState } from "react";
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

  // ✅ Load from localStorage
  const fetchImages = () => {
    setLoading(true);
    const stored = localStorage.getItem("gallery");
    const data: GalleryImage[] = stored ? JSON.parse(stored) : [];
    setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Save to localStorage
  const saveToStorage = (data: GalleryImage[]) => {
    localStorage.setItem("gallery", JSON.stringify(data));
    setImages(data);
  };

  // ✅ Convert file to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const base64 = await toBase64(file);

      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: base64, // ✅ store base64 instead of URL
        caption: caption || null,
        album,
        created_at: new Date().toISOString(),
        uploaded_by: "admin",
      };

      const updated = [newImage, ...images];
      saveToStorage(updated);

      // Reset
      setModalOpen(false);
      setCaption("");
      setAlbum("general");
      setFile(null);
    } catch {
      alert("Upload failed");
    }

    setUploading(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this image?")) return;

    const updated = images.filter((img) => img.id !== id);
    saveToStorage(updated);
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
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No images yet. Upload your first photo!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
              <Image
                src={img.url}
                alt={img.caption || "Gallery"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <Button
                  variant="danger"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(img.id)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image File
            </label>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                {file ? file.name : "Click to select an image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          <Input
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <Input
            label="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />

          <Button
            onClick={handleUpload}
            loading={uploading}
            disabled={!file}
            className="w-full"
          >
            Upload
          </Button>
        </div>
      </Modal>
    </div>
  );
}