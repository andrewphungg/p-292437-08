
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
  
  if (variant === "modern") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
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
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            key={theme}
            transition={{ duration: 0.2 }}
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={cn(
          "rounded-full hover:bg-background/20 transition-all",
          className
        )}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          key={theme}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-secondary" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
