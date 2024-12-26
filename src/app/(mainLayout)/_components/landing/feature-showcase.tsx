'use client';

import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Image from 'next/image';

export default function FeatureShowcase() {
  const tabsData = [
    {
      value: 'Organize',
      content: (
        <Image
          src="/dashboard-examples-blog.png"
          alt="Organize your documents"
          width={1400}
          height={600}
          className="rounded-lg border shadow-sm"
        />
      ),
    },
    {
      value: 'Create',
      content: (
        <Image
          src="/dashboard-examples-blog.png"
          alt="Organize your documents"
          width={1400}
          height={600}
          className="rounded-lg border shadow-sm"
        />
      ),
    },
    {
      value: 'Style',
      content: (
        <Image
          src="/dashboard-examples-blog.png"
          alt="Organize your documents"
          width={1400}
          height={600}
          className="rounded-lg border shadow-sm"
        />
      ),
    },
    {
      value: 'Share',
      content: (
        <Image
          src="/dashboard-examples-blog.png"
          alt="Organize your documents"
          width={1400}
          height={600}
          className="rounded-lg border shadow-sm"
        />
      ),
    },
  ];
  return (
    <div className=" bg-[#F9F6F3] pb-24">
      <MaxWidthWrapper className=" py-4 max-w-7xl md:px-0">
        {/* Browser Window Frame */}

        {/* Tabs Interface */}
        <Tabs defaultValue="organize" className="p-4">
          <div className="flex justify-center">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-full bg-white p-1">
              {['Organize', 'Create', 'Style', 'Share'].map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={tab.toLowerCase()}
                  className="rounded-full px-8 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-[#092510]"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabsData.map((td, index) => (
            <TabsContent
              key={index}
              value={td?.value?.toLowerCase()}
              className="mt-6"
            >
              {td.content}
            </TabsContent>
          ))}
        </Tabs>
      </MaxWidthWrapper>
    </div>
  );
}
