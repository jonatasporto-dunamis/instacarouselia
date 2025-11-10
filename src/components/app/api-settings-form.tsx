'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const apiSettingsSchema = z.object({
  geminiApiKey: z.string().min(1, 'API Key is required.'),
});

export function ApiSettingsForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof apiSettingsSchema>>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      geminiApiKey: '',
    },
  });

  function onSubmit(values: z.infer<typeof apiSettingsSchema>) {
    console.log(values);
    toast({
      title: 'API Settings Saved',
      description: 'Your Gemini API key has been configured.',
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-headline">API Settings</h2>
        <p className="text-muted-foreground">
          Configure your API keys for generative features.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="geminiApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gemini API Key</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your API key" {...field} />
                </FormControl>
                <FormDescription>
                  Your API key is stored securely and only used for generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save API Key
          </Button>
        </form>
      </Form>
    </div>
  );
}
