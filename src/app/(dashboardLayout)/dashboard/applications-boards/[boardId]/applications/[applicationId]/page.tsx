import { Suspense } from 'react';
import PageContainer from '@/components/page-container';
import FormCardSkeleton from '@/components/form-card-skeleton';
import ApplicationViewPage from '../../../_components/application-view-page';

export const metadata = {
  title: 'Dashboard : Product View',
};

type PageProps = { params: Promise<{ applicationId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ApplicationViewPage applicationId={params.applicationId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
