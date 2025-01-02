/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { TApplication } from '@/types/application';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useFetch } from '@/utils/useFetch';
import { useCallback, useState } from 'react';

type JobTypeBadgeProps = {
  jobType: string;
};

export function JobTypeBadge({ jobType }: JobTypeBadgeProps) {
  const getJobTypeColor = (jobType: string) => {
    switch (jobType.toLowerCase()) {
      case 'remote':
        return 'bg-indigo-500 hover:bg-indigo-600 rounded-sm';
      case 'onsite':
        return 'bg-orange-500 hover:bg-orange-600 rounded-sm';
      case 'hybrid':
        return 'bg-purple-500 hover:bg-purple-600 rounded-sm';
      default:
        return 'bg-gray-500 hover:bg-gray-600 rounded-sm';
    }
  };

  return (
    <Badge className={`${getJobTypeColor(jobType)} text-white capitalize`}>
      {jobType}
    </Badge>
  );
}

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview_Scheduled':
        return 'bg-fuchsia-500 hover:bg-fuchsia-600 rounded-sm';
      case 'Applied':
        return 'bg-blue-500 hover:bg-blue-600 rounded-sm';
      case 'Rejected':
        return 'bg-red-500 hover:bg-red-600 rounded-sm';
      case 'Under_Review':
        return 'bg-purple-500 hover:bg-purple-600 rounded-sm';
      case 'Task_Received':
        return 'bg-orange-500 hover:bg-orange-600 rounded-sm';
      case 'Task_Ongoing':
        return 'bg-indigo-500 hover:bg-indigo-600 rounded-sm';
      case 'Task_Submitted':
        return 'bg-pink-500 hover:bg-pink-600 rounded-sm';
      case 'Offer_Received':
        return 'bg-green-500 hover:bg-green-600 rounded-sm';
      case 'Offer_Accepted':
        return 'bg-teal-500 hover:bg-teal-600 rounded-sm';
      default:
        return 'bg-gray-500 hover:bg-gray-600 rounded-sm';
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} text-white`}>
      {status.replace('_', ' ')}
    </Badge>
  );
}

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
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => {
      const value = row.getValue('country') as string;
      return <span>{value || 'N/A'}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const [currentStatus, setCurrentStatus] = useState(
        row.getValue('status') as string
      );
      const { fetchData, isLoading, error } = useFetch();

      const statuses = [
        'Applied',
        'Under_Review',
        'Interview_Scheduled',
        'Task_Received',
        'Task_Ongoing',
        'Task_Submitted',
        'Offer_Received',
        'Offer_Accepted',
        'Rejected',
      ];

      const onStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;

        try {
          await fetchData(
            `applications/update-status/${row.original._id}`,
            'PATCH',
            { status: newStatus },
            'dashboard/applications'
          );

          setCurrentStatus(newStatus);
        } catch (err) {
          console.error('Error updating status:', err);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
            <div className="flex items-center gap-2 cursor-pointer">
              <StatusBadge status={currentStatus} />
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            {statuses.map((statusOption) => (
              <DropdownMenuItem
                key={statusOption}
                onClick={() => onStatusChange(statusOption)}
                className="flex items-center justify-between"
                disabled={isLoading}
              >
                <div className="flex items-center gap-2">
                  <StatusBadge status={statusOption} />
                </div>
                {currentStatus === statusOption && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'jobType',
    header: 'Job Type',
    cell: ({ row }) => {
      const jobType = row.getValue('jobType') as string;
      return <JobTypeBadge jobType={jobType} />;
    },
  },
  {
    accessorKey: 'appliedVia',
    header: 'Applied Via',
    cell: ({ row }) => {
      const value = row.getValue('appliedVia') as string;
      return (
        <span className=" capitalize">{value?.replace('_', ' ') || 'N/A'}</span>
      );
    },
  },
  {
    accessorKey: 'appliedDate',
    header: 'Applied Date',
    cell: ({ row }) => {
      const date = row.getValue('appliedDate') as string;
      if (!date) return 'N/A';

      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const fullDateTime = new Date(date).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
      });

      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">{formattedDate}</span>
            </TooltipTrigger>
            <TooltipContent className="bg-black/80 text-white">
              <p>{fullDateTime}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'jobPostingURL',
    header: 'Application Link',
    cell: ({ row }) => {
      const link = row.getValue('jobPostingURL') as string;
      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="p-0">
                <Link href={link || ''}>Job Posting Link</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className=" bg-black/80 text-white">
              <Link href={link || ''}>{link || 'No link available'}</Link>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
