import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      {/* <Image
        src="/parachute.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      /> */}

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full flex flex-col items-center space-y-4">
          <div className="mx-auto">
            {/* 404 Text */}
            <h1 className="text-[120px] font-bold text-[#2D1A66] leading-none">
              404
            </h1>
            {/* Purple underline */}
            {/* <div className="w-16 h-1 bg-[#9747FF] mt-2" /> */}
          </div>

          {/* Subtitle */}
          <p className="text-xl text-[#2D1A66]">Uh-oh, page not found!</p>

          {/* Button */}
          <Link href="/">
            <Button className="bg-pink-700 hover:bg-pink-600 text-white rounded-full px-6">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

