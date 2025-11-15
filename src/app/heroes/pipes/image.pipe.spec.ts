import { ImagePipe } from './image.pipe';
import { Hero, Publisher } from '../interfaces/hero.interface';

describe('Pipe: Image', () => {
  let pipe: ImagePipe;

  beforeEach(() => {
    pipe = new ImagePipe();
  });

  describe('Default value in file db', () => {
    let heroOrigin: Hero = {
      id: "dc-batman",
      superhero: "Batman",
      publisher: Publisher.DCComics,
      alter_ego: "Bruce Wayne",
      first_appearance: "Detective Comics #27",
      img_fa: "dc-batman_fa",
      characters: ["Bruce Wayne"],
      originators: ["Bob Kane", "Bill Finger"],
      isAssetsImg: true,
      description: "description"
    };


    it('should show id img value', () => {
      expect(pipe.transform(heroOrigin, false)).toBe('assets/heroes/dc-batman.jpg')
    });

    it('should show img_fa value', () => {
      expect(pipe.transform(heroOrigin, true)).toBe('assets/heroes/dc-batman_fa.jpg')
    });

    it('should show nor img_fa and nor img value', () => {
      let hero: Hero = {
        id: "dc-batman",
        superhero: "Batman",
        publisher: Publisher.DCComics,
        alter_ego: "Bruce Wayne",
        first_appearance: "Detective Comics #27",
        img_fa: "dc-batman_fa",
        characters: ["Bruce Wayne"],
        originators: ["Bob Kane", "Bill Finger"],
        isAssetsImg: false,
        description: "description"
      };
      expect(pipe.transform(hero, false)).toBe('assets/no-image.png')
    });
  });

  describe('Image by url', () => {
    let hero: Hero = {
      id: "dc-batman",
      superhero: "Batman",
      publisher: Publisher.DCComics,
      alter_ego: "Bruce Wayne",
      first_appearance: "Detective Comics #27",
      img_fa: "",
      characters: ["Bruce Wayne"],
      originators: ["Bob Kane", "Bill Finger"],
      isAssetsImg: false,
      description: "description",
      alt_img: "https://images-na.ssl-images-amazon.com/images/I/716OXFQ3axL.jpg",
      alt_img_fa: "https://images-na.ssl-images-amazon.com/images/I/716OXFQ3axL.jpg"
    };

    it('should show alt_img value', () => {
      expect(pipe.transform(hero, false)).toBe('https://images-na.ssl-images-amazon.com/images/I/716OXFQ3axL.jpg');
    });

    it('should show alt_img_fa value', () => {
      expect(pipe.transform(hero, true)).toBe('https://images-na.ssl-images-amazon.com/images/I/716OXFQ3axL.jpg');
    });
  });


  it('should show default img value', () => {
    let hero: Hero = {
      id: "dc-batman",
      superhero: "Batman",
      publisher: Publisher.DCComics,
      alter_ego: "Bruce Wayne",
      first_appearance: "Detective Comics #27",
      img_fa: undefined,
      characters: ["Bruce Wayne"],
      originators: ["Bob Kane", "Bill Finger"],
      isAssetsImg: false,
      description: "description"
    };
    expect(pipe.transform(hero, <any>1)).toBe('assets/no-image.png');
  });

  it('should show value', () => {
    let hero: Hero = {
      id: "dc-batman",
      superhero: "Batman",
      publisher: Publisher.DCComics,
      alter_ego: "Bruce Wayne",
      first_appearance: "Detective Comics #27",
      img_fa: "dc-batman_fa",
      characters: ["Bruce Wayne"],
      originators: ["Bob Kane", "Bill Finger"],
      isAssetsImg: false,
      description: "description"
    };
    expect(pipe.transform(hero, true)).toBe('assets/no-image.png');
  });
});