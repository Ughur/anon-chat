"use client";

import { useChatStore } from "@/lib/store";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Reply } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useMediaQuery } from "@/hooks/use-media-query";

export function MessageList() {
  const messages = useChatStore((state) => state.messages);
  const setReplyingTo = useChatStore((state) => state.setReplyingTo);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleReply = (message: any) => {
    setReplyingTo(message);
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (!isMobile) return;
      const messageElement = (eventData.event.target as HTMLElement).closest(
        "[data-message-id]"
      );
      if (messageElement) {
        const messageId = messageElement.getAttribute("data-message-id");
        const message = messages.find((m) => m.id === messageId);
        if (message && message.sender === "stranger") {
          handleReply(message);
        }
      }
    },
    onSwipedLeft: (eventData) => {
      if (!isMobile) return;
      const messageElement = (eventData.event.target as HTMLElement).closest(
        "[data-message-id]"
      );
      if (messageElement) {
        const messageId = messageElement.getAttribute("data-message-id");
        const message = messages.find((m) => m.id === messageId);
        if (message && message.sender === "user") {
          handleReply(message);
        }
      }
    },
    delta: 50,
    swipeDuration: 250,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <ScrollArea className="relative flex-1 p-2 sm:p-4" ref={scrollRef}>
      <div className="space-y-4" {...(isMobile ? swipeHandlers : {})}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              data-message-id={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative"
              drag={isMobile && message.sender !== "system" ? "x" : false}
              dragConstraints={{
                left: message.sender === "user" ? -50 : 0,
                right: message.sender === "stranger" ? 50 : 0,
              }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (message.sender === "stranger" && info.offset.x > 30) {
                  handleReply(message);
                } else if (message.sender === "user" && info.offset.x < -30) {
                  handleReply(message);
                }
              }}
            >
              <div
                className={cn(
                  "relative flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm sm:max-w-[75%]",
                  message.sender === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : message.sender === "stranger"
                    ? "bg-muted"
                    : "mx-auto italic text-muted-foreground"
                )}
              >
                {message.replyTo && (
                  <div
                    className={cn(
                      "rounded-md px-2 py-1 text-xs",
                      message.sender === "user"
                        ? "bg-primary-foreground/10 text-primary-foreground"
                        : "bg-background text-foreground"
                    )}
                  >
                    <div className="opacity-70">
                      {message.replyTo.sender === "user"
                        ? "You"
                        : message.replyTo.sender === "stranger"
                        ? "Stranger"
                        : "System"}
                    </div>
                    <div className="line-clamp-1">
                      {message.replyTo.content}
                    </div>
                  </div>
                )}
                {message.content}
                {!isMobile && message.sender !== "system" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(message);
                    }}
                    className={cn(
                      "absolute -left-10 top-1/2 -translate-y-1/2 rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100",
                      message.sender === "user" && "-right-10 -left-auto"
                    )}
                  >
                    <Reply className="h-4 w-4" />
                  </button>
                )}
              </div>
              {isMobile && message.sender !== "system" && (
                <div
                  className={cn(
                    "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100",
                    message.sender === "user" ? "-left-6" : "-right-6"
                  )}
                >
                  <Reply
                    className={cn(
                      "h-4 w-4 text-muted-foreground",
                      message.sender === "user" && "rotate-180"
                    )}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
