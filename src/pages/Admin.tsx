import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerManagement from '@/components/admin/CustomerManagement';
import CRMDashboard from '@/components/admin/CRMDashboard';
import Header from '@/components/Header';

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!adminLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-primary">
              Admin Portal
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hantera kunder, tjänster och säljaktiviteter
            </p>
          </div>

          <Tabs defaultValue="customers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customers">Kundhantering</TabsTrigger>
              <TabsTrigger value="crm">CRM & Försäljning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customers" className="space-y-6">
              <CustomerManagement />
            </TabsContent>
            
            <TabsContent value="crm" className="space-y-6">
              <CRMDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}