
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { ArrowLeft, Presentation } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const auth = useAuth();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: 'E-mail enviado!',
        description: 'Verifique sua caixa de entrada para o link de redefinição de senha.',
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Falha no envio',
        description: 'Não foi possível enviar o e-mail. Verifique o endereço e tente novamente.',
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 border-b">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Presentation className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-headline">
            Dunamis<span className="text-primary">Post</span>
          </h1>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
            <CardDescription>
              Digite seu e-mail para receber um link de redefinição.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Enviar link de recuperação
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
                <Button variant="ghost" asChild>
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Login
                    </Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
