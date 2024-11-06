"use client";

import { Fragment } from "react";
import { useChatStore } from "@/lib/store";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { motion } from "framer-motion";
import React from "react";

const countries = [
  { value: "global", label: "Global", flag: "🌍" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "es", label: "Spain", flag: "🇪🇸" },
  { value: "it", label: "Italy", flag: "🇮🇹" },
  { value: "jp", label: "Japan", flag: "🇯🇵" },
  { value: "az", label: "Azerbaijan", flag: "🇦🇿" },
  { value: "tr", label: "Turkey", flag: "🇹🇷" },
  { value: "br", label: "Brazil", flag: "🇧🇷" },
  { value: "in", label: "India", flag: "🇮🇳" },
  { value: "cn", label: "China", flag: "🇨🇳" },
  { value: "ru", label: "Russia", flag: "🇷🇺" },
  { value: "kr", label: "South Korea", flag: "🇰🇷" },
  { value: "sa", label: "Saudi Arabia", flag: "🇸🇦" },
  { value: "ae", label: "UAE", flag: "🇦🇪" },
  { value: "eg", label: "Egypt", flag: "🇪🇬" },
];

export function CountrySelect() {
  const { selectedCountry, setSelectedCountry, connected, searching } =
    useChatStore();

  return (
    <div className="relative">
      <Select
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        disabled={connected || searching}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-base">
                {countries.find((c) => c.value === selectedCountry)?.flag}
              </span>
              {countries.find((c) => c.value === selectedCountry)?.label}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton />
          <SelectGroup>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center gap-2">
                  <span className="text-base">{country.flag}</span>
                  {country.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    </div>
  );
}

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 rotate-180" />
  </div>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </div>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
