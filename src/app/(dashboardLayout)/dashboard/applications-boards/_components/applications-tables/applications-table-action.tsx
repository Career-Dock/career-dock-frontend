'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
  useProductTableFilters,
} from './use-product-table-filters';

export default function ApplicationsTableAction() {
  const {
    setStatusFilter,
    setJobTypeFilter,
    setDateRangeFilter,
    jobTypeFilter,
    statusFilter,
    dateRangeFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useProductTableFilters();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="by title, company name, country"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="status"
        title="Status"
        options={STATUS_OPTIONS}
        setFilterValue={setStatusFilter}
        filterValue={statusFilter}
      />
      <DataTableFilterBox
        filterKey="jobType"
        title="Job Type"
        options={JOB_TYPE_OPTIONS}
        setFilterValue={setJobTypeFilter}
        filterValue={jobTypeFilter}
      />
      <DateRangePicker value={dateRangeFilter} onChange={setDateRangeFilter} />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
