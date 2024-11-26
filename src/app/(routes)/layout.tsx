"use client"; // This is required for client-side rendering
import { useState } from "react";
import MobileNav from "../layouts/MobileNav";
import Search from "../../components/ui/Search";
import Sidebar from "../layouts/Sidebar";

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      <div className="lg:flex lg:flex-1">
        {/* Sidebar for Desktop View */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={setIsSidebarCollapsed}
        />

        {/* Main Content */}
        <main
          className={`flex-1 flex flex-col gap-2 overflow-y-auto transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "lg:ml-[8rem]" : "lg:ml-[14rem]"
          }`}
        >
          {/* Add conditional spacing for mobile to account for MobileNav */}
          <div className="lg:hidden mt-12" /> {/* Adds space below MobileNav for mobile */}
          <Search />
          {children}
        </main>
      </div>
    </div>
  );
}


