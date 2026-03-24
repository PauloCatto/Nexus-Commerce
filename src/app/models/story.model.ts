export interface StoryData {
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    image: string;
  };
  mission: { icon: string; title: string; description: string; };
  vision: { icon: string; title: string; description: string; };
  journey: {
    title: string;
    description: string;
    timeline: { year: string; title: string; description: string; }[];
  };
  quote: { text: string; author: string; };
}
