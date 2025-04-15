
import React from "react";
import { BottomNav } from "./BottomNav";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  header?: React.ReactNode;
}

export function AppLayout({ children, hideNav = false, header }: AppLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "flex flex-col min-h-screen", 
      theme === "dark" 
        ? "bg-gradient-to-br from-background via-background to-background/90" 
        : "bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30"
    )}>
      {header}
      <main className="flex-1 pb-28 w-full max-w-xl mx-auto px-5">
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
