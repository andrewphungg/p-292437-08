
import React from "react";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  header?: React.ReactNode;
}

export function AppLayout({ children, hideNav = false, header }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30">
      {header}
      <main className="flex-1 pb-24 w-full max-w-xl mx-auto px-4">
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
