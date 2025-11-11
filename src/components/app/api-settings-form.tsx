
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
import { Save, BrainCircuit, Image as ImageIcon } from 'lucide-react';
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
import React from 'react';
import { Separator } from '@/components/ui/separator';

const apiSettingsSchema = z.object({
  // AI Provider
  provider: z.enum(['openai', 'gemini']).default('openai'),
  apiKey: z.string().optional(),
  model: z.string().optional(),

  // Image Providers
  unsplashApiKey: z.string().optional(),
  pexelsApiKey: z.string().optional(),
  pixabayApiKey: z.string().optional(),
  bingApiKey: z.string().optional(),

  // Cloudinary (Optional)
  cloudinaryCloudName: z.string().optional(),
  cloudinaryApiKey: z.string().optional(),
});

export function ApiSettingsForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof apiSettingsSchema>>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      provider: 'openai',
      apiKey: '',
      model: '',
      unsplashApiKey: '',
      pexelsApiKey: '',
      pixabayApiKey: '',
      bingApiKey: '',
      cloudinaryCloudName: '',
      cloudinaryApiKey: '',
    },
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValues = {
        provider: (localStorage.getItem('ai.provider') as 'openai' | 'gemini') || 'openai',
        apiKey: localStorage.getItem('ai.key') || '',
        model: localStorage.getItem('ai.model') || '',
        unsplashApiKey: localStorage.getItem('image.unsplash.key') || '',
        pexelsApiKey: localStorage.getItem('image.pexels.key') || '',
        pixabayApiKey: localStorage.getItem('image.pixabay.key') || '',
        bingApiKey: localStorage.getItem('image.bing.key') || '',
        cloudinaryCloudName: localStorage.getItem('image.cloudinary.cloud_name') || '',
        cloudinaryApiKey: localStorage.getItem('image.cloudinary.api_key') || '',
      };
      form.reset(storedValues);
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof apiSettingsSchema>) {
    try {
      // AI Settings
      localStorage.setItem('ai.provider', values.provider);
      values.apiKey ? localStorage.setItem('ai.key', values.apiKey) : localStorage.removeItem('ai.key');
      values.model ? localStorage.setItem('ai.model', values.model) : localStorage.removeItem('ai.model');

      // Image API Settings
      values.unsplashApiKey ? localStorage.setItem('image.unsplash.key', values.unsplashApiKey) : localStorage.removeItem('image.unsplash.key');
      values.pexelsApiKey ? localStorage.setItem('image.pexels.key', values.pexelsApiKey) : localStorage.removeItem('image.pexels.key');
      values.pixabayApiKey ? localStorage.setItem('image.pixabay.key', values.pixabayApiKey) : localStorage.removeItem('image.pixabay.key');
      values.bingApiKey ? localStorage.setItem('image.bing.key', values.bingApiKey) : localStorage.removeItem('image.bing.key');
      
      // Cloudinary
      values.cloudinaryCloudName ? localStorage.setItem('image.cloudinary.cloud_name', values.cloudinaryCloudName) : localStorage.removeItem('image.cloudinary.cloud_name');
      values.cloudinaryApiKey ? localStorage.setItem('image.cloudinary.api_key', values.cloudinaryApiKey) : localStorage.removeItem('image.cloudinary.api_key');


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
          Configure your preferred AI and Image providers. These settings are saved in your
          browser.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Accordion
            type="multiple"
            className="w-full space-y-4"
            defaultValue={['ai-apis']}
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
                        value={field.value}
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
                      <FormLabel>API Key (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Overrides key from .env.local"
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
            
            <AccordionItem value="image-apis" className="border rounded-lg px-4">
               <AccordionTrigger className="font-semibold">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Image APIs (Optional)
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                    Provide API keys to fetch images automatically based on AI suggestions. The app will try providers in order.
                </p>
                <FormField
                  control={form.control}
                  name="unsplashApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unsplash Access Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your Unsplash access key" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pexelsApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pexels API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your Pexels API key" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pixabayApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pixabay API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your Pixabay API key" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="bingApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bing Image Search API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your Bing Search API key" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <Separator />
                 <h4 className="font-medium">Advanced</h4>
                 <FormField
                  control={form.control}
                  name="cloudinaryCloudName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cloudinary Cloud Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Cloudinary cloud name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="cloudinaryApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cloudinary API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Your Cloudinary API key" {...field} />
                      </FormControl>
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
