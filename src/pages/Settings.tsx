
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  BellRing, 
  ChevronRight, 
  Globe, 
  HelpCircle, 
  Lock, 
  LogOut, 
  Mail, 
  Moon, 
  Shield, 
  Sun, 
  User, 
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  description, 
  action, 
  onClick 
}) => {
  return (
    <div 
      className={`flex items-center justify-between py-3 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      </div>
      {action || (onClick && <ChevronRight size={18} className="text-gray-400" />)}
    </div>
  );
};

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [language, setLanguage] = React.useState("English");

  const goBack = () => {
    navigate(-1);
  };
  
  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
    // In a real app, would handle actual sign out logic here
    setTimeout(() => navigate("/"), 1000);
  };
  
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: `${theme === "dark" ? "Light" : "Dark"} mode activated`,
      description: `App display has been changed to ${theme === "dark" ? "light" : "dark"} mode.`,
    });
  };
  
  const handleNotificationChange = (type: 'push' | 'email', value: boolean) => {
    if (type === 'push') {
      setPushNotifications(value);
    } else {
      setEmailNotifications(value);
    }
    
    toast({
      title: `${type === 'push' ? 'Push' : 'Email'} notifications ${value ? 'enabled' : 'disabled'}`,
      description: `You will ${value ? 'now' : 'no longer'} receive ${type} notifications.`,
    });
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editor would open here in a real app.",
    });
  };
  
  const handlePrivacySettings = () => {
    toast({
      title: "Privacy Settings",
      description: "Privacy settings would open here in a real app.",
    });
  };
  
  const handleSecuritySettings = () => {
    toast({
      title: "Security Settings",
      description: "Security settings would open here in a real app.",
    });
  };
  
  const handlePreferences = () => {
    toast({
      title: "Preferences",
      description: "Event preferences would open here in a real app.",
    });
  };
  
  const handleLanguageChange = () => {
    const languages = ["English", "Spanish", "French", "German", "Mandarin"];
    const nextIndex = (languages.indexOf(language) + 1) % languages.length;
    setLanguage(languages[nextIndex]);
    
    toast({
      title: "Language changed",
      description: `App language has been changed to ${languages[nextIndex]}.`,
    });
  };
  
  const handleHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Help center would open here in a real app.",
    });
  };
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          onClick={goBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">Settings</h1>
        <div className="w-9"></div> {/* Empty div for centering */}
      </div>
    </header>
  );
  
  return (
    <AppLayout header={header} hideNav={false}>
      <div className="py-6 space-y-6">
        <Card className="rounded-3xl border-none shadow-sm bg-white/90 dark:bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Account</h2>
            
            <SettingsItem 
              icon={<User size={20} />} 
              title="Edit Profile"
              description="Change your profile information"
              onClick={handleEditProfile}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<Shield size={20} />} 
              title="Privacy"
              description="Manage your privacy settings"
              onClick={handlePrivacySettings}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<Lock size={20} />} 
              title="Security"
              description="Update password & security options"
              onClick={handleSecuritySettings}
            />

            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<UserCog size={20} />} 
              title="Preferences"
              description="Customize your event preferences"
              onClick={handlePreferences}
            />
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-sm bg-white/90 dark:bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Notifications</h2>
            
            <SettingsItem 
              icon={<BellRing size={20} />} 
              title="Push Notifications"
              description="Receive push notifications"
              action={
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={(checked) => handleNotificationChange('push', checked)} 
                />
              }
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<Mail size={20} />} 
              title="Email Notifications"
              description="Receive email updates"
              action={
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)} 
                />
              }
            />
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-sm bg-white/90 dark:bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Display</h2>
            
            <SettingsItem 
              icon={theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />} 
              title="Dark Mode"
              description="Toggle dark mode appearance"
              action={
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={handleThemeToggle}
                />
              }
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<Globe size={20} />} 
              title="Language"
              description={`Current language: ${language}`}
              onClick={handleLanguageChange}
            />
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-sm bg-white/90 dark:bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Support</h2>
            
            <SettingsItem 
              icon={<HelpCircle size={20} />} 
              title="Help Center"
              description="Get help and contact support"
              onClick={handleHelpCenter}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<LogOut size={20} />} 
              title="Sign Out"
              description="Sign out from your account"
              onClick={handleSignOut}
            />
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 pb-6">
          Joople v1.0.0
          <div className="mt-1">© 2025 Joople Inc.</div>
        </div>
      </div>
    </AppLayout>
  );
}
