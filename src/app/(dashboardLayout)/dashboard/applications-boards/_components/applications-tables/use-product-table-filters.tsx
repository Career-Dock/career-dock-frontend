'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const STATUS_OPTIONS = [
  { value: 'Interview Scheduled', label: 'Interview Scheduled' },
  { value: 'Applied', label: 'Applied' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Under Review', label: 'Under Review' },
];

export const JOB_TYPE_OPTIONS = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'Onsite' },
  { value: 'hybrid', label: 'Hybrid' },
];

export function useProductTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    searchParams.status.withOptions({ shallow: false }).withDefault('')
  );

  const [jobTypeFilter, setJobTypeFilter] = useQueryState(
    'jobType',
    searchParams.jobType.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setStatusFilter(null);
    setJobTypeFilter(null);
    setPage(1);
  }, [setSearchQuery, setStatusFilter, setPage, setJobTypeFilter]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!statusFilter || !!jobTypeFilter;
  }, [searchQuery, statusFilter, jobTypeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    statusFilter,
    setStatusFilter,
    jobTypeFilter,
    setJobTypeFilter,
  };
}
