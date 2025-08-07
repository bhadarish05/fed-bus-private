import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Phone, Shield, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  available: boolean;
  avgResponseTime: number;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: 'police',
    name: 'Police Emergency',
    role: 'Law Enforcement',
    phone: '911',
    available: true,
    avgResponseTime: 3
  },
  {
    id: 'medical',
    name: 'Medical Emergency',
    role: 'Emergency Medical',
    phone: '911',
    available: true,
    avgResponseTime: 4
  },
  {
    id: 'transit-control',
    name: 'Transit Control Center',
    role: 'Transit Operations',
    phone: '+1-555-TRANSIT',
    available: true,
    avgResponseTime: 2
  },
  {
    id: 'security',
    name: 'Transit Security',
    role: 'Transport Security',
    phone: '+1-555-SECURITY',
    available: true,
    avgResponseTime: 5
  }
];

export const EmergencyPanel = () => {
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmergencyReport = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmergencyType('');
      setDescription('');
    }, 5000);
  };

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', color: 'bg-destructive' },
    { id: 'security', label: 'Security Threat', color: 'bg-transit-warning' },
    { id: 'accident', label: 'Accident', color: 'bg-transit-danger' },
    { id: 'breakdown', label: 'Vehicle Breakdown', color: 'bg-muted-foreground' },
    { id: 'harassment', label: 'Harassment', color: 'bg-destructive' },
    { id: 'other', label: 'Other Emergency', color: 'bg-accent' }
  ];

  if (isSubmitted) {
    return (
      <div className="space-y-6 p-6">
        <Card className="border-transit-success bg-transit-success/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-center flex-col space-y-4">
              <CheckCircle className="h-16 w-16 text-transit-success" />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-transit-success mb-2">
                  Emergency Report Submitted
                </h3>
                <p className="text-muted-foreground">
                  Your emergency report has been received and forwarded to the appropriate authorities.
                  Emergency services have been notified and help is on the way.
                </p>
              </div>
              <Badge className="bg-transit-success text-white">
                Response Time: ~3 minutes
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Emergency Header */}
      <Card className="bg-gradient-to-r from-destructive/10 to-transit-warning/10 border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            Emergency Response Center
          </CardTitle>
          <CardDescription>
            Report emergencies immediately. Location data will be shared with emergency services.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Report Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Report Emergency
            </CardTitle>
            <CardDescription>
              Provide details about the emergency situation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-3 block">Emergency Type</label>
              <div className="grid grid-cols-2 gap-2">
                {emergencyTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={emergencyType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEmergencyType(type.id)}
                    className={emergencyType === type.id ? type.color : ''}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe the emergency situation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="p-3 rounded-lg bg-muted/50 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-privacy-shield" />
                <span className="font-medium">Privacy Override Notice</span>
              </div>
              <p className="text-muted-foreground text-xs">
                During emergencies, your precise location will be shared with emergency services 
                to ensure rapid response. This overrides normal privacy settings.
              </p>
            </div>

            <Button
              onClick={handleEmergencyReport}
              disabled={!emergencyType || !description.trim() || isSubmitting}
              className="w-full bg-destructive hover:bg-destructive/90"
              size="lg"
            >
              {isSubmitting ? (
                <>Sending Emergency Report...</>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Send Emergency Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              Direct contact information for emergency services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.role}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={contact.available ? "default" : "secondary"}
                        className={contact.available ? "bg-transit-success text-white" : ""}
                      >
                        {contact.available ? 'Available' : 'Busy'}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ~{contact.avgResponseTime}m
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <a href={`tel:${contact.phone}`}>
                    Call
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Location Info */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Current Location Information
          </CardTitle>
          <CardDescription>
            Information that will be shared with emergency services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Bus Route:</span>
              <span className="ml-2 text-muted-foreground">Line 42 - Downtown Express</span>
            </div>
            <div>
              <span className="font-medium">Current Stop:</span>
              <span className="ml-2 text-muted-foreground">Central Station</span>
            </div>
            <div>
              <span className="font-medium">Bus ID:</span>
              <span className="ml-2 text-muted-foreground">BUS-001</span>
            </div>
            <div>
              <span className="font-medium">Approximate Location:</span>
              <span className="ml-2 text-muted-foreground">Downtown District</span>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <strong>Note:</strong> Exact GPS coordinates will only be shared when an emergency report is submitted.
            Normal operation maintains privacy through federated learning.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};