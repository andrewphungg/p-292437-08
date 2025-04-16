
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiKeyDialogProps {
  onSave: (apiKey: string) => void;
}

export const ApiKeyDialog = ({ onSave }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // We're not automatically opening the dialog anymore
    // since we're using the edge function
    const savedKey = localStorage.getItem("ticketmasterApiKey");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Save the API key
    localStorage.setItem("ticketmasterApiKey", apiKey.trim());
    onSave(apiKey.trim());
    
    toast.success("API key saved successfully");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Ticketmaster API Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can provide your own Ticketmaster API key or use the app's default key.
            <a 
              href="https://developer-acct.ticketmaster.com/user/register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary ml-1 hover:underline"
            >
              Get an API key
            </a>
          </p>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">API Key</label>
            <Input 
              id="apiKey" 
              type="text" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              className="rounded-xl"
              placeholder="Enter your Ticketmaster API key"
              autoFocus
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleSave}
              className="rounded-xl"
            >
              Save API Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
