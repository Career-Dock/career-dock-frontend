import {
  Star,
  Target,
  MessageSquare,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { ReactNode } from "react";

export default function FeatureGrid() {
  const features = [
    {
      title: "We Are The Only Ones You Need",
      description:
        "Morem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent",
      icon: Star,
      className: "left-0 top-0",
    },
    {
      title: "Passion Into Every Line",
      description:
        "Morem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent",
      icon: Sparkles,
      className: "left-0 top-[350px]",
    },
    {
      title: "We Only Target Outcomes",
      description:
        "Morem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent",
      icon: Target,
      className: "left-[33%] top-[80px]",
    },
    {
      title: "We Make You Standout",
      description:
        "Morem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent",
      icon: TrendingUp,
      className: "left-[33%] top-[430px]",
    },
    {
      title: "Communication Is Our Forte",
      description:
        "Morem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent",
      icon: MessageSquare,
      className: "left-[66%] top-[160px]",
    },
    {
      title: "The People Say It All",
      description:
        "Morem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent",
      icon: Users,
      className: "left-[66%] top-[520px]",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-900 pb-24">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(42,37,34,0.5) 0%, rgba(26,26,26,0) 70%),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-24">
        <div className="md:flex">
          {/* Heading Section */}
          <div className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
            <div className="flex md:flex-col gap-3 text-[36px] md:text-[60px] font-light leading-[0.85] tracking-tight text-white/80">
              <span className="inline-block mt-[5px]">What</span>
              <span className="inline-block mt-[5px]">Separates</span>
              <span className="inline-block mt-[8px]">Us?</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="relative w-3/4 h-[700px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute w-[280px] transition-all duration-500 ${feature.className}`}
              >
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(59,130,246,0.9) 0%, rgba(23,37,84,0.8) 100%)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900">
                    <feature.icon className="h-6 w-6 text-white/70" />
                  </div>
                  <h3 className="mb-3 text-2xl font-extralight text-white/90">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
