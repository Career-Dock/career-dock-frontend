'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { TApplication } from '@/types/application';

export const columns: ColumnDef<TApplication>[] = [
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
  {
    accessorKey: 'companyName',
    header: 'Company',
    cell: ({ row }) => {
      const company = row.getValue('companyName') as string;
      return <span>{company || 'N/A'}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'jobType',
    header: 'Job Type',
  },
  {
    accessorKey: 'appliedDate',
    header: 'Applied Date',
    cell: ({ row }) => {
      const date = row.getValue('appliedDate') as Date;
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
