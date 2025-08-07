import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Route, MapPin, Clock, Users, Search, Navigation, Zap } from 'lucide-react';

interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: number;
  frequency: number;
  status: 'active' | 'delayed' | 'maintenance';
  buses: number;
  avgSpeed: number;
  reliability: number;
}

interface RouteStop {
  id: string;
  name: string;
  order: number;
  arrivals: { route: string; eta: number; confidence: number }[];
}

const mockRoutes: BusRoute[] = [
  {
    id: 'route-42',
    name: 'Line 42 - Downtown Express',
    color: '#3B82F6',
    stops: 18,
    frequency: 8,
    status: 'active',
    buses: 6,
    avgSpeed: 22,
    reliability: 94
  },
  {
    id: 'route-15',
    name: 'Line 15 - University Loop',
    color: '#10B981',
    stops: 24,
    frequency: 12,
    status: 'active',
    buses: 4,
    avgSpeed: 18,
    reliability: 89
  },
  {
    id: 'route-8',
    name: 'Line 8 - Airport Connector',
    color: '#F59E0B',
    stops: 14,
    frequency: 15,
    status: 'delayed',
    buses: 3,
    avgSpeed: 25,
    reliability: 78
  }
];

const mockStops: RouteStop[] = [
  {
    id: 'stop-central',
    name: 'Central Station',
    order: 1,
    arrivals: [
      { route: 'Line 42', eta: 3, confidence: 95 },
      { route: 'Line 15', eta: 7, confidence: 88 },
      { route: 'Line 8', eta: 12, confidence: 72 }
    ]
  },
  {
    id: 'stop-university',
    name: 'University Campus',
    order: 8,
    arrivals: [
      { route: 'Line 15', eta: 2, confidence: 92 },
      { route: 'Line 42', eta: 15, confidence: 85 }
    ]
  }
];

export const RouteManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-transit-success';
      case 'delayed': return 'bg-transit-warning';
      case 'maintenance': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-transit-success';
    if (confidence >= 80) return 'text-transit-warning';
    return 'text-destructive';
  };

  const filteredRoutes = mockRoutes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Route Management</h2>
          <p className="text-muted-foreground">Monitor and manage bus routes with federated intelligence</p>
        </div>
        <Badge className="bg-gradient-primary text-white px-3 py-1">
          <Zap className="h-4 w-4 mr-1" />
          AI-Powered Predictions
        </Badge>
      </div>

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="routes">All Routes</TabsTrigger>
          <TabsTrigger value="stops">Stop Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Plan Route
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <Card
                key={route.id}
                className="cursor-pointer hover:shadow-card transition-smooth"
                onClick={() => setSelectedRoute(route)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(route.status)}>
                      {route.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{route.stops} stops</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{route.frequency}min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{route.buses} buses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-muted-foreground" />
                      <span>{route.avgSpeed} km/h</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reliability</span>
                      <span className="font-medium">{route.reliability}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-2 rounded-full transition-all"
                        style={{ width: `${route.reliability}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stops" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockStops.map((stop) => (
              <Card key={stop.id} className="hover:shadow-card transition-smooth">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-transit-secondary" />
                    {stop.name}
                  </CardTitle>
                  <CardDescription>
                    Real-time arrivals with AI confidence scores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stop.arrivals.map((arrival, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: mockRoutes.find(r => r.name === arrival.route)?.color || '#gray'
                          }}
                        />
                        <div>
                          <div className="font-medium">{arrival.route}</div>
                          <div className="text-sm text-muted-foreground">
                            Confidence: <span className={getConfidenceColor(arrival.confidence)}>
                              {arrival.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{arrival.eta}m</div>
                        <div className="text-xs text-muted-foreground">ETA</div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Set Alert
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockRoutes.length}</div>
                <div className="text-xs text-muted-foreground">+2 this month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRoutes.reduce((acc, route) => acc + route.buses, 0)}
                </div>
                <div className="text-xs text-muted-foreground">87% operational</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(mockRoutes.reduce((acc, route) => acc + route.reliability, 0) / mockRoutes.length)}%
                </div>
                <div className="text-xs text-muted-foreground">+3.2% vs last week</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-privacy-shield">A+</div>
                <div className="text-xs text-muted-foreground">Federated learning active</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Federated Learning Insights</CardTitle>
              <CardDescription>
                Collective intelligence improving route optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Our federated learning system has processed over 10,000 device contributions 
                this week, improving arrival predictions by 15% while keeping all personal 
                location data on individual devices.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-privacy-shield/10">
                  <div className="text-lg font-bold text-privacy-shield">15%</div>
                  <div className="text-sm">Prediction Improvement</div>
                </div>
                <div className="p-4 rounded-lg bg-transit-accent/10">
                  <div className="text-lg font-bold text-transit-accent">10,247</div>
                  <div className="text-sm">Device Contributions</div>
                </div>
                <div className="p-4 rounded-lg bg-transit-success/10">
                  <div className="text-lg font-bold text-transit-success">100%</div>
                  <div className="text-sm">Privacy Preserved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};