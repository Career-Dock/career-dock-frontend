import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ApplicationTable } from '@/components/ui/table/data-table';
import { columns } from './applications-tables/columns';
import { fetchFromServer } from '@/utils/fetchFromServer';

type ApplicationListingPage = {
  boardId: string;
};

export default async function ApplicationListingPage({
  boardId,
}: ApplicationListingPage) {
  // Retrieve query parameters from the searchParamsCache
  const page = searchParamsCache.get('page') || 1; // Default to page 1 if not set
  const search = searchParamsCache.get('q'); // Search term
  const pageLimit = searchParamsCache.get('limit') || 10; // Default to 10 items per page
  const status = searchParamsCache.get('status'); // Status filter
  const jobType = searchParamsCache.get('jobType'); // Job type filter

  // Construct API query parameters
  const queryParams = new URLSearchParams({
    ...(search && { searchTerm: search }),
    ...(status && { status }),
    ...(boardId != 'all' && { applicationGroupId: boardId }),
    ...(jobType && { jobType }),
    page: String(page),
    limit: String(pageLimit),
  }).toString();

  try {
    // Fetch data from the real API
    const response = await fetchFromServer(`/applications?${queryParams}`);

    // console.log('response', response?.data);

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch data');
    }

    //const { totalItems, items: products } = response; // Adjust keys based on your API's response structure

    const totalItems = response?.data?.count;
    const applications = response?.data?.applications;

    return (
      <ApplicationTable
        columns={columns}
        data={applications || []}
        totalItems={totalItems}
      />
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
