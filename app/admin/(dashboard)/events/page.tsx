"use client";

import { useEffect, useState } from "react";
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

  // ✅ Load from localStorage
  const fetchEvents = () => {
    setLoading(true);
    const stored = localStorage.getItem("events");
    const data: Event[] = stored ? JSON.parse(stored) : [];
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Save to localStorage
  const saveToStorage = (data: Event[]) => {
    localStorage.setItem("events", JSON.stringify(data));
    setEvents(data);
  };

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

  const handleSave = () => {
    setSaving(true);

    let updatedList: Event[] = [];

    if (editing) {
      // ✅ Update
      updatedList = events.map((e) =>
        e.id === editing.id
          ? {
              ...e,
              ...form,
              end_date: form.end_date || null,
              image_url: form.image_url || null,
            }
          : e
      );
    } else {
      // ✅ Create
      const newEvent: Event = {
        id: Date.now().toString(),
        ...form,
        end_date: form.end_date || null,
        image_url: form.image_url || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: "admin",
      };

      updatedList = [newEvent, ...events];
    }

    saveToStorage(updatedList);

    setModalOpen(false);
    setSaving(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const updatedList = events.filter((e) => e.id !== id);
    saveToStorage(updatedList);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> New Event
        </Button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Published</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{e.title}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(e.event_date)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge>{e.category}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {e.is_published ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(e)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(e.id)}
                        >
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Event" : "New Event"}
      >
        <div className="space-y-4">
          <Input
            id="event-title"
            label="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border rounded-lg p-2"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              value={form.event_date}
              onChange={(e) =>
                setForm({ ...form, event_date: e.target.value })
              }
            />
            <Input
              type="datetime-local"
              value={form.end_date}
              onChange={(e) =>
                setForm({ ...form, end_date: e.target.value })
              }
            />
          </div>

          <Input
            label="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <Input
            label="Image URL"
            value={form.image_url}
            onChange={(e) =>
              setForm({ ...form, image_url: e.target.value })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as Event["category"],
              })
            }
          >
            {["general", "meeting", "festival", "maintenance", "social"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) =>
                setForm({ ...form, is_published: e.target.checked })
              }
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