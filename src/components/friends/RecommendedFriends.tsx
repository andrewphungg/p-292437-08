
import React from "react";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const RecommendedFriends = () => {
  const { suggestedFriends, addFriend, isFriend } = useUser();

  if (suggestedFriends.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">
          No suggested friends at the moment. Try updating your interests!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">People you might know</h3>
      
      <div className="space-y-3">
        {suggestedFriends.map((friend) => (
          <div 
            key={friend.id} 
            className="bg-white/80 p-4 rounded-lg flex items-start justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Avatar className="w-12 h-12">
                  {friend.avatar ? (
                    <AvatarImage 
                      src={friend.avatar} 
                      alt={friend.name} 
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {friend.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              
              <div>
                <h4 className="font-medium">{friend.name}</h4>
                <p className="text-sm text-muted-foreground">{friend.university}</p>
                
                {friend.interests && friend.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {friend.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {friend.interests.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{friend.interests.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Button
              variant={isFriend(friend.id) ? "outline" : "default"}
              size="sm"
              onClick={() => addFriend(friend.id)}
              disabled={isFriend(friend.id)}
              className={isFriend(friend.id) ? "" : "bg-sunset-purple hover:bg-sunset-purple/90"}
            >
              {isFriend(friend.id) ? "Added" : "Add Friend"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
