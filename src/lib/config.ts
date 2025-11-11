// IMPORTANT: This file is used to store client-side configuration.
// Do not add any server-side secrets here.

/**
 * The public client ID for your Meta (Facebook/Instagram) App.
 * This is used to initiate the OAuth login flow.
 *
 * TODO: Replace this with your actual Meta App ID. You can get this from the Meta for Developers dashboard.
 */
export const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID || 'YOUR_META_APP_ID_HERE';

/**
 * The URL where Meta will redirect the user after they authorize the app.
 * This MUST match one of the "Valid OAuth Redirect URIs" in your Meta App settings.
 *
 * For local development, it will likely be 'http://localhost:9002/api/auth/meta/callback'.
 * For production, it will be 'https://your-app-domain.com/api/auth/meta/callback'.
 */
export const META_REDIRECT_URI = process.env.NEXT_PUBLIC_META_REDIRECT_URI || 'http://localhost:9002/api/auth/meta/callback';
