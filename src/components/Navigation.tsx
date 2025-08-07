import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Map, 
  Route, 
  Shield, 
  Settings, 
  AlertTriangle, 
  Menu,
  X,
  Bus,
  Zap
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  {
    id: 'map',
    label: 'Live Map',
    icon: Map,
    description: 'Real-time bus tracking'
  },
  {
    id: 'routes',
    label: 'Routes',
    icon: Route,
    description: 'Manage bus routes'
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: Shield,
    description: 'Privacy dashboard'
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: AlertTriangle,
    description: 'Emergency contacts'
  }
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-card">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SecureBus</h1>
                <div className="text-xs text-muted-foreground">Privacy-First Transit</div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "flex items-center gap-2 transition-smooth",
                      isActive && "bg-gradient-primary text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Status Indicators */}
            <div className="flex items-center gap-3">
              <Badge className="bg-privacy-shield text-white border-none">
                <Zap className="h-3 w-3 mr-1" />
                FL Active
              </Badge>
              <Badge variant="outline" className="border-transit-success text-transit-success">
                Online
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-card">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Bus className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">SecureBus</h1>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="pb-4 border-t">
              <div className="pt-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => {
                        onTabChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full justify-start gap-3 transition-smooth",
                        isActive && "bg-gradient-primary text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="text-left">
                        <div>{item.label}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Badge className="bg-privacy-shield text-white border-none text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Federated Learning
                </Badge>
                <Badge variant="outline" className="border-transit-success text-transit-success text-xs">
                  Online
                </Badge>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
};