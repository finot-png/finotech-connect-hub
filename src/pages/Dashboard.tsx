import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Package, Receipt, User } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-primary">
              Välkommen till din kundportal
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Här kan du se dina aktiva tjänster, beställningshistorik och ladda ner fakturor.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Active Services */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Aktiva Tjänster
                </CardTitle>
                <Package className="h-4 w-4 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Pågående IT-tjänster
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Visa detaljer
                </Button>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Beställningar
                </CardTitle>
                <Receipt className="h-4 w-4 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Totalt antal beställningar
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Visa historik
                </Button>
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fakturor
                </CardTitle>
                <Download className="h-4 w-4 ml-auto text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Tillgängliga för nedladdning
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Ladda ner
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Senaste aktiviteter</CardTitle>
              <CardDescription>
                Dina senaste transaktioner och uppdateringar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">IT-Support Månadsabonnemang</p>
                    <p className="text-sm text-muted-foreground">Aktiv sedan 2024-01-15</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Aktiv</span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Faktura #2024-003</p>
                    <p className="text-sm text-muted-foreground">Skapad 2024-03-01</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Systemuppdatering</p>
                    <p className="text-sm text-muted-foreground">Planerad för 2024-03-15</p>
                  </div>
                  <span className="text-sm text-orange-600 font-medium">Planerad</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}