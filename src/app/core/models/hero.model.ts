import { Publisher } from '../../shared/enums/publisher.enum';

export interface IHero {
  id: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string[];
  originators: string[];
  description: string;
  img?: string;
  img_fa?: string;
}

export class HeroModel implements IHero {
  id: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string[];
  originators: string[];
  description: string;
  img?: string;
  img_fa?: string;

  constructor(data?: IHero) {
    this.id = data?.id || '';
    this.superhero = data?.superhero || '';
    this.publisher = data?.publisher || Publisher.DC;
    this.alter_ego = data?.alter_ego || '';
    this.first_appearance = data?.first_appearance || '';
    this.characters = data?.characters || [];
    this.originators = data?.originators || [];
    this.description = data?.description || '';
    this.img = data?.img || 'no-image.jpg';
    this.img_fa = data?.img_fa || 'no-image.jpg';
  }
}
