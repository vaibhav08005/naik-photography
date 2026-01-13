export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface ScrollState {
  scrollY: number;
  progress: number;
}
