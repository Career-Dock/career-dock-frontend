import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

import PageContainer from '@/components/page-container';

import { BoardsHeader } from './_components/boards-header';
import { BoardsSkeleton } from './_components/boards-skeleton';
import { BoardsList } from './_components/boards-list';

export const metadata = {
  title: 'Applications',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

// Sample data - replace with your actual data fetching logic
async function getBoards() {
  // In a real application, this would be an API call or database query
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
  return [
    {
      _id: '1',
      name: 'Web Developer Applications',
      description: 'Track and manage web developer job applications',
      image: '/board.jpg',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-25'),
      totalApplications: 24,
      activeApplications: 12,
    },
    {
      _id: '2',
      name: 'ML Engineer Applications',
      description: 'Machine learning and AI related positions and candidates',
      image: '/board.jpg',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-22'),
      totalApplications: 18,
      activeApplications: 8,
    },
  ];
}

export default async function Page(props: pageProps) {
  const boards = await getBoards();

  return (
    <PageContainer>
      <div className="p-6 space-y-8">
        <BoardsHeader />
        <Suspense fallback={<BoardsSkeleton />}>
          <BoardsList initialBoards={boards} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
