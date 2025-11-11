import { Button } from '@/components/ui/button';
import { Header } from '@/components/app/header';
import { ArrowRight, Bot, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'Geração com IA',
    description: 'Crie 8 slides de carrossel com copy de alta conversão a partir de um único tópico.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-8 h-8 text-primary"
      >
        <path d="M12 12v-2" />
        <path d="M15 15.5V14a2 2 0 00-2-2h-2a2 2 0 00-2 2v1.5" />
        <path d="M12 12v-2" />
        <path d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
        <path d="M12 12v-2" />
      </svg>
    ),
    title: 'Análise de Performance',
    description: 'Monitore métricas de engajamento para entender o que ressoa com seu público.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="w-8 h-8 text-primary"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 3v18" />
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
      </svg>
    ),
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

const faqs = [
    {
        question: "Como a IA funciona para criar os carrosséis?",
        answer: "Nossa IA foi treinada por especialistas em copywriting e marketing digital. Você fornece um tópico, e ela gera uma estrutura de 8 slides com títulos, conteúdo e sugestões de imagem, seguindo as melhores práticas para engajamento no Instagram."
    },
    {
        question: "Preciso ter uma conta do Instagram para usar?",
        answer: "Você pode gerar e editar carrosséis sem conectar sua conta. No entanto, para publicar diretamente e analisar métricas de performance, a conexão com seu perfil do Instagram é necessária."
    },
    {
        question: "O Dunamis Post é gratuito?",
        answer: "Oferecemos um plano gratuito robusto para você começar, com um limite generoso de gerações e análises. Também teremos planos pagos com funcionalidades avançadas para profissionais e agências."
    },
    {
        question: "Posso personalizar os templates e a identidade da marca?",
        answer: "Sim! Você pode configurar as cores, fontes e o tom de voz da sua marca para garantir que todo conteúdo gerado esteja alinhado com sua identidade visual e verbal."
    }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card/50">
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
                    Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                 <p className="text-xs text-muted-foreground mt-4">Não precisa de cartão de crédito.</p>
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
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
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

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
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
                            <Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" />
                        </div>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
            <div className="container px-4 md:px-6 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Perguntas Frequentes</h2>
                    <p className="mt-4 text-muted-foreground">Tudo o que você precisa saber antes de começar.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                         <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>


        {/* Final CTA Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Pronto para otimizar seu conteúdo?
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Crie sua conta gratuita e comece a gerar carrosséis que convertem em minutos.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50">
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
