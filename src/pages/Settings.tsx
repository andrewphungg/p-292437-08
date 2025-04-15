
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
  User, 
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

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
        <div className="p-2 bg-gray-100 rounded-full text-gray-600">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
      {action || (onClick && <ChevronRight size={18} className="text-gray-400" />)}
    </div>
  );
};

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  const goBack = () => {
    navigate(-1);
  };
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
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
        <Card className="rounded-3xl border-none shadow-sm bg-white/90">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Account</h2>
            
            <SettingsItem 
              icon={<User size={20} />} 
              title="Edit Profile"
              description="Change your profile information"
              onClick={() => {}}
            />
            
            <Separator />
            
            <SettingsItem 
              icon={<Shield size={20} />} 
              title="Privacy"
              description="Manage your privacy settings"
              onClick={() => {}}
            />
            
            <Separator />
            
            <SettingsItem 
              icon={<Lock size={20} />} 
              title="Security"
              description="Update password & security options"
              onClick={() => {}}
            />

            <Separator />
            
            <SettingsItem 
              icon={<UserCog size={20} />} 
              title="Preferences"
              description="Customize your event preferences"
              onClick={() => {}}
            />
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-sm bg-white/90">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Notifications</h2>
            
            <SettingsItem 
              icon={<BellRing size={20} />} 
              title="Push Notifications"
              description="Receive push notifications"
              action={
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              }
            />
            
            <Separator />
            
            <SettingsItem 
              icon={<Mail size={20} />} 
              title="Email Notifications"
              description="Receive email updates"
              action={
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              }
            />
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-sm bg-white/90">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Display</h2>
            
            <SettingsItem 
              icon={<Moon size={20} />} 
              title="Dark Mode"
              description="Toggle dark mode appearance"
              action={
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              }
            />
            
            <Separator />
            
            <SettingsItem 
              icon={<Globe size={20} />} 
              title="Language"
              description="Set your preferred language"
              onClick={() => {}}
            />
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl border-none shadow-sm bg-white/90">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Support</h2>
            
            <SettingsItem 
              icon={<HelpCircle size={20} />} 
              title="Help Center"
              description="Get help and contact support"
              onClick={() => {}}
            />
            
            <Separator />
            
            <SettingsItem 
              icon={<LogOut size={20} />} 
              title="Sign Out"
              description="Sign out from your account"
              onClick={() => {}}
            />
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-gray-500 pt-4 pb-6">
          Joople v1.0.0
          <div className="mt-1">© 2025 Joople Inc.</div>
        </div>
      </div>
    </AppLayout>
  );
}
