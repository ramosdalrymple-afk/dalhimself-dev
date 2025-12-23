import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import PortfolioChat from "@/components/PortfolioChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dal.dev",
  description: "Built with Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Navigation */}
          <Navbar />
          
          {/* Main Page Content */}
          <div className="relative z-0">
            {children}
          </div>

          {/* AI Assistant - Floating Chatbot (Absolute Bottom Layer) */}
          <PortfolioChat />
        </ThemeProvider>
      </body>
    </html>
  );
}