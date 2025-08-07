import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Lock, Eye, Database, Wifi, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const PrivacyDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Privacy Status Header */}
      <Card className="bg-gradient-privacy text-white border-none shadow-floating">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Privacy Protection Active
              </CardTitle>
              <CardDescription className="text-white/80 mt-2">
                Your location data is processed locally using federated learning
              </CardDescription>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Secure
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Data Protection */}
        <Card className="border-privacy-shield/20 hover:shadow-card transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-privacy-shield" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Local Processing</span>
                <Badge className="bg-privacy-shield text-white">100%</Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Anonymization</span>
                <Badge className="bg-privacy-shield text-white">Active</Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="text-xs text-muted-foreground">
              ✓ GPS data processed on device only<br/>
              ✓ No raw location data transmitted<br/>
              ✓ Encrypted model updates only
            </div>
          </CardContent>
        </Card>

        {/* Federated Learning Status */}
        <Card className="border-transit-accent/20 hover:shadow-card transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-transit-accent" />
              Learning Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Model Accuracy</span>
                <span className="font-medium">94.2%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Rounds</span>
                <span className="font-medium">247</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="text-xs text-muted-foreground">
              📊 Contributing to collective intelligence<br/>
              🔄 Last update: 2 minutes ago<br/>
              🎯 Next sync: 3 minutes
            </div>
          </CardContent>
        </Card>

        {/* Privacy Controls */}
        <Card className="border-muted hover:shadow-card transition-smooth">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-muted-foreground" />
              Privacy Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Location Sharing</span>
                <Badge variant="outline" className="text-xs">Federated Only</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Retention</span>
                <Badge variant="outline" className="text-xs">24 Hours</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Analytics</span>
                <Badge variant="outline" className="text-xs">Anonymous</Badge>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              Manage Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-card transition-smooth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-transit-primary" />
              Network Security
            </CardTitle>
            <CardDescription>
              How your data travels securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-privacy-shield mt-0.5" />
                <div>
                  <div className="font-medium text-sm">End-to-End Encryption</div>
                  <div className="text-xs text-muted-foreground">All communications use TLS 1.3</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-privacy-shield mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Zero-Knowledge Architecture</div>
                  <div className="text-xs text-muted-foreground">Server never sees your raw location</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-privacy-shield mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Differential Privacy</div>
                  <div className="text-xs text-muted-foreground">Mathematical privacy guarantees</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-smooth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              How It Works
            </CardTitle>
            <CardDescription>
              Understanding federated learning for transit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">1</div>
                <div>
                  <div className="font-medium">Local Training</div>
                  <div className="text-xs text-muted-foreground">Your device learns from your location patterns</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">2</div>
                <div>
                  <div className="font-medium">Model Updates</div>
                  <div className="text-xs text-muted-foreground">Only anonymous model weights are shared</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">3</div>
                <div>
                  <div className="font-medium">Collective Intelligence</div>
                  <div className="text-xs text-muted-foreground">Better predictions for everyone, privately</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Information */}
      <Card className="border-destructive/20 hover:shadow-card transition-smooth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Emergency Protocols
          </CardTitle>
          <CardDescription>
            In case of emergencies, privacy settings may be overridden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            During active emergencies, precise location data may be shared with emergency services only. 
            This helps ensure passenger safety while maintaining privacy for routine operations.
          </div>
          <Button variant="outline" size="sm" className="mt-3">
            View Emergency Contacts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};