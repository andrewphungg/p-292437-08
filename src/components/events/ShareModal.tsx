
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { CheckCircle, X } from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  onShare: () => void;
  eventName: string;
  friends: User[];
}

export const ShareModal = ({ open, onClose, onShare, eventName, friends }: ShareModalProps) => {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  
  const toggleFriendSelection = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };
  
  const handleShare = () => {
    if (selectedFriends.length === 0) {
      toast.error("Please select at least one friend to share with");
      return;
    }
    
    onShare();
    toast.success(`Shared "${eventName}" with ${selectedFriends.length} friend${selectedFriends.length > 1 ? 's' : ''}`);
    setSelectedFriends([]);
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Share with Friends</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <h3 className="font-medium text-base mb-2">Share "{eventName}" with:</h3>
          
          <div className="max-h-[240px] overflow-y-auto pr-2">
            {friends.length > 0 ? (
              <div className="space-y-2">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-colors ${
                      selectedFriends.includes(friend.id)
                        ? "border-sunset-purple bg-sunset-purple/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleFriendSelection(friend.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-full">
                        <AvatarImage src={friend.avatar} alt={friend.name} className="object-cover" />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{friend.name}</span>
                    </div>
                    
                    {selectedFriends.includes(friend.id) && (
                      <CheckCircle className="h-5 w-5 text-sunset-purple" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">
                You don't have any friends to share with yet
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 bg-sunset-purple hover:bg-sunset-purple/90"
            disabled={selectedFriends.length === 0}
          >
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
