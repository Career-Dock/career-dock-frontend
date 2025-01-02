import {
  CalendarDays,
  MapPin,
  Building,
  Globe,
  Phone,
  Mail,
  FileText,
  DollarSign,
  ExternalLink,
  Edit,
  Clock,
  AlertCircle,
  Briefcase,
  Flag,
  LinkIcon,
  FileCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchFromServer } from '@/utils/fetchFromServer';
import { TApplication } from '@/types/application';
import Link from 'next/link';
import UpdateApplicationButton from './update-application-button';

// This would typically come from your API or database
const application = {
  clerkUserId: 'user_123456',
  applicationGroupId: 'group_789012',
  jobTitle: 'Senior Frontend Developer',
  companyName: 'TechCorp Inc.',
  country: 'United States',
  appliedVia: 'Company Website',
  companyEmail: 'hr@techcorp.com',
  companyWebsite: 'https://www.techcorp.com',
  companyPhoneNumber: '+1 (555) 123-4567',
  jobPortal: 'LinkedIn',
  address: '123 Tech Street, San Francisco, CA 94105',
  jobType: 'hybrid',
  status: 'Interview_Scheduled',
  appliedDate: new Date('2023-06-15'),
  interviewDetails: {
    date: '2023-06-30',
    time: '14:00',
    location: 'TechCorp HQ, 10th Floor',
  },
  notes:
    'Excited about this opportunity. Need to prepare for technical interview.',
  jobPostingURL: 'https://www.techcorp.com/careers/senior-frontend-developer',
  resumeURL: 'https://myresume.com/john-doe-resume.pdf',
  salaryRange: '$120,000 - $150,000',
};

const statusColors = {
  Applied: 'bg-blue-500',
  Interview_Scheduled: 'bg-purple-500',
  Rejected: 'bg-red-500',
  Under_Review: 'bg-yellow-500',
  Task_Received: 'bg-orange-500',
  Task_Ongoing: 'bg-indigo-500',
  Task_Submitted: 'bg-cyan-500',
  Offer_Received: 'bg-green-500',
  Offer_Accepted: 'bg-emerald-500',
};

function InfoItem({ icon: Icon, label, value, href }: any) {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <div className="bg-primary/10 p-2 rounded-full">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            {value || 'N/A'}
          </a>
        ) : (
          <p className="font-semibold">{value || 'N/A'}</p>
        )}
      </div>
    </div>
  );
}

export default async function ApplicationDetails({
  applicationId,
}: {
  applicationId: string;
}) {
  const response = await fetchFromServer(`/applications/${applicationId}`);

  const application = response.data as TApplication;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {application.jobTitle}
            </h1>
            <p className="text-2xl text-gray-600">{application.companyName}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  className={`${
                    statusColors[application.status]
                  } text-white px-4 py-1 text-base font-semibold rounded-full`}
                >
                  {application.status.replace(/_/g, ' ')}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current application status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge variant="outline" className="text-base py-1 px-3">
            <MapPin className="w-4 h-4 mr-2" />
            {application.country}
          </Badge>
          <Badge variant="outline" className="text-base py-1 px-3">
            <Briefcase className="w-4 h-4 mr-2" />
            {application.jobType.charAt(0).toUpperCase() +
              application.jobType.slice(1)}
          </Badge>
          <Badge variant="outline" className="text-base py-1 px-3">
            <DollarSign className="w-4 h-4 mr-2" />
            {application.salaryRange}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Application Details</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="interview">Interview Details</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={CalendarDays}
                label="Applied Date"
                value={application?.appliedDate}
              />
              <InfoItem
                icon={FileText}
                label="Applied Via"
                value={application.appliedVia}
              />
              <InfoItem
                icon={Flag}
                label="Application Group"
                value={application.applicationGroupId}
              />
              <InfoItem
                icon={LinkIcon}
                label="Job Portal"
                value={application.jobPortal}
              />
              <InfoItem
                icon={Globe}
                label="Job Posting URL"
                value="View"
                href={application.jobPostingURL}
              />
              <InfoItem
                icon={FileCheck}
                label="Resume"
                value="View Resume"
                href={application.resumeURL}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {application.notes ? (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {application.notes}
                </p>
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
                  <p className="text-gray-500 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    No notes added yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={Building}
                label="Company"
                value={application.companyName}
              />
              <InfoItem
                icon={MapPin}
                label="Address"
                value={application.address}
              />
              <InfoItem
                icon={Globe}
                label="Website"
                value={application.companyWebsite}
                href={application.companyWebsite}
              />
              <InfoItem
                icon={Phone}
                label="Phone"
                value={application.companyPhoneNumber}
              />
              <InfoItem
                icon={Mail}
                label="Email"
                value={application.companyEmail}
                href={`mailto:${application.companyEmail}`}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
            </CardHeader>
            <CardContent>
              {application.interviewDetails ? (
                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoItem
                    icon={CalendarDays}
                    label="Date"
                    value={application.interviewDetails.date}
                  />
                  <InfoItem
                    icon={Clock}
                    label="Time"
                    value={application.interviewDetails.time}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={application.interviewDetails.location}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
                  <p className="text-gray-500 flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    No interview details available yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <UpdateApplicationButton application={application}>
          <Button variant="outline" className="w-full sm:w-auto">
            <Edit className="mr-2 h-4 w-4" />
            Edit Application
          </Button>
        </UpdateApplicationButton>

        <Link href={application?.jobPostingURL!}>
          {' '}
          <Button className="w-full sm:w-auto">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Job Posting
          </Button>
        </Link>
      </div>
    </div>
  );
}
