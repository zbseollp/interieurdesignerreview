export interface CardItem {
  title: string;
  href: string;
  image: string;
  alt: string;
  description?: string;
}

export const heroContent = {
  title: 'Maak je eigen stijlvolle woning',
  description:
    'Interieurdesignerreview.nl geeft waardevolle feedback over talloze artikelen met betrekking tot interieur en helpt je daarmee tot een weloverwogen keuze om jouw droomhuis te realiseren.',
  heroImage: '/images/2022/11/Frame1-1024x758.png',
  heroAlt: 'Stijlvol interieur',
};

export const categoryCards = [
  {
    title: 'Elektronica',
    href: '/beste-draadloze-home-cinema-set/',
    icon: 'electronics',
  },
  {
    title: 'Meubels',
    href: '/beste-hangstoel/',
    icon: 'furniture',
  },
  {
    title: 'Decor',
    href: '/beste-zwevend-tv-meubel/',
    icon: 'decor',
  },
  {
    title: 'Kunst',
    href: '/beste-tv-meubel-hout/',
    icon: 'art',
  },
  {
    title: 'Muurbedekking',
    href: '/beste-energiezuinige-elektrische-kachel/',
    icon: 'wall',
  },
  {
    title: 'Vloer',
    href: '/beste-stoomreiniger-laminaat/',
    icon: 'floor',
  },
] as const;

export const trendSections = [
  {
    title: 'Airconditioning',
    image: '/images/2023/05/air-conditioner.jpg',
    alt: 'Airconditioning',
    links: [
      { label: 'Mini aircooler', href: '/beste-mini-aircooler/' },
      { label: 'Stille mobiele airco', href: '/beste-stille-mobiele-airco/' },
      { label: 'Kleine mobiele airco', href: '/beste-kleine-mobiele-airco/' },
      { label: 'Mobiele airco met slang', href: '/beste-mobiele-airco-met-slang/' },
      { label: 'Mobiele airco slaapkamer', href: '/beste-mobiele-airco-slaapkamer/' },
    ],
  },
  {
    title: 'Bad & toilet',
    image: '/images/2023/05/Douchekop-e1684951780484.jpg',
    alt: 'Douchekop',
    links: [
      { label: 'WC mat', href: '/beste-wc-mat/' },
      { label: 'Douchestoel', href: '/beste-douchestoel/' },
      { label: 'Regendouche', href: '/beste-regendouche/' },
      { label: 'Douchekop met slang', href: '/beste-douchekop-met-slang/' },
      { label: 'Douchekop met harde straal', href: '/beste-douchekop-met-harde-straal/' },
    ],
  },
  {
    title: 'Rekken',
    image: '/images/2023/05/Schoenenrek-e1684952395534.jpg',
    alt: 'Schoenenrek',
    links: [
      { label: 'Droogrek', href: '/beste-droogrek/' },
      { label: 'Droogmolen', href: '/beste-droogmolen/' },
      { label: 'Schoenenrek', href: '/beste-schoenenrek/' },
      { label: 'Droogrek hangend', href: '/beste-droogrek-hangend/' },
      { label: 'Elektrisch droogrek', href: '/beste-elektrisch-droogrek/' },
    ],
  },
];

export const featureBoxes = [
  {
    title: 'Productvergelijking',
    description:
      'Wij weten wat de beste designartikelen zijn voor bij jou in huis omdat in ons onderzoek alleen de beste reviews naar voren komen. Je vindt deze per categorie in de top 10 lijstjes.',
    icon: 'calendar',
  },
  {
    title: 'Klassiek vs. Modern',
    description:
      'Ben jij fan van een klassieke uitstraling van je interieur dat elegantie en luxe uitstraalt? Of prefereer jij liever een strak design; Niet te veel tierelantijntjes en vooral functioneel. Voor inspiratie over modern design raden we je aan onze blogsectie in de gaten te houden.',
    icon: 'shield',
  },
  {
    title: 'Beste aanbiedingen',
    description:
      'Hier vind je naast de beste producten, ook de beste aanbiedingen voor deze producten. Tijdens ons onderzoek kijken wij ook waar het bepaalde product voor de beste prijs aan te schaffen is.',
    icon: 'bag',
  },
];

export const dosDontsSection = {
  title: "The Do's and the Dont's",
  description:
    'Wat kan wel en wat kan echt niet? Onze interieurdesigners bloggen regelmatig op onze site met de laatste tips zodat jouw interieur altijd voldoet aan de laatste trends. Klik hieronder om meer te weten te komen.',
  image: '/images/2022/11/Frame4.png',
  imageAlt: 'Interieurdesign tips',
  ctaLabel: 'Bekijk ons blog',
  ctaHref: '/blogoverzicht/',
};

export const etalageSection = {
  title: 'Etalage',
  description:
    'In onze online etalage stallen we een selectie aan interieurontwerp voor je uit. Van meubels tot kunst, je kunt het hieronder allemaal vinden.',
};

export const showcaseProducts: CardItem[] = [
  {
    title: 'Koudschuim matras',
    href: '/beste-koudschuim-matras/',
    image: '/images/2023/05/Koudschuim-matras.jpg',
    alt: 'Koudschuim matras',
    description: 'Een goed koudschuim matras die aan alle wensen voldoet.',
  },
  {
    title: 'Hoogslaper met bureau en kast',
    href: '/beste-hoogslaper-met-bureau-en-kast/',
    image: '/images/2023/05/Hoogslaper.jpg',
    alt: 'Hoogslaper',
    description: 'Krijg inzicht in welke lattenbodem 140x200 het beste is.',
  },
  {
    title: 'Brandwerende kluis',
    href: '/beste-brandwerende-kluis/',
    image: '/images/2023/05/Brandwerende-kluis-e1684960520937.png',
    alt: 'Brandwerende kluis',
    description: 'Waardevolle bezittingen in een brandwerende kluis opslaan.',
  },
  {
    title: '1 persoons matras',
    href: '/beste-1-persoons-matras/',
    image: '/images/2023/05/1-persoons-matras.jpg',
    alt: '1 persoons matras',
    description: 'De juiste 1-persoons matras helpt je met rust en ontspanning.',
  },
  {
    title: 'Diervriendelijke muizenval',
    href: '/beste-diervriendelijke-muizenval/',
    image: '/images/2023/05/Diervriendelijke-muizenval.jpg',
    alt: 'Diervriendelijke muizenval',
    description: 'Voorkomen van schade veroorzaakt door muizen.',
  },
  {
    title: 'Lattenbodem 140x200',
    href: '/beste-lattenbodem-140x200/',
    image: '/images/2023/05/lattenbodem-140x200-1.jpg',
    alt: 'Lattenbodem 140x200',
    description: 'Krijg inzicht in welke lattenbodem 140x200 het beste is.',
  },
  {
    title: 'Moderne kroonluchter',
    href: '/beste-moderne-kroonluchter/',
    image: '/images/2023/05/Moderne-kroonluchter.jpg',
    alt: 'Moderne kroonluchter',
    description: 'Een kroonluchter die je ruimte een luxe touch geeft.',
  },
  {
    title: 'Zitzak buiten',
    href: '/beste-zitzak-buiten/',
    image: '/images/2023/05/Zitzak-buiten.png',
    alt: 'Zitzak buiten',
    description: 'De verschillende zitzakken buiten die je kunt vinden in de Nederlandse markt.',
  },
  {
    title: 'Ledikant matras',
    href: '/beste-ledikant-matras/',
    image: '/images/2023/05/Ledikant-matras.jpg',
    alt: 'Ledikant matras',
    description: 'Een goede duurzame ledikant matras voor je kleine!',
  },
  {
    title: 'Matrashoes met rits',
    href: '/beste-matrashoes-met-rits/',
    image: '/images/2023/05/Matrashoes-met-rits.jpg',
    alt: 'Matrashoes met rits',
    description: 'Vermijd stof, vuil en vocht in je matras.',
  },
  {
    title: 'Kledingkast met spiegel',
    href: '/beste-kledingkast-met-spiegel/',
    image: '/images/2023/05/Kledingkast-spiegel.jpg',
    alt: 'Kledingkast met spiegel',
    description: 'De top 10 kledingkasten met spiegel in Nederland.',
  },
  {
    title: 'Elektrische haard vrijstaand',
    href: '/beste-elektrische-haard-vrijstaand/',
    image: '/images/2023/05/Elektrische-haard-vrijstaand.jpg',
    alt: 'Elektrische haard vrijstaand',
    description: 'Een elektrische haard vrijstaand is een ideale oplossing om je warm te stomen.',
  },
  {
    title: '2 persoons hoogslaper',
    href: '/beste-2-persoons-hoogslaper/',
    image: '/images/2023/05/2-persoons-hoogslaper.jpg',
    alt: '2 persoons hoogslaper',
    description: 'Een 2-persoons hoogslaper is de perfecte oplossing voor een 2-persoonskamer.',
  },
  {
    title: 'Deurstopper binnen',
    href: '/beste-deurstopper-binnen/',
    image: '/images/2023/05/Deurstop-binnen.jpg',
    alt: 'Deurstopper binnen',
    description: 'De deurstopper binnen vinden, perfect voor je deur.',
  },
  {
    title: 'Buitenlamp met dag en nacht sensor',
    href: '/beste-buitenlamp-met-dag-en-nacht-sensor/',
    image: '/images/2023/05/Buitenlamp-sensor.jpg',
    alt: 'Buitenlamp sensor',
    description: 'Buitenlampen met dag en nacht sensoren als beste getest.',
  },
];

export const professionalSection = {
  title: 'De professional aan het woord',
  description:
    'Wat zegt de interieurdesigner zelf? In deze blog lees je meer over de laatste trends op het gebied van interieur waaruit je inspiratie kunt halen. De schrijver van dit blog is een professioneel interieurdesigner die graag de laatste trends met je deelt.',
  image: '/images/2022/11/Frame3.png',
  imageAlt: 'Interieurdesigner',
  ctaLabel: 'Lees ons blog',
  ctaHref: '/blogoverzicht/',
};

export const trendsIntro = {
  title: 'Benieuwd naar de laatste trends?',
  description:
    'Onze kenners houden zich bezig met de laatste ontwikkelingen op het gebied van interieur en interieurdesign. Stuk voor stuk hebben ze een achtergrond in deze branche waardoor je een professioneel inzicht krijgt in de wereld van interieurdesign. Je kunt onze laatste productrecensies hieronder lezen.',
};
