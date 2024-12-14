import { ModeToggle } from "@/components/toggle-dark";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <h1 className="text-primary-foreground h-5 w-full bg-primary">
        Welcome to Cateer Dock
      </h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
}
