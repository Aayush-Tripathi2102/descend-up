"use client";

import { useGetDashboardStats } from "@/hooks/dashboard";
import { DashboardStats } from "./DashboardStats";
import { useEffect, useState } from "react";
import { readLocal } from "@/lib/demo";

export default function DashboardClient({ user }: { user: { name: string } }) {
  const { isLoading, error } = useGetDashboardStats();
  const [name, setName] = useState(user.name);
  useEffect(() => {
    const update = () => setName(readLocal("descendup-demo-settings-v1", { name: user.name }).name);
    update();
    window.addEventListener("demo-settings-updated", update);
    return () => window.removeEventListener("demo-settings-updated", update);
  }, [user.name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <section className="py-4">
        <h1 className="text-2xl font-space font-bold">
          Welcome back, {name}
        </h1>

        <p className="text-muted-foreground text-sm mt-2">
          Here&apos;s your sample channel overview for the selected reporting period.
        </p>
      </section>
      <section>
        <DashboardStats />
      </section>
    </div>
  );
}
