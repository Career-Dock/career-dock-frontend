import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      text: "This job application tracker is amazing! It's easy to use, keeps everything organized, and the follow-up reminders are super helpful. Uploading documents and adding notes make the job search process so much smoother. Highly recommended!",
      name: 'M. T. H. Titumir',
      company: 'Standard Insights',
      designation: 'Full Stack Developer',
      image: 'https://ca.slack-edge.com/T1HBNSSKS-U07EN8GE5FV-c870771c1b9c-512',
    },
    {
      text: "This job application tracker is amazing! It's easy to use, keeps everything organized, and the follow-up reminders are super helpful. Uploading documents and adding notes make the job search process so much smoother. Highly recommended!",
      name: 'Chowdhury Tafsir Ahmed Siddiki',
      company: 'Standard Insights',
      image: 'https://ca.slack-edge.com/T1HBNSSKS-U080LDJ7LS3-g159e0bd3616-512',
    },
    {
      text: "This job application tracker is amazing! It's easy to use, keeps everything organized, and the follow-up reminders are super helpful. Uploading documents and adding notes make the job search process so much smoother. Highly recommended!",
      name: 'Mohammad Tanvir Chowdhury',
      company: 'Standard Insights',
      image: 'https://ca.slack-edge.com/T1HBNSSKS-U07S3GW2GKU-7a3f2fbf1508-512',
    },
  ];
  return (
    <div className="py-24 pb-0 bg-[#F9F6F3]">
      <MaxWidthWrapper>
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((test, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="flex flex-col items-center justify-center px-4 text-center">
                  <div className="px-3 py-1 text-xl mb-8">
                    <Quote />
                  </div>

                  <div className="max-w-3xl">
                    <p className="text-xl tracking-wider">{test.text}</p>
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <div className="flex flex-col items-center gap-3 p-4">
                      <div className="relative w-12 h-12 rounded-full">
                        <Image
                          src={test.image}
                          alt={test.name + 'profile image'}
                          width={48}
                          height={48}
                          className="object-contain rounded-full"
                          priority
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-xl font-semibold">{test.name}</h1>
                        <p className="text-sm">{test.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </MaxWidthWrapper>
      <StatsRow />
    </div>
  );
};
const StatsRow = () => {
  const rows = [
    {
      data: '2021',
      text: 'Created Founded',
    },
    {
      data: '50k+',
      text: 'Active Users',
    },
    {
      data: '1k+',
      text: 'Company Partners',
    },
  ];
  return (
    <div className="mt-8 ">
      <MaxWidthWrapper>
        <div className="flex justify-evenly py-14">
          {rows.map((row, index) => (
            <div key={index} className="text-center tracking-wider">
              <div className="text-2xl font-bold mb-1">{row.data}</div>
              <div className="text-sm">{row.text}</div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default TestimonialCarousel;
