
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "modern";
}

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  
  if (variant === "modern") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn(
          "rounded-full bg-background/10 border-primary/20 backdrop-blur-sm shadow-md transition-all",
          theme === "dark" 
            ? "hover:bg-primary/20 text-primary-foreground" 
            : "hover:bg-secondary/20 text-foreground",
          className
        )}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "rounded-full hover:bg-background/20 transition-all",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-secondary" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
