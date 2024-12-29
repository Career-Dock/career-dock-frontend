'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'next/navigation';
import { BoardCard } from './board-card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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

const allApplictions = {
  _id: 'hgkdfhdkjf',
  name: 'All Applications',
  description: 'All applications from all the boards, at one place',
  image: '/board.jpg',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-22'),
  totalApplications: 50,
  activeApplications: 45,
};

const formSchema = z.object({
  name: z.string().min(1, 'Board name is required'),
  description: z.string().min(1, 'Board description is required').optional(),
  image: z.string().min(1, 'Board image is required').optional(),
});

export function BoardsList({ initialBoards }: BoardsListProps) {
  const [boards, setBoards] = useState(initialBoards);
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid';
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const result = await postRequest("application-groups", values);
    // console.log("API Response:", result);
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      }`}
    >
      <BoardCard board={allApplictions} viewMode={viewMode} />
      {boards?.map((board) => (
        <BoardCard key={board._id} board={board} viewMode={viewMode} />
      ))}
    </div>
  );
}
