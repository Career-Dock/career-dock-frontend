import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import PageContainer from "@/components/page-container";

import { BoardsHeader } from "./_components/boards-header";
import { BoardsSkeleton } from "./_components/boards-skeleton";
import { BoardsList } from "./_components/boards-list";
import { fetchFromServer } from "@/utils/fetchFromServer";

export const metadata = {
  title: "Applications",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const boards = await fetchFromServer("application-groups");
  // console.log(boards);
  const allApplications = {
    _id: "all",
    name: "All Applications",
    description: "All applications from all the boards, at one place",
    image: "/board.jpg",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-22"),
    totalApplications: boards?.data?.allApplicationsCount || 0,
    activeApplications: boards?.data?.allActiveApplicationsCount || 0,
  };

  return (
    <PageContainer>
      <div className="p-6 space-y-8">
        <BoardsHeader />
        <Suspense fallback={<BoardsSkeleton />}>
          <BoardsList
            initialBoards={boards?.data?.applicationGroups}
            allApplications={allApplications}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
