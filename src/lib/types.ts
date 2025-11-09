export type Layout =
  | 'image-top'
  | 'image-bottom'
  | 'image-left'
  | 'image-right'
  | 'text-only';

export type Slide = {
  id: string;
  title: string;
  content: string;
  imagePrompt?: string;
  imageUrl?: string;
  imageHint?: string;
  layout: Layout;
};
