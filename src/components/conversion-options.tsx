"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ConversionOptionsProps = {
  sourceFormat: string;
  targetFormat: string;
};

export function ConversionOptions({ sourceFormat, targetFormat }: ConversionOptionsProps) {
  // Image conversion options
  const [imageQuality, setImageQuality] = useState(80);
  const [imageWidth, setImageWidth] = useState(1280);
  const [imageHeight, setImageHeight] = useState(720);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);

  // Document conversion options
  const [pageRange, setPageRange] = useState("all");
  const [includeAnnotations, setIncludeAnnotations] = useState(true);

  // Audio/Video conversion options
  const [audioQuality, setAudioQuality] = useState("high");
  const [videoQuality, setVideoQuality] = useState("high");
  const [videoBitrate, setVideoBitrate] = useState(1800);
  const [videoResolution, setVideoResolution] = useState("720p");

  // Format category detection
  const isImage = [
    "jpg", "jpeg", "png", "gif", "webp", "heic", "svg", "tiff"
  ].includes(sourceFormat) || [
    "jpg", "jpeg", "png", "gif", "webp", "heic", "svg", "tiff"
  ].includes(targetFormat);

  const isDocument = [
    "pdf", "docx", "doc", "txt", "rtf", "odt", "html", "md"
  ].includes(sourceFormat) || [
    "pdf", "docx", "doc", "txt", "rtf", "odt", "html", "md"
  ].includes(targetFormat);

  const isAudio = [
    "mp3", "wav", "ogg", "aac", "flac", "m4a"
  ].includes(sourceFormat) || [
    "mp3", "wav", "ogg", "aac", "flac", "m4a"
  ].includes(targetFormat);

  const isVideo = [
    "mp4", "webm", "avi", "mov", "mkv", "flv"
  ].includes(sourceFormat) || [
    "mp4", "webm", "avi", "mov", "mkv", "flv"
  ].includes(targetFormat);

  // Determine which options to show
  const hasOptions = isImage || isDocument || isAudio || isVideo;
  
  if (!hasOptions) {
    return null; // No options for this conversion type
  }

  return (
    <div className="rounded-md border border-border p-4">
      <h3 className="mb-4 text-sm font-medium">Conversion Options</h3>
      
      <Tabs defaultValue={getDefaultTab()} className="w-full">
        <TabsList className="mb-4">
          {isImage && <TabsTrigger value="image">Image</TabsTrigger>}
          {isDocument && <TabsTrigger value="document">Document</TabsTrigger>}
          {isAudio && <TabsTrigger value="audio">Audio</TabsTrigger>}
          {isVideo && <TabsTrigger value="video">Video</TabsTrigger>}
        </TabsList>

        {isImage && (
          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Quality ({imageQuality}%)</Label>
                <div className="w-2/3">
                  <Slider 
                    value={[imageQuality]} 
                    min={10} 
                    max={100} 
                    step={1} 
                    onValueChange={(values) => setImageQuality(values[0])}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(Number(e.target.value))}
                  min={1}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="aspect-ratio"
                checked={preserveAspectRatio}
                onCheckedChange={setPreserveAspectRatio}
              />
              <Label htmlFor="aspect-ratio">Preserve aspect ratio</Label>
            </div>
          </TabsContent>
        )}

        {isDocument && (
          <TabsContent value="document" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page-range">Page Range</Label>
              <Select value={pageRange} onValueChange={setPageRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select page range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {pageRange === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-range">Custom Range (e.g., 1-5, 8, 11-13)</Label>
                <Input id="custom-range" placeholder="1-5, 8, 11-13" />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="annotations"
                checked={includeAnnotations}
                onCheckedChange={setIncludeAnnotations}
              />
              <Label htmlFor="annotations">Include annotations</Label>
            </div>
          </TabsContent>
        )}

        {isAudio && (
          <TabsContent value="audio" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audio-quality">Audio Quality</Label>
              <Select value={audioQuality} onValueChange={setAudioQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audio quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (64kbps)</SelectItem>
                  <SelectItem value="medium">Medium (128kbps)</SelectItem>
                  <SelectItem value="high">High (256kbps)</SelectItem>
                  <SelectItem value="best">Best (320kbps)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        )}

        {isVideo && (
          <TabsContent value="video" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-quality">Quality Preset</Label>
              <Select value={videoQuality} onValueChange={setVideoQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select video quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="best">Best</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-resolution">Resolution</Label>
              <Select value={videoResolution} onValueChange={setVideoResolution}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  <SelectItem value="1440p">1440p (2K)</SelectItem>
                  <SelectItem value="2160p">2160p (4K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Bitrate ({videoBitrate} kbps)</Label>
                <div className="w-2/3">
                  <Slider 
                    value={[videoBitrate]} 
                    min={500} 
                    max={8000} 
                    step={100} 
                    onValueChange={(values) => setVideoBitrate(values[0])}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );

  // Helper function to determine the default tab
  function getDefaultTab() {
    if (isImage) return "image";
    if (isDocument) return "document";
    if (isAudio) return "audio";
    if (isVideo) return "video";
    return "";
  }
}
