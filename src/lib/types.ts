import type { TemplateId } from "./templates/types";

export type Layout = TemplateId;

export type ImageProvider =
  | 'unsplash'
  | 'pexels'
  | 'pixabay'
  | 'bing'
  | 'picsum'
  | 'unsplash-source'
  | 'gradient'
  | 'none';


export type Slide = {
  id: string;
  title: string;
  content: string;
  imagePrompt?: string;
  imageUrl?: string;
  imageHint?: string;
  imageProvider?: ImageProvider;
  layout?: Layout;
};
