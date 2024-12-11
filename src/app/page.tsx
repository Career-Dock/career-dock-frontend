import { ModeToggle } from "@/components/toggle-dark";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <h1 className="text-primary h-5 w-full bg-secondary">
        Welcome to Cateer Dock
      </h1>
      <Button className="">Click me</Button>
    </main>
  );
}
