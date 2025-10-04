import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import finotechLogo from "@/assets/finotech-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuthAction = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={finotechLogo} alt="Finotech" className="h-16 md:h-20" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hem" className="text-foreground hover:text-primary transition-colors">Hem</a>
            <a href="#tjanster" className="text-foreground hover:text-primary transition-colors">Tjänster</a>
            <a href="#om-oss" className="text-foreground hover:text-primary transition-colors">Om oss</a>
            <a href="#kontakt" className="text-foreground hover:text-primary transition-colors">Kontakt</a>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleAuthAction}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Min portal</span>
                </Button>
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin')}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logga ut</span>
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleAuthAction}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Logga in
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#hem" className="block text-foreground hover:text-primary transition-colors">Hem</a>
            <a href="#tjanster" className="block text-foreground hover:text-primary transition-colors">Tjänster</a>
            <a href="#om-oss" className="block text-foreground hover:text-primary transition-colors">Om oss</a>
            <a href="#kontakt" className="block text-foreground hover:text-primary transition-colors">Kontakt</a>
            
            {user ? (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={handleAuthAction}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Min portal</span>
                </Button>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin')}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logga ut</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleAuthAction}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Logga in
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;