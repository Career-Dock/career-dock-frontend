import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { Suspense } from "react";

import PageContainer from "@/components/page-container";
import ApplicationsTableAction from "../../_components/applications-tables/applications-table-action";
import ApplicationListingPage from "../../_components/application-listing";
import AddApplicationButton from "../../_components/add-application-button";
import { fetchFromServer } from "@/utils/fetchFromServer";
import { TApplicationGroup } from "@/types/application";

export const metadata = {
  title: "Applications",
};

type PageProps = any;

export default async function Page({ searchParams, params }: PageProps) {
  const resolvedSearchParams = await searchParams;
  searchParamsCache.parse(resolvedSearchParams);

  const key = serialize({ ...resolvedSearchParams });

  const { boardId } = await params;
  console.log({ boardId });
  let applicationGroup: TApplicationGroup;
  if (boardId !== "all") {
    const response = await fetchFromServer(`/application-groups/${boardId}`);
    applicationGroup = response?.data;
  }

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={
              applicationGroup ? applicationGroup.name : "All applications"
            }
            description="Manage Applications"
          />
          <AddApplicationButton boardId={boardId} />
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
