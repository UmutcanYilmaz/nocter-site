export type Note = {
  name: string;
  desc: string;
  type: string;
};

export type OlfactoryProfile = {
  top: Note[];
  heart: Note[];
  base: Note[];
};

export type Chapter = {
  id: number;
  subtitle: string;
  text: string;
  mood: string;
};

export type ProductTheme = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  gradient: string;
  particleColor: string;
};

export type ProductAssets = {
  image: string;
  texture: string;
};

export type ProductIdentity = {
  name: string;
  sku: string;
  tagline: string;
  year: string;
  batch: string;
  family: string;
  concentration: string;
  origin: string;
};

export interface Product {
  id: number;
  identity: ProductIdentity;
  assets: ProductAssets;
  palette: ProductTheme;
  narrative: Chapter[];
  olfactory: OlfactoryProfile;
  lifestyle: {
    outfit: string;
    drink: string;
    music: string;
    location: string;
    time: string;
  };
}
