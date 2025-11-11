import { NextResponse } from 'next/server';

export async function GET() {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.NEXT_PUBLIC_META_REDIRECT_URI || 'http://localhost:9002/api/meta/callback';

  if (!appId || appId === 'YOUR_META_APP_ID_HERE') {
    return new NextResponse('Meta App ID is not configured in environment variables.', { status: 500 });
  }

  const scopes = [
    'instagram_basic',
    'instagram_content_publish',
    'pages_show_list',
    'pages_read_engagement',
  ].join(',');

  const authUrl = new URL('https://www.facebook.com/v20.0/dialog/oauth');
  authUrl.searchParams.append('client_id', appId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', scopes);
  authUrl.searchParams.append('response_type', 'code');

  return NextResponse.redirect(authUrl.toString());
}
