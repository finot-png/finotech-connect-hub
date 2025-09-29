import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';

interface CustomerDetailsProps {
  customer: any;
  onClose: () => void;
}

export default function CustomerDetails({ customer, onClose }: CustomerDetailsProps) {
  const [services, setServices] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [customer.id]);

  async function fetchCustomerData() {
    try {
      const [servicesRes, invoicesRes, activitiesRes] = await Promise.all([
        supabase
          .from('services')
          .select('*')
          .eq('customer_id', customer.id)
          .order('created_at', { ascending: false }),
        
        supabase
          .from('invoices')
          .select('*')
          .eq('customer_id', customer.id)
          .order('created_at', { ascending: false }),
        
        supabase
          .from('sales_activities')
          .select('*')
          .eq('customer_id', customer.id)
          .order('created_at', { ascending: false })
      ]);

      setServices(servicesRes.data || []);
      setInvoices(invoicesRes.data || []);
      setActivities(activitiesRes.data || []);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      case 'paid': return 'bg-green-500';
      case 'overdue': return 'bg-red-500';
      case 'sent': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Kunddetaljer - {customer.company_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Grundinformation</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Företag</p>
                <p className="font-medium">{customer.company_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kontaktperson</p>
                <p className="font-medium">{customer.contact_person || 'Ej angiven'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">E-post</p>
                <p className="font-medium">{customer.email || 'Ej angiven'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">{customer.phone || 'Ej angiven'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Adress</p>
                <p className="font-medium">
                  {customer.address ? `${customer.address}, ${customer.city} ${customer.postal_code}` : 'Ej angiven'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Services, Invoices, Activities */}
          <Tabs defaultValue="services">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Tjänster ({services.length})</TabsTrigger>
              <TabsTrigger value="invoices">Fakturor ({invoices.length})</TabsTrigger>
              <TabsTrigger value="activities">Aktiviteter ({activities.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Tjänster</CardTitle>
                </CardHeader>
                <CardContent>
                  {services.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Namn</TableHead>
                          <TableHead>Beskrivning</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Månadsavgift</TableHead>
                          <TableHead>Skapad</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell>{service.description}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(service.status)}>
                                {service.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {service.monthly_price ? `${service.monthly_price} SEK` : 'Ej angiven'}
                            </TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(service.created_at), { 
                                addSuffix: true, 
                                locale: sv 
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground">Inga tjänster ännu</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices">
              <Card>
                <CardHeader>
                  <CardTitle>Fakturor</CardTitle>
                </CardHeader>
                <CardContent>
                  {invoices.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fakturanummer</TableHead>
                          <TableHead>Belopp</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Förfallodag</TableHead>
                          <TableHead>Skapad</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                            <TableCell>{invoice.amount} {invoice.currency}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(invoice.status)}>
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{invoice.due_date || 'Ej angiven'}</TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(invoice.created_at), { 
                                addSuffix: true, 
                                locale: sv 
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground">Inga fakturor ännu</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Säljaktiviteter</CardTitle>
                </CardHeader>
                <CardContent>
                  {activities.length > 0 ? (
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="p-4 rounded-lg bg-secondary/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {activity.activity_type} • {formatDistanceToNow(new Date(activity.created_at), { 
                                  addSuffix: true, 
                                  locale: sv 
                                })}
                              </p>
                            </div>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Inga aktiviteter ännu</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}