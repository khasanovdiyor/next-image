"use client";

import Link from "next/link";
import SignInModal from "./signin-modal";
import UserDropdown from "./user-dropdown";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-12 flex h-16 items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <p>Next Image</p>
          </Link>
          <div>
            {session ? <UserDropdown session={session} /> : <SignInModal />}
          </div>
        </div>
      </div>
    </>
  );
}
