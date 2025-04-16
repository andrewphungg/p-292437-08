
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Key, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ApiKeySetupProps {
  onSave: (apiKey: string) => void;
}

export const ApiKeySetup = ({ onSave }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Load existing API key when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      const savedKey = localStorage.getItem("ticketmasterApiKey") || "";
      setApiKey(savedKey);
    }
  }, [isDialogOpen]);
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Save the API key
    localStorage.setItem("ticketmasterApiKey", apiKey.trim());
    onSave(apiKey.trim());
    
    toast.success("API key saved successfully");
    setIsDialogOpen(false);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full flex items-center gap-1"
        >
          <Key size={14} />
          <span>Configure API Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ticketmaster API Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your Ticketmaster API key to fetch live event data.
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
              onChange={handleTextChange} 
              className="rounded-xl"
              placeholder="Enter your Ticketmaster API key"
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="rounded-xl"
            >
              <Save size={16} className="mr-2" />
              Save API Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper component to update existing API key
interface UpdateApiKeyProps {
  onUpdate: (apiKey: string) => void;
}

export const UpdateApiKey = ({ onUpdate }: UpdateApiKeyProps) => {
  const [apiKey, setApiKey] = useState("");
  
  // Load saved API key on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem("ticketmasterApiKey") || "";
    setApiKey(savedKey);
  }, []);
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    localStorage.setItem("ticketmasterApiKey", apiKey.trim());
    onUpdate(apiKey.trim());
    toast.success("API key updated successfully");
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Key size={18} className="text-primary" />
          <span>Ticketmaster API Key</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={handleSave}
        >
          <RefreshCw size={14} className="mr-1" /> Update
        </Button>
      </div>
      <div className="px-4 pb-4">
        <Input 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          placeholder="Enter your Ticketmaster API key"
          className="rounded-xl"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This key is used to fetch event data from Ticketmaster API.
        </p>
      </div>
    </div>
  );
};
