import { Button } from '@/components/ui/button';
import { Header } from '@/components/app/header';
import { CheckCircle, ArrowRight, MessageSquare, BarChart2, Bot, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'Geração com IA',
    description: 'Crie 8 slides de carrossel com copy de alta conversão a partir de um único tópico.',
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-primary" />,
    title: 'Análise de Performance',
    description: 'Monitore métricas de engajamento para entender o que ressoa com seu público.',
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: 'Templates Prontos',
    description: 'Escolha entre layouts profissionais para garantir um design atraente e consistente.',
  },
];

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Social Media Manager',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    text: '“O Dunamis Post economizou horas do meu dia. A IA gera um primeiro rascunho de carrossel que é 90% do caminho andado. Incrível!”',
  },
  {
    name: 'Carlos Mendes',
    role: 'Empreendedor Digital',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    text: '“Desde que comecei a usar os carrosséis gerados aqui, meu engajamento triplicou. A qualidade do copy é de outro nível.”',
  },
   {
    name: 'Juliana Costa',
    role: 'Infoprodutora',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    text: '“A análise de concorrentes me dá insights valiosos para criar conteúdo que se destaca. É minha ferramenta secreta.”',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-dg-gradient bg-clip-text text-transparent">
                Transforme ideias em carrosséis que vendem 📈
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Use inteligência artificial e dados do Instagram para criar conteúdo que gera resultados de verdade.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-brand-accent text-primary-foreground">
                  <Link href="/signup">
                    Teste Grátis Agora <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section id="preview" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Sua Máquina de Conteúdo Inteligente</h2>
                    <p className="mt-4 text-muted-foreground">Veja como é fácil criar, analisar e publicar em uma única plataforma.</p>
                </div>
                <Card className="shadow-brand-soft">
                    <CardContent className="p-2">
                         <Image
                            src="https://placehold.co/1200x750/E8FFF2/222222?text=Print+da+Ferramenta"
                            alt="Preview da plataforma Dunamis Post"
                            width={1200}
                            height={750}
                            className="rounded-lg"
                        />
                    </CardContent>
                </Card>
            </div>
        </section>


        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                        {feature.icon}
                    </div>
                  <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/* Benefits Section */}
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Resultados Reais
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Menos tempo criando, mais tempo vendendo</h2>
                <p className="text-muted-foreground">
                  O Dunamis Post não é apenas um gerador de conteúdo. É uma ferramenta estratégica para quem quer transformar o Instagram em um canal de vendas previsível.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-6 w-6 mt-1 text-primary" />
                    <div>
                      <h4 className="font-semibold">Economize horas, não minutos</h4>
                      <p className="text-muted-foreground text-sm">Elimine o bloqueio criativo e automatize a criação de rascunhos de alta qualidade.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-6 w-6 mt-1 text-primary" />
                     <div>
                      <h4 className="font-semibold">Publique com consistência</h4>
                      <p className="text-muted-foreground text-sm">Mantenha seu perfil ativo com conteúdo relevante sem esforço.</p>
                    </div>
                  </li>
                   <li className="flex items-start">
                    <CheckCircle className="mr-3 h-6 w-6 mt-1 text-primary" />
                    <div>
                      <h4 className="font-semibold">Aumente seu engajamento</h4>
                      <p className="text-muted-foreground text-sm">Crie posts que seu público realmente quer salvar e compartilhar.</p>
                    </div>
                  </li>
                </ul>
              </div>
               <Image
                src="https://placehold.co/550x550/222222/2AD66F?text=Exemplos+de+Post"
                width="550"
                height="550"
                alt="Exemplos de posts gerados pela IA"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Amado por quem cria e vende</h2>
                <p className="mt-4 text-muted-foreground">Veja o que nossos usuários estão dizendo.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                  <CardContent className="p-6 flex-grow">
                     <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </CardContent>
                   <div className="p-6 pt-0">
                        <div className="flex text-yellow-400">
                            <Star /><Star /><Star /><Star /><Star />
                        </div>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container px-4 md:px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Dunamis Post. Todos os direitos reservados.</p>
             <div className="flex gap-4 mt-4 sm:mt-0">
                <Link href="#" className="hover:text-primary">Termos de Serviço</Link>
                <Link href="#" className="hover:text-primary">Política de Privacidade</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
