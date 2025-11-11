
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Users, BarChart3, Heart, MessageCircle, Loader2, ExternalLink } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import Link from 'next/link';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { fetchInstagramInsights, fetchTopPostsByMetric } from '@/lib/meta';
import { Skeleton } from '@/components/ui/skeleton';
import { subDays } from 'date-fns';

type Metric = 'like_count' | 'comments_count' | 'engagement' | 'reach';
type Period = '7' | '30' | '90';

interface InstagramProfile {
  id: string;
  accessToken: string;
  instagramAccountId: string;
  username: string;
}

interface Insights {
  followers_count: number;
  engagement_rate: number; // This will be calculated
}

interface Post {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  like_count: number;
  comments_count: number;
  reach: number;
  engagement: number;
}

function PerformancePostCard({ post }: { post: Post }) {
    return (
        <Card className="overflow-hidden flex flex-col">
            <div className="aspect-square relative bg-muted">
                {post.media_url && (
                  <Image src={post.media_url} alt={`Post by ${post.caption?.substring(0, 30)}`} fill className="object-cover" />
                )}
            </div>
            <CardContent className="p-4 flex-grow space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.caption || 'Sem legenda'}
                </p>
                <div className="flex justify-between items-center text-sm font-medium">
                     <div className="flex items-center gap-1.5" title="Curtidas">
                        <Heart className="w-4 h-4 text-pink-500" /> <span>{post.like_count.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Comentários">
                        <MessageCircle className="w-4 h-4 text-sky-500" /> <span>{post.comments_count.toLocaleString('pt-BR')}</span>
                    </div>
                     <div className="flex items-center gap-1.5" title="Alcance">
                        <BarChart3 className="w-4 h-4 text-indigo-500" /> <span>{post.reach.toLocaleString('pt-BR')}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                 <Button variant="outline" className="w-full" asChild>
                    <Link href={post.permalink} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" /> Ver no Instagram
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(2)].map((_, i) => (
            <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </CardContent>
            </Card>
        ))}
      </div>
      <div>
        <h3 className="text-2xl font-bold font-headline mb-4">📈 Posts de Melhor Desempenho</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-full" />
              </div>
               <div className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


function ConnectedView({ profile }: { profile: InstagramProfile }) {
    const [insights, setInsights] = useState<Insights | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [period, setPeriod] = useState<Period>('30');
    const [metric, setMetric] = useState<Metric>('engagement');

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch general insights and top posts in parallel
                const [insightsData, postsData] = await Promise.all([
                    fetchInstagramInsights(profile.accessToken, profile.instagramAccountId),
                    fetchTopPostsByMetric(
                        profile.accessToken, 
                        profile.instagramAccountId,
                        subDays(new Date(), parseInt(period)),
                        new Date()
                    )
                ]);
                
                const followers = insightsData.data?.find((d:any) => d.name === 'followers_count')?.values.pop()?.value || 0;
                
                setInsights({
                    followers_count: followers,
                    engagement_rate: 3.4, // Placeholder, rate calculation is complex
                });

                setPosts(postsData);

            } catch (e: any) {
                console.error("Failed to fetch Instagram data:", e);
                setError(e.message || 'Falha ao buscar dados do Instagram. Tente reconectar sua conta.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [profile, period]); // Refetch when profile or period changes

    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => b[metric] - a[metric]);
    }, [posts, metric]);


    if (isLoading && posts.length === 0) { // Show initial loading state only on first load
        return <LoadingState />;
    }

    if (error) {
        return (
             <Card>
                <CardContent className="p-6 text-center">
                    <Instagram className="mx-auto h-12 w-12 text-destructive mb-4" />
                    <h2 className="text-xl font-semibold font-headline mb-2 text-destructive">Erro ao carregar dados</h2>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button asChild variant="destructive">
                        <Link href="/api/meta/connect" prefetch={false}>
                            <Instagram className="mr-2 h-4 w-4" />
                            Reconectar com Instagram
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Seguidores</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(insights?.followers_count || 0).toLocaleString('pt-BR')}</div>
                        {/* <p className="text-xs text-muted-foreground">+201 na última semana</p> */}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{insights?.engagement_rate || 0}%</div>
                        {/* <p className="text-xs text-muted-foreground">Média do seu nicho: 2.8%</p> */}
                    </CardContent>
                </Card>
            </div>
             <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                    <h3 className="text-2xl font-bold font-headline">📈 Posts de Melhor Desempenho</h3>
                     <div className="flex items-center gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="period">Período</Label>
                             <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
                                <SelectTrigger className="w-full md:w-[150px]" id="period">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-1.5">
                            <Label htmlFor="metric">Ordenar por</Label>
                            <Select value={metric} onValueChange={(v) => setMetric(v as Metric)}>
                                <SelectTrigger className="w-full md:w-[150px]" id="metric">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="engagement">Engajamento</SelectItem>
                                    <SelectItem value="reach">Alcance</SelectItem>
                                    <SelectItem value="like_count">Curtidas</SelectItem>
                                    <SelectItem value="comments_count">Comentários</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                         {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                     </div>
                </div>

                 {sortedPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sortedPosts.map(post => <PerformancePostCard key={post.id} post={post} />)}
                    </div>
                 ) : (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <Instagram className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h2 className="text-xl font-semibold">Nenhum post encontrado</h2>
                            <p className="text-muted-foreground">
                                Nenhum post foi encontrado no período selecionado. Tente ajustar os filtros.
                            </p>
                        </CardContent>
                    </Card>
                 )}
            </div>
        </div>
    )
}

function DisconnectedView() {
    return (
        <Card>
            <CardContent className="p-6 text-center">
                <Instagram className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold font-headline mb-2">Conecte seu perfil do Instagram</h2>
                <p className="text-muted-foreground mb-4">
                    Conecte sua conta para ver métricas de performance, analisar concorrentes e postar direto da plataforma.
                </p>
                <Button asChild>
                  <Link href="/api/meta/connect" prefetch={false}>
                    <Instagram className="mr-2 h-4 w-4" />
                    Conectar com Instagram
                  </Link>
                </Button>
            </CardContent>
        </Card>
    )
}


export function InstagramDashboard() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const profileDocRef = useMemoFirebase(() => {
        if (!user) return null;
        // The document ID for the profile is the same as the user's UID
        return doc(firestore, 'users', user.uid, 'instagramProfile', user.uid);
    }, [user, firestore]);
    
    const { data: profile, isLoading: isProfileLoading } = useDoc<InstagramProfile>(profileDocRef);

    if (isUserLoading || isProfileLoading) {
        return <LoadingState />;
    }

    // Check if the user is logged in and has connected their Instagram profile
    const isConnected = !!user && !!profile;

    return isConnected ? <ConnectedView profile={profile} /> : <DisconnectedView />;
}
