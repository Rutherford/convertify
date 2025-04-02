"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type FileUploadDropzoneProps = {
  onFileSelected: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  uploadProgress?: number;
  selectedFile?: File | null;
  isProcessing?: boolean;
  onClear?: () => void;
  error?: string;
};

export function FileUploadDropzone({
  onFileSelected,
  accept,
  maxSize = 100 * 1024 * 1024, // 100MB default
  className,
  uploadProgress,
  selectedFile,
  isProcessing = false,
  onClear,
  error,
}: FileUploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0]);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled: isProcessing || !!selectedFile,
  });

  // Set drag state for styling
  const dragProps = {
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDragOver: () => setDragActive(true),
    onDrop: () => setDragActive(false),
  };

  // Determine content to show based on state
  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="mb-2 h-10 w-10 text-destructive" />
          <p className="text-destructive">{error}</p>
          <Button
            variant="ghost"
            onClick={onClear}
            className="mt-4"
            type="button"
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (selectedFile && isProcessing) {
      return (
        <div className="flex w-full flex-col items-center justify-center">
          <File className="mb-4 h-10 w-10 text-primary" />
          <p className="text-sm text-muted-foreground">Processing {selectedFile.name}</p>
          {uploadProgress !== undefined && (
            <div className="mt-4 w-full max-w-xs">
              <Progress value={uploadProgress} className="h-2 w-full" />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      );
    }

    if (selectedFile) {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-4 flex items-center justify-between rounded-md border border-border bg-card/50 p-3 pr-2">
            <div className="flex items-center">
              <File className="mr-2 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                if (onClear) onClear();
              }}
              className="ml-2 h-7 w-7"
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="button"
            className="text-sm"
            disabled={isProcessing}
            onClick={() => {
              if (onClear) onClear();
            }}
          >
            Choose a different file
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center">
        <Upload className="mb-4 h-10 w-10 text-primary" />
        <p className="mb-2 text-sm font-medium">Drag & drop your file here</p>
        <p className="mb-4 text-xs text-muted-foreground">
          or click to browse (up to {(maxSize / 1024 / 1024).toFixed(0)}MB)
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs"
          disabled={isProcessing}
        >
          Select file
        </Button>
      </div>
    );
  };

  return (
    <div
      {...getRootProps()}
      {...dragProps}
      className={cn(
        "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background p-6 transition-colors",
        {
          "border-primary/50 bg-primary/5": dragActive || isDragActive,
          "cursor-not-allowed opacity-60": isProcessing || !!selectedFile,
        },
        className
      )}
    >
      <input {...getInputProps()} className="hidden" />
      {renderContent()}
    </div>
  );
}
