
'use client'; // Functions in this file might be called from client components.

import { META_APP_ID, META_REDIRECT_URI } from "./config";

// NOTE: A full, secure implementation requires a server-side component (API route)
// to handle token exchange and API calls. These functions are placeholders for that logic.


/**
 * Initiates the Meta OAuth flow by redirecting the user to the Facebook login dialog.
 * This is the first step in connecting a user's Instagram account.
 * 
 * THIS IS NOW HANDLED BY the /api/meta/connect server route.
 * This function is kept for reference but should not be used directly for the initial connection.
 */
export function connectMetaAccount() {
  // This logic is now on the server-side at /api/meta/connect
  console.warn("connectMetaAccount is deprecated for initial connection. Use a link to /api/meta/connect instead.");
  
  if (!META_APP_ID || META_APP_ID === 'YOUR_META_APP_ID_HERE') {
    alert('Error: Meta App ID is not configured. Please add it to src/lib/config.ts');
    return;
  }
  
  const requiredPermissions = 'instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement';
  
  const dialogUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(META_REDIRECT_URI)}&scope=${requiredPermissions}&response_type=code`;

  window.location.href = dialogUrl;
}


/**
 * Placeholder function to fetch Instagram insights.
 *
 * @param {string} accessToken - The user's stored access token.
 * @param {string} instagramAccountId - The user's Instagram Business Account ID.
 * @returns {Promise<object>} - A promise that resolves to the insights data.
 */
export async function fetchInstagramInsights(accessToken: string, instagramAccountId: string): Promise<any> {
  // TODO: Implement the call to the Meta Graph API.
  // This would typically be done in a server-side API route for security.
  // Example endpoint: `https://graph.facebook.com/${instagramAccountId}?fields=followers_count,engagement&access_token=${accessToken}`
  console.log('Fetching insights for account:', instagramAccountId);
  
  if (!accessToken) {
    throw new Error('User is not authenticated with Meta.');
  }
  
  // This is mock data. A real implementation would fetch from the API.
  const mockInsights = {
    followers_count: 12345,
    engagement: 3.4,
  };
  
  return Promise.resolve(mockInsights);
}

/**
 * Placeholder function to fetch a user's top-performing posts.
 *
 * @param {string} accessToken - The user's stored access token.
 * @param {string} instagramAccountId - The user's Instagram Business Account ID.
 * @returns {Promise<Array<object>>} - A promise that resolves to a list of top posts.
 */
export async function fetchTopPosts(accessToken: string, instagramAccountId: string): Promise<any[]> {
    // TODO: Implement the call to the Meta Graph API.
    // Example endpoint: `https://graph.facebook.com/${instagramAccountId}/media?fields=like_count,comments_count,media_url,caption&access_token=${accessToken}`
    console.log('Fetching top posts for account:', instagramAccountId);
    return Promise.resolve([]);
}

/**
 * Placeholder function to publish a carousel to Instagram.
 *
 * @param {string} accessToken - The user's stored access token.
 * @param {string} instagramAccountId - The user's Instagram Business Account ID.
 * @param {Array<string>} slideImageUrls - An array of publicly accessible URLs for the slide images.
 * @param {string} caption - The caption for the carousel.
 * @returns {Promise<string>} - A promise that resolves to the ID of the published post.
 */
export async function publishToInstagram(accessToken: string, instagramAccountId: string, slideImageUrls: string[], caption: string): Promise<string> {
    // TODO: This is a complex multi-step process:
    // 1. For each image URL, upload it to Instagram's servers to get a container ID.
    // 2. Once all images are uploaded, create a carousel container with all the container IDs.
    // 3. Publish the final carousel container.
    // This entire flow must be managed on the server side.
    console.log('Publishing carousel to account:', instagramAccountId, { slideImageUrls, caption });
    
    // Returning a mock publication ID
    return Promise.resolve('mock_publication_id_12345');
}
