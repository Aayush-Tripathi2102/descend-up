"use client";

import { DEMO_SESSION } from "@/lib/demo";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
  const client = useQueryClient();

  const logout = async () => {
    localStorage.removeItem(DEMO_SESSION);
    client.clear();
    window.location.assign("/login/");
  };

  return (
    <button onClick={logout} className="rounded border border-border px-4 py-2 text-sm">
      Logout
    </button>
  );
}
