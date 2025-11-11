
'use server';

import type { ImageProvider } from './types';

type FallbackImageResult = {
  imageUrl: string;
  provider: 'unsplash-source' | 'picsum' | 'gradient';
  altText: string;
};

type GetSmartFallbackImageParams = {
  query: string;
  width?: number;
  height?: number;
  gradientsOnly?: boolean;
};

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function generateGradientSvg(query: string): string {
  const hash = hashCode(query);
  const angle = hash % 360;
  
  // Use brand colors
  const color1 = '#2AD66F'; // brand.primary
  const color2 = '#222222'; // brand.dark

  const svg = `
    <svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle})">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}


export async function getSmartFallbackImage({
  query,
  width = 1080,
  height = 1080,
  gradientsOnly = false,
}: GetSmartFallbackImageParams): Promise<{ imageUrl: string; provider: ImageProvider, altText: string }> {

  const safeQuery = encodeURIComponent(query.replace(/-/g, ' '));
  const slug = slugify(query);

  const candidates: FallbackImageResult[] = [
    {
      imageUrl: `https://source.unsplash.com/featured/${width}x${height}?${safeQuery}`,
      provider: 'unsplash-source',
      altText: `Unsplash Source image for: ${query}`,
    },
    {
      imageUrl: `https://picsum.photos/seed/${slug}/${width}/${height}`,
      provider: 'picsum',
      altText: `Picsum placeholder for: ${query}`,
    },
    {
      imageUrl: generateGradientSvg(query),
      provider: 'gradient',
      altText: 'Themed gradient background',
    },
  ];

  if (gradientsOnly) {
    return candidates[2];
  }

  // In a server environment, we could try to HEAD the URLs to see if they resolve.
  // For simplicity here, we'll just prefer Unsplash Source, assuming it works.
  // A robust implementation would check for redirect errors from Unsplash.
  return candidates[0];
}
