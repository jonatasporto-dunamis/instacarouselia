
'use client';

import { CarouselGenerator } from '@/components/app/carousel-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { Instagram, Users, BarChart3, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { AppLayout } from '@/components/app/app-layout';

const mockStats = {
  followers: 12543,
  engagement: '3.4%',
  recentPosts: [
    { id: 1, views: 10200, likes: 512, comments: 34, imageUrl: 'https://placehold.co/400x500/E8FFF2/222222?text=Post+1' },
    { id: 2, views: 8900, likes: 430, comments: 22, imageUrl: 'https://placehold.co/400x500/E8FFF2/222222?text=Post+2' },
    { id: 3, views: 15400, likes: 890, comments: 76, imageUrl: 'https://placehold.co/400x500/E8FFF2/222222?text=Post+3' },
  ]
}


function InstagramDashboard() {
    const { user } = useUser();
    // In a real scenario, this would be a state like `const [isConnected, setIsConnected] = useState(false);`
    // and would be determined by checking if we have a valid Meta API token for the user in Firestore.
    const isConnected = false; 

    if (!isConnected) {
        return (
            <Card className="mb-8">
                <CardContent className="p-6 text-center">
                    <Instagram className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold font-headline mb-2">Conecte seu perfil do Instagram</h2>
                    <p className="text-muted-foreground mb-4">
                        Conecte sua conta para ver métricas de performance, analisar concorrentes e postar direto da plataforma.
                    </p>
                    <Button>
                        <Instagram className="mr-2 h-4 w-4" />
                        Conectar com Instagram
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="mb-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Seguidores</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.followers.toLocaleString('pt-BR')}</div>
                        <p className="text-xs text-muted-foreground">+201 na última semana</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engajamento (30 dias)</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockStats.engagement}</div>
                        <p className="text-xs text-muted-foreground">Média do seu nicho: 2.8%</p>
                    </CardContent>
                </Card>
            </div>
             <div>
                <h3 className="text-lg font-semibold font-headline mb-4">Posts Recentes</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {mockStats.recentPosts.map(post => (
                        <Card key={post.id} className="overflow-hidden">
                            <div className="aspect-[4/5] relative bg-muted">
                                <img src={post.imageUrl} alt={`Post ${post.id}`} className="object-cover w-full h-full" />
                            </div>
                            <div className="p-4 text-sm">
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-4 h-4"/> <span>{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4"/> <span>{post.comments}</span>
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


export default function DashboardPage() {
  return (
    <AppLayout>
        <InstagramDashboard />
        <CarouselGenerator />
    </AppLayout>
  );
}
