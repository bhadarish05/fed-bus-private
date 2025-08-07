import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Settings } from "lucide-react";

interface Bus {
  id: string;
  route: string;
  lat: number;
  lng: number;
  speed: number;
  nextStop: string;
  eta: number;
}

interface GoogleMapProps {
  buses: Bus[];
  center: { lat: number; lng: number };
  zoom: number;
}

// Component to render when Maps fails to load
const MapError = ({ onApiKeySubmit }: { onApiKeySubmit: (key: string) => void }) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <Card className="p-8 text-center">
      <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-xl font-semibold mb-4">Google Maps Setup Required</h3>
      <div className="space-y-4 max-w-md mx-auto">
        <p className="text-muted-foreground">
          Enter your Google Maps API key to enable live bus tracking
        </p>
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Google Maps API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={() => onApiKeySubmit(apiKey)}
            disabled={!apiKey}
          >
            <Settings className="h-4 w-4 mr-2" />
            Setup
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Get your API key from{" "}
          <a 
            href="https://console.cloud.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Cloud Console
          </a>
        </div>
      </div>
    </Card>
  );
};

// Map component that renders when API is loaded
const MapComponent = ({ buses, center, zoom }: GoogleMapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })
      );
    }
  }, [ref, map, center, zoom]);

  // Add bus markers
  useEffect(() => {
    if (!map) return;

    const markers = buses.map((bus) => {
      const marker = new google.maps.Marker({
        position: { lat: bus.lat, lng: bus.lng },
        map,
        title: `${bus.route} - ${bus.nextStop}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#3b82f6",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">${bus.route}</h3>
            <p class="text-sm">Next: ${bus.nextStop}</p>
            <p class="text-sm">ETA: ${bus.eta}m | Speed: ${Math.round(bus.speed)}km/h</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [map, buses]);

  return <div ref={ref} className="w-full h-full" />;
};

// Render function for the Wrapper component
const render = (status: Status, buses: Bus[], center: { lat: number; lng: number }, zoom: number) => {
  switch (status) {
    case Status.LOADING:
      return (
        <Card className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p>Loading Google Maps...</p>
        </Card>
      );
    case Status.FAILURE:
      return (
        <MapError onApiKeySubmit={(key) => {
          localStorage.setItem('google_maps_api_key', key);
          window.location.reload();
        }} />
      );
    case Status.SUCCESS:
      return <MapComponent buses={buses} center={center} zoom={zoom} />;
  }
};

export const GoogleMap = ({ buses, center, zoom }: GoogleMapProps) => {
  // Try to get API key from localStorage first, then from environment
  const apiKey = localStorage.getItem('google_maps_api_key') || 
                 import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <MapError onApiKeySubmit={(key) => {
        localStorage.setItem('google_maps_api_key', key);
        window.location.reload();
      }} />
    );
  }

  return (
    <div className="w-full h-full">
      <Wrapper 
        apiKey={apiKey} 
        render={(status) => render(status, buses, center, zoom)}
        libraries={["places", "geometry"]}
      />
    </div>
  );
};