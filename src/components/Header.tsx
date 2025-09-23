import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-tech-blue">Finotech</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-tech-blue transition-colors">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-tech-blue transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-tech-blue transition-colors">
              Contact
            </a>
          </nav>
          
          <Button variant="default" className="bg-tech-orange hover:bg-tech-orange/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;