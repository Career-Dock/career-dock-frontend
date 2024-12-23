import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const applications = [
  {
    id: 1,
    jobTitle: 'Frontend Developer',
    company: 'TechCorp',
    status: 'Applied',
    deadline: '2023-07-15',
    priority: 'High',
  },
  {
    id: 2,
    jobTitle: 'UX Designer',
    company: 'DesignHub',
    status: 'Interview',
    deadline: '2023-07-20',
    priority: 'Medium',
  },
  // Add more sample data as needed
];

export default function ApplicationsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>All Applications</CardTitle>
        <Link href="/dashboard/applications/new">
          <Button>Add New Application</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.jobTitle}</TableCell>
                <TableCell>{app.company}</TableCell>
                <TableCell>
                  <Badge variant="outline">{app.status}</Badge>
                </TableCell>
                <TableCell>{app.deadline}</TableCell>
                <TableCell>
                  <Badge>{app.priority}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
