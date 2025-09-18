import { Outlet } from "react-router-dom";
import { SidebarNav } from "@/components/ui/sidebar-nav";

export function MainLayout() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}