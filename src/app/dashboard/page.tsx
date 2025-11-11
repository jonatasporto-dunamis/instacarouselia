
'use client';

import { CarouselGenerator } from '@/components/app/carousel-generator';
import { AppLayout } from '@/components/app/app-layout';
import { InstagramDashboard } from '@/components/app/instagram-dashboard';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <InstagramDashboard />
        <CarouselGenerator />
      </div>
    </AppLayout>
  );
}
