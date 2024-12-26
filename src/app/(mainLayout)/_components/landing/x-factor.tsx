import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface FactorCard {
  id: number;
  title: string;
  description: string;
}

const factors: FactorCard[] = [
  {
    id: 1,
    title: 'Learn Step by Step',
    description:
      'If you follow this course module by module and complete all the tasks, you will surely become a complete web developer.',
  },
  {
    id: 2,
    title: 'Practice Makes Perfect',
    description:
      'Regular coding practice and completing assignments will help you master the fundamentals of web development.',
  },
  {
    id: 3,
    title: 'Never Give Up',
    description:
      'Programming can be challenging at times, but persistence and dedication will lead you to success.',
  },
  {
    id: 4,
    title: 'Never Give Up',
    description:
      'Programming can be challenging at times, but persistence and dedication will lead you to success.',
  },
];

export default function XFactor() {
  return (
    <section className=" py-20 md:py-20 px-4 md:px-10 bg-[#F6F6F6]">
      <MaxWidthWrapper>
        <h1 className="text-primary text-4xl md:text-5xl font-bold text-center mb-12 sticky top-4 z-10 pb-8">
          X-Factors Of Career Dock
        </h1>

        <div className=" flex flex-col mt-10 md:mt-16 gap-20 ">
          {factors.map((factor, pIndex) => (
            <Card
              key={pIndex}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-12 lg:px-12 sticky bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] h-[400px]"
              style={{
                top: `calc(140px + ${pIndex * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="lg:pb-16">
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">
                    {factor.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base">
                    {factor.description}
                  </p>
                </div>
                <div className="">
                  <Image
                    src="/dashboard-examples-blog.png"
                    alt="title"
                    className=""
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
