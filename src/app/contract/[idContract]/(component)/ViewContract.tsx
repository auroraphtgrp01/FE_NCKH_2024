"use client";
import React, { useState } from "react";

import DialogEditContract from './DialogEditContract';
import ChatBox from "@/components/ChatBox";
import PreviewContract from './PreviewContract';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, FilePen, MessagesSquare, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ViewContract() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="mt-2 overflow-hidden">
      <div className="grid xl:grid-cols-3 justify-between w-full ">
        <div className="p-4 w-[500px] col-span-1">
          <Card className="rounded-xl border bg-grey-50 text-card-foreground">
            <div className="flex flex-col p-6 space-y-1">
              <h3 className="font-semibold tracking-tight text-2xl">
                Information
              </h3>
            </div>
            <div className="p-6 pt-0 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">AddressWallet</Label>
                <Input
                  className="flex h-10 w-full border border-input rounded-xl"
                  id="name"
                  placeholder="m@example.com"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Your Party</Label>
                <Input
                  className="flex h-10 w-full border border-input rounded-xl"
                  id="name"
                  placeholder="Your Party"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Contract Status</Label>
                <Input
                  className="flex h-10 w-full border border-input rounded-xl"
                  id="name"
                  placeholder="Contract Status"
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center px-6 mb-2 justify-between">
              <Button className="text-sm bg-green-500 hover:bg-green-500/90 dark:text-white outline-none border-none py-2 px-2 mr-1 border rounded-md shadow flex">
                <Check size={17} strokeWidth={2.5} className="mr-1" />
                Accept
              </Button>
              <Button className=" text-sm bg-gradient-to-r  bg-red-500 hover:bg-red-500/90 dark:text-white outline-none border-none py-2 px-2 mr-1 border rounded-md shadow flex">
                <X size={17} strokeWidth={2.5} className="mr-1" />
                Refuse the invition
              </Button>
              <Button
                className="text-sm  bg-orange-500 hover:bg-orange-500/90 dark:text-white outline-none border-none py-2 px-2 mr-1 border rounded-md shadow flex"
                onClick={() => setShowChat(!showChat)}
              >
                <MessagesSquare size={17} strokeWidth={2.5} className="mr-1" />
                Chat with parties
              </Button>
            </div>
            <div className="flex items-center p-3 pt-0 mb-3 mx-10 space-x-2">
              <div>
                <DialogEditContract />
              </div>
              <div>
                <Button className="text-white text-sm bg-blue-500 hover:bg-blue-500/90 dark:text-white outline-none border-none py-2 px-2 mr-3 border rounded-md shadow">
                  <FilePen size={17} strokeWidth={2.5} className="mr-1" />
                  Sign a contract
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2"></div>
          </Card>
        </div>
        <div className="p-4 w-[95%] col-span-2 xl:ml-[6%] sm:ml-0">
          <PreviewContract></PreviewContract>
        </div>
      </div >
      <ChatBox showChat={showChat} setShowChat={setShowChat}></ChatBox>
    </div >
  );
}

