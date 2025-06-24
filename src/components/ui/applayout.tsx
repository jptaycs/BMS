import AppSidebar from "./appsidebar";
import { SidebarProvider } from "./sidebar";
import Header from "./header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  return <>
    <Header />
    <SidebarProvider open={open} onOpenChange={setOpen} >
      <AppSidebar />
    </SidebarProvider>
    <Outlet />
  </>
}
