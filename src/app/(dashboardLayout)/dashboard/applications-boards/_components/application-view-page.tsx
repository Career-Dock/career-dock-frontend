import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ApplicationForm from './application-form';

type TApplicationViewPageProps = {
  applicationId: string;
};

export default async function ApplicationViewPage({
  applicationId,
}: TApplicationViewPageProps) {
  return <div>fdfdf</div>;
}
