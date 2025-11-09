import { Presentation } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-center sm:justify-start gap-3 p-4 border-b bg-card/50">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Presentation className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-foreground font-headline">
        InstaCarousel<span className="text-primary">AI</span>
      </h1>
    </header>
  );
}
