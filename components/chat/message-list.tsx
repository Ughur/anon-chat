"use client";

import { useChatStore } from "@/lib/store";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-2 sm:p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={cn(
              "flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm sm:max-w-[75%]",
              message.sender === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : message.sender === "stranger"
                ? "bg-muted"
                : "mx-auto italic text-muted-foreground"
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
