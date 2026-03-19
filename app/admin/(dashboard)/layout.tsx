import AdminSidebar from "./AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 md:p-8 md:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}
