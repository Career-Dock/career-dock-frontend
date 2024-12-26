import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ApplicationForm from './application-form';

type TApplicationViewPageProps = {
  applicationId: string;
};

export default async function ApplicationViewPage({
  applicationId,
}: TApplicationViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Application';

  if (applicationId !== 'new') {
    const data = await fakeProducts.getProductById(Number(applicationId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Application`;
  }

  return <ApplicationForm initialData={product} pageTitle={pageTitle} />;
}
