import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';

export default function Hero() {
  return (
    <MaxWidthWrapper>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-gray-600 shadow-sm mb-8">
          Backed by Y Combinator
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Email for modern software companies
        </h1>

        <div className="mt-6 max-w-2xl space-y-2 text-gray-600">
          <p className="text-lg sm:text-xl">
            Send your product, marketing, and transactional email with Loops.
          </p>
          <p className="text-lg sm:text-xl">
            One simple interface, for all your email.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white rounded-full px-8 h-12 text-base shadow-lg"
          >
            Get started
          </Button>
          <Link
            href="/docs"
            className="inline-flex items-center text-primary hover:text-primary font-medium"
          >
            Read docs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
