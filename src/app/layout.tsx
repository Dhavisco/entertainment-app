import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

export const metadata: Metadata = {
  title: "Entertainment App",
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
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
