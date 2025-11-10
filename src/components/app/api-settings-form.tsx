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
import { Save, BrainCircuit, ImageIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const apiSettingsSchema = z.object({
  geminiApiKey: z.string().optional(),
  gptApiKey: z.string().optional(),
  grokApiKey: z.string().optional(),
  qwenApiKey: z.string().optional(),
  deepseekApiKey: z.string().optional(),
  pixabayApiKey: z.string().optional(),
  pexelsApiKey: z.string().optional(),
  unsplashApiKey: z.string().optional(),
  cloudinaryApiKey: z.string().optional(),
  bingImagesApiKey: z.string().optional(),
});

export function ApiSettingsForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof apiSettingsSchema>>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      geminiApiKey: '',
      gptApiKey: '',
      grokApiKey: '',
      qwenApiKey: '',
      deepseekApiKey: '',
      pixabayApiKey: '',
      pexelsApiKey: '',
      unsplashApiKey: '',
      cloudinaryApiKey: '',
      bingImagesApiKey: '',
    },
  });

  function onSubmit(values: z.infer<typeof apiSettingsSchema>) {
    console.log(values);
    toast({
      title: 'API Settings Saved',
      description: 'Your API keys have been configured.',
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
          <Accordion type="multiple" className="w-full space-y-4">
            <AccordionItem value="ai-apis" className="border rounded-lg px-4">
              <AccordionTrigger className="font-semibold">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5" />
                  AI APIs
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="geminiApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gemini API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your Gemini key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gptApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPT (OpenAI) API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your OpenAI key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grokApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grok API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your Grok key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="qwenApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qwen API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your Qwen key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="deepseekApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DeepSeek API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your DeepSeek key" {...field} />
                      </FormControl>
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
                  Image APIs
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="pixabayApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pixabay API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your Pixabay key" {...field} />
                      </FormControl>
                       <FormDescription>
                        Picsum does not require an API key.
                      </FormDescription>
                      <FormMessage />
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
                        <Input type="password" placeholder="Enter your Pexels key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unsplashApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unsplash API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your Unsplash key" {...field} />
                      </FormControl>
                      <FormMessage />
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
                        <Input type="password" placeholder="Enter your Cloudinary key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="bingImagesApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bing Images API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your Bing Images key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save API Keys
          </Button>
        </form>
      </Form>
    </div>
  );
}
