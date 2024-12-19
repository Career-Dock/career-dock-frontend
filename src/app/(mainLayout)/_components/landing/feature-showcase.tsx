'use client';

import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Image from 'next/image';

export default function FeatureShowcase() {
  return (
    <div className=" bg-[#F9F6F3] pb-24">
      <MaxWidthWrapper className=" py-4 max-w-7xl md:px-0">
        {/* Browser Window Frame */}

        {/* Tabs Interface */}
        <Tabs defaultValue="organize" className="p-4">
          <div className="flex justify-center">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-full bg-[#F6F6F6] p-1">
              <TabsTrigger
                value="organize"
                className="rounded-full px-8 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Organize
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="rounded-full px-8 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Create
              </TabsTrigger>
              <TabsTrigger
                value="style"
                className="rounded-full px-8 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Style
              </TabsTrigger>
              <TabsTrigger
                value="share"
                className="rounded-full px-8 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Share
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="organize" className="mt-6">
            <Image
              src="/dashboard-examples-blog.png"
              alt="Organize your documents"
              width={1400}
              height={600}
              className="rounded-lg border shadow-sm"
            />
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <Image
              src="/dashboard-examples-blog.png"
              alt="Organize your documents"
              width={1400}
              height={600}
              className="rounded-lg border shadow-sm"
            />
          </TabsContent>

          <TabsContent value="style" className="mt-6">
            <Image
              src="/dashboard-examples-blog.png"
              alt="Organize your documents"
              width={1400}
              height={600}
              className="rounded-lg border shadow-sm"
            />
          </TabsContent>

          <TabsContent value="share" className="mt-6">
            <Image
              src="/dashboard-examples-blog.png"
              alt="Organize your documents"
              width={1400}
              height={600}
              className="rounded-lg border shadow-sm"
            />
          </TabsContent>
        </Tabs>
      </MaxWidthWrapper>
    </div>
  );
}
