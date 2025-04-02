import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FORMATS = {
  documents: [
    { from: "PDF", to: ["DOCX", "TXT", "RTF", "HTML", "EPUB"] },
    { from: "DOCX", to: ["PDF", "TXT", "RTF", "HTML", "EPUB"] },
    { from: "TXT", to: ["PDF", "DOCX", "RTF", "HTML"] },
    { from: "RTF", to: ["PDF", "DOCX", "TXT", "HTML"] },
    { from: "HTML", to: ["PDF", "DOCX", "TXT", "EPUB"] },
  ],
  images: [
    { from: "JPG/JPEG", to: ["PNG", "WEBP", "GIF", "SVG", "TIFF", "BMP", "ICO"] },
    { from: "PNG", to: ["JPG", "WEBP", "GIF", "SVG", "TIFF", "BMP", "ICO"] },
    { from: "WEBP", to: ["JPG", "PNG", "GIF", "TIFF", "BMP"] },
    { from: "GIF", to: ["JPG", "PNG", "WEBP", "TIFF", "BMP"] },
    { from: "HEIC", to: ["JPG", "PNG", "WEBP"] },
    { from: "SVG", to: ["JPG", "PNG", "WEBP"] },
  ],
  audio: [
    { from: "MP3", to: ["WAV", "OGG", "AAC", "FLAC", "M4A"] },
    { from: "WAV", to: ["MP3", "OGG", "AAC", "FLAC", "M4A"] },
    { from: "OGG", to: ["MP3", "WAV", "AAC", "FLAC", "M4A"] },
    { from: "AAC", to: ["MP3", "WAV", "OGG", "FLAC", "M4A"] },
    { from: "FLAC", to: ["MP3", "WAV", "OGG", "AAC", "M4A"] },
  ],
  video: [
    { from: "MP4", to: ["WEBM", "AVI", "MOV", "MKV", "GIF"] },
    { from: "WEBM", to: ["MP4", "AVI", "MOV", "MKV", "GIF"] },
    { from: "AVI", to: ["MP4", "WEBM", "MOV", "MKV", "GIF"] },
    { from: "MOV", to: ["MP4", "WEBM", "AVI", "MKV", "GIF"] },
    { from: "MKV", to: ["MP4", "WEBM", "AVI", "MOV", "GIF"] },
  ],
  archives: [
    { from: "ZIP", to: ["RAR", "TAR", "7Z", "GZ"] },
    { from: "RAR", to: ["ZIP", "TAR", "7Z", "GZ"] },
    { from: "TAR", to: ["ZIP", "RAR", "7Z", "GZ"] },
    { from: "7Z", to: ["ZIP", "RAR", "TAR", "GZ"] },
    { from: "GZ", to: ["ZIP", "RAR", "TAR", "7Z"] },
  ],
};

export const metadata = {
  title: "Supported Formats - Convertify",
  description: "View all the file formats supported by Convertify for conversion",
};

export default function FormatsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">Supported Formats</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Convertify supports a wide range of file formats for conversion. Browse through the categories below to see all supported formats.
      </p>

      <div className="mx-auto max-w-4xl">
        <Tabs defaultValue="documents">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="archives">Archives</TabsTrigger>
          </TabsList>
          
          {Object.entries(FORMATS).map(([category, formats]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{category} Conversion</CardTitle>
                  <CardDescription>
                    Convert {category} files to and from multiple formats.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {formats.map((format) => (
                      <div key={format.from} className="space-y-3 rounded-lg border p-4">
                        <h3 className="text-lg font-medium">{format.from}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Convert to:</p>
                          <div className="flex flex-wrap gap-2">
                            {format.to.map((toFormat) => (
                              <span
                                key={toFormat}
                                className="inline-flex rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                              >
                                {toFormat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-6 flex justify-center">
                <Button asChild>
                  <Link href="/convert" className="flex items-center gap-2">
                    Start Converting Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
