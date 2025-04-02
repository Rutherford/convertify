# Convertify - File Conversion Made Easy

Convertify is a comprehensive file conversion web application inspired by CloudConvert, allowing users to convert files between various formats including documents, images, audio, video, and compressed archives with an intuitive and user-friendly interface.

## Features

- **Multiple Format Support**: Convert between common file formats (DOCX, PDF, JPG, PNG, MP3, WAV, MP4, ZIP, etc.)
- **Intuitive Interface**: Drag-and-drop file uploads with progress indicators
- **Responsive Design**: Works across desktop and mobile devices
- **Conversion Options**: Format-specific settings for optimized output
- **User Authentication**: Optional account creation for conversion history tracking
- **Secure Processing**: Files are encrypted during transfer and automatically deleted
- **Containerized**: Easy deployment using Docker

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **File Processing**: FFmpeg, ImageMagick, LibreOffice, ExifTool
- **Storage**: AWS S3 (or compatible services like MinIO)
- **Caching/Queues**: Redis
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized deployment)

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/Rutherford/convertify.git
cd convertify
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Deployment

1. Create a `.env` file with your environment variables:

```
S3_ENDPOINT=http://minio:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=convertify
S3_REGION=us-east-1
```

2. Build and start the containers:

```bash
docker-compose up -d
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── about/           # About page
│   │   ├── auth/            # Authentication pages
│   │   ├── convert/         # File conversion interface
│   │   ├── dashboard/       # User dashboard
│   │   ├── formats/         # Supported formats page
│   │   ├── pricing/         # Pricing plans page
│   │   ├── api/             # API routes
│   ├── components/          # React components
│   │   ├── ui/              # UI components from shadcn/ui
│   │   ├── auth/            # Authentication components
│   ├── lib/                 # Utility functions and libraries
│   │   ├── stores/          # Global state management
├── public/                  # Static assets
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
```

## Feature Implementation Details

### File Conversion Workflow

1. User uploads a file via drag-and-drop or file browser
2. The file is validated for format and size
3. User selects the target format and conversion options
4. The conversion job is queued and processed
5. The converted file is made available for download

### Security Considerations

- Files are encrypted during transfer and storage
- Automatic file deletion after user-specified duration
- User authentication with secure password handling
- Rate limiting to prevent abuse

## License

MIT
