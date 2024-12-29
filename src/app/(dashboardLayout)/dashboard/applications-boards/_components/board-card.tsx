"use client";

import { MoreHorizontal, Pencil, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";

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
import Link from "next/link";

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
              <Link href="/dashboard/applications-boards/dfdfdfd/applications">
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
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Board
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Board
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Board
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
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
        href="/dashboard/applications-boards/dfdfdfd/applications"
        className="p-5 pt-4 mt-auto"
      >
        <Button className="w-full shadow-sm" size="sm">
          View Applications
        </Button>
      </Link>
    </Card>
  );
}
