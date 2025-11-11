
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
 * Fetches Instagram insights for a given account.
 *
 * @param {string} accessToken - The user's stored access token.
 * @param {string} instagramAccountId - The user's Instagram Business Account ID.
 * @returns {Promise<any>} - A promise that resolves to the insights data.
 */
export async function fetchInstagramInsights(accessToken: string, instagramAccountId: string): Promise<any> {
    const response = await fetch(
        `https://graph.facebook.com/v20.0/${instagramAccountId}/insights?metric=impressions,reach,engagement,followers_count&period=day&access_token=${accessToken}`
    );
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message || 'Failed to fetch insights.');
    }
    return await response.json();
}

/**
 * Fetches a user's most recent media.
 *
 * @param {string} accessToken - The user's stored access token.
 * @param {string} instagramAccountId - The user's Instagram Business Account ID.
 * @returns {Promise<any[]>} - A promise that resolves to a list of top posts.
 */
export async function fetchTopPosts(accessToken: string, instagramAccountId: string): Promise<any[]> {
    const response = await fetch(
        `https://graph.facebook.com/v20.0/${instagramAccountId}/media?fields=id,caption,like_count,comments_count,media_url,permalink&access_token=${accessToken}`
    );
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message || 'Failed to fetch posts.');
    }
    const data = await response.json();
    return data.data?.slice(0, 5) || [];
}

/**
 * Publishes a single image post to Instagram.
 * NOTE: This is a simplified version. A full carousel publication is a multi-step process.
 *
 * @param {string} accessToken - The user's stored access token.
 * @param {string} instagramAccountId - The user's Instagram Business Account ID.
 * @param {string[]} slideImageUrls - An array of publicly accessible URLs for the slide images. Only the first is used.
 * @param {string} caption - The caption for the post.
 * @returns {Promise<any>} - A promise that resolves to the publication response.
 */
export async function publishToInstagram(accessToken: string, instagramAccountId: string, slideImageUrls: string[], caption: string): Promise<any> {
    const imageUrl = slideImageUrls[0];
    if (!imageUrl) {
        throw new Error('No image URL provided for publication.');
    }

    // 1. Create a media container for the image
    const createContainerResponse = await fetch(
        `https://graph.facebook.com/v20.0/${instagramAccountId}/media?image_url=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(caption)}&access_token=${accessToken}`,
        { method: "POST" }
    );
    if (!createContainerResponse.ok) {
        const error = await createContainerResponse.json();
        throw new Error(error.error.message || 'Failed to create media container.');
    }
    const { id: creationId } = await createContainerResponse.json();
    if (!creationId) {
        throw new Error('Media container creation did not return an ID.');
    }

    // 2. Publish the container
    const publishResponse = await fetch(
        `https://graph.facebook.com/v20.0/${instagramAccountId}/media_publish?creation_id=${creationId}&access_token=${accessToken}`,
        { method: "POST" }
    );

    if (!publishResponse.ok) {
        const error = await publishResponse.json();
        throw new Error(error.error.message || 'Failed to publish media.');
    }

    return await publishResponse.json();
}
