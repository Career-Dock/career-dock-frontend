'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, ChevronsUpDown, Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useFetch } from '@/utils/useFetch';
import { countries } from '@/lib/countries-data';

const formSchema = z.object({
  _id: z.string().optional(),
  clerkUserId: z.string().optional(),
  applicationGroupId: z.string().optional(),
  jobTitle: z
    .string()
    .min(2, { message: 'Job title must be at least 2 characters.' }),
  companyName: z.string().min(2, { message: 'Company name is required.' }),
  companyEmail: z
    .string()
    .email({ message: 'Invalid email address.' })
    .optional(),
  companyWebsite: z.string().url({ message: 'Invalid URL.' }).optional(),
  companyPhoneNumber: z.string().optional(),
  country: z.string().min(1, { message: 'Country is required.' }),
  appliedVia: z.enum([
    'email',
    'phone',
    'linkedin',
    'company_website',
    'job_board',
    'referral',
    'social_media',
    'other',
  ]),
  jobPortal: z.string().optional(),
  address: z.string().optional(),
  jobType: z.enum(['remote', 'onsite', 'hybrid']),
  status: z.enum([
    'Applied',
    'Interview_Scheduled',
    'Rejected',
    'Under_Review',
    'Task_Received',
    'Task_Ongoing',
    'Task_Submitted',
    'Offer_Received',
    'Offer_Accepted',
  ]),
  appliedDate: z.string(),
  interviewDetails: z
    .object({
      date: z.string().optional(),
      time: z.string().optional(),
      location: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
  jobPostingURL: z.string().url({ message: 'Invalid URL.' }).optional(),
  resumeURL: z.string().url({ message: 'Invalid URL.' }).optional(),
  salaryRange: z.string().optional(),
});

export default function ApplicationForm({
  initialData,
  pageTitle,
  onSubmitSuccess,
}: {
  initialData?: z.infer<typeof formSchema> | null;
  pageTitle: string;
  onSubmitSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useAuth();
  const params = useParams<{ boardId: string }>();
  const { fetchData, isLoading, error } = useFetch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          appliedDate: formatDateForInput(initialData.appliedDate),
        }
      : {
          jobType: 'remote',
          status: 'Applied',
          appliedDate: formatDateForInput(new Date().toISOString()),
          country: '',
        },
  });

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  function formatDateForSubmission(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    setIsSubmitting(true);
    try {
      values.applicationGroupId = params.boardId;
      values.appliedDate = formatDateForSubmission(values.appliedDate);

      const endpoint = initialData
        ? `applications/${initialData._id}`
        : 'applications';
      const method = initialData ? 'PATCH' : 'POST';

      const result = await fetchData(
        endpoint,
        method,
        values,
        '/dashboard/applications-boards/[boardId]/applications'
      );

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="flex justify-between flex-row">
        <CardTitle className="text-2xl font-bold">{pageTitle}</CardTitle>

        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? 'Updating...' : 'Submitting...'}
            </>
          ) : initialData ? (
            'Update Application'
          ) : (
            'Submit Application'
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appliedVia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Applied Via <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select how you applied" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="company_website">
                          Company Website
                        </SelectItem>
                        <SelectItem value="job_board">Job Board</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="social_media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>
                      Country <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? countries.find(
                                  (country) => country.value === field.value
                                )?.label
                              : 'Select country'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <div className="flex flex-col">
                          <Input
                            placeholder="Search countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-b rounded-t-md focus:outline-none"
                          />
                          <ScrollArea className="h-72">
                            {filteredCountries.length === 0 ? (
                              <div className="p-2 text-sm text-gray-500">
                                No countries found
                              </div>
                            ) : (
                              filteredCountries.map((country) => (
                                <Button
                                  key={country.value}
                                  onClick={() => {
                                    form.setValue('country', country.value);
                                    setOpen(false);
                                    setSearchQuery('');
                                  }}
                                  variant="ghost"
                                  className="w-full justify-start"
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      country.value === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {country.label}
                                </Button>
                              ))
                            )}
                          </ScrollArea>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Type <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interview_Scheduled">
                          Interview Scheduled
                        </SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="Under_Review">
                          Under Review
                        </SelectItem>
                        <SelectItem value="Task_Received">
                          Task Received
                        </SelectItem>
                        <SelectItem value="Task_Ongoing">
                          Task Ongoing
                        </SelectItem>
                        <SelectItem value="Task_Submitted">
                          Task Submitted
                        </SelectItem>
                        <SelectItem value="Offer_Received">
                          Offer Received
                        </SelectItem>
                        <SelectItem value="Offer_Accepted">
                          Offer Accepted
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobPostingURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Posting URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job posting URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appliedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Applied Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter company email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobPortal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Portal</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job portal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resumeURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter resume URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter salary range" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interview Details</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="interviewDetails.date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interviewDetails.time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interviewDetails.location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Location </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter interview location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? 'Updating...' : 'Submitting...'}
                </>
              ) : initialData ? (
                'Update Application'
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
