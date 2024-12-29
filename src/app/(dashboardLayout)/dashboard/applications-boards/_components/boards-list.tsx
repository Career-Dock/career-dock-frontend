"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { BoardCard } from "./board-card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Board {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  totalApplications: number;
  activeApplications: number;
}

interface BoardsListProps {
  initialBoards: Board[];
}

const allApplictions = {
  _id: "hgkdfhdkjf",
  name: "All Applications",
  description: "All applications from all the boards, at one place",
  image: "/board.jpg",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-22"),
  totalApplications: 50,
  activeApplications: 45,
};

const formSchema = z.object({
  name: z.string().min(1, "Board name is required"),
  description: z.string().min(1, "Board description is required").optional(),
  image: z.string().min(1, "Board image is required").optional(),
});

export function BoardsList({ initialBoards }: BoardsListProps) {
  const [boards, setBoards] = useState(initialBoards);
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get("view") as "grid" | "list") || "grid";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const result = await postRequest("application-groups", values);
    // console.log("API Response:", result);
  }

  if (boards.length === 0) {
    return (
      <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No boards created</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Create your first board to start organizing your applications.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="relative">
                <Plus className="mr-2 h-4 w-4" />
                Add Board
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create board</DialogTitle>
                <DialogDescription>
                  Add a new board to organize your applications.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter board name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter board description"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create board</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      <BoardCard board={allApplictions} viewMode={viewMode} />
      {boards.map((board) => (
        <BoardCard key={board._id} board={board} viewMode={viewMode} />
      ))}
    </div>
  );
}
