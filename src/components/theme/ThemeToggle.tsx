
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "modern";
}

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  if (variant === "modern") {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full bg-background/10 border-primary/20 backdrop-blur-md shadow-md transition-all",
            theme === "dark" 
              ? "hover:bg-primary/20 text-primary-foreground" 
              : "hover:bg-secondary/20 text-foreground",
            className
          )}
          aria-label="Toggle theme"
        >
          <motion.div
            key={theme}
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn(
          "rounded-full hover:bg-background/20 transition-all",
          className
        )}
        aria-label="Toggle theme"
      >
        <motion.div
          key={theme}
          initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
