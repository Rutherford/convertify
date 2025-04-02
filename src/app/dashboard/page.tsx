"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Trash2, FileType2, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

type Conversion = {
  id: string;
  fileName: string;
  sourceFormat: string;
  targetFormat: string;
  status: "completed" | "failed" | "processing";
  size: number;
  createdAt: Date;
  downloadUrl?: string;
};

// Mock data for demonstration
const mockConversions: Conversion[] = [
  {
    id: "1",
    fileName: "presentation.pptx",
    sourceFormat: "pptx",
    targetFormat: "pdf",
    status: "completed",
    size: 2.4 * 1024 * 1024,
    createdAt: new Date(2025, 3, 1, 14, 35),
    downloadUrl: "#",
  },
  {
    id: "2",
    fileName: "image-collection.zip",
    sourceFormat: "zip",
    targetFormat: "rar",
    status: "completed",
    size: 15.8 * 1024 * 1024,
    createdAt: new Date(2025, 3, 1, 10, 22),
    downloadUrl: "#",
  },
  {
    id: "3",
    fileName: "report.docx",
    sourceFormat: "docx",
    targetFormat: "pdf",
    status: "processing",
    size: 1.2 * 1024 * 1024,
    createdAt: new Date(2025, 4, 2, 8, 12),
  },
  {
    id: "4",
    fileName: "vacation-photo.heic",
    sourceFormat: "heic",
    targetFormat: "jpg",
    status: "completed",
    size: 3.7 * 1024 * 1024,
    createdAt: new Date(2025, 4, 1, 20, 45),
    downloadUrl: "#",
  },
  {
    id: "5",
    fileName: "podcast-episode.mp3",
    sourceFormat: "mp3",
    targetFormat: "wav",
    status: "failed",
    size: 24.5 * 1024 * 1024,
    createdAt: new Date(2025, 3, 30, 15, 25),
  },
];

export default function DashboardPage() {
  const [conversions, setConversions] = useState<Conversion[]>(mockConversions);

  const handleDelete = (id: string) => {
    setConversions(conversions.filter((conv) => conv.id !== id));
  };

  // Filter conversions based on status
  const completedConversions = conversions.filter((conv) => conv.status === "completed");
  const activeConversions = conversions.filter((conv) => conv.status === "processing");
  const failedConversions = conversions.filter((conv) => conv.status === "failed");

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your file conversions</p>
        </div>
        <Button asChild>
          <Link href="/convert" className="flex items-center gap-2">
            <FileType2 className="h-4 w-4" />
            New Conversion
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{conversions.length}</div>
            <p className="text-xs text-muted-foreground">Lifetime total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedConversions.length}</div>
            <p className="text-xs text-muted-foreground">Completed conversions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                Last conversion: {conversions.length > 0 ? format(new Date(Math.max(...conversions.map(c => c.createdAt.getTime()))), "MMM d, h:mm a") : "None"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({conversions.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedConversions.length})</TabsTrigger>
            <TabsTrigger value="active">In Progress ({activeConversions.length})</TabsTrigger>
            <TabsTrigger value="failed">Failed ({failedConversions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ConversionList conversions={conversions} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <ConversionList conversions={completedConversions} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <ConversionList conversions={activeConversions} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="failed" className="mt-6">
            <ConversionList conversions={failedConversions} onDelete={handleDelete} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ConversionList({ conversions, onDelete }: { conversions: Conversion[]; onDelete: (id: string) => void }) {
  if (conversions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <FileType2 className="mb-4 h-10 w-10 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-medium">No conversions found</h3>
        <p className="mb-4 text-sm text-muted-foreground">Start converting files to see them here.</p>
        <Button asChild size="sm">
          <Link href="/convert" className="flex items-center gap-2">
            Convert a File <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 font-medium">
        <div>File</div>
        <div>Conversion</div>
        <div>Size</div>
        <div>Date</div>
        <div className="sr-only">Actions</div>
      </div>
      <div className="divide-y">
        {conversions.map((conversion) => (
          <div key={conversion.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 p-4">
            <div className="flex flex-col">
              <span className="font-medium">{conversion.fileName}</span>
              <span className="text-xs text-muted-foreground">
                {conversion.status === "completed" ? "Completed" : conversion.status === "processing" ? "Processing" : "Failed"}
              </span>
            </div>
            <div className="rounded-full bg-muted px-2 py-1 text-xs">
              {conversion.sourceFormat.toUpperCase()} → {conversion.targetFormat.toUpperCase()}
            </div>
            <div className="text-sm">{formatFileSize(conversion.size)}</div>
            <div className="text-sm">{format(conversion.createdAt, "MMM d, h:mm a")}</div>
            <div className="flex gap-2">
              {conversion.status === "completed" && conversion.downloadUrl && (
                <Button size="icon" variant="ghost" asChild>
                  <a href={conversion.downloadUrl} download>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </a>
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(conversion.id)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
