import { FileType2, ArrowRight, FileType, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20 flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex items-center justify-center rounded-full bg-primary/10 p-3">
          <FileType2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">File Conversion Made Easy</h1>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
          Convert between multiple file formats securely and efficiently. Support for documents, images, audio, video, and archives.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/convert">Start Converting <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/formats">Supported Formats</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Why Choose Convertify</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard 
            icon={<FileType className="h-10 w-10 text-primary" />}
            title="Multiple Formats"
            description="Convert between various file formats including documents, images, audio, video, and archives with ease."
          />
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Secure & Private"
            description="All files are encrypted during transfer and automatically deleted after conversion to protect your privacy."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Fast & Reliable"
            description="Our optimized conversion engine ensures quick processing times and high-quality output files."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Upload Your File"
            description="Drag & drop your file or browse your device to select it."
          />
          <StepCard
            number={2}
            title="Choose Target Format"
            description="Select the format you want to convert your file to from our wide range of supported formats."
          />
          <StepCard
            number={3}
            title="Download Converted File"
            description="Once the conversion is complete, download your newly converted file instantly."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg bg-primary/5 p-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Convert Your Files?</h2>
        <p className="mb-6 text-lg text-muted-foreground">No registration required. Start converting files for free.</p>
        <Button asChild size="lg">
          <Link href="/convert">Start Converting Now</Link>
        </Button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <span className="text-xl font-bold text-primary">{number}</span>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
