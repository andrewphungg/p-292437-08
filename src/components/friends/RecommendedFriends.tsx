
import React from "react";
import { User } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RecommendedFriendsProps {
  friends: User[];
  className?: string;
}

export function RecommendedFriends({ friends, className }: RecommendedFriendsProps) {
  return (
    <Card className={cn("p-4 rounded-3xl", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">People You May Know</h2>
        <Link to="/friends" className="text-primary text-sm flex items-center font-medium">
          View All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {friends.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No recommended friends at the moment</p>
        ) : (
          friends.map((friend) => (
            <FriendSuggestion friend={friend} key={friend.id} />
          ))
        )}
      </div>
    </Card>
  );
}

function FriendSuggestion({ friend }: { friend: User }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddFriend = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdded(!isAdded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={friend.avatar} alt={friend.name} />
          <AvatarFallback>{friend.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h3 className="font-semibold text-sm">{friend.name}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-1">
            <span className="text-xs text-muted-foreground">{friend.university || "University not specified"}</span>
            {friend.interests && friend.interests.length > 0 && (
              <>
                <span className="hidden sm:inline text-muted-foreground">·</span>
                <div className="flex gap-1">
                  <Tag variant="default" className="text-[10px] px-1.5 py-0 h-auto">
                    {friend.interests[0]}
                  </Tag>
                  {friend.interests.length > 1 && (
                    <Tag variant="default" className="text-[10px] px-1.5 py-0 h-auto">
                      {friend.interests[1]}
                    </Tag>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        size="sm"
        variant={isAdded ? "outline" : "default"}
        className={`rounded-full ${
          isAdded ? "border-green-500 text-green-500" : "text-white"
        }`}
        onClick={handleAddFriend}
      >
        {isAdded ? (
          <>Added</>
        ) : (
          <>
            <UserPlus size={14} className="mr-1" /> Add
          </>
        )}
      </Button>
    </motion.div>
  );
}
