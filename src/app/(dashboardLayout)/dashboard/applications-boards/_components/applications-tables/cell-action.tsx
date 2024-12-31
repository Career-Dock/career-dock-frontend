'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TApplication } from '@/types/application';
import { useFetch } from '@/utils/useFetch';
import {
  Edit,
  MoreHorizontal,
  PenBox,
  ReceiptTextIcon,
  Trash,
} from 'lucide-react';
import { useState } from 'react';
import UpdateApplicationButton from '../update-application-button';
import { useParams, useRouter } from 'next/navigation';

interface CellActionProps {
  data: TApplication;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { fetchData } = useFetch();
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  const onConfirm = async () => {
    try {
      setLoading(true);
      await fetchData(
        `applications/${data._id}`,
        'DELETE',
        {},
        `/dashboard/applications-boards/${data.applicationGroupId}/applications`
      );
    } catch (error) {
      console.error('Error deleting application:', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <UpdateApplicationButton application={data}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          </UpdateApplicationButton>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/applications-boards/${boardId}/applications/${data._id}`
              )
            }
          >
            <ReceiptTextIcon className="mr-2 h-4 w-4" /> Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
