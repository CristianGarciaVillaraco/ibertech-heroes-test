import { Hero, Publisher } from '../interfaces/hero.interface';

export const allHeroes: Hero[] = [
  {
    id: "dc-batman",
    superhero: "Batman",
    publisher: Publisher.DCComics,
    alter_ego: "Bruce Wayne",
    first_appearance: "Detective Comics #27",
    img_fa: "dc-batman_fa",
    characters: ["Bruce Wayne"],
    originators: ["Bob Kane", "Bill Finger"],
    isAssetsImg: true,
    description: "Un multimillonario empresarial dueño de las empresas Wayne en Gotham City. Decide convertirse en un héroe después de presenciar el trágico asesinato de sus padres."
  },
  {
    id: "dc-superman",
    superhero: "Superman",
    publisher: Publisher.DCComics,
    alter_ego: "Kal-El",
    first_appearance: "Action Comics #1",
    img_fa: "dc-superman_fa",
    characters: ["Kal-El"],
    originators: ["Jerry Siagel", "Joe Shuster"],
    isAssetsImg: true,
    description: "Nacido en el planeta Krypton es enviado a la tierra después de la destrucción natural del planeta. Fue encontrado y criado por una familia de agricultores estadounidenses."
  },
  {
    id: "dc-flash",
    superhero: "Flash",
    publisher: Publisher.DCComics,
    alter_ego: "Jay Garrick",
    first_appearance: "Flash Comics #1",
    img_fa: "dc-flash_fa",
    characters: ["Jay Garrick", "Barry Allen", "Wally West", "Bart Allen"],
    originators: ["Gardner Fox", "Harry Lampert"],
    isAssetsImg: true,
    description: "En un extraño accidente en el laboratorio, adquirió las capacidades de moverse a una velocidad sobrehumana y eligió luchar contra el crimen."
  },
  {
    id: "dc-green_lantern",
    superhero: "Green Lantern",
    publisher: Publisher.DCComics,
    alter_ego: "Alan Scott",
    first_appearance: "All-American Comics #16",
    img_fa: "dc-green_lantern_fa",
    characters: ["Alan Scott", "Hal Jordan", "Guy Gardner", "John Stewart", "Kyle Raynor", "Jade", "Sinestro", "Simon Baz"],
    originators: ["Bill Finger", "Martín Nodell"],
    isAssetsImg: true,
    description: "Los green lantern son asignados al considerarlos dignos, por ello se les aporta los objetos de un anillo y una lampara donde provienen sus poderes, principalmente pueden volar y manifestación de objetos acompañados de una luz verde."
  },
  {
    id: "dc-green_arrow",
    superhero: "Green Arrow",
    publisher: Publisher.DCComics,
    alter_ego: "Oliver Queen",
    first_appearance: "More Fun Comics #73",
    img_fa: "dc-green_arrow_fa",
    characters: ["Oliver Queen"],
    originators: ["Mort Weisinger", "George Papp"],
    isAssetsImg: true,
    description: "Empresario, propietario de las Industrias Queen y una gran celebridad muy conocida en Star City. Sus habilidades con el arco las utiliza para combatir el crimen añadiendo variables de flechas."
  },
  {
    id: "dc-wonder_woman",
    superhero: "Wonder Woman",
    publisher: Publisher.DCComics,
    alter_ego: "Princess Diana",
    first_appearance: "All Star Comics #8",
    img_fa: "dc-wonder_woman_fa",
    characters: ["Princess Diana"],
    originators: ["William Moulton"],
    isAssetsImg: true,
    description: "Princesa guerrera de las amazonas basada en la mitología griega. Sus poderes son habilidades super humanas y de combate de batalla superiores obtenido por los dioses y un amplio entrenamiento. También posee una gran cantidad de armas de las cuales las principales son el lazo de la verdad, los brazales mágicos indestructibles y una tiara."
  },
  {
    id: "dc-martian_manhunter",
    superhero: "Martian Manhunter",
    publisher: Publisher.DCComics,
    alter_ego: "J\"onn J\"onzz",
    first_appearance: "Detective Comics #225",
    img_fa: "dc-martian_manhunter_fa",
    characters: ["Martian Manhunter"],
    originators: ["Joseph Samachson", "Joe Certa"],
    isAssetsImg: true,
    description: "Un nativo del planeta de Marte, con habilidades que van más allá de las de un hombre común, incluyendo telepatía y el cambió de forma."
  },
  {
    id: "dc-robin",
    superhero: "Robin/Nightwing",
    publisher: Publisher.DCComics,
    alter_ego: "Dick Grayson",
    first_appearance: "Detective Comics #38",
    img_fa: "dc-robin_fa",
    characters: ["Dick Grayson"],
    originators: ["Bob Kane, Bill Finger", "Jerry Robinson"],
    isAssetsImg: true,
    description: "Un niño acróbata callejero de la familia Los Graysons Voladores presencio el asesinato de sus padres en un terrible accidente con el trapecio que saboteo Anthony Zucco (jefe de la mafia). Batman lo encontró mientras investigaba el asesinato y lo entreno tanto física como psicológicamente para ser su asistente."
  },
  {
    id: "marvel-spider_man",
    superhero: "Spider Man",
    publisher: Publisher.MarvelComics,
    alter_ego: "Peter Parker",
    first_appearance: "Amazing Fantasy #15",
    img_fa: "marvel-spider_man_fa",
    characters: ["Peter Parker"],
    originators: ["Stan Lee", "Steve Ditko"],
    isAssetsImg: true,
    description: "Un joven huérfano de Queens vive con sus tíos, durante su estaba como estudiante es mordido por una araña radiactiva en una exhibición científica adquiere la agilidad y fuerza proporcional de un arácnido. También incrementa sus habilidades atléticas y puede adherirse a superficies. Con sus conocimientos científicos desarrolla el dispara telarañas."
  },
  {
    id: "marvel-captain_america",
    superhero: "Captain America",
    publisher: Publisher.MarvelComics,
    alter_ego: "Steve Rogers",
    first_appearance: "Captain America Comics #1",
    img_fa: "marvel-captain_america_fa",
    characters: ["Steve Rogers"],
    originators: ["Joe Simon", "Jack Kirby"],
    isAssetsImg: true,
    description: "En la segunda guerra mundial Steve era un adolescente cuando quiso alistarse en el ejercito, pero debido a su frágil cuerpo fue rechazado pero el general vio su resolución y decide inscribirlo en el proyecto renacimiento donde, Steve se usa como sujeto de pruebas para la creación de un super soldado. Tras el éxito de dicho proyecto y aumentar sus habilidades se le entrega un uniforme y escudo representado la bandera americana."
  },
  {
    id: "marvel-iron_man",
    superhero: "Iron Man",
    publisher: Publisher.MarvelComics,
    alter_ego: "Tony Stark",
    first_appearance: "Tales of Suspense #39",
    img_fa: "marvel-iron_man_fa",
    characters: ["Tony Stark"],
    originators: ["Stan Lee", "Larry Lieber", "Don Heck", "Jack Kirby"],
    isAssetsImg: true,
    description: "Un joven talentoso en la ingeniería eléctrica pierde a sus padres en un accidente automovilístico y hereda la compañía de su padre (Industrias Stark). Observando los efectos de su tecnología experimental en el esfuerzo bélico estadounidense es herido por una bomba y capturado por Wong-Chu (supervillano). Dicho villano le ordena diseñar un arma, pero Stark con metralla que se dirige al corazón decide crear una placa pectoral magnética para evitar la metralla. Una vez que llega a escapar Stark construye un traje para derrotar a sus villanos. Según como pasa el tiempo empieza a crear distintas armaduras y tecnología revolucionaria."
  },
  {
    id: "marvel-thor",
    superhero: "Thor",
    publisher: Publisher.MarvelComics,
    alter_ego: "Thor Odinson",
    first_appearance: "Journey into Mystery #83",
    img_fa: "marvel-thor_fa",
    characters: ["Thor Odinson"],
    originators: ["Jack Kirby", "Stan Lee", "Larry Lieber"],
    isAssetsImg: true,
    description: "Hijo de Odín, Thor es enviado a la tierra sin recuerdos de la divinidad y con los recuerdos de un estudiante de medicina, todo esto para enseñarle la humildad. En uno de sus viajes Thor al presenciar una nave espacial se esconde dentro de una cueva donde encuentra el Mjolnir. El Mjolnir al decidir que es digno de sostenerlo le conde los poderes del dios del trueno."
  },
  {
    id: "marvel-hulk",
    superhero: "Hulk",
    publisher: Publisher.MarvelComics,
    alter_ego: "Bruce Banner",
    first_appearance: "The Incredible Hulk #1",
    img_fa: "marvel-hulk_fa",
    characters: ["Bruce Banner"],
    originators: ["Stan Lee", "Jack Kirby"],
    isAssetsImg: true,
    description: "Después de una exposición accidental a los rayos gamma durante la detonación de una bomba experimental, un científico llamado Banner se transforma físicamente en Hulk. Hulk posee fuerza sobre natural, en algunos comics tiene también regeneración de las heridas producidas. Actualmente Banner se transforma en Hulk cuando se enfada pero en los primeros comics se transformaba cuando se hacía de noche."
  },
  {
    id: "marvel-wolverine",
    superhero: "Wolverine",
    publisher: Publisher.MarvelComics,
    alter_ego: "James Howlett",
    first_appearance: "The Incredible Hulk #180",
    img_fa: "marvel-wolverine_fa",
    characters: ["James Howlett"],
    originators: ["Len Wein", "John Romita Sr", "Herb Trimpe"],
    isAssetsImg: true,
    description: "Sus habilidades viene de una descendencia familiar evolucionada a partir de los lobos (Lupinos). Tras un trágico suceso Jame mata con sus garras a una persona. Mostrar por primera vez las evidencias de sus poderes. Sus poderes son la inmortalidad, y tres garras en cada mano que salen de los nudillos. En un principio sus garras son de huesos pero más adelante tras ser sometido a una prueba científica le insertan Adamantium cubriendo todos los huesos de este material."
  },
  {
    id: "marvel-daredevil",
    superhero: "Daredevil",
    publisher: Publisher.MarvelComics,
    alter_ego: "Matthew Michael Murdock",
    first_appearance: "Daredevil #1",
    img_fa: "marvel-daredevil_fa",
    characters: ["Matthew Michael Murdock"],
    originators: ["Stan Lee", "Bill Everett"],
    isAssetsImg: true,
    description: "Un joven la Manhatan es educado a la no violencia, en un momento dado un hombre ciego casi es atropellado por un camino en el proceso Matt lo salva, pero en cambio le cae sustancias radioactivas en los ojos dejándolo ciego. Estas sustancias aumentan sus sentidos restantes más allá de los umbrales humanos y ahora puede detectar la forma y la ubicación de los objetos. Tras la muerte de su padre por parte de los hombres de Fixer (Gánster) Matt decide no emplear la fuerza física para vengarse. En cambio, crea su alter ego para realizarlo y aprende artes marciales."
  },
  {
    id: "marvel-hawkeye",
    superhero: "Hawkeye",
    publisher: Publisher.MarvelComics,
    alter_ego: "Clinton Francis Barton",
    first_appearance: "Tales of Suspense #57",
    img_fa: "marvel-hawkeye_fa",
    characters: ["Clinton Francis Barton"],
    originators: ["Stan Lee", "Don Heck"],
    isAssetsImg: true,
    description: "Un joven huérfano se escapa de un orfanato con su hermano para unirse a un carnaval viajero donde aprende a utilizar el arco. Viendo una acción de Iron man decide convertirse en un héroe. Aun que es su primera acción como héroe lo acusaron de robo."
  },
  {
    id: "marvel-cyclops",
    superhero: "Cyclops",
    publisher: Publisher.MarvelComics,
    alter_ego: "Scott Summers",
    first_appearance: "X-Men #1",
    img_fa: "marvel-cyclops_fa",
    characters: ["Scott Summers"],
    originators: ["Stan Lee", "Jack Kirby"],
    isAssetsImg: true,
    description: "Scott un joven de nacido en Alaska y su hermano se ven en un terrible accidente del cual secuestraron a sus padres y ellos fueron gravemente heridos, sobre todo Scott que recibió un golpe en la cabeza. Los niños pasaron a un orfanato donde el hijo menor encontró su lugar, pero Scott no. Al tener 17 años Scott se escapa debido a la manifestación de sus poderes mutantes, que lanzaba rallos por los ojos. Debido al golpe en la cabeza no los puede controlar y daña una grúa produciendo un linchamiento hacia su persona por el pueblo, en un momento dado aparece Xavier (director de la escuela de mutantes) y lo matricula en su escuela."
  },
  {
    id: "marvel-silver_surfer",
    superhero: "Silver Surfer",
    publisher: Publisher.MarvelComics,
    alter_ego: "Norrin Radd",
    first_appearance: "The Fantastic Four #48",
    img_fa: "marvel-silver_surfer_fa",
    characters: ["Norrin Radd"],
    originators: ["jack Kirby"],
    isAssetsImg: true,
    description: "Un joven astrónomo del planeta Zenn-la (Planeta pacifista), el acepto servir a Galactus, para evitar que este devore su planeta asimismo poder conducir a Galactus a planetas donde no hubiera vida. Galactus le concedió poderes cósmicos, un aspecto plateado y una tabla de surf. Galactus lo manipula para que pueda devorar planetas con vida, pero al llegar a la tierra Silver Surfer se da cuenta de que manipulado y lo acaba derrotando con ayuda de los cuatro fantásticos. Galactus se enfada y lo encarcela en la tierra, y tras múltiples intentos después de mucho tiempo consigue salir con ayuda de los cuatro fantásticos. Galactus destruye el planeta de Silver Surfer por su traición, y llevando una gran carga en su corazón decide ser protector del universo."
  }
];

export const batmanHeroInList: Hero[] = [{
  id: "dc-batman",
  superhero: "Batman",
  publisher: Publisher.DCComics,
  alter_ego: "Bruce Wayne",
  first_appearance: "Detective Comics #27",
  img_fa: "dc-batman_fa",
  characters: ["Bruce Wayne"],
  originators: ["Bob Kane", "Bill Finger"],
  isAssetsImg: true,
  description: "Un multimillonario empresarial dueño de las empresas Wayne en Gotham City. Decide convertirse en un héroe después de presenciar el trágico asesinato de sus padres."
}];

export const batmanHeroObject: Hero = {
  id: "dc-batman",
  superhero: "Batman",
  publisher: Publisher.DCComics,
  alter_ego: "Bruce Wayne",
  first_appearance: "Detective Comics #27",
  img_fa: "dc-batman_fa",
  characters: ["Bruce Wayne"],
  originators: ["Bob Kane", "Bill Finger"],
  isAssetsImg: true,
  description: "Un multimillonario empresarial dueño de las empresas Wayne en Gotham City. Decide convertirse en un héroe después de presenciar el trágico asesinato de sus padres."
};