import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";

export const metadata = {
  title: "Pricing - Convertify",
  description: "Explore Convertify's pricing plans and choose the best option for your file conversion needs",
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">Simple, Transparent Pricing</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
        Choose the plan that works best for you, from free basic conversions to unlimited professional use.
      </p>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for occasional conversions and trying out the service."
          features={[
            "5 conversions per day",
            "Max file size: 100MB",
            "Standard conversion quality",
            "Basic format support",
            "24-hour file storage",
          ]}
          buttonText="Get Started"
          buttonVariant="outline"
          popular={false}
        />

        <PricingCard
          title="Premium"
          price="$9.99"
          period="month"
          description="Ideal for regular users who need more conversions and features."
          features={[
            "50 conversions per day",
            "Max file size: 500MB",
            "High-quality conversions",
            "All format support",
            "7-day file storage",
            "Priority processing",
          ]}
          buttonText="Upgrade Now"
          buttonVariant="default"
          popular={true}
        />

        <PricingCard
          title="Professional"
          price="$19.99"
          period="month"
          description="For professionals and businesses with high-volume needs."
          features={[
            "Unlimited conversions",
            "Max file size: 2GB",
            "Premium conversion quality",
            "All formats with advanced options",
            "30-day file storage",
            "Priority processing",
            "Batch processing",
            "API access",
          ]}
          buttonText="Go Professional"
          buttonVariant="default"
          popular={false}
        />
      </div>

      <div className="mx-auto mt-16 max-w-3xl rounded-lg border bg-card/50 p-6">
        <h2 className="mb-4 text-center text-xl font-bold">Enterprise Solutions</h2>
        <p className="mb-6 text-center text-muted-foreground">
          Need a custom solution for your organization? We offer tailored enterprise plans with
          dedicated support, custom integrations, and more.
        </p>
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl space-y-6">
        <h2 className="text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem
            question="Can I upgrade or downgrade my plan at any time?"
            answer="Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your plan will take effect on your next billing cycle."
          />
          <FaqItem
            question="How do conversions work on the free plan?"
            answer="The free plan allows you to convert up to 5 files per day with a maximum size of 100MB each. Your converted files will be available for download for 24 hours."
          />
          <FaqItem
            question="What payment methods do you accept?"
            answer="We accept all major credit cards, PayPal, and Apple Pay for subscription payments. All transactions are secure and encrypted."
          />
          <FaqItem
            question="Is my data secure when I use Convertify?"
            answer="Absolutely. We use end-to-end encryption for all file transfers, and your files are automatically deleted after the storage period. We never access or analyze the content of your files."
          />
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  popular,
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular: boolean;
}) {
  return (
    <Card className={`flex flex-col ${popular ? 'border-primary shadow-md' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">/{period}</span>}
        </div>
        <CardDescription className="pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="mr-2 mt-0.5 h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={buttonVariant}
          className={`w-full ${popular ? 'bg-primary' : ''}`}
        >
          {popular && <Zap className="mr-2 h-4 w-4" />}
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-2 font-medium">{question}</h3>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
