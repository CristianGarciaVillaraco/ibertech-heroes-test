import { EPublisher } from '../enums/publisher.enum';

export interface IFileManager {
  imgBg: string;
  imgHero?: string;
  imgFA: string;
}

export interface IOriginators {}

export interface IPowerStats {
  strength: number;      // Fuerza       0-100
  speed: number;         // Velocidad     0-100
  intelligence: number;  // Inteligencia  0-100
  durability: number;    // Durabilidad   0-100
  combat: number;        // Combate       0-100
  power: number;         // Poder         0-100
}

export const DEFAULT_POWER_STATS: IPowerStats = {
  strength: 50,
  speed: 50,
  intelligence: 50,
  durability: 50,
  combat: 50,
  power: 50,
};

export interface IHero {
  id: string;
  key: string;
  superhero: string;
  publisher: EPublisher;
  alterEgo: string;
  firstAppearance: string;
  characters: string[];
  originators: string[];
  description: string;
  fileManager?: IFileManager;
  powerStats?: IPowerStats;
}

export interface IHeroFilters {
  superhero?: string;
  publisher?: EPublisher | 'all';
  alterEgo?: string;
  originator?: string;
  searchTerm?: string;
}
