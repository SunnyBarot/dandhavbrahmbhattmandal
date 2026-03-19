"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Resident } from "@/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Check, X } from "lucide-react";

export default function AdminMembersPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchResidents = async () => {
    setLoading(true);
    let query = supabase.from("residents").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setResidents((data as Resident[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchResidents(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("residents").update({ status }).eq("id", id);
    fetchResidents();
  };

  const statusVariant = { pending: "amber" as const, approved: "green" as const, rejected: "red" as const };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Members</h1>

      <div className="flex gap-2 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-200 rounded-lg" />)}
        </div>
      ) : residents.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No residents found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Unit</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {residents.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{r.full_name}</td>
                    <td className="px-4 py-3 text-gray-600">{r.email}</td>
                    <td className="px-4 py-3">{r.unit_number}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[r.status]}>{r.status}</Badge></td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(r.created_at)}</td>
                    <td className="px-4 py-3">
                      {r.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" onClick={() => updateStatus(r.id, "approved")}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => updateStatus(r.id, "rejected")}>
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
