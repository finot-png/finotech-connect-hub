import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Ogiltig e-postadress" }),
  password: z.string().min(6, { message: "Lösenordet måste vara minst 6 tecken" })
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Ogiltig e-postadress" }),
  password: z.string().min(6, { message: "Lösenordet måste vara minst 6 tecken" }),
  confirmPassword: z.string(),
  companyName: z.string().trim().min(1, { message: "Företagsnamn krävs" }),
  contactPerson: z.string().trim().min(1, { message: "Kontaktperson krävs" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Lösenorden matchar inte",
  path: ["confirmPassword"]
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      contactPerson: ""
    }
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    await signIn(data.email, data.password);
    setIsLoading(false);
  };

  const handleSignup = async (data: SignupForm) => {
    setIsLoading(true);
    await signUp(data.email, data.password, data.companyName, data.contactPerson);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            IT-Tjänsten På Ditt Sätt
          </CardTitle>
          <CardDescription>
            Logga in eller registrera dig för att komma åt dina tjänster
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Logga in</TabsTrigger>
              <TabsTrigger value="signup">Registrera</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-post</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="din@epost.se"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lösenord</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Ditt lösenord"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Loggar in..." : "Logga in"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Företagsnamn</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ditt företag AB"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kontaktperson</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Förnamn Efternamn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-post</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="din@epost.se"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lösenord</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Minst 6 tecken"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bekräfta lösenord</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Upprepa lösenordet"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Registrerar..." : "Registrera konto"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}