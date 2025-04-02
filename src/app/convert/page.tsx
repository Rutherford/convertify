"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadDropzone } from "@/components/file-upload-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileType2, Download, FileCheck } from "lucide-react";
import { useConversionStore } from "@/lib/stores/conversion-store";
import { FormatSelector } from "@/components/format-selector";
import { ConversionOptions } from "@/components/conversion-options";

const DOCUMENT_FORMATS = [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "DOCX" },
  { value: "txt", label: "TXT" },
];

const IMAGE_FORMATS = [
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "gif", label: "GIF" },
];

const AUDIO_FORMATS = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "ogg", label: "OGG" },
];

const VIDEO_FORMATS = [
  { value: "mp4", label: "MP4" },
  { value: "webm", label: "WebM" },
];

const ARCHIVE_FORMATS = [
  { value: "zip", label: "ZIP" },
];

export default function ConvertPage() {
  const [activeTab, setActiveTab] = useState("documents");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [convertedFileName, setConvertedFileName] = useState<string>("");

  // Clear state when tab changes
  useEffect(() => {
    setSelectedFile(null);
    setTargetFormat("");
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setIsConverting(false);
    setConvertedFile(null);
    setConvertedFileName("");
  }, [activeTab]);

  // Handle file selection
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setConvertedFile(null);
    setConvertedFileName("");

    // Auto-set a default target format based on file type
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    
    // Try to suggest a target format different from source
    let defaultFormat = "";
    if (isDocumentFile(fileExtension)) {
      defaultFormat = fileExtension === "pdf" ? "docx" : "pdf";
    } else if (isImageFile(fileExtension)) {
      defaultFormat = fileExtension === "jpg" ? "png" : "jpg";
    } else if (isAudioFile(fileExtension)) {
      defaultFormat = fileExtension === "mp3" ? "wav" : "mp3";
    } else if (isVideoFile(fileExtension)) {
      defaultFormat = fileExtension === "mp4" ? "webm" : "mp4";
    }
    
    setTargetFormat(defaultFormat);
  };

  // Reset conversion state
  const resetConversion = () => {
    setSelectedFile(null);
    setTargetFormat("");
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setIsConverting(false);
    setConvertedFile(null);
    setConvertedFileName("");
  };

  // Determine available target formats based on file type
  const getTargetFormats = () => {
    if (!selectedFile) return [];
    
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase() || "";
    
    if (isDocumentFile(fileExtension)) return DOCUMENT_FORMATS;
    if (isImageFile(fileExtension)) return IMAGE_FORMATS;
    if (isAudioFile(fileExtension)) return AUDIO_FORMATS;
    if (isVideoFile(fileExtension)) return VIDEO_FORMATS;
    if (isArchiveFile(fileExtension)) return ARCHIVE_FORMATS;
    
    return [];
  };

  // Helper functions to determine file type
  function isDocumentFile(extension: string): boolean {
    return ["pdf", "docx", "doc", "txt", "rtf"].includes(extension);
  }
  
  function isImageFile(extension: string): boolean {
    return ["jpg", "jpeg", "png", "gif", "webp", "heic"].includes(extension);
  }
  
  function isAudioFile(extension: string): boolean {
    return ["mp3", "wav", "ogg", "aac", "flac"].includes(extension);
  }
  
  function isVideoFile(extension: string): boolean {
    return ["mp4", "webm", "avi", "mov", "mkv"].includes(extension);
  }
  
  function isArchiveFile(extension: string): boolean {
    return ["zip", "rar", "7z", "tar", "gz"].includes(extension);
  }

  // Generate demo content based on target format
  const generateDemoContent = (format: string): Blob => {
    const demoText = `This is a Convertify demo ${format.toUpperCase()} file.\n\n` +
                      `Created: ${new Date().toISOString()}\n` +
                      `Source file: ${selectedFile?.name || 'unknown'}\n` +
                      `Target format: ${format.toUpperCase()}\n\n` +
                      `In a production environment, this would be a proper ${format.toUpperCase()} file converted using specialized libraries.`;

    // Different content types based on format
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      ogg: 'audio/ogg',
      mp4: 'video/mp4',
      webm: 'video/webm',
      zip: 'application/zip'
    };

    return new Blob([demoText], { type: mimeTypes[format] || 'text/plain' });
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!selectedFile || !targetFormat) {
      toast.error("Please select a file and target format");
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setError(null);
    setResultUrl(null);
    setConvertedFile(null);
    setConvertedFileName("");

    try {
      // Simulate conversion process with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setProgress(i);
      }

      // In a real implementation, we would upload to server for conversion
      // Instead, create a demo file of the target format
      const demoFile = generateDemoContent(targetFormat);
      const fileName = `converted.${targetFormat}`;
      
      // Create a download URL for the file
      const fileUrl = URL.createObjectURL(demoFile);
      
      setConvertedFile(demoFile);
      setConvertedFileName(fileName);
      setResultUrl(fileUrl);
      toast.success("File converted successfully!");
    } catch (err) {
      console.error("Conversion error:", err);
      setError("There was an error converting your file. Please try again.");
      toast.error("Conversion failed");
    } finally {
      setIsConverting(false);
      setProgress(100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold">Convert Your Files</h1>
        <p className="mb-10 text-center text-muted-foreground">
          Upload a file and convert it to your desired format in seconds.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>File Converter</CardTitle>
            <CardDescription>
              Select a file type and upload your file to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="archives">Archives</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <FileUploadDropzone
                  onFileSelected={handleFileSelected}
                  selectedFile={selectedFile}
                  uploadProgress={isConverting ? progress : undefined}
                  isProcessing={isConverting}
                  onClear={resetConversion}
                  error={error || undefined}
                />

                {selectedFile && !isConverting && !resultUrl && (
                  <div className="mt-6">
                    <h3 className="mb-2 font-medium">Convert to:</h3>
                    <FormatSelector
                      formats={getTargetFormats()}
                      selectedFormat={targetFormat}
                      onFormatChange={setTargetFormat}
                    />

                    {targetFormat && (
                      <div className="mt-6">
                        <ConversionOptions
                          sourceFormat={selectedFile.name.split(".").pop()?.toLowerCase() || ""}
                          targetFormat={targetFormat}
                        />
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-center">
                      <Button 
                        onClick={handleConvert} 
                        disabled={!targetFormat || isConverting}
                        className="flex items-center gap-2"
                      >
                        <FileType2 className="h-4 w-4" />
                        Convert Now
                      </Button>
                    </div>
                  </div>
                )}

                {resultUrl && convertedFile && (
                  <div className="mt-6 flex flex-col items-center justify-center rounded-lg bg-green-50 p-6 dark:bg-green-950/20">
                    <FileCheck className="mb-4 h-10 w-10 text-green-500" />
                    <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-green-400">
                      Conversion Complete!
                    </h3>
                    <p className="mb-4 text-center text-sm text-muted-foreground">
                      Your file has been successfully converted. Click below to download.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        asChild
                        className="flex items-center gap-2"
                      >
                        <a href={resultUrl} download={convertedFileName}>
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetConversion}
                      >
                        Convert Another File
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
