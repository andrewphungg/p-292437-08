
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AVAILABLE_INTERESTS = [
  "Music", "Sports", "Tech", "Art", "Food", "Travel", "Books", 
  "Movies", "Gaming", "Fitness", "Fashion", "Photography", "Networking",
  "Concerts", "Bars", "Drinks", "Friends", "Random", "Fun", "Career"
];

const Onboarding = () => {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: "",
    avatar: "",
    graduationYear: new Date().getFullYear(),
    university: "",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestClick = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate profile information
      if (!profile.name || !profile.university) {
        return;
      }
      setStep(2);
    } else {
      // Complete onboarding
      if (selectedInterests.length < 3) {
        return;
      }
      
      updateProfile({
        ...profile,
        interests: selectedInterests
      });
      
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#C997D6_0%,#FF8DAF_30%,#EEC48F_75%,#FFF9C1_100%)]">
      <div className="flex flex-col items-center w-full">
        <header className="text-[#303030] text-[55px] text-center w-full bg-[#FEFFEC] py-5">
          <span className="bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
        </header>
        
        <div className="max-w-md w-full mx-auto p-6 mt-4 pb-20">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="text-sunset-purple text-2xl">
                {step === 1 ? "Create Your Profile" : "Select Your Interests"}
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? "Tell us about yourself to help connect with others" 
                  : "Choose at least 3 interests to find matching events and friends"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.avatar} alt={profile.name || "User"} />
                      <AvatarFallback className="bg-sunset-peach text-white text-xl">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : "J"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture URL</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      type="text"
                      placeholder="https://example.com/your-photo.jpg"
                      value={profile.avatar}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      name="university"
                      placeholder="Your university"
                      value={profile.university}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      placeholder="2023"
                      value={profile.graduationYear}
                      onChange={handleProfileChange}
                      min={2000}
                      max={2030}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_INTERESTS.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedInterests.includes(interest) 
                            ? "bg-sunset-purple hover:bg-sunset-purple/90" 
                            : "hover:bg-sunset-purple/10"
                        }`}
                        onClick={() => handleInterestClick(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Selected interests: {selectedInterests.length}/3 (minimum)
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedInterests.map((interest) => (
                        <Badge key={interest} className="bg-sunset-pink">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button 
                  onClick={handleNext} 
                  className="w-full bg-sunset-orange hover:bg-sunset-orange/90"
                  disabled={step === 1 
                    ? !profile.name || !profile.university 
                    : selectedInterests.length < 3}
                >
                  {step === 1 ? "Next" : "Complete"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
