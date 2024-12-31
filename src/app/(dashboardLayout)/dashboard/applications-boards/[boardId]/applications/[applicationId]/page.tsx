import { Suspense } from 'react';
import PageContainer from '@/components/page-container';
import FormCardSkeleton from '@/components/form-card-skeleton';
import ApplicationDetails from '../../../_components/application-details';

export const metadata = {
  title: 'Dashboard : Product View',
};

type PageProps = any;

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ApplicationDetails />
        </Suspense>
      </div>
    </PageContainer>
  );
}
