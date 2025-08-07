import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Zap, Shield, AlertTriangle } from 'lucide-react';
import { GoogleMap } from './GoogleMap';

interface Bus {
  id: string;
  route: string;
  lat: number;
  lng: number;
  speed: number;
  capacity: number;
  nextStop: string;
  eta: number;
  privacyLevel: 'high' | 'medium' | 'low';
}

interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
}

// Mock data for demonstration
const mockBuses: Bus[] = [
  {
    id: 'bus-001',
    route: 'Line 42',
    lat: 40.7128,
    lng: -74.0060,
    speed: 25,
    capacity: 65,
    nextStop: 'Central Station',
    eta: 3,
    privacyLevel: 'high'
  },
  {
    id: 'bus-002',
    route: 'Line 15',
    lat: 40.7589,
    lng: -73.9851,
    speed: 18,
    capacity: 42,
    nextStop: 'Park Avenue',
    eta: 7,
    privacyLevel: 'high'
  }
];

const mockStops: Stop[] = [
  {
    id: 'stop-001',
    name: 'Central Station',
    lat: 40.7128,
    lng: -74.0060,
    routes: ['Line 42', 'Line 15', 'Line 8']
  },
  {
    id: 'stop-002',
    name: 'Park Avenue',
    lat: 40.7589,
    lng: -73.9851,
    routes: ['Line 15', 'Line 22']
  }
];

export const BusMap = () => {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
          speed: Math.max(0, bus.speed + (Math.random() - 0.5) * 5),
          eta: Math.max(1, bus.eta + (Math.random() - 0.5) * 2)
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPrivacyBadgeColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-privacy-shield text-white';
      case 'medium': return 'bg-privacy-warning text-white';
      case 'low': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="relative w-full h-screen bg-background">
      {/* Privacy Header */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <Card className="bg-gradient-privacy backdrop-blur-md bg-opacity-90 border-privacy-shield/20 shadow-glass">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Privacy-First Transit</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              Federated Learning Active
            </Badge>
          </div>
        </Card>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0">
        <GoogleMap 
          buses={buses}
          center={{ lat: 40.7128, lng: -74.0060 }}
          zoom={13}
        />
      </div>

      {/* Live Bus List */}
      <div className="absolute bottom-4 left-4 w-80 max-h-96 overflow-y-auto z-10">
        <Card className="bg-card/95 backdrop-blur-md shadow-floating">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-transit-accent" />
              Live Buses
            </h3>
          </div>
          <div className="space-y-2 p-4">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => setSelectedBus(bus)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{bus.route}</span>
                    <Badge className={getPrivacyBadgeColor(bus.privacyLevel)}>
                      {bus.privacyLevel}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    → {bus.nextStop}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Math.round(bus.eta)}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {Math.round(bus.speed)} km/h
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bus Stops */}
      <div className="absolute bottom-4 right-4 w-72 max-h-96 overflow-y-auto z-10">
        <Card className="bg-card/95 backdrop-blur-md shadow-floating">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-transit-secondary" />
              Nearby Stops
            </h3>
          </div>
          <div className="space-y-2 p-4">
            {mockStops.map((stop) => (
              <div
                key={stop.id}
                className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => setSelectedStop(stop)}
              >
                <div className="font-medium mb-1">{stop.name}</div>
                <div className="flex flex-wrap gap-1">
                  {stop.routes.map((route) => (
                    <Badge key={route} variant="outline" className="text-xs">
                      {route}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Next arrivals: 3m, 7m, 12m
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Emergency Button */}
      <div className="absolute top-20 right-4 z-10">
        <Button
          size="sm"
          className="bg-destructive hover:bg-destructive/90 text-white shadow-floating"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency
        </Button>
      </div>

      {/* Privacy Notice */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-card/80 backdrop-blur-sm px-4 py-2">
          <div className="text-xs text-muted-foreground text-center">
            🔒 Your location data never leaves your device • Federated learning protects privacy
          </div>
        </Card>
      </div>
    </div>
  );
};