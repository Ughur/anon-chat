"use client";

import { useChatStore } from "@/lib/store";
import { Users } from "lucide-react";

export function OnlineUsers() {
  const availableUsers = useChatStore((state) => state.availableUsers);
  const selectedCountry = useChatStore((state) => state.selectedCountry);

  const totalUsers = Object.values(availableUsers).reduce((a, b) => a + b, 0);
  const usersInCountry =
    selectedCountry !== "global"
      ? availableUsers[selectedCountry] || 0
      : totalUsers;

  return (
    <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground sm:text-sm">
      <Users className="h-4 w-4" />
      <span>
        {usersInCountry} {selectedCountry === "global" ? "total" : "in country"}{" "}
        online
      </span>
    </div>
  );
}
