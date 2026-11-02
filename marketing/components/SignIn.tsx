"use client";
import { consoleUrl } from "@/lib/demo";

export default function SignIn() {
  return <div className="flex flex-col items-center justify-center min-h-screen gap-4"><h1 className="text-2xl">Please sign in to access this page</h1><a href={consoleUrl()} className="border-2 border-black px-6 py-3">Continue with demo account</a></div>;
}
