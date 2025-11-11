
'use server';

export type ImageProvider =
  | 'unsplash'
  | 'pexels'
  | 'pixabay'
  | 'bing'
  | 'picsum';

export type ApiKeys = {
  unsplash?: string;
  pexels?: string;
  pixabay?: string;
  bing?: string;
};

export type ImageResult = {
  imageUrl: string;
  altText: string;
  provider: ImageProvider | 'none';
};

const PROVIDER_ORDER: ImageProvider[] = ['unsplash', 'pexels', 'pixabay', 'bing'];

// --- Individual Provider Fetchers ---

async function fetchUnsplashImage(
  query: string,
  apiKey: string
): Promise<ImageResult | null> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${apiKey}`
    );
    if (!response.ok) {
        console.error(`Unsplash API error: ${response.statusText}`);
        return null;
    }
    const data = await response.json();
    const image = data.results?.[0];
    if (image) {
      return {
        imageUrl: image.urls.regular,
        altText: image.alt_description || query,
        provider: 'unsplash',
      };
    }
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
  }
  return null;
}

async function fetchPexelsImage(
  query: string,
  apiKey: string
): Promise<ImageResult | null> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      { headers: { Authorization: apiKey } }
    );
    if (!response.ok) {
        console.error(`Pexels API error: ${response.statusText}`);
        return null;
    }
    const data = await response.json();
    const image = data.photos?.[0];
    if (image) {
      return {
        imageUrl: image.src.large,
        altText: image.alt || query,
        provider: 'pexels',
      };
    }
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
  }
  return null;
}

async function fetchPixabayImage(
  query: string,
  apiKey: string
): Promise<ImageResult | null> {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3` // Fetch 3 to find a suitable one
    );
     if (!response.ok) {
        console.error(`Pixabay API error: ${response.statusText}`);
        return null;
    }
    const data = await response.json();
    const image = data.hits?.[0];
    if (image) {
      return {
        imageUrl: image.largeImageURL,
        altText: image.tags || query,
        provider: 'pixabay',
      };
    }
  } catch (error) {
    console.error('Error fetching from Pixabay:', error);
  }
  return null;
}

async function fetchBingImage(
    query: string,
    apiKey: string
  ): Promise<ImageResult | null> {
    try {
      const response = await fetch(
        `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=1`,
        { headers: { 'Ocp-Apim-Subscription-Key': apiKey } }
      );
      if (!response.ok) {
        console.error(`Bing API error: ${response.statusText}`);
        return null;
      }
      const data = await response.json();
      const image = data.value?.[0];
      if (image) {
        return {
          imageUrl: image.contentUrl,
          altText: image.name || query,
          provider: 'bing',
        };
      }
    } catch (error) {
      console.error('Error fetching from Bing:', error);
    }
    return null;
}

function fetchPicsumImage(query: string): ImageResult {
    const seed = query.replace(/\s+/g, '');
    return {
        imageUrl: `https://picsum.photos/seed/${seed}/1080/1080`,
        altText: `Placeholder image for "${query}"`,
        provider: 'picsum',
    };
}


// --- Orchestrator Function ---

export async function findImage(
  query: string,
  apiKeys: ApiKeys
): Promise<ImageResult> {
  for (const provider of PROVIDER_ORDER) {
    const apiKey = apiKeys[provider];
    if (apiKey) {
      let result: ImageResult | null = null;
      console.log(`Attempting to fetch image from ${provider} for query: "${query}"`);

      switch (provider) {
        case 'unsplash':
          result = await fetchUnsplashImage(query, apiKey);
          break;
        case 'pexels':
          result = await fetchPexelsImage(query, apiKey);
          break;
        case 'pixabay':
          result = await fetchPixabayImage(query, apiKey);
          break;
        case 'bing':
            result = await fetchBingImage(query, apiKey);
            break;
      }

      if (result) {
        console.log(`Success! Found image from ${provider}.`);
        return result;
      } else {
        console.log(`No results from ${provider}, trying next...`);
      }
    }
  }

  console.log('All API providers failed or returned no results. Falling back to placeholder.');
  return fetchPicsumImage(query);
}
