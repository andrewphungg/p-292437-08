
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Search, Share, X, Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import { getAllFriends } from "@/data/mockData";
import { toast } from "sonner";

interface ShareModalProps {
  event: Event;
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ event, open, onClose }: ShareModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [message, setMessage] = useState(`Hey, check out this event: ${event.title}`);
  const [copied, setCopied] = useState(false);

  // Get all friends for sharing
  const friends = getAllFriends().filter(friend => friend.id !== "user-1"); // Exclude current user

  // Filter friends by search query
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle friend selection
  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId) 
        : [...prev, friendId]
    );
  };

  // Handle share link copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://joople.app/event/${event.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Event link copied to clipboard!");
  };

  // Handle share with friends
  const handleShareWithFriends = () => {
    if (selectedFriends.length === 0) {
      toast.error("Please select at least one friend to share with");
      return;
    }

    const friendNames = friends
      .filter(friend => selectedFriends.includes(friend.id))
      .map(friend => friend.name);
    
    toast.success(`Event shared with ${friendNames.join(", ")}`);
    onClose();
  };

  const socialShareButtons = [
    { name: "Facebook", icon: <Facebook size={18} />, color: "bg-blue-600 hover:bg-blue-700" },
    { name: "Twitter", icon: <Twitter size={18} />, color: "bg-sky-500 hover:bg-sky-600" },
    { name: "Email", icon: <Mail size={18} />, color: "bg-gray-600 hover:bg-gray-700" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Share Event</DialogTitle>
          <DialogDescription>
            Share this event with your friends or on social media
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Social share buttons */}
          <div className="flex gap-3">
            {socialShareButtons.map(button => (
              <Button 
                key={button.name} 
                className={`flex-1 ${button.color} text-white rounded-xl`}
                onClick={() => {
                  toast.success(`Shared on ${button.name}`);
                  onClose();
                }}
              >
                {button.icon}
                <span className="ml-1.5">{button.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy link */}
          <div className="flex gap-2">
            <Input 
              value={`https://joople.app/event/${event.id}`}
              readOnly
              className="bg-gray-50 dark:bg-gray-800 rounded-xl"
            />
            <Button
              variant={copied ? "default" : "outline"}
              className={`rounded-xl whitespace-nowrap ${copied ? "bg-green-600 text-white" : ""}`}
              onClick={handleCopyLink}
            >
              {copied ? <Check size={18} className="mr-1" /> : <LinkIcon size={18} className="mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          {/* Share with friends section */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <h3 className="font-medium mb-3">Share with friends</h3>
            
            {/* Friend search */}
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search friends..."
                className="pl-9 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Friends list */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <div 
                    key={friend.id}
                    onClick={() => toggleFriendSelection(friend.id)}
                    className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                      selectedFriends.includes(friend.id)
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <p className="text-sm font-medium">{friend.name}</p>
                        <p className="text-xs text-gray-500">{friend.interests.slice(0, 2).join(", ")}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedFriends.includes(friend.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {selectedFriends.includes(friend.id) ? <Check size={14} /> : <Plus size={14} />}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No friends found matching "{searchQuery}"
                </div>
              )}
            </div>
            
            {/* Message input */}
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Add a message (optional)</h3>
              <textarea
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message to send along with the event..."
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1 rounded-xl" onClick={onClose}>
            <X size={18} className="mr-1" /> Cancel
          </Button>
          <Button className="flex-1 rounded-xl" onClick={handleShareWithFriends}>
            <Share size={18} className="mr-1" /> Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Missing component
function Plus({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
