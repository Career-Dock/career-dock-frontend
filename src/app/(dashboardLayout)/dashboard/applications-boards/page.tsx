import { Suspense } from 'react';
import PageContainer from '@/components/page-container';
import { BoardsHeader } from './_components/boards-header';
import { BoardsSkeleton } from './_components/boards-skeleton';
import { BoardsList } from './_components/boards-list';
import { fetchFromServer } from '@/utils/fetchFromServer';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = (searchParams.search as string) || '';
  const sort = (searchParams.sort as string) || 'newest';

  // const boards = await fetchFromServer(`application-groups?search=${search}&sort=${sort}`);
  const boards = await fetchFromServer('application-groups');
  // console.log(boards);
  const allApplications = {
    _id: 'all',
    name: 'All Applications',
    description: 'All applications from all the boards, at one place',
    image: '/board.jpg',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-22'),
    totalApplications: boards?.data?.allApplicationsCount || 0,
    activeApplications: boards?.data?.allActiveApplicationsCount || 0,
  };

  const filterKey = JSON.stringify({ search, sort });

  return (
    <PageContainer>
      <BoardsHeader />
      <Suspense key={filterKey} fallback={<BoardsSkeleton />}>
        <BoardsList
          initialBoards={boards?.data?.applicationGroups}
          allApplications={allApplications}
          search={search}
          sort={sort}
        />
      </Suspense>
    </PageContainer>
  );
}
