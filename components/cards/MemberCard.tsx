import Image from "next/image";
import { Resident } from "@/types";
import { Building2, Home as HomeIcon } from "lucide-react";

export default function MemberCard({ member }: { member: Resident }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0">
          {member.avatar_url ? (
            <Image
              src={member.avatar_url}
              alt={member.full_name}
              fill
              className="rounded-full object-cover"
              sizes="56px"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">
                {member.full_name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{member.full_name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <HomeIcon className="h-3.5 w-3.5 shrink-0" />
            <span>Unit {member.unit_number}</span>
          </div>
          {member.building_name && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{member.building_name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
