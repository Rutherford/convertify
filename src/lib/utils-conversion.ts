import { toast } from "sonner";

export type FileValidationResult = {
  valid: boolean;
  error?: string;
  file?: File;
};

// Validate a file before conversion
export function validateFile(
  file: File,
  maxSize: number = 100 * 1024 * 1024, // 100MB default
  allowedTypes?: string[]
): FileValidationResult {
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${formatFileSize(maxSize)}`,
    };
  }

  // Check file type if restrictions provided
  if (allowedTypes && allowedTypes.length > 0) {
    const fileExtension = getFileExtension(file.name);
    if (!fileExtension || !allowedTypes.includes(fileExtension.toLowerCase())) {
      return {
        valid: false,
        error: `Unsupported file type. Allowed formats: ${allowedTypes.join(
          ", "
        )}`,
      };
    }
  }

  return {
    valid: true,
    file,
  };
}

// Get supported formats based on file extension
export function getSupportedTargetFormats(fileExtension: string): string[] {
  const formats = {
    // Document formats
    pdf: ["docx", "txt", "jpg", "png"],
    docx: ["pdf", "txt", "html"],
    txt: ["pdf", "docx", "html"],

    // Image formats
    jpg: ["png", "webp", "gif", "pdf"],
    jpeg: ["png", "webp", "gif", "pdf"],
    png: ["jpg", "webp", "gif", "pdf"],
    webp: ["jpg", "png", "gif"],
    gif: ["jpg", "png", "webp"],
    heic: ["jpg", "png", "webp"],

    // Audio formats
    mp3: ["wav", "ogg", "aac"],
    wav: ["mp3", "ogg", "aac"],
    ogg: ["mp3", "wav", "aac"],
    aac: ["mp3", "wav", "ogg"],

    // Video formats
    mp4: ["webm", "avi", "gif"],
    webm: ["mp4", "avi", "gif"],
    avi: ["mp4", "webm", "gif"],
    mov: ["mp4", "webm", "avi"],

    // Archive formats
    zip: ["rar", "tar", "7z"],
    rar: ["zip", "tar", "7z"],
    "7z": ["zip", "rar", "tar"],
    tar: ["zip", "rar", "7z"],
  };

  return formats[fileExtension as keyof typeof formats] || [];
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Helper to get file extension
export function getFileExtension(filename: string): string | null {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null;
}

// Group file formats by category
export function getFormatCategory(format: string): string {
  const categories = {
    documents: ["pdf", "docx", "doc", "txt", "rtf", "odt", "html", "md"],
    images: ["jpg", "jpeg", "png", "gif", "webp", "heic", "svg", "tiff"],
    audio: ["mp3", "wav", "ogg", "aac", "flac", "m4a"],
    video: ["mp4", "webm", "avi", "mov", "mkv", "flv"],
    archives: ["zip", "rar", "7z", "tar", "gz"],
  };

  for (const [category, formats] of Object.entries(categories)) {
    if (formats.includes(format.toLowerCase())) {
      return category;
    }
  }

  return "other";
}

// Convert a file to the target format (mocked implementation)
export async function convertFile(file: File, targetFormat: string): Promise<{
  success: boolean;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetFormat", targetFormat);

    const response = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Conversion failed");
    }

    const result = await response.json();
    return {
      success: true,
      downloadUrl: result.downloadUrl,
    };
  } catch (error) {
    console.error("Conversion error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
