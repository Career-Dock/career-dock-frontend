export type TInterviewDetails = {
  date?: string;
  time?: string;
  location?: string;
};

export type TApplication = {
  _id?: string;
  clerkUserId: string;
  applicationGroupId?: string;
  jobTitle: string;
  jobRole: string;
  appliedVia?: string;
  country?: string;
  companyName: string;
  companyEmail?: string;
  companyWebsite?: string;
  companyPhoneNumber?: string;
  jobPortal?: string;
  address?: string;
  jobType: 'remote' | 'onsite' | 'hybrid';
  status:
    | 'Applied'
    | 'Rejected'
    | 'Under_Review'
    | 'Task_Received'
    | 'Task_Ongoing'
    | 'Task_Submitted'
    | 'Interview_Scheduled'
    | 'Offer_Received'
    | 'Offer_Accepted';
  appliedDate?: Date;
  interviewDetails?: TInterviewDetails;
  notes?: string;
  jobPostingURL?: string;
  resumeURL?: string;
  salaryRange?: string;
};

export type TApplicationGroup = {
  _id: string;
  name: string;
  description?: string;
  clerkUserId: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};
