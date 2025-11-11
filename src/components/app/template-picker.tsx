
'use client';

import { getAllTemplates } from '@/lib/templates/registry';
import type { TemplateId } from '@/lib/templates/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CheckCircle2 } from 'lucide-react';

type TemplatePickerProps = {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
};

export function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  const templates = getAllTemplates();

  return (
    <TooltipProvider>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {templates.map(template => (
          <Tooltip key={template.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onChange(template.id)}
                className={cn(
                  'relative aspect-square w-full rounded-md border-2 bg-muted transition-colors hover:border-primary/80',
                  value === template.id
                    ? 'border-primary'
                    : 'border-muted'
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold capitalize text-muted-foreground">{template.name}</span>
                </div>
                {value === template.id && (
                  <div className="absolute -top-1.5 -right-1.5 bg-background rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm font-semibold">{template.name}</p>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
