import { ModeToggle } from '@/components/toggle-dark';
import { Button } from '@/components/ui/button';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Roles } from '@/types/globals';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  console.log('dfdfd');

  const { sessionClaims } = await auth();

  console.log(sessionClaims);

  return (
    <main>
      <ModeToggle />
      <h1 className="text-primary-foreground h-5 w-full bg-primary">
        Welcome to Cateer Dock
      </h1>

      {/* <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div> */}
    </main>
  );
}
