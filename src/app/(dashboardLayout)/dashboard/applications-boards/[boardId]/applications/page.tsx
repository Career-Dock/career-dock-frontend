import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

import PageContainer from '@/components/page-container';
import ApplicationsTableAction from '../../_components/applications-tables/applications-table-action';
import ApplicationListingPage from '../../_components/application-listing';

export const metadata = {
  title: 'Applications',
};

type PageProps = {
  searchParams: Promise<SearchParams>;
  params: {
    boardId: string;
  };
};

export default async function Page({ searchParams, params }: PageProps) {
  const resolvedSearchParams = await searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(resolvedSearchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...resolvedSearchParams });

  const { boardId } = await params;
  console.log({ boardId });

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Applications" description="Manage Applications" />
          <Link
            href={`/dashboard/applications-boards/${boardId}/applications/new`}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ApplicationsTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={8} rowCount={8} />}
        >
          <ApplicationListingPage boardId={boardId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
