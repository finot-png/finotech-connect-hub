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
      title: "Kontor",
      description: "Personlig IT-support för mindre företag",
      features: [
        "Lokal IT-support",
        "Nätverkslösningar",
        "Microsoft Office hjälp",
        "Säker molnlagring",
        "Säkerhetssystem"
      ]
    },
    {
      icon: Store,
      title: "Butiker",
      description: "IT-lösningar anpassade för din butik",
      features: [
        "Kassasystem support",
        "Lagerhantering",
        "Kund-WiFi installation",
        "Säkerhetskameror",
        "Betallösningar"
      ]
    },
    {
      icon: Home,
      title: "Fastigheter",
      description: "Hemma-bäst IT-tjänster för privatpersoner",
      features: [
        "Hemnätverk installation",
        "Smart hem-integration",
        "WiFi för hela fastigheten",
        "Säkerhetskameror",
        "Enhetsinstallation"
      ]
    }
  ];

  const services = [
    {
      icon: HeadphonesIcon,
      title: "IT-Support",
      description: "Vi hjälper dig när tekniken krånglar",
      features: ["Support på distans", "Besök på plats", "Akuthjälp", "Förebyggande underhåll"]
    },
    {
      icon: Key,
      title: "Microsoft Licenser",
      description: "Officiella Microsoft-licenser till bra priser",
      features: ["Office 365", "Windows-licenser", "Företagsavtal", "Volymlicenser"]
    },
    {
      icon: Wifi,
      title: "Nätverk & Internet",
      description: "Professionell nätverksinstallation",
      features: ["Nätverksdesign", "WiFi-installation", "Internetuppkoppling", "Nätverkssäkerhet"]
    },
    {
      icon: Cloud,
      title: "Molnsäkerhetskopiering",
      description: "Säker lagring av dina viktiga filer",
      features: ["Automatiska säkerhetskopior", "Dataåterställning", "Molnmigrering", "Katastrofplanering"]
    },
    {
      icon: Monitor,
      title: "Datorer",
      description: "Försäljning, installation och service",
      features: ["Datorförsäljning", "Hårdvaruuppgraderingar", "Systeminstallation", "Prestandaoptimering"]
    },
    {
      icon: Camera,
      title: "Säkerhetssystem",
      description: "Professionell installation av kamerasystem",
      features: ["CCTV-installation", "Fjärrövervakning", "Åtkomstkontroll", "Säkerhetsgenomgångar"]
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
            <span className="text-tech-orange">IT-Tjänsten</span> På Ditt Sätt
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Finotech hjälper mindre företag, butiker och fastighetsägare med alla IT-behov. 
            Vi finns här när du behöver oss - enkelt, personligt och pålitligt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-tech-orange hover:bg-tech-orange/90 text-lg px-8 py-6">
              Få gratis rådgivning
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-tech-blue text-lg px-8 py-6">
              Se våra tjänster
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Types Section */}
      <section className="py-20 bg-tech-gray/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tech-blue mb-4">
              Vilka vi hjälper
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Skräddarsydda IT-lösningar för olika typer av verksamheter
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
              Våra tjänster
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kompletta tekniklösningar som håller ditt företag igång
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
              Varför välja Finotech?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-background shadow-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-blue mb-2">Personlig service</h3>
                  <p className="text-muted-foreground">Vi lär känna dig och ditt företag för att ge bästa möjliga hjälp</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background shadow-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-blue mb-2">Snabb hjälp</h3>
                  <p className="text-muted-foreground">Vi svarar snabbt och kommer ut samma dag när det behövs</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background shadow-card border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-blue mb-2">Pålitliga lösningar</h3>
                  <p className="text-muted-foreground">Kvalitetsprodukter och äkta licenser till bra priser</p>
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
              Redo att komma igång?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-12">
              Kontakta oss idag för en gratis rådgivning och upptäck hur vi kan hjälpa ditt företag
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Telefon</h3>
                <p className="text-primary-foreground/80">0123-456 789</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">E-post</h3>
                <p className="text-primary-foreground/80">hej@finotech.se</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-tech-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">Plats</h3>
                <p className="text-primary-foreground/80">Vi kommer till dig</p>
              </div>
            </div>
            
            <Button size="lg" className="bg-tech-orange hover:bg-tech-orange/90 text-lg px-8 py-6">
              Boka konsultation
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
              Personlig IT-support för kontor, butiker och fastigheter
            </p>
            <p className="text-primary-foreground/50 text-sm">
              © 2024 Finotech. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;