'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BoardCard } from './board-card';
import { useEffect, useMemo, useState } from 'react';

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
  allApplications: Board;
  search: string;
  sort: string;
}

export function BoardsList({
  initialBoards,
  allApplications,
  search,
  sort,
}: BoardsListProps) {
  const [boards, setBoards] = useState(initialBoards);
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid';

  const filteredAndSortedBoards = useMemo(() => {
    const filteredBoards = initialBoards.filter(
      (board) =>
        board.name.toLowerCase().includes(search.toLowerCase()) ||
        board.description.toLowerCase().includes(search.toLowerCase())
    );

    return filteredBoards.sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'applications':
          return b.totalApplications - a.totalApplications;
        case 'newest':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
  }, [initialBoards, search, sort]);

  useEffect(() => {
    setBoards(filteredAndSortedBoards);
  }, [filteredAndSortedBoards]);

  return (
    <div
      className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      }`}
    >
      <BoardCard board={allApplications} viewMode={viewMode} />
      {boards?.map((board) => (
        <BoardCard key={board._id} board={board} viewMode={viewMode} />
      ))}
    </div>
  );
}
