import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Phone, Mail, Calendar, FileText, UserCheck, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import ActivityForm from './ActivityForm';

export default function CRMDashboard() {
  const [activities, setActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    pendingActivities: 0,
    completedActivities: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [activitiesRes, customersRes] = await Promise.all([
        supabase
          .from('sales_activities')
          .select(`
            *,
            customers(company_name, contact_person)
          `)
          .order('created_at', { ascending: false }),
        
        supabase
          .from('customers')
          .select('id')
      ]);

      const activitiesData = activitiesRes.data || [];
      setActivities(activitiesData);

      setStats({
        totalActivities: activitiesData.length,
        pendingActivities: activitiesData.filter(a => a.status === 'pending').length,
        completedActivities: activitiesData.filter(a => a.status === 'completed').length,
        totalCustomers: customersRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching CRM data:', error);
      toast({
        title: "Fel",
        description: "Kunde inte ladda CRM-data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function markAsCompleted(activityId: string) {
    try {
      const { error } = await supabase
        .from('sales_activities')
        .update({ 
          status: 'completed',
          completed_date: new Date().toISOString()
        })
        .eq('id', activityId);

      if (error) throw error;

      toast({
        title: "Framgång",
        description: "Aktivitet markerad som slutförd",
      });

      fetchData();
    } catch (error) {
      console.error('Error updating activity:', error);
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera aktivitet",
        variant: "destructive",
      });
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'quote': return <FileText className="h-4 w-4" />;
      case 'follow_up': return <UserCheck className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totalt aktiviteter
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Väntande
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Slutförda
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totalt kunder
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Activities Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Säljaktiviteter</CardTitle>
              <CardDescription>
                Hantera säljaktiviteter och kundkontakter
              </CardDescription>
            </div>
            <Button onClick={() => setShowActivityForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ny aktivitet
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Alla</TabsTrigger>
              <TabsTrigger value="pending">Väntande</TabsTrigger>
              <TabsTrigger value="completed">Slutförda</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Typ</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead>Kund</TableHead>
                    <TableHead>Prioritet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Skapad</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getActivityIcon(activity.activity_type)}
                          <span className="capitalize">{activity.activity_type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{activity.title}</TableCell>
                      <TableCell>
                        {activity.customers?.company_name || 'Allmän aktivitet'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(activity.created_at), { 
                          addSuffix: true, 
                          locale: sv 
                        })}
                      </TableCell>
                      <TableCell>
                        {activity.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsCompleted(activity.id)}
                          >
                            Slutför
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Typ</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead>Kund</TableHead>
                    <TableHead>Prioritet</TableHead>
                    <TableHead>Skapad</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.filter(a => a.status === 'pending').map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getActivityIcon(activity.activity_type)}
                          <span className="capitalize">{activity.activity_type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{activity.title}</TableCell>
                      <TableCell>
                        {activity.customers?.company_name || 'Allmän aktivitet'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(activity.created_at), { 
                          addSuffix: true, 
                          locale: sv 
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsCompleted(activity.id)}
                        >
                          Slutför
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="completed">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Typ</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead>Kund</TableHead>
                    <TableHead>Slutförd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.filter(a => a.status === 'completed').map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getActivityIcon(activity.activity_type)}
                          <span className="capitalize">{activity.activity_type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{activity.title}</TableCell>
                      <TableCell>
                        {activity.customers?.company_name || 'Allmän aktivitet'}
                      </TableCell>
                      <TableCell>
                        {activity.completed_date ? 
                          formatDistanceToNow(new Date(activity.completed_date), { 
                            addSuffix: true, 
                            locale: sv 
                          }) : 'Okänt'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showActivityForm && (
        <ActivityForm
          onClose={() => setShowActivityForm(false)}
          onSave={() => {
            fetchData();
            setShowActivityForm(false);
          }}
        />
      )}
    </div>
  );
}