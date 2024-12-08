"use client";
import {
  Calendar,
  ChartLine,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: UsersRound,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserRound,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Sales Report",
    url: "/dashboard/sales-report",
    icon: ChartLine,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="p-3 bg-slate-900">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 text-base mb-3 uppercase mx-auto border-b rounded-sm border-sky-300 px-3 py-1">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${
                    pathname === item.url
                      ? "bg-gray-700 text-sky-500 rounded"
                      : "text-gray-300"
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
