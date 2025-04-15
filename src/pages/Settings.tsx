
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  BellRing, 
  Calendar as CalendarIcon,
  Check,
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
import { useTheme } from "@/providers/ThemeProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const { theme, setTheme } = useTheme();
  
  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);
  
  // UI state for dialogs
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPrivacySettingsOpen, setIsPrivacySettingsOpen] = useState(false);
  const [isSecuritySettingsOpen, setIsSecuritySettingsOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isCalendarSyncDialogOpen, setIsCalendarSyncDialogOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  
  // Form state
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [bio, setBio] = useState("Event enthusiast and food lover");
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    locationSharing: true,
    attendanceVisibility: "friends"
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
  });
  const [eventPreferences, setEventPreferences] = useState({
    music: true,
    food: true, 
    arts: false,
    sports: false,
    tech: true,
  });

  const goBack = () => {
    navigate(-1);
  };
  
  const handleSignOut = () => {
    // In a real app, would handle actual sign out logic here
    setTimeout(() => navigate("/"), 500);
  };
  
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  const handleNotificationChange = (type: 'push' | 'email', value: boolean) => {
    if (type === 'push') {
      setPushNotifications(value);
    } else {
      setEmailNotifications(value);
    }
  };
  
  const availableLanguages = [
    "English", 
    "Spanish", 
    "French", 
    "German", 
    "Mandarin"
  ];
  
  const availableCalendars = [
    { id: "google", name: "Google Calendar", icon: "🗓️" },
    { id: "outlook", name: "Microsoft Outlook", icon: "📅" },
    { id: "apple", name: "Apple Calendar", icon: "📆" },
  ];
  
  const toggleCalendarSelection = (calendarId: string) => {
    setSelectedCalendars(prev => 
      prev.includes(calendarId) 
        ? prev.filter(id => id !== calendarId) 
        : [...prev, calendarId]
    );
  };
  
  const handleCalendarSync = () => {
    setCalendarSyncEnabled(true);
    setIsCalendarSyncDialogOpen(false);
  };
  
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setIsLanguageDialogOpen(false);
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
      <div className="py-6 space-y-6 pb-32">
        <Card className="rounded-3xl border-none shadow-sm bg-white/90 dark:bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Account</h2>
            
            <SettingsItem 
              icon={<User size={20} />} 
              title="Edit Profile"
              description="Change your profile information"
              onClick={() => setIsEditProfileOpen(true)}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<Shield size={20} />} 
              title="Privacy"
              description="Manage your privacy settings"
              onClick={() => setIsPrivacySettingsOpen(true)}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<Lock size={20} />} 
              title="Security"
              description="Update password & security options"
              onClick={() => setIsSecuritySettingsOpen(true)}
            />

            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<UserCog size={20} />} 
              title="Preferences"
              description="Customize your event preferences"
              onClick={() => setIsPreferencesOpen(true)}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<CalendarIcon size={20} />} 
              title="Calendar Sync"
              description={calendarSyncEnabled ? "Calendars are in sync" : "Connect your calendars"}
              onClick={() => setIsCalendarSyncDialogOpen(true)}
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
              onClick={() => setIsLanguageDialogOpen(true)}
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
              onClick={() => setIsHelpCenterOpen(true)}
            />
            
            <Separator className="dark:bg-gray-800" />
            
            <SettingsItem 
              icon={<LogOut size={20} />} 
              title="Sign Out"
              description="Sign out from your account"
              onClick={() => setIsSignOutDialogOpen(true)}
            />
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 pb-6">
          Joople v1.0.0
          <div className="mt-1">© 2025 Joople Inc.</div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input 
                id="name" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input 
                id="bio" 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditProfileOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsEditProfileOpen(false)}
              className="rounded-xl"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy Settings Dialog */}
      <Dialog open={isPrivacySettingsOpen} onOpenChange={setIsPrivacySettingsOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Privacy Settings</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label>Profile Visibility</Label>
              <RadioGroup 
                value={privacySettings.profileVisibility}
                onValueChange={(value) => 
                  setPrivacySettings({...privacySettings, profileVisibility: value})
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends">Friends Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Location Sharing</h3>
                <p className="text-xs text-gray-500">Allow others to see your location</p>
              </div>
              <Switch 
                checked={privacySettings.locationSharing} 
                onCheckedChange={(checked) => 
                  setPrivacySettings({...privacySettings, locationSharing: checked})
                } 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Event Attendance Visibility</Label>
              <RadioGroup 
                value={privacySettings.attendanceVisibility}
                onValueChange={(value) => 
                  setPrivacySettings({...privacySettings, attendanceVisibility: value})
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="attendance-public" />
                  <Label htmlFor="attendance-public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="attendance-friends" />
                  <Label htmlFor="attendance-friends">Friends Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="attendance-private" />
                  <Label htmlFor="attendance-private">Private</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPrivacySettingsOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsPrivacySettingsOpen(false)}
              className="rounded-xl"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Security Settings Dialog */}
      <Dialog open={isSecuritySettingsOpen} onOpenChange={setIsSecuritySettingsOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Security Settings</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <p className="text-xs text-gray-500">Secure your account with 2FA</p>
              </div>
              <Switch 
                checked={securitySettings.twoFactorAuth} 
                onCheckedChange={(checked) => 
                  setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Login Alerts</h3>
                <p className="text-xs text-gray-500">Get alerted of new account logins</p>
              </div>
              <Switch 
                checked={securitySettings.loginAlerts} 
                onCheckedChange={(checked) => 
                  setSecuritySettings({...securitySettings, loginAlerts: checked})
                } 
              />
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full text-destructive hover:bg-destructive/5">
                Delete Account
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsSecuritySettingsOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsSecuritySettingsOpen(false)}
              className="rounded-xl"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preferences Dialog */}
      <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Event Preferences</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-4">
              Select the types of events you're interested in to get personalized recommendations.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="pref-music">Music Events</Label>
                <Switch 
                  id="pref-music"
                  checked={eventPreferences.music} 
                  onCheckedChange={(checked) => 
                    setEventPreferences({...eventPreferences, music: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pref-food">Food & Dining</Label>
                <Switch 
                  id="pref-food"
                  checked={eventPreferences.food} 
                  onCheckedChange={(checked) => 
                    setEventPreferences({...eventPreferences, food: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pref-arts">Arts & Culture</Label>
                <Switch 
                  id="pref-arts"
                  checked={eventPreferences.arts} 
                  onCheckedChange={(checked) => 
                    setEventPreferences({...eventPreferences, arts: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pref-sports">Sports</Label>
                <Switch 
                  id="pref-sports"
                  checked={eventPreferences.sports} 
                  onCheckedChange={(checked) => 
                    setEventPreferences({...eventPreferences, sports: checked})
                  } 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pref-tech">Technology</Label>
                <Switch 
                  id="pref-tech"
                  checked={eventPreferences.tech} 
                  onCheckedChange={(checked) => 
                    setEventPreferences({...eventPreferences, tech: checked})
                  } 
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setIsPreferencesOpen(false)}
              className="rounded-xl w-full"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calendar Sync Dialog */}
      <Dialog open={isCalendarSyncDialogOpen} onOpenChange={setIsCalendarSyncDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Connect Your Calendars</DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sync your events with your favorite calendar apps to never miss an event.
            </p>
            
            <div className="space-y-3">
              {availableCalendars.map(calendar => (
                <div 
                  key={calendar.id}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    selectedCalendars.includes(calendar.id)
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => toggleCalendarSelection(calendar.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{calendar.icon}</div>
                    <div className="font-medium">{calendar.name}</div>
                  </div>
                  
                  {selectedCalendars.includes(calendar.id) && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl"
              onClick={() => setIsCalendarSyncDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 rounded-xl"
              onClick={handleCalendarSync}
              disabled={selectedCalendars.length === 0}
            >
              Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Dialog */}
      <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup 
              value={language} 
              onValueChange={handleLanguageChange}
              className="space-y-2"
            >
              {availableLanguages.map(lang => (
                <div 
                  key={lang}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                  onClick={() => handleLanguageChange(lang)}
                >
                  <RadioGroupItem value={lang} id={`lang-${lang}`} />
                  <Label htmlFor={`lang-${lang}`}>{lang}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Help Center Dialog */}
      <Dialog open={isHelpCenterOpen} onOpenChange={setIsHelpCenterOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Help Center</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="faq">FAQs</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">How do I save events?</h3>
                    <p className="text-sm text-gray-500">
                      Click the heart icon on any event card to save it to your list.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Can I get a refund?</h3>
                    <p className="text-sm text-gray-500">
                      Refund policies vary by event. Check the event details page for specific information.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">How do I change my password?</h3>
                    <p className="text-sm text-gray-500">
                      Go to Settings → Security → Change Password to update your credentials.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact">
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Have a question or need help? Reach out to our support team.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Email</Label>
                    <Input id="support-email" placeholder="Your email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="support-message">Message</Label>
                    <Input id="support-message" placeholder="How can we help?" />
                  </div>
                  
                  <Button className="w-full">Send Message</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Out Confirmation */}
      <Dialog open={isSignOutDialogOpen} onOpenChange={setIsSignOutDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-center">Are you sure you want to sign out?</p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsSignOutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="flex-1"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
