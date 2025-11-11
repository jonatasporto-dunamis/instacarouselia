
import { CarouselGenerator } from '@/components/app/carousel-generator';
import { Header } from '@/components/app/header';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <CarouselGenerator />
      </main>
    </div>
  );
}
