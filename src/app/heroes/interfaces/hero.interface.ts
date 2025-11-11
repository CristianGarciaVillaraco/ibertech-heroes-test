export interface Hero {
  id?:              string;
  superhero:        string;
  publisher:        Publisher;
  alter_ego:        string;
  first_appearance: string;
  img_fa?:          string;
  characters:       Array<string>;
  alt_img?:         string;
  alt_img_fa?:      string;
  originators:      Array<string>;
  description:      string;
  isAssetsImg?:     boolean;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}