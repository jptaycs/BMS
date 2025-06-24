import { LayoutDashboard, Calendar, Users, House, FileBadge2, TrendingUp, BanknoteArrowUpIcon, Files, Settings, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "./sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Event Manager",
    url: "/event-manager",
    icon: Calendar
  },
  {
    title: "Residents",
    url: "/residents",
    icon: Users
  },
  {
    title: "Households",
    url: "/households",
    icon: House
  },
  {
    title: "Certificate",
    url: "/certificates",
    icon: FileBadge2
  },
  {
    title: "Income",
    url: "/income",
    icon: TrendingUp
  },
  {
    title: "Expense",
    url: "/expense",
    icon: BanknoteArrowUpIcon
  },
  {
    title: "Blotter Records",
    url: "/blotter",
    icon: Files
  },
  {
    title: "Officials and Staffs",
    url: "/officials",
    icon: Users
  },
]

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="z-20">
      <SidebarHeader className="mt-2">
        <SidebarTrigger className=" hover:bg-primary hover:text-foreground ml-3" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className=" font-redhat text-black max-w-[10rem] ">
                <SidebarMenuButton asChild
                  className="hover:bg-primary hover:text-foreground ml-3"
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup >
      </SidebarContent >
      <SidebarFooter className="mb-3">
        <SidebarMenuItem className="font-redhat text-black max-w-[10rem]">
          <SidebarMenuButton asChild
            className="hover:bg-primary hover:text-foreground ml-3"
          >
            <a href="/settings">
              <Settings />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton asChild
            className="hover:bg-red-500 hover:text-foreground ml-3"
          >
            <a href="/login">
              <LogOut />
              <span>Logout</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar >
  )
}
