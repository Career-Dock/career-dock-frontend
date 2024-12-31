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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// This would typically come from your API or database
const application = {
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
    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
      <Icon className="h-5 w-5 text-gray-500" />
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {value || 'N/A'}
          </a>
        ) : (
          <p className="text-sm font-semibold">{value || 'N/A'}</p>
        )}
      </div>
    </div>
  );
}

export default function ApplicationDetails() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {application.jobTitle}
          </h1>
          <p className="text-xl text-gray-600">{application.companyName}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className={`${
                  statusColors[application.status]
                } text-white px-3 py-1 text-sm font-semibold`}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-gray-800">
              Company Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 pt-4">
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

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-gray-800">
              Application Info
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 pt-4">
            <InfoItem
              icon={CalendarDays}
              label="Applied on"
              value={application.appliedDate.toLocaleDateString()}
            />
            <InfoItem
              icon={FileText}
              label="Applied via"
              value={application.appliedVia}
            />
            <InfoItem
              icon={DollarSign}
              label="Salary Range"
              value={application.salaryRange}
            />
            <InfoItem
              icon={MapPin}
              label="Job Type"
              value={
                application.jobType.charAt(0).toUpperCase() +
                application.jobType.slice(1)
              }
            />
          </CardContent>
        </Card>

        {application.interviewDetails ? (
          <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Interview Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 pt-4">
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
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Interview Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-center h-32 bg-gray-100 rounded-md">
                <p className="text-gray-500 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  No interview details available yet
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-gray-800">Notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {application.notes ? (
              <p className="text-gray-700">{application.notes}</p>
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100 rounded-md">
                <p className="text-gray-500 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  No notes added yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <Button variant="outline" className="w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          Edit Application
        </Button>
        <Button className="w-full sm:w-auto">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Job Posting
        </Button>
      </div>
    </div>
  );
}
