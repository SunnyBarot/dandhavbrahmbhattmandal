"use client";

import { useEffect, useState } from "react";
import { Resident } from "@/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Check, X } from "lucide-react";

export default function AdminMembersPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // ✅ Load from localStorage
  const fetchResidents = () => {
    setLoading(true);

    const stored = localStorage.getItem("residents");
    let data: Resident[] = stored ? JSON.parse(stored) : [];

    // Apply filter
    if (filter !== "all") {
      data = data.filter((r) => r.status === filter);
    }

    setResidents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResidents();
  }, [filter]);

  // ✅ Save to localStorage
  const saveToStorage = (data: Resident[]) => {
    localStorage.setItem("residents", JSON.stringify(data));
    fetchResidents();
  };

  // ✅ Update status
  const updateStatus = (id: string, status: "approved" | "rejected") => {
    const stored = localStorage.getItem("residents");
    let data: Resident[] = stored ? JSON.parse(stored) : [];

    const updated = data.map((r) =>
      r.id === id ? { ...r, status } : r
    );

    saveToStorage(updated);
  };

  const statusVariant = {
    pending: "amber" as const,
    approved: "green" as const,
    rejected: "red" as const,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Manage Members
      </h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : residents.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No residents found.
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Unit</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {residents.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {r.full_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.email}
                    </td>
                    <td className="px-4 py-3">
                      {r.unit_number}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[r.status]}>
                        {r.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              updateStatus(r.id, "approved")
                            }
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              updateStatus(r.id, "rejected")
                            }
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}