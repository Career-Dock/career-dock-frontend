'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';

export default function ApplicationForm() {
  const { id } = useParams();
  const isNewApplication = id === 'new';
  const [date, setDate] = useState<Date>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isNewApplication ? 'Add New Application' : 'Edit Application'}
        </CardTitle>
        <CardDescription>
          {isNewApplication
            ? 'Fill in the details for your new job application.'
            : 'Update the details of your existing job application.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="jobTitle">Job Title</label>
            <Input id="jobTitle" placeholder="Enter job title" />
          </div>
          <div className="space-y-2">
            <label htmlFor="company">Company Name</label>
            <Input id="company" placeholder="Enter company name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Job Description</label>
            <Textarea id="description" placeholder="Enter job description" />
          </div>
          <div className="space-y-2">
            <label htmlFor="status">Application Status</label>
            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="deadline">Application Deadline</label>
            <DatePicker />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">
            {isNewApplication ? 'Add Application' : 'Update Application'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
