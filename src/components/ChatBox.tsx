import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChatBox({
  showChat,
  setShowChat,
}: {
  showChat: boolean;
  setShowChat: (showChat: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      {showChat && (
        <div className="mt-5 w-[330px] h-[440px] justify-between rounded-2xl border bg-card text-card-foreground shadow-sm fixed right-2 bottom-2">
          <div className="space-y-1.5 p-6 flex flex-row items-center">
            <div className="flex items-center space-x-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                  alt=""
                />
              </span>
              <div>
                <p className="text-sm font-medium leading-none">Meta Mask</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0 h-[64%]">
            <div className="space-y-4">
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-3xl px-3 py-2 text-sm bg-muted dark:#303030">
                Hi, how can I help you today?
              </div>
              {/* Add more chat messages here */}
            </div>
          </div>
          <div className="flex items-center mt-1 mb-2 p-6 pt-0">
            <Input
              className="rounded-xl mr-2 h-10 "
              placeholder="Type your message..."
              value={inputValue} // Set input value
              onChange={(e) => setInputValue(e.target.value)} // Handle input change
            />
            <Button className="bg-orange-500 outline-gray-600 inline-flex items-center justify-center text-sm font-medium border border-input hover:bg-orange-500/90 h-10 w-10 ml-auto rounded-xl">
              <p className="text-xl">
                <SendHorizontal size={15} strokeWidth={2} />
              </p>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
