import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Footer() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="px-4 py-16 bg-[#0d1412]">
        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-8 md:mb-0 max-w-2xl">
              Discover the full scale of{" "}
              <span className="relative">
                Career Dock
                <span className="absolute bottom-2 left-0 w-full h-1 bg-primary"></span>
              </span>{" "}
              capabilities
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="text-[#1A2421] bg-white">
                Get a Demo
              </Button>
              <Button className="bg-primary text-white tracking-wider">
                Start for Free
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Footer */}
      <footer className="px-4 py-16 bg-[#1A2421]">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo and Contact */}
            <div className="md:col-span-3 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded"></div>
                <span className="text-white text-xl">Career Dock</span>
              </div>
              <div className="space-y-2">
                <Link
                  href="mailto:hello@careerdock.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                  hello@careerdock.com
                </Link>
                <Link
                  href="tel:+62198765432"
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <Phone className="w-4 h-4" />
                  +621 987 654 321
                </Link>
              </div>
            </div>

            {/* Solution */}
            <div className="md:col-span-3">
              <h3 className="text-white font-medium mb-4">Solution</h3>
              <ul className="space-y-2">
                {[
                  "Why Career Dock",
                  "Features",
                  "OpenAI",
                  "Technology",
                  "Security",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customers */}
            <div className="md:col-span-3">
              <h3 className="text-white font-medium mb-4">Customers</h3>
              <ul className="space-y-2">
                {["Procurement", "Sales", "Legal", "Medium", "Enterprise"].map(
                  (item) => (
                    <li key={item}>
                      <Link href="#" className="text-gray-400 hover:text-white">
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-3">
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Pricing", "Contact Sales", "Changelog *", "Blog"].map(
                  (item) => (
                    <li key={item}>
                      <Link href="#" className="text-gray-400 hover:text-white">
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-4 md:mb-0">
              © Copyright {new Date().getFullYear()} <span className="text-primary">Career Dock</span>. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}
