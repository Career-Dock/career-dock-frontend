import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SharedJobApplicationsTable({
  shareId,
}: {
  shareId: string;
}) {
  return (
    <div className="rounded-md border p-4">
      <h2 className=" text-2xl font-semibold mb-12">
        Job Applications of: Titumir Vai
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Applied Via</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Application Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Frontend Developer</TableCell>
            <TableCell>Test Company</TableCell>
            <TableCell>Antigua and Barbuda</TableCell>
            <TableCell>
              <Button variant="ghost" className="h-8 p-0">
                <Badge className="bg-pink-500 hover:bg-pink-600">
                  Task Submitted
                </Badge>
              </Button>
            </TableCell>
            <TableCell>
              <Badge className="bg-blue-500 hover:bg-blue-600">Remote</Badge>
            </TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>December 28, 2024</TableCell>
            <TableCell>
              <Link href="#" className="text-blue-500 hover:underline">
                Job Posting Link
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
