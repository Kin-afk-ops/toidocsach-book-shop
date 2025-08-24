"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import SignInBlock from "./SignInBlock";
import SignUpBlock from "./SignUpBlock";

interface ChildProps {
  mode: boolean;
  setDialogOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthBlock: React.FC<ChildProps> = ({ mode, setDialogOpenSignIn }) => {
  const [signInMode, setSignInMode] = useState<boolean>(mode);

  return (
    <DialogContent
      className="bg-white sm:max-w-[425px]"
      onClick={(e) => e.stopPropagation()}
      onInteractOutside={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("input")) {
          e.preventDefault();
        }
      }}
    >
      {signInMode ? (
        <>
          <DialogHeader>
            <DialogTitle className="flex justify-center ">
              <Button
                variant="outline"
                className="w-[70%] relative overflow-hidden group border-none bg-white hover:bg-white justify-start h-[60px]"
              >
                <span className="relative z-10 text-3xl text-[#e11d48]">
                  Sign In
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#e11d48] transition-all duration-500 w-full" />
              </Button>
              <Button
                onClick={() => setSignInMode(false)}
                variant="outline"
                className="flex w-[30%] relative overflow-hidden group border-none cursor-pointer bg-white hover:bg-white items-end justify-center t h-[60px]"
              >
                <span className="relative z-10 text-[14px] pb-[2px] text-[#646464] group-hover:text-[#e11d48]">
                  Sign Up
                </span>
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#e11d48] transition-all duration-500 group-hover:w-full" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <SignInBlock onClose={() => setDialogOpenSignIn(false)} />
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              <Button
                onClick={() => setSignInMode(true)}
                variant="outline"
                className="flex w-[30%] relative overflow-hidden group border-none cursor-pointer bg-white hover:bg-white items-end justify-center h-[60px]"
              >
                <span className="relative z-10 text-[14px] pb-[2px] text-[#646464] group-hover:text-[#e11d48] ">
                  Sign In
                </span>
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#e11d48] transition-all duration-500 group-hover:w-full" />
              </Button>

              <Button
                variant="outline"
                className="w-[70%] relative overflow-hidden group border-none bg-white hover:bg-white justify-end  h-[60px]"
              >
                <span className="relative z-10 text-3xl text-[#e11d48] py-2">
                  Sign Up
                </span>
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#e11d48] transition-all duration-500 w-full" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <SignUpBlock />
        </>
      )}
    </DialogContent>
  );
};

export default AuthBlock;
