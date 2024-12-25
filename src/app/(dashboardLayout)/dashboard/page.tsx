import { redirect } from 'next/navigation';

export default async function Dashboard() {
  //const session = await auth();

  const session = {
    user: {
      name: 'John Doe',
      email: 'john@gmail.com',
    },
  };

  if (!session?.user) {
    return redirect('/');
  } else {
    redirect('/dashboard/overview');
  }
}
