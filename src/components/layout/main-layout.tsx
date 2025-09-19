import { Outlet } from "react-router-dom";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { UserProfile } from "@/components/layout/user-profile";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

export function MainLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="flex justify-between items-center p-8 pb-4">
          <div className="flex-1" />
          {user?.email && <UserProfile userEmail={user.email} />}
        </div>
        <div className="px-8 pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}