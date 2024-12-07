"use client"; // This is required for client-side rendering
import { useState, useEffect} from "react";
import MobileNav from "../layouts/MobileNav";
import Search from "../../components/ui/Search";
import Sidebar from "../layouts/Sidebar";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";
import Preloader from "@/components/common/Preloader";

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { data: session, status } = useSession(); // Fetch session data and status
  const [isLoading, setIsLoading] = useState(true); // Manage preloader state

  useEffect(() => {
    // Simulate a consistent loading state
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after 2 seconds
    }, 2000);

    return () => clearTimeout(preloaderTimer); // Clean up timer
  }, []);

  // Show Preloader if session is loading or the simulated delay is active
  if (isLoading || status === "loading") {
    return <Preloader />;
  }


  const userName = session?.user?.firstName || "Guest"; 

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
          <div className="lg:hidden mt-20" /> {/* Adds space below MobileNav for mobile */}
          
        <div className="flex justify-between lg:mt-8 text-base md:text-lg font-semibold text-white text-opacity-75 px-4">
           {/* Welcome Message */} 
         <div className=""> 
          Welcome, {userName}! 
          </div>

          <div className="relative group">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center justify-center p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition duration-200 ease-in-out"
            >
              <AiOutlineLogout className="text-white text-xl" />
            </button>

            {/* Tooltip */}
            <span className="absolute right-12 top-1/2 transform -translate-y-1/2 translate-x-2 scale-0 group-hover:scale-100 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow-lg transition-transform duration-200 ease-in-out">
              Logout
            </span>
          </div>
        </div>
        

          <Search />
          {children}
        </main>
      </div>
    </div>
  );
}


