
import React from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";

const Profile = () => {
  const { user } = useUser();
  const { logout, isAdmin } = useAuth();

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#C997D6_0%,#FF8DAF_30%,#EEC48F_75%,#FFF9C1_100%)]">
      <div className="flex flex-col items-center w-full pb-24">
        <header className="text-[#303030] text-[55px] text-center w-full bg-[#FEFFEC] py-5">
          <span className="bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
        </header>

        <div className="bg-gradient-to-r from-sunset-orange/20 to-sunset-peach/20 w-full py-4 text-center">
          <h1 className="text-2xl font-bold text-sunset-orange">
            My Profile {isAdmin && "(Admin)"}
          </h1>
        </div>

        <div className="w-full max-w-md mx-auto mt-6 px-4">
          <div className="bg-[#FEFFEC] rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-sunset-pink to-sunset-peach p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto border-4 border-white">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <h2 className="mt-3 text-xl font-bold">{user.name}</h2>
              <p className="mt-1">{user.university}, {user.graduationYear}</p>
              
              <div className="mt-4 inline-block bg-white/80 px-4 py-2 rounded-full">
                <span className="font-bold text-sunset-orange">{user.points} points</span>
              </div>

              {isAdmin && (
                <div className="mt-3">
                  <Badge className="bg-sunset-purple text-white">Admin Account</Badge>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold mb-3">My Friends</h3>
              <div className="space-y-3">
                {user.friends.length > 0 ? (
                  user.friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3">
                          {friend.avatar ? (
                            <AvatarImage src={friend.avatar} alt={friend.name} className="object-cover" />
                          ) : (
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                              {friend.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span>{friend.name}</span>
                      </div>
                      <span className="bg-sunset-orange/20 px-2 py-1 rounded text-sunset-orange font-medium">
                        {friend.points} pts
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No friends yet</p>
                )}
              </div>
              
              <Button className="w-full mt-4 bg-sunset-purple hover:bg-sunset-purple/90">
                Invite Friends
              </Button>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-lg font-bold mb-3">My Stats</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-sunset-pink">{user.attendedEvents.length}</p>
                  <p className="text-sm">Events Attended</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-sunset-peach">{user.sharedEvents.length}</p>
                  <p className="text-sm">Events Shared</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-sunset-orange">{user.friends.length}</p>
                  <p className="text-sm">Friends</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-sunset-purple">
                    {getAllFriends().findIndex(u => u.id === user.id) + 1}
                  </p>
                  <p className="text-sm">Rank</p>
                </div>
              </div>
              
              <Button 
                variant="destructive" 
                className="w-full mt-6" 
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;

function getAllFriends() {
  // This is just for UI display - the real function is in the mockData.ts file
  return [
    { id: "user-2", points: 780 },
    { id: "user-4", points: 600 },
    { id: "user-1", points: 450 },
    { id: "user-3", points: 320 },
  ];
}

// Add the Badge component that we're using
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};
