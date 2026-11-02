import { ReactNode } from "react";
import Image from "next/image";

import { demoUser } from "@/lib/demo";
import DemoSession from "@/components/DemoSession";
import ThemeToggle from "@/components/theme-toggle";
import DashboardSidebar from "@/components/dashboard-sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = demoUser;

  return (
    <DemoSession>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <aside className="flex w-60 flex-col border-r border-border">
          {/* Header */}
          <div className="border-b border-border p-4">
            <Image
              src="/logo.svg"
              alt="DescendUp Logo"
              width={120.83}
              height={41.46}
            />
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <DashboardSidebar />
          </div>

          {/* Footer */}
          <div className="border-t border-border p-6 text-sm">
            <div className="flex items-center gap-3">
              {user.image && (
                <Image
                  src={user.image}
                  alt={user.youtubeChannelTitle ?? "YouTube Channel"}
                  width={32}
                  height={32}
                  className="rounded-full border object-cover"
                />
              )}

              <div className="min-w-0 flex-1">
                <p className="font-medium">Workspace</p>

                <p className="text-xs text-muted-foreground capitalize">
                  {user.plan} Plan
                </p>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </aside>
        <div className="w-full min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </DemoSession>
  );
}
