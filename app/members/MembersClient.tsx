"use client";

import { useState, useCallback } from "react";
import { Resident } from "@/types";
import MemberCard from "@/components/cards/MemberCard";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination";
import { Users } from "lucide-react";

const PAGE_SIZE = 20;

export default function MembersClient({ members }: { members: Resident[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, []);

  const filtered = members.filter(
    (m) =>
      m.full_name.toLowerCase().includes(query.toLowerCase()) ||
      m.unit_number.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (members.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No members to display yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search by name or unit number..." />
      </div>
      {paginated.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No members match your search.</p>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
