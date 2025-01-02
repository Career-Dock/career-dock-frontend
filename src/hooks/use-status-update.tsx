import { useFetch } from '@/utils/useFetch';
import { useState } from 'react';

export function useStatusUpdate(initialStatus: string, applicationId: string) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const { fetchData, isLoading, error } = useFetch();

  const updateStatus = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    try {
      await fetchData(
        `update-status/${applicationId}`,
        'PATCH',
        { status: newStatus },
        'dashboard/applications'
      );

      setCurrentStatus(newStatus);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return { currentStatus, isLoading, error, updateStatus };
}
