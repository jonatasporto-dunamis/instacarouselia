
export type SlideData = {
  id: string;
  title: string;
  content: string;
  imagePrompt?: string;
  imageUrl?: string;
  imageHint?: string;
  layout: TemplateId;
};

export type TemplateId =
  | 'classic'
  | 'image-top'
  | 'image-right'
  | 'full-bleed'
  | 'minimal'
  | 'headline';

export type TemplateDef = {
  id: TemplateId;
  name: string;
  description?: string;
  render: (props: { data: SlideData }) => JSX.Element;
};
