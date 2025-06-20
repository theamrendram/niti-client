import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  // SidebarTrigger
} from "@/components/ui/sidebar";
import { Home, Inbox, Calendar, Command } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
const AppSidebar = () => {
  const mainMenuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Command,
    },
    {
      title: "My to-do",
      url: "/to-do",
      icon: Inbox,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: Calendar,
    },
  ];
  const incomingDeadlinesItems = [
    {
      title: "Mobile app layout",
      url: "/projects/Mobile Development",
      icon: Home,
    },
    {
      title: "landing page 1",
      url: "/projects/Landing Page",
      icon: Inbox,
    },
    {
      title: "CMS deployment",
      url: "/projects/CMS Development",
      icon: Calendar,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <Sidebar className="w-64">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="border rounded-md flex items-center gap-2 p-2">
                  <img
                    src="https://ui-avatars.com/api/?name=Batman&background=121826&color=fff"
                    alt="avatar"
                    className="rounded-md h-8 w-8"
                  />
                  <div className="">
                    <p>Batman</p>
                    <p className="text-sm text-gray-600 -mt-1">
                      batman@gmail.com
                    </p>
                  </div>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="border rounded-md">
                  <Input type="text" placeholder="search" />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="text-gray-500">
                  {mainMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="text-black" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>INCOMING DEADLINE</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="text-gray-500">
                  {incomingDeadlinesItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="text-black" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AppSidebar;
