
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Bell, Moon, Languages, Shield, HelpCircle, LogOut, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useTheme } from "@/providers/ThemeProvider";
import { UpdateApiKey } from "@/components/settings/ApiKeySetup";

export default function Settings() {
  const { user, updateProfile } = useUser();
  const { theme, setTheme } = useTheme();
  const [editingName, setEditingName] = useState(user.name);
  const [editingEmail, setEditingEmail] = useState(user.email);
  const [editingBio, setEditingBio] = useState(user.bio || "");
  const navigate = useNavigate();
  
  const isDarkMode = theme === "dark";

  const handleUpdateProfile = () => {
    updateProfile({
      name: editingName,
      email: editingEmail,
      bio: editingBio
    });
  };
  
  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const header = (
    <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b dark:border-gray-800">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full mr-2">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout header={header}>
      <div className="px-4 py-6 space-y-8 max-w-lg mx-auto">
        {/* Account Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-500 text-white text-lg">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Display Name</label>
                        <Input 
                          id="name" 
                          type="text" 
                          value={editingName} 
                          onChange={e => setEditingName(e.target.value)} 
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={editingEmail} 
                          onChange={e => setEditingEmail(e.target.value)} 
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                        <Input 
                          id="bio" 
                          value={editingBio} 
                          onChange={e => setEditingBio(e.target.value)} 
                          className="rounded-xl"
                        />
                      </div>
                      <DialogClose asChild>
                        <Button 
                          className="w-full rounded-xl mt-4" 
                          onClick={handleUpdateProfile}
                        >
                          Save Changes
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.bio && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
                  <p className="font-medium">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* API Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-4">API Settings</h2>
          <UpdateApiKey />
        </section>
        
        {/* Notifications */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={18} className="text-primary" />
                <span>Push Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={18} className="text-primary" />
                <span>Email Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>
        
        {/* Appearance */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon size={18} className="text-primary" />
                <span>Dark Mode</span>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Languages size={18} className="text-primary" />
                <span>Language</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">English</span>
            </div>
          </div>
        </section>
        
        {/* Privacy & Security */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Privacy & Security</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield size={18} className="text-primary" />
                <span>Privacy Settings</span>
              </div>
              <ChevronLeft size={18} className="rotate-180" />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield size={18} className="text-primary" />
                <span>Security Settings</span>
              </div>
              <ChevronLeft size={18} className="rotate-180" />
            </div>
          </div>
        </section>
        
        {/* Help & Support */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle size={18} className="text-primary" />
                <span>Help Center</span>
              </div>
              <ChevronLeft size={18} className="rotate-180" />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle size={18} className="text-primary" />
                <span>Contact Support</span>
              </div>
              <ChevronLeft size={18} className="rotate-180" />
            </div>
          </div>
        </section>
        
        {/* Logout */}
        <section className="pt-4">
          <Button 
            variant="destructive" 
            className="w-full rounded-xl" 
            onClick={() => navigate('/auth')}
          >
            <LogOut size={16} className="mr-2" /> Log Out
          </Button>
        </section>
      </div>
    </AppLayout>
  );
}
