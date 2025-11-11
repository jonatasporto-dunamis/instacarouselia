
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

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

const formSchema = z.object({
  topic: z.string().min(3, {
    message: 'Topic must be at least 3 characters long.',
  }).max(100, {
    message: 'Topic must be 100 characters or less.',
  }),
});

type TopicFormProps = {
  onGenerate: (topic: string) => void;
  isGenerating: boolean;
};

export function TopicForm({ onGenerate, isGenerating }: TopicFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onGenerate(values.topic);
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold font-headline">Create Your Carousel</h2>
        <p className="text-muted-foreground">
          Enter a topic and let our AI do the magic.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carousel Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Benefits of morning workouts'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? (
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
