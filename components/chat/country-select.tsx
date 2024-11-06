"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChatStore } from "@/lib/store";
import { Globe } from "lucide-react";

const countries = [
  { value: "global", label: "Global" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
];

export function CountrySelect() {
  const { selectedCountry, setSelectedCountry, connected, searching } =
    useChatStore();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <Select
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        disabled={connected || searching}
      >
        <SelectTrigger className="w-[140px] sm:w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
