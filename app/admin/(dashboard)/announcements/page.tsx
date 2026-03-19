"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Announcement } from "@/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, Pin } from "lucide-react";

type AnnForm = { title: string; body: string; priority: Announcement["priority"]; is_pinned: boolean; is_published: boolean };
const emptyAnn: AnnForm = { title: "", body: "", priority: "normal", is_pinned: false, is_published: true };

const priorityVariant = { low: "gray" as const, normal: "blue" as const, high: "amber" as const, urgent: "red" as const };

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState(emptyAnn);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });
    setAnnouncements((data as Announcement[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchAnnouncements(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => { setEditing(null); setForm(emptyAnn); setModalOpen(true); };

  const openEdit = (a: Announcement) => {
    setEditing(a);
    setForm({ title: a.title, body: a.body, priority: a.priority, is_pinned: a.is_pinned, is_published: a.is_published });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await supabase.from("announcements").update(form).eq("id", editing.id);
    } else {
      await supabase.from("announcements").insert(form);
    }
    setModalOpen(false);
    setSaving(false);
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    fetchAnnouncements();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Announcements</h1>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> New Announcement</Button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-200 rounded-lg" />)}
        </div>
      ) : announcements.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No announcements yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Priority</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Pinned</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Published</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{a.title}</td>
                    <td className="px-4 py-3"><Badge variant={priorityVariant[a.priority]}>{a.priority}</Badge></td>
                    <td className="px-4 py-3">{a.is_pinned && <Pin className="h-4 w-4 text-amber-500" />}</td>
                    <td className="px-4 py-3">{a.is_published ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(a.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(a)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(a.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Announcement" : "New Announcement"}>
        <div className="space-y-4">
          <Input id="ann-title" label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <textarea
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Announcement["priority"] })}
            >
              {["low", "normal", "high", "urgent"].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_pinned} onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })} className="rounded border-gray-300" />
              Pinned
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="rounded border-gray-300" />
              Published
            </label>
          </div>
          <Button onClick={handleSave} loading={saving} className="w-full">
            {editing ? "Update" : "Create"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
