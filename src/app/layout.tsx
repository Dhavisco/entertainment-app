import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ClientLayout from "./layouts/ClientLayout";

export const metadata: Metadata = {
  title: "MovieZone",
  description: "Your ultimate entertainment hub",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[#10141E] text-gray-900"
      >
        <ErrorBoundary>  {/* Wrap children with ErrorBoundary */}
         <ClientLayout>{children}</ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
