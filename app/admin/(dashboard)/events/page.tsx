"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Plus, Pencil, Trash2 } from "lucide-react";

type EventForm = {
  title: string;
  description: string;
  event_date: string;
  end_date: string;
  location: string;
  image_url: string;
  category: Event["category"];
  is_published: boolean;
};

const emptyEvent: EventForm = {
  title: "",
  description: "",
  event_date: "",
  end_date: "",
  location: "",
  image_url: "",
  category: "general",
  is_published: true,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });
    setEvents((data as Event[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => {
    setEditing(null);
    setForm(emptyEvent);
    setModalOpen(true);
  };

  const openEdit = (event: Event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      event_date: event.event_date.slice(0, 16),
      end_date: event.end_date?.slice(0, 16) || "",
      location: event.location,
      image_url: event.image_url || "",
      category: event.category,
      is_published: event.is_published,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      end_date: form.end_date || null,
      image_url: form.image_url || null,
    };

    if (editing) {
      await supabase.from("events").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("events").insert(payload);
    }
    setModalOpen(false);
    setSaving(false);
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> New Event</Button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-200 rounded-lg" />)}
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Published</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{e.title}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(e.event_date)}</td>
                    <td className="px-4 py-3"><Badge>{e.category}</Badge></td>
                    <td className="px-4 py-3">{e.is_published ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(e)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(e.id)}>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Event" : "New Event"}>
        <div className="space-y-4">
          <Input id="event-title" label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input id="event-date" label="Start Date" type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
            <Input id="event-end" label="End Date" type="datetime-local" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
          </div>
          <Input id="event-location" label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input id="event-image" label="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Event["category"] })}
            >
              {["general", "meeting", "festival", "maintenance", "social"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
              className="rounded border-gray-300"
            />
            Published
          </label>
          <Button onClick={handleSave} loading={saving} className="w-full">
            {editing ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
