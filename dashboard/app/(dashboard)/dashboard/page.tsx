import { demoUser } from "@/lib/demo";
import DashboardClient from "./_components/DashboardClient";

export default function DashboardPage() {
  return <DashboardClient user={demoUser} />;
}
