import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const customerSchema = z.object({
  company_name: z.string().min(1, 'Företagsnamn krävs'),
  contact_person: z.string().optional(),
  email: z.string().email('Ogiltig e-postadress').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
  notes: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customer?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function CustomerForm({ customer, onClose, onSave }: CustomerFormProps) {
  const [authUsers, setAuthUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      company_name: customer?.company_name || '',
      contact_person: customer?.contact_person || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      city: customer?.city || '',
      postal_code: customer?.postal_code || '',
      country: customer?.country || 'Sweden',
      status: customer?.status || 'active',
      notes: customer?.notes || '',
    },
  });

  useEffect(() => {
    // For editing, we don't need to fetch auth users
    if (customer) {
      setSelectedUserId(customer.user_id);
      return;
    }

    // For new customers, we need existing auth users without customer records
    fetchAvailableUsers();
  }, [customer]);

  async function fetchAvailableUsers() {
    try {
      // Get all users from profiles table
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('user_id, company_name, contact_person');

      if (error) throw error;

      // Filter out users who already have customer records
      const { data: existingCustomers } = await supabase
        .from('customers')
        .select('user_id');

      const existingUserIds = existingCustomers?.map(c => c.user_id) || [];
      const availableUsers = profiles?.filter(p => !existingUserIds.includes(p.user_id)) || [];

      setAuthUsers(availableUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function onSubmit(data: CustomerFormData) {
    try {
      if (customer) {
        // Update existing customer
        const { error } = await supabase
          .from('customers')
          .update(data)
          .eq('id', customer.id);

        if (error) throw error;
      } else {
        // Create new customer
        if (!selectedUserId) {
          toast({
            title: "Fel",
            description: "Välj en användare för kunden",
            variant: "destructive",
          });
          return;
        }

        const { error } = await supabase
          .from('customers')
          .insert([{
            company_name: data.company_name,
            contact_person: data.contact_person,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            postal_code: data.postal_code,
            country: data.country,
            status: data.status,
            notes: data.notes,
            user_id: selectedUserId,
          }]);

        if (error) throw error;
      }

      toast({
        title: "Framgång",
        description: customer ? "Kund uppdaterad" : "Kund skapad",
      });

      onSave();
    } catch (error) {
      console.error('Error saving customer:', error);
      toast({
        title: "Fel",
        description: "Kunde inte spara kund",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {customer ? 'Redigera kund' : 'Lägg till ny kund'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!customer && (
            <div className="space-y-2">
              <Label htmlFor="user_id">Välj användare</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj en användare" />
                </SelectTrigger>
                <SelectContent>
                  {authUsers.map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.company_name || user.contact_person || user.user_id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Företagsnamn *</Label>
              <Input
                {...register('company_name')}
                id="company_name"
                placeholder="Företagsnamn"
              />
              {errors.company_name && (
                <p className="text-sm text-destructive">{errors.company_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_person">Kontaktperson</Label>
              <Input
                {...register('contact_person')}
                id="contact_person"
                placeholder="Kontaktperson"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="e-post@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                {...register('phone')}
                id="phone"
                placeholder="070-123 45 67"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adress</Label>
            <Input
              {...register('address')}
              id="address"
              placeholder="Gatuadress"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Stad</Label>
              <Input
                {...register('city')}
                id="city"
                placeholder="Stockholm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Postnummer</Label>
              <Input
                {...register('postal_code')}
                id="postal_code"
                placeholder="12345"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Land</Label>
              <Input
                {...register('country')}
                id="country"
                placeholder="Sverige"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={watch('status')}
              onValueChange={(value) => setValue('status', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="inactive">Inaktiv</SelectItem>
                <SelectItem value="pending">Väntande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anteckningar</Label>
            <Textarea
              {...register('notes')}
              id="notes"
              placeholder="Ytterligare information..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Avbryt
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sparar...' : customer ? 'Uppdatera' : 'Skapa'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}