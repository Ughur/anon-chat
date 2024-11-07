"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageList } from "@/components/chat/message-list";
import { MessageInput } from "@/components/chat/message-input";
import { CountrySelect } from "@/components/chat/country-select";
import { OnlineUsers } from "@/components/chat/online-users";
import { useChat } from "@/hooks/useChat";
import { Loader2, Users } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const { sendMessage, findNewChat, connected, searching } = useChat();

  return (
    <>
      <main className="container mx-auto flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center p-2 sm:p-4">
        <Card className="w-full max-w-2xl">
          <div className="flex flex-col gap-4 border-b p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <h1 className="text-lg font-semibold sm:text-xl">
                  Anonymous Chat
                </h1>
              </div>
              <CountrySelect />
            </div>
            <Button
              variant={connected ? "destructive" : "default"}
              onClick={findNewChat}
              disabled={searching}
              className="w-full sm:w-auto"
            >
              {searching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding...
                </>
              ) : connected ? (
                "Next Chat"
              ) : (
                "Start Chat"
              )}
            </Button>
          </div>

          <div className="border-b p-2">
            <OnlineUsers />
          </div>

          <div className="flex h-[calc(100dvh-12rem)] flex-col space-y-4 p-3 sm:h-[600px] sm:p-4">
            <MessageList />
            <MessageInput
              onSendMessage={sendMessage}
              disabled={!connected || searching}
            />
          </div>
        </Card>
      </main>
      <Footer />
    </>
  );
}
