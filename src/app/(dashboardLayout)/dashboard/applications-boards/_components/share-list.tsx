'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ApplicationShare {
  id: string;
  shareName: string;
  applicationGroupName: string;
  isPaused: boolean;
  createdAt: Date;
  applicationLink: string;
}

const ITEMS_PER_PAGE = 10;

const sampleData: ApplicationShare[] = Array.from({ length: 50 }, (_, i) => ({
  id: `id-${i + 1}`,
  shareName: `Share ${i + 1}`,
  applicationGroupName:
    i % 3 === 0 ? 'All Applications' : `Group ${(i % 5) + 1}`,
  isPaused: i % 4 === 0,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  applicationLink: `https://example.com/share/${Math.random()
    .toString(36)
    .substring(2, 15)}`,
}));

export default function ApplicationShareTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareToDelete, setShareToDelete] = useState<ApplicationShare | null>(
    null
  );
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  const totalPages = Math.ceil(sampleData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = sampleData.slice(startIndex, endIndex);

  const handleUpdate = (share: ApplicationShare) => {};

  const handleDelete = (share: ApplicationShare) => {
    setShareToDelete(share);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (shareToDelete) {
      setDeleteDialogOpen(false);
      setShareToDelete(null);
    }
  };

  const copyToClipboard = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLinkId(id);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Share Name</TableHead>
            <TableHead>Board Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Share Link</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.shareName}</TableCell>
              <TableCell>{item.applicationGroupName}</TableCell>
              <TableCell>
                <Badge
                  className={item.isPaused ? ' bg-rose-500' : 'bg-green-500'}
                >
                  {item.isPaused ? 'Paused' : 'Active'}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="truncate max-w-[200px]">
                    {item.applicationLink}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(item.id, item.applicationLink)
                    }
                    aria-label={`Copy link for ${item.shareName}`}
                  >
                    {copiedLinkId === item.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdate(item)}
                    aria-label={`Update ${item.shareName}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    aria-label={`Delete ${item.shareName}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this share?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              share "{shareToDelete?.shareName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
