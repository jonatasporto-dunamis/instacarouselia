
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
import { Save, BrainCircuit } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const apiSettingsSchema = z.object({
  provider: z.enum(['openai', 'gemini']).default('openai'),
  apiKey: z.string().min(1, 'API Key is required.'),
  model: z.string().optional(),
});

export function ApiSettingsForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof apiSettingsSchema>>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: () => {
      if (typeof window === 'undefined') {
        return {
          provider: 'openai',
          apiKey: '',
          model: '',
        };
      }
      return {
        provider:
          (localStorage.getItem('ai.provider') as 'openai' | 'gemini') ||
          'openai',
        apiKey: localStorage.getItem('ai.key') || '',
        model: localStorage.getItem('ai.model') || '',
      };
    },
  });

  function onSubmit(values: z.infer<typeof apiSettingsSchema>) {
    try {
      localStorage.setItem('ai.provider', values.provider);
      localStorage.setItem('ai.key', values.apiKey);
      if (values.model) {
        localStorage.setItem('ai.model', values.model);
      } else {
        localStorage.removeItem('ai.model');
      }

      toast({
        title: 'API Settings Saved',
        description: 'Your settings have been saved to the local browser.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Saving Settings',
        description:
          'Could not save settings to localStorage. Your browser might be in private mode or has storage disabled.',
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-headline">API Settings</h2>
        <p className="text-muted-foreground">
          Configure your preferred AI provider. These settings are saved in your
          browser.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="ai-apis"
          >
            <AccordionItem value="ai-apis" className="border rounded-lg px-4">
              <AccordionTrigger className="font-semibold">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5" />
                  AI Provider
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an AI provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                          <SelectItem value="gemini">Google (Gemini)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select which AI service to use for generation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your API key"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your key is stored only in your browser.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., gpt-4o-mini"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Override the default model for the selected provider.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </form>
      </Form>
    </div>
  );
}
