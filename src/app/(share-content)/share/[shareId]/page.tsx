import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import SharedJobApplicationsTable from '../_components/share-application-list';

export default async function ShareApplicationPage({ props }: { props: any }) {
  const params = await props;
  const shareId = params?.shareId;
  return (
    <main className=" container">
      <SharedJobApplicationsTable shareId={shareId} />
    </main>
  );
}
