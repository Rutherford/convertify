"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Format = {
  value: string;
  label: string;
};

type FormatSelectorProps = {
  formats: Format[];
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  className?: string;
};

export function FormatSelector({
  formats,
  selectedFormat,
  onFormatChange,
  className,
}: FormatSelectorProps) {
  if (formats.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No compatible formats available for this file type.
      </div>
    );
  }

  return (
    <RadioGroup
      value={selectedFormat}
      onValueChange={onFormatChange}
      className={cn("flex flex-wrap gap-4", className)}
    >
      {formats.map((format) => (
        <div key={format.value} className="flex items-center space-x-2">
          <RadioGroupItem value={format.value} id={format.value} />
          <Label
            htmlFor={format.value}
            className={cn(
              "cursor-pointer rounded-md border border-transparent px-3 py-1 text-sm transition-colors",
              selectedFormat === format.value
                ? "border-primary/50 bg-primary/5 text-primary"
                : "hover:bg-muted"
            )}
          >
            {format.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
