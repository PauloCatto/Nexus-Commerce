export interface ThemePreset {
  name: string;
  label: string;
  colors: {
    '--bg-primary': string;
    '--bg-secondary': string;
    '--bg-card': string;
    '--bg-hover': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--primary-color': string;
    '--primary-hover': string;
    '--glass-bg': string;
    '--border-color': string;
    '--primary-rgb': string;
  };
}

