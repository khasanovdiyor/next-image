import { signIn } from "@/actions/index";
import GoogleIcon from "@/components/shared/icons/googleIcon";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LoadingDots from "./shared/icons/loading-dots";
import { Button } from "./ui/button";
import { useState } from "react";

export default function SignInModal() {
  const [loading, setLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
            <a href="https://precedent.dev">
              <Image
                src="/next.svg"
                alt="Logo"
                className="h-10 w-10 rounded-full"
                width={20}
                height={20}
              />
            </a>
            <h3 className="font-display text-2xl font-bold">Sign In</h3>
            <p className="text-sm text-gray-500">
              This is strictly for demo purposes - only your email and profile
              picture will be stored.
            </p>
          </div>

          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
            <button
              className={`${"border border-gray-200 bg-white text-black hover:bg-gray-50"} flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setLoading(true);
                signIn();
              }}
            >
              {loading ? (
                <LoadingDots />
              ) : (
                <>
                  <GoogleIcon className="h-5 w-5" />
                  Sign in with Google
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
