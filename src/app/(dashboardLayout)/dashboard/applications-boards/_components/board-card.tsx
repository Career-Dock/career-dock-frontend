"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFetch } from "@/utils/useFetch";

interface BoardCardProps {
  board: {
    _id: string;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    totalApplications: number;
    activeApplications: number;
  };
  viewMode: "grid" | "list";
}

export function BoardCard({ board, viewMode }: BoardCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedBoard, setEditedBoard] = useState(board);
  const { fetchData, isLoading, error } = useFetch();

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await fetchData(
      `application-groups/${board._id}`,
      "PATCH",
      editedBoard,
      "dashboard/applications-boards"
    );
    // Here you would typically send the editedBoard data to your backend
    console.log("Submitting edited board:", editedBoard);
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    // Here you would typically send a delete request to your backend
    console.log("Deleting board:", board._id);
    const result = await fetchData(
      `application-groups/${board._id}`,
      "DELETE",
      editedBoard,
      "/dashboard/applications-boards"
    );
    setIsDeleteDialogOpen(false);
  };

  const renderEditDialog = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
          <DialogDescription>
            Make changes to your board here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedBoard.name}
                onChange={(e) =>
                  setEditedBoard({ ...editedBoard, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editedBoard.description}
                onChange={(e) =>
                  setEditedBoard({
                    ...editedBoard,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={editedBoard.image}
                onChange={(e) =>
                  setEditedBoard({ ...editedBoard, image: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  const renderDeleteDialog = () => (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the board
            and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (viewMode === "list") {
    return (
      <Card className="group relative overflow-hidden transition-all hover:shadow-md">
        <div className="flex items-start p-4 gap-4">
          <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
            <img
              src={board.image || "/board.jpg"}
              alt={board.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-grow min-w-0">
            <CardHeader className="p-0">
              <CardTitle className="line-clamp-1">{board.name}</CardTitle>
              <CardDescription className="line-clamp-2 mt-0.5">
                {board.description || "No description"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 mt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="rounded-md">
                  {board.totalApplications} Applications
                </Badge>
                <Badge variant="outline" className="rounded-md">
                  {board.activeApplications} Active
                </Badge>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Last updated {format(board.updatedAt, "MMM d, yyyy")}
              </div>
            </CardContent>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 self-center ml-4">
            <Button className="shadow-sm" size="sm">
              <Link
                href={`/dashboard/applications-boards/${board._id}/applications`}
              >
                View Applications
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Board
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setIsDeleteDialogOpen(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Board
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {renderEditDialog()}
        {renderDeleteDialog()}
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <CardHeader className="relative p-0 space-y-0">
        <div className="absolute right-4 top-4 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-primary"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Board
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setIsDeleteDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Board
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full h-[180px] bg-muted overflow-hidden group-hover:opacity-90 transition-opacity rounded-t-lg">
          <img
            src={board.image || "/board.jpg"}
            alt={board.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 pt-3">
          <CardTitle className="line-clamp-1">{board.name}</CardTitle>
          <CardDescription className="line-clamp-2 mt-0.5">
            {board.description || "No description"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="rounded-md">
            {board.totalApplications} Applications
          </Badge>
          <Badge variant="outline" className="rounded-md">
            {board.activeApplications} Active
          </Badge>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Last updated {format(board.updatedAt, "MMM d, yyyy")}
        </div>
      </CardContent>
      <Link
        href={`/dashboard/applications-boards/${board._id}/applications`}
        className="p-5 pt-4 mt-auto"
      >
        <Button className="w-full shadow-sm" size="sm">
          View Applications
        </Button>
      </Link>
      {renderEditDialog()}
      {renderDeleteDialog()}
    </Card>
  );
}
