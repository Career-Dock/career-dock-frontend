import PageContainer from '@/components/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ApplicationShareTable from '../../../_components/share-list';

export default function ShareListPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={'Share List'} description="Manage your Share" />
        </div>
        <Separator />
        <ApplicationShareTable />
      </div>
    </PageContainer>
  );
}
