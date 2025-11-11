
'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GalleryHorizontal, PlusCircle } from 'lucide-react';
import { AppLayout } from '@/components/app/app-layout';

// Assuming Carousel type from a central types file
interface Carousel {
  id: string;
  topic: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

function CarouselCard({ carousel }: { carousel: Carousel }) {
    const createdAtDate = carousel.createdAt ? new Date(carousel.createdAt.seconds * 1000) : new Date();
    const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true, locale: ptBR });

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg truncate">{carousel.topic || 'Untitled Carousel'}</CardTitle>
        <CardDescription>Created {timeAgo}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-[4/5] bg-muted rounded-md flex items-center justify-center">
            <GalleryHorizontal className="w-12 h-12 text-muted-foreground/50"/>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/editor/${carousel.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function LoadingSkeleton() {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex-grow">
                 <Skeleton className="aspect-[4/5] w-full" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}


export default function MyCarouselsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const carouselsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, `users/${user.uid}/carousels`),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const { data: carousels, isLoading } = useCollection<Carousel>(carouselsQuery);

  return (
    <AppLayout>
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">My Carousels</h1>
        <Button asChild>
            <Link href="/dashboard">
            <PlusCircle className="mr-2" /> Create New
            </Link>
        </Button>
        </div>

        {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
        )}

        {!isLoading && carousels && carousels.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carousels.map(carousel => (
            <CarouselCard key={carousel.id} carousel={carousel} />
            ))}
        </div>
        )}

        {!isLoading && (!carousels || carousels.length === 0) && (
        <Card className="col-span-full mt-10">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                <GalleryHorizontal className="w-16 h-16 text-muted-foreground/50 mb-4"/>
                <h2 className="text-xl font-semibold mb-2">No Carousels Yet</h2>
                <p className="text-muted-foreground mb-4">You haven't created any carousels. Let's make one!</p>
                <Button asChild>
                    <Link href="/dashboard">Create your first carousel</Link>
                </Button>
            </CardContent>
        </Card>
        )}
    </AppLayout>
  );
}

    