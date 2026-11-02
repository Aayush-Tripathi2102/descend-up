"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { consoleUrl } from "@/lib/demo";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar({ user }: { user: { name?: string } | null }) {
  const router = useRouter();

  const logout = async () => {
    window.location.href = consoleUrl();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const signInWithGoogle = () => {
    window.location.href = consoleUrl();
  };

  const navItems = ["The Flow", "Core Features", "Early Access Program", "FAQ"];

  return (
    <nav className="z-50 flex items-center justify-between border-b-[3px] border-black bg-white p-4 font-sans">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.svg" alt="DescendUp Logo" width={163} height={32} />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden list-none gap-8 lg:flex">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase().replace(/ /g, "-"));
              }}
              className="cursor-pointer text-[16px] uppercase tracking-widest text-black transition-colors hover:text-red-600"
            >
              {item}
            </a>
          </li>
        ))}

        <li>
          <Link
            href="/pricing"
            className="text-[16px] uppercase tracking-widest text-black transition-colors hover:text-red-600"
          >
            Pricing
          </Link>
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden gap-4 md:flex">
        <Button
          text="ANALYSE MY CHANNEL"
          color="blue"
          onClick={() => router.push("/analyse")}
          textStyle="text-[10.62px] text-white"
        />

        {user ? (
          <Button
            text="LOGOUT"
            onClick={logout}
            textStyle="text-[10.62px] text-white"
          />
        ) : (
          <Button
            text="GO TO CONSOLE"
            onClick={signInWithGoogle}
            textStyle="text-[10.62px] text-white"
          />
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="rounded-md p-1 transition hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="pl-0! ml-0 border-0!">
            <div className="border-l-2 h-full border-black">
              <div className="border-b-2 border-black px-6 py-5">
                <Link href="/" className="inline-flex">
                  <Image
                    src="/logo.svg"
                    alt="DescendUp Logo"
                    width={150}
                    height={30}
                  />
                </Link>
              </div>

              {/* Navigation */}
              <div className="flex h-full flex-col justify-between px-6 py-8">
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item}>
                      <button
                        onClick={() =>
                          scrollToSection(item.toLowerCase().replace(/ /g, "-"))
                        }
                        className="block w-full text-left text-lg font-medium uppercase tracking-[0.18em] transition-colors hover:text-red-600"
                      >
                        {item}
                      </button>
                    </SheetClose>
                  ))}

                  <SheetClose asChild>
                    <Link
                      href="/pricing"
                      className="block text-lg font-medium uppercase tracking-[0.18em] transition-colors hover:text-red-600"
                    >
                      Pricing
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <div className="w-full">
                      <Button
                        text="ANALYSE MY CHANNEL"
                        color="blue"
                        onClick={() => router.push("/analyse")}
                        textStyle="text-[10.62px] text-white"
                      />
                    </div>
                  </SheetClose>

                  {user ? (
                    <SheetClose asChild>
                      <div className="w-full">
                        <Button
                          text="LOGOUT"
                          onClick={logout}
                          textStyle="text-[10.62px] text-white"
                        />
                      </div>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <div className="w-full">
                        <Button
                          text="GO TO CONSOLE"
                          onClick={signInWithGoogle}
                          textStyle="text-[10.62px] text-white"
                        />
                      </div>
                    </SheetClose>
                  )}
                </div>
              </div>
            </div>
            {/* Header */}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
