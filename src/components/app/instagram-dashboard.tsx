
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Users, BarChart3, Heart, MessageCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { fetchInstagramInsights, fetchTopPosts } from '@/lib/meta';
import { Skeleton } from '@/components/ui/skeleton';

// Define types for the data we expect
interface InstagramProfile {
  id: string;
  accessToken: string;
  instagramAccountId: string;
  username: string;
}

interface Insights {
  followers_count: number;
  engagement: number;
  reach: number;
  impressions: number;
}

interface Post {
  id: string;
  media_url: string;
  permalink: string;
  like_count: number;
  comments_count: number;
}


function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguidores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento (30 dias)</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-semibold font-headline mb-4">Posts Recentes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[4/5] w-full" />
              <div className="p-4">
                <Skeleton className="h-5 w-full" />
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
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                // In a real app, you might want to call these in parallel
                const insightsData = await fetchInstagramInsights(profile.accessToken, profile.instagramAccountId);
                const topPostsData = await fetchTopPosts(profile.accessToken, profile.instagramAccountId);
                
                // Process insights data (you might need to adjust this based on actual API response)
                const followers = insightsData.data?.find((d:any) => d.name === 'followers_count')?.values.pop()?.value || 0;
                
                setInsights({
                    followers_count: followers,
                    engagement: 3.4, // Placeholder, engagement rate needs calculation
                    reach: 0, // Placeholder
                    impressions: 0, // Placeholder
                });
                setPosts(topPostsData);

            } catch (e: any) {
                console.error("Failed to fetch Instagram data:", e);
                setError(e.message || 'Falha ao buscar dados do Instagram. Tente reconectar sua conta.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [profile]);

    if (isLoading) {
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
        <div className="space-y-6">
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
                        <CardTitle className="text-sm font-medium">Engajamento (30 dias)</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{insights?.engagement || 0}%</div>
                        {/* <p className="text-xs text-muted-foreground">Média do seu nicho: 2.8%</p> */}
                    </CardContent>
                </Card>
            </div>
             <div>
                <h3 className="text-lg font-semibold font-headline mb-4">Posts Recentes</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {posts?.map(post => (
                        <Card key={post.id} className="overflow-hidden">
                            <div className="aspect-[4/5] relative bg-muted">
                                {post.media_url && <Image src={post.media_url} alt={`Post ${post.id}`} fill className="object-cover w-full h-full" />}
                            </div>
                            <div className="p-4 text-sm">
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-4 h-4"/> <span>{post.like_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4"/> <span>{post.comments_count}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                 </div>
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

    