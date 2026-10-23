export type Ministry = {
  id: string;
  name: string;
  place: string;
  body: string;
  href?: string;
  photo: { src: string; alt: string; credit: string; source: string };
};
export type CommunityPartner = {
  name: string;
  body: string;
  href: string;
  logo: string;
  darkBackground?: boolean;
  fullCircle?: boolean;
  logoStyle?: 'outlined' | 'cropped';
};

// Keep this list up to date as giving priorities change.
export const givingYear = new Date().getFullYear();
export const currentMinistries: Ministry[] = [
  {
    id: 'trinity',
    name: 'Trinity Baptist Church',
    place: 'Taichung, Taiwan',
    body: 'This year, Spero is supporting Trinity Baptist Church and Pastor Chris Phillips. Through seminary training, the church equips future pastors to plant new churches throughout the nation of Taiwan. Spero’s proceeds provide financial support for those who desire to receive this training.',
    href: 'https://trinitytaichung.com/',
    photo: {
      src: '/images/impact/trinity.webp',
      alt: 'People worshipping together at Trinity Baptist Church in Taichung',
      credit: 'Trinity Baptist Church',
      source: 'https://trinitytaichung.com/',
    },
  },
  {
    id: 'vgs',
    href: 'https://vientiane-gain-glory.xyz/',
    name: 'Vientiane GAIN Glory School',
    place: 'Vientiane, Laos',
    body: 'VGS is a 1st-12th grade Christian school located in Laos. Our team member Abi visited the school during a mission trip, and it has become one of our primary focuses this year. We plan to help cover the tuition of students who need financial support, and replenish school supplies so that more children can pursue education and grow deeper in Christ.',
    photo: {
      src: '/images/impact/vgs-school.webp',
      alt: 'VGS secondary students and staff together at school',
      credit: 'Vientiane GAIN Glory School',
      source: 'https://vientiane-gain-glory.xyz/',
    },
  },
];

// Display order in the gallery: Grace Academie, then More Than Bread.
export const pastMinistries: Ministry[] = [
  {
    id: 'grace-academie',
    name: 'Grace Academie',
    place: 'Niger',
    body: 'Spero has previously supported Grace Academie, a Christian secondary school for young women. Founded by missionary Aileen Chung, the academy provides free education, room & board, medical care, and transportation for their students. Our giving contributed to the school’s education programs and student care.',
    href: 'https://www.gemforniger.org/',
    photo: {
      src: '/images/impact/grace-academie.webp',
      alt: 'Students and a visitor at Grace Academie in Niger',
      credit: 'Peninsula Bible Church / Grace Academie',
      source:
        'https://pbc.org/team/grace-education-ministries-grace-academie-niger',
    },
  },
  {
    id: 'more-than-bread',
    name: 'More Than Bread',
    place: 'Grand Goâve, Haiti',
    body: 'Spero previously supported More Than Bread’s work with Pastor Willio to train future pastors in Haiti. The ministry provides biblical education to prepare leaders to teach, serve their communities, and plant churches. Our giving helped support that training.',
    href: 'https://www.mtbhaiti.org/',
    photo: {
      src: '/images/impact/more-than-bread.webp',
      alt: 'Students studying in a More Than Bread classroom in Haiti',
      credit: 'More Than Bread',
      source: 'https://www.mtbhaiti.org/',
    },
  },
];

// Logos supplied by the team.
export const partners: CommunityPartner[] = [
  {
    name: 'Abba Modern',
    body: 'A Christ-centered dance team at UC Berkeley that shares the Gospel through dance and testimony.',
    href: 'https://www.instagram.com/abbamodern/',
    logo: '/images/impact/partners/abba-modern.webp',
    darkBackground: true,
  },
  {
    name: 'Laundry Love',
    body: 'Laundry Love works with local non-profits and laundromats to cover the cost of cleaning clothing & bedding for low-income individuals.',
    href: 'https://laundrylove.org/',
    logo: '/images/impact/partners/laundry-love.webp',
  },
  {
    name: 'Imago Dei Clinic',
    body: 'A Christian nonprofit that provides naloxone and basic health supplies through street outreach in Berkeley, Oakland, and Emeryville.',
    href: 'https://www.instagram.com/imagodeiclinic/',
    logo: '/images/impact/partners/imago-dei-circle.png',
    logoStyle: 'cropped',
    fullCircle: true,
  },
  {
    name: 'Veritas',
    body: 'Veritas is the Berkeley Christian fellowship under Pillar Baptist Church. This fellowship helps connect college students with a local church and provides spaces for them to seek Christ on a school campus.',
    href: 'https://www.instagram.com/veritas.berkeley/',
    logo: '/images/impact/partners/veritas-circle.png',
    logoStyle: 'outlined',
    fullCircle: true,
  },
  {
    name: 'Unity in Christ',
    body: 'UiC brings together leaders from Berkeley’s Christian fellowships by hosting joint events for the Christian campus community.',
    href: 'https://www.instagram.com/uicucb/',
    logo: '/images/impact/partners/unity-in-christ-circle.png',
    fullCircle: true,
  },
  {
    name: 'Students for Life at Berkeley',
    body: 'A student organization advocating for life through campus conversations, speaker panels, and resources for student support.',
    href: 'https://www.instagram.com/sfl_berkeley/',
    logo: '/images/impact/partners/students-for-life-circle.png',
    fullCircle: true,
  },
];
