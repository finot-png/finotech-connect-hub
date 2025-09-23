import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { 
  Building2, 
  Store, 
  Home, 
  HeadphonesIcon, 
  Key, 
  Wifi, 
  Cloud, 
  Monitor, 
  Smartphone, 
  Camera,
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Index = () => {
  const customerTypes = [
    {
      icon: Building2,
      title: "Offices",
      description: "Complete IT solutions for corporate environments",
      features: [
        "Enterprise IT Support",
        "Network Infrastructure",
        "Microsoft Office 365",
        "Cloud Backup Solutions",
        "Security Systems"
      ]
    },
    {
      icon: Store,
      title: "Stores",
      description: "Retail-focused technology solutions",
      features: [
        "POS System Support",
        "Inventory Management",
        "Customer WiFi Setup",
        "Security Cameras",
        "Payment Processing"
      ]
    },
    {
      icon: Home,
      title: "Properties",
      description: "Residential and property management IT services",
      features: [
        "Home Network Setup",
        "Smart Home Integration",
        "Property WiFi Solutions",
        "Security Camera Systems",
        "Device Configuration"
      ]
    }
  ];

  const services = [
    {
      icon: HeadphonesIcon,
      title: "IT Support",
      description: "24/7 technical assistance and troubleshooting",
      features: ["Remote Support", "On-site Service", "Emergency Response", "Preventive Maintenance"]
    },
    {
      icon: Key,
      title: "Microsoft Licenses",
      description: "Official Microsoft software licensing solutions",
      features: ["Office 365", "Windows Licenses", "Enterprise Agreements", "Volume Licensing"]
    },
    {
      icon: Wifi,
      title: "Network & Internet",
      description: "Complete network installation and optimization",
      features: ["Network Design", "WiFi Installation", "Internet Setup", "Network Security"]
    },
    {
      icon: Cloud,
      title: "Cloud Backup",
      description: "Secure cloud storage and backup solutions",
      features: ["Automated Backups", "Data Recovery", "Cloud Migration", "Disaster Planning"]
    },
    {
      icon: Monitor,
      title: "Computers",
      description: "Hardware sales, setup, and maintenance",
      features: ["Computer Sales", "Hardware Upgrades", "System Setup", "Performance Optimization"]
    },
    {
      icon: Camera,
      title: "Security Systems",
      description: "Professional security camera installations",
      features: ["CCTV Installation", "Remote Monitoring", "Access Control", "Security Audits"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional IT Services" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Professional IT Services for 
            <span className="text-tech-orange"> Your Business</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Finotech provides comprehensive IT solutions for offices, stores, and properties. 
            From support to security, we've got your technology needs covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-tech-orange hover:bg-tech-orange/90 text-lg px-8 py-6">
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-tech-blue text-lg px-8 py-6">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Types Section */}
      <section className="py-20 bg-tech-gray/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tech-blue mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored IT solutions for different business environments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {customerTypes.map((type, index) => (
              <ServiceCard key={index} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tech-blue mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete technology solutions to keep your business running smoothly
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-tech-gray/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-tech-blue mb-8">
              Why Choose Finotech?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-background shadow-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-blue mb-2">Expert Support</h3>
                  <p className="text-muted-foreground">Professional technicians with years of experience</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background shadow-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-blue mb-2">24/7 Availability</h3>
                  <p className="text-muted-foreground">Round-the-clock support when you need it most</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background shadow-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-blue mb-2">Trusted Solutions</h3>
                  <p className="text-muted-foreground">Official partnerships and certified services</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-12">
              Contact us today for a free consultation and discover how we can help your business
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Phone</h3>
                <p className="text-primary-foreground/80">(555) 123-4567</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Email</h3>
                <p className="text-primary-foreground/80">contact@finotech.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Location</h3>
                <p className="text-primary-foreground/80">Serving Your Area</p>
              </div>
            </div>
            
            <Button size="lg" className="bg-tech-orange hover:bg-tech-orange/90 text-lg px-8 py-6">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tech-dark text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold">Finotech</span>
            </div>
            <p className="text-primary-foreground/70 mb-4">
              Professional IT Services for Offices, Stores & Properties
            </p>
            <p className="text-primary-foreground/50 text-sm">
              © 2024 Finotech. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;