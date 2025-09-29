import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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

const activitySchema = z.object({
  title: z.string().min(1, 'Titel krävs'),
  description: z.string().optional(),
  activity_type: z.enum(['call', 'email', 'meeting', 'quote', 'follow_up', 'note']),
  priority: z.enum(['low', 'medium', 'high']),
  scheduled_date: z.string().optional(),
});

type ActivityFormData = z.infer<typeof activitySchema>;

interface ActivityFormProps {
  onClose: () => void;
  onSave: () => void;
}

export default function ActivityForm({ onClose, onSave }: ActivityFormProps) {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: '',
      description: '',
      activity_type: 'call',
      priority: 'medium',
      scheduled_date: '',
    },
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, company_name, contact_person')
        .order('company_name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }

  async function onSubmit(data: ActivityFormData) {
    if (!user) {
      toast({
        title: "Fel",
        description: "Du måste vara inloggad",
        variant: "destructive",
      });
      return;
    }

    try {
      const activityData = {
        title: data.title,
        description: data.description,
        activity_type: data.activity_type,
        priority: data.priority,
        user_id: user.id,
        customer_id: selectedCustomerId || null,
        scheduled_date: data.scheduled_date ? new Date(data.scheduled_date).toISOString() : null,
      };

      const { error } = await supabase
        .from('sales_activities')
        .insert([activityData]);

      if (error) throw error;

      toast({
        title: "Framgång",
        description: "Aktivitet skapad",
      });

      onSave();
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Fel",
        description: "Kunde inte skapa aktivitet",
        variant: "destructive",
      });
    }
  }

  const activityTypes = [
    { value: 'call', label: 'Telefonsamtal' },
    { value: 'email', label: 'E-post' },
    { value: 'meeting', label: 'Möte' },
    { value: 'quote', label: 'Offert' },
    { value: 'follow_up', label: 'Uppföljning' },
    { value: 'note', label: 'Anteckning' },
  ];

  const priorities = [
    { value: 'low', label: 'Låg' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'Hög' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Skapa ny aktivitet</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                {...register('title')}
                id="title"
                placeholder="Aktivitetens titel"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer_id">Kund</Label>
              <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj kund (valfritt)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Ingen specifik kund</SelectItem>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity_type">Typ av aktivitet</Label>
              <Select
                value={watch('activity_type')}
                onValueChange={(value) => setValue('activity_type', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioritet</Label>
              <Select
                value={watch('priority')}
                onValueChange={(value) => setValue('priority', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduled_date">Planerat datum (valfritt)</Label>
            <Input
              {...register('scheduled_date')}
              id="scheduled_date"
              type="datetime-local"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              {...register('description')}
              id="description"
              placeholder="Beskriv aktiviteten..."
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Avbryt
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Skapar...' : 'Skapa aktivitet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}