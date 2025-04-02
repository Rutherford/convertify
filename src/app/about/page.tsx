import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Globe, Server, Code } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Convertify",
  description: "Learn about Convertify, our mission, technology stack, and team",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">About Convertify</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Convertify is a powerful yet user-friendly file conversion platform designed to make file format conversion accessible to everyone.
      </p>

      <div className="mx-auto mb-16 max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Our Mission</h2>
        <div className="space-y-6">
          <p>
            Our mission at Convertify is to simplify the process of converting files between different formats,
            making it accessible, secure, and efficient for users worldwide. We believe that technology should
            work for people, not the other way around.
          </p>
          <p>
            We understand the frustration that comes with file compatibility issues across different software
            and platforms. That's why we've built a comprehensive solution that handles a wide range of formats,
            from documents and images to audio, video, and archive files.
          </p>
        </div>
      </div>

      <div className="mx-auto mb-16 max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Our Technology</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TechCard
            icon={<Server className="h-8 w-8 text-primary" />}
            title="Scalable Infrastructure"
            description="Built on cloud-native infrastructure to handle conversions at scale with optimal performance."
          />
          <TechCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Security First"
            description="End-to-end encryption and automatic file deletion to ensure your data remains private and secure."
          />
          <TechCard
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="High Performance"
            description="Optimized conversion engines that deliver high-quality results while maintaining quick processing times."
          />
          <TechCard
            icon={<Globe className="h-8 w-8 text-primary" />}
            title="Global Availability"
            description="Deployed across multiple regions to ensure low-latency file conversions worldwide."
          />
          <TechCard
            icon={<Code className="h-8 w-8 text-primary" />}
            title="Open Standards"
            description="Built using open standards and formats to ensure maximum compatibility and longevity."
          />
        </div>
      </div>

      <div className="mx-auto mb-16 max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Our Stack</h2>
        <div className="rounded-lg border p-6">
          <div className="mb-6 grid grid-cols-2 gap-x-12 gap-y-4">
            <TechItem name="Next.js" description="React framework for the frontend" />
            <TechItem name="Node.js" description="JavaScript runtime for the backend" />
            <TechItem name="FFmpeg" description="Audio and video processing" />
            <TechItem name="ImageMagick" description="Image processing and conversion" />
            <TechItem name="LibreOffice" description="Document format conversion" />
            <TechItem name="Docker" description="Containerization for deployment" />
            <TechItem name="AWS S3" description="Secure file storage" />
            <TechItem name="Redis" description="Caching and job queues" />
          </div>
          <p className="text-sm text-muted-foreground">
            Convertify leverages a modern, scalable tech stack designed for performance, security, and reliability.
          </p>
        </div>
      </div>

      <div className="mx-auto text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to Convert?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Start converting your files today with our easy-to-use platform.
        </p>
        <Button asChild size="lg">
          <Link href="/convert">Start Converting Now</Link>
        </Button>
      </div>
    </div>
  );
}

function TechCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function TechItem({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-start">
      <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
