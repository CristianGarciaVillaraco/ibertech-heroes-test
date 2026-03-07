import { EPublisher } from '../enums/publisher.enum';

export interface IFileManager {
  imgBg: string;
  imgHero?: string;
  imgFA: string;
}

export interface IOriginators {}

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
}

export interface IHeroFilters {
  superhero?: string;
  publisher?: EPublisher | 'all';
  alterEgo?: string;
  originator?: string;
  searchTerm?: string;
}
