"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  ChartNoAxesColumn,
  Lightbulb,
  Bot,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analyze",
    href: "/analyze",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Optimization",
    href: "/optimization",
    icon: Zap,
  },
  {
    title: "Insights",
    href: "/insights",
    icon: Lightbulb,
  },
  {
    title: "AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-3">
      {navItems.map((item) => {
        const Icon = item.icon;

        const selected =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md p-3 text-sm font-medium text-muted-foreground",
              selected && "border border-border bg-card text-foreground",
            )}
          >
            <Icon className={cn("size-5", selected && "text-primary")} />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
