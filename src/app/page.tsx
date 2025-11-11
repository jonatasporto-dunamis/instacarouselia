
import { Button } from '@/components/ui/button';
import { Header } from '@/components/app/header';
import { Presentation } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                    Gerador de Conteúdo IA
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Crie Carrosséis para Instagram em Segundos com{' '}
                    <span className="text-primary">DunamisPost</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Nossa IA transforma seus tópicos em carrosséis de 8 slides com copywriting de alta conversão, prontos para engajar seu público.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Comece Grátis Agora
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard">
                      Ver a Ferramenta
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <Presentation className="h-48 w-48 text-primary/20" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
