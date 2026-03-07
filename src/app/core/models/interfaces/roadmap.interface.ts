interface IRoadmapSection {
  title: string;
  items: string[];
}

export interface IRoadmapConfig {
  currentFeatures: IRoadmapSection;
  inProgress: IRoadmapSection;
  planned: IRoadmapSection;
}
