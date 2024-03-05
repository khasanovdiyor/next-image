import { signOut } from "@/actions";
import { LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Session } from "next-auth";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image, name } = session?.user || {};

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover>
        <PopoverTrigger asChild>
          <Button asChild size={"icon"} className="rounded-full cursor-pointer">
            <Image
              alt={email}
              src={
                image ||
                `https://api.dicebear.com/7.x/pixel-art/svg?seed=${email}`
              }
              width={40}
              height={40}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <div className="p-2">
              {name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">{email}</p>
            </div>
            <Link
              href="/my-images"
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <p className="text-sm">My Images</p>
            </Link>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
