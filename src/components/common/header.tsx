"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-primary" />
        <span className="text-xl font-semibold">Career</span>
        <span className="text-xl font-semibold text-primary">Dock</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/docs"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Docs
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Pricing
        </Link>
        <Link
          href="/guides"
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Guides
          <ChevronRight className="h-4 w-4" />
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <Button asChild className="hidden md:inline-flex">
          <Link href="/start">Start</Link>
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link
                href="/docs"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/guides"
                className="flex items-center gap-1 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Guides
                <ChevronRight className="h-5 w-5" />
              </Link>
              <hr className="my-4" />
              <Button variant="outline" asChild className="w-full">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="w-full bg-[#1C1C1C] hover:bg-[#2C2C2C]"
              >
                <Link href="/start" onClick={() => setIsOpen(false)}>
                  Start
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
