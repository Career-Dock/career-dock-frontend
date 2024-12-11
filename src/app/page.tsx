import { ModeToggle } from "@/components/toggle-dark";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <h1 className="text-primary-foreground h-5 w-full bg-primary">
        Welcome to Cateer Dock
      </h1>
      <p className="text-secondary-foreground">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum facere
        at autem accusantium atque totam facilis vitae dolorem incidunt
        doloremque ad, voluptates fugiat ipsam distinctio odio reprehenderit ab
        et unde repellat minus, sunt blanditiis reiciendis beatae sed. Laborum
        saepe molestiae quas cumque dolorem fugit iusto, iste delectus est,
        tempore inventore cupiditate illum quidem explicabo debitis fuga. Enim
        libero perferendis natus excepturi ipsa. Voluptatem sint incidunt quos,
        ea ducimus porro similique laboriosam magnam aut non cumque explicabo
        quibusdam sapiente corrupti tenetur optio nisi molestiae eius? Nemo quia
        dolor quo eaque est provident modi similique error, itaque voluptatem
        maxime perferendis! Et, ipsam.
      </p>
      <Button className="">Click me</Button>
    </main>
  );
}
