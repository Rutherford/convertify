import { NextRequest, NextResponse } from 'next/server';

// This simulates a file download endpoint with more realistic content
// In a real application, this would retrieve files from cloud storage like S3
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'No file ID provided' },
        { status: 400 }
      );
    }

    // Extract target format from query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'txt';
    
    // Generate appropriate content and headers based on format
    const { buffer, filename, contentType } = generateDemoFile(id, format);

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename=${filename}`);
    headers.set('Content-Type', contentType);
    headers.set('Content-Length', buffer.length.toString());

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Error retrieving file' },
      { status: 500 }
    );
  }
}

// Helper function to generate demo files of different formats
function generateDemoFile(id: string, format: string): { buffer: Buffer; filename: string; contentType: string } {
  // Create a shortened ID for filename
  const shortId = id.substring(0, 8);
  
  switch(format.toLowerCase()) {
    case 'pdf': {
      // Simple PDF structure - not a valid PDF but has the markers
      const pdfContent = `%PDF-1.5
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 68 >>
stream
BT
/F1 12 Tf
72 712 Td
(Convertify Demo PDF File - ID: ${shortId}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000216 00000 n
0000000283 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
401
%%EOF`;
      return {
        buffer: Buffer.from(pdfContent),
        filename: `converted-${shortId}.pdf`,
        contentType: 'application/pdf',
      };
    }
    
    case 'docx': {
      // This is just a placeholder - a real DOCX would be a ZIP of XML files
      // For demo purposes, we'll create a simple ZIP with a minimal XML structure
      const zipHeader = Buffer.from([0x50, 0x4B, 0x03, 0x04, 0x14, 0x00, 0x00, 0x00]);
      const docContent = Buffer.from(`This is a simulated DOCX file created by Convertify. ID: ${shortId}`);
      return {
        buffer: Buffer.concat([zipHeader, docContent]),
        filename: `converted-${shortId}.docx`,
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
    }
    
    case 'jpg': 
    case 'jpeg': {
      // Simple JPEG structure with JFIF header
      const jpegHeader = Buffer.from([
        0xFF, 0xD8, // SOI marker
        0xFF, 0xE0, // APP0 marker
        0x00, 0x10, // APP0 length
        0x4A, 0x46, 0x49, 0x46, 0x00, // JFIF identifier
        0x01, 0x01, // JFIF version
        0x00, // units
        0x00, 0x01, // X density
        0x00, 0x01, // Y density
        0x00, 0x00  // No thumbnail
      ]);
      const jpegData = Buffer.from(`Convertify Image ${shortId}`);
      return {
        buffer: Buffer.concat([jpegHeader, jpegData]),
        filename: `converted-${shortId}.jpg`,
        contentType: 'image/jpeg',
      };
    }
    
    case 'png': {
      // Simple PNG header
      const pngHeader = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
        0x00, 0x00, 0x00, 0x0D // IHDR chunk length
      ]);
      const pngData = Buffer.from(`Convertify PNG ${shortId}`);
      return {
        buffer: Buffer.concat([pngHeader, pngData]),
        filename: `converted-${shortId}.png`,
        contentType: 'image/png',
      };
    }
    
    case 'mp3': {
      // Simple ID3v2 header
      const mp3Header = Buffer.from([
        0x49, 0x44, 0x33, // ID3 identifier
        0x03, 0x00,       // ID3v2.3
        0x00,             // No flags
        0x00, 0x00, 0x00, 0x16 // Tag size (22 bytes)
      ]);
      const mp3Data = Buffer.from(`Convertify MP3 Sample ${shortId}`);
      return {
        buffer: Buffer.concat([mp3Header, mp3Data]),
        filename: `converted-${shortId}.mp3`,
        contentType: 'audio/mpeg',
      };
    }
    
    case 'mp4': {
      // Simple MP4 header (ftyp box)
      const mp4Header = Buffer.from([
        0x00, 0x00, 0x00, 0x18, // Box size
        0x66, 0x74, 0x79, 0x70, // 'ftyp'
        0x6D, 0x70, 0x34, 0x32, // Major brand 'mp42'
        0x00, 0x00, 0x00, 0x00, // Minor version
        0x6D, 0x70, 0x34, 0x32, // Compatible brand 'mp42'
        0x69, 0x73, 0x6F, 0x6D  // Compatible brand 'isom'
      ]);
      const mp4Data = Buffer.from(`Convertify MP4 ${shortId}`);
      return {
        buffer: Buffer.concat([mp4Header, mp4Data]),
        filename: `converted-${shortId}.mp4`,
        contentType: 'video/mp4',
      };
    }
    
    case 'zip': {
      // Simple ZIP header
      const zipHeader = Buffer.from([
        0x50, 0x4B, 0x03, 0x04, // ZIP signature
        0x0A, 0x00, // Version
        0x00, 0x00, // Flags
        0x00, 0x00, // Compression method
        0x00, 0x00, // File time
        0x00, 0x00  // File date
      ]);
      const zipData = Buffer.from(`Convertify Archive ${shortId}`);
      return {
        buffer: Buffer.concat([zipHeader, zipData]),
        filename: `converted-${shortId}.zip`,
        contentType: 'application/zip',
      };
    }
    
    // Default to text format
    default: {
      const content = `This is a Convertify converted file (ID: ${shortId})\n\n` +
                     `This file was created for demonstration purposes.\n` +
                     `In a real application, this would be a properly converted ${format} file.\n\n` +
                     `Format: ${format}\n` +
                     `Conversion ID: ${id}\n` +
                     `Created: ${new Date().toISOString()}\n\n` +
                     `Thank you for using Convertify!`;
      
      return {
        buffer: Buffer.from(content),
        filename: `converted-${shortId}.${format}`,
        contentType: 'text/plain',
      };
    }
  }
}
