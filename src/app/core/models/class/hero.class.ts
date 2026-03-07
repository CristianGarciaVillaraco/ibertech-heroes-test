import { EPublisher } from '../enums/publisher.enum';
import { IFileManager, IHero } from '../interfaces/hero.interface';

export class HeroModel implements IHero {
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

  constructor(data?: IHero) {
    this.id = data?.id || '';
    this.key = data?.key || '';
    this.superhero = data?.superhero || '';
    this.publisher = data?.publisher || EPublisher.DC;
    this.alterEgo = data?.alterEgo || '';
    this.firstAppearance = data?.firstAppearance || '';
    this.characters = data?.characters || [];
    this.originators = data?.originators || [];
    this.description = data?.description || '';
    this.fileManager = data?.fileManager || undefined;
  }
}
