'use client';

import { useSearchParams } from 'next/navigation';
import { BoardCard } from './board-card';

interface Board {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  totalApplications: number;
  activeApplications: number;
}

interface BoardsListProps {
  initialBoards: Board[];
}

const allApplications = {
  _id: 'hgkdfhdkjf',
  name: 'All Applications',
  description: 'All applications from all the boards, at one place',
  image: '/board.jpg',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-22'),
  totalApplications: 50,
  activeApplications: 45,
};

export function BoardsList({ initialBoards }: BoardsListProps) {
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  return (
    <div
      className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      }`}
    >
      <BoardCard board={allApplications} viewMode={viewMode} />
      {initialBoards?.map((board) => (
        <BoardCard key={board._id} board={board} viewMode={viewMode} />
      ))}
    </div>
  );
}
