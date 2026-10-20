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
    body: 'This year, Spero is supporting seminary training through Trinity Baptist Church and Pastor Chris Phillips. The church prepares future pastors to plant churches across Taiwan. Our giving helps men who want to pursue this training but need financial support to attend.',
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
    body: 'VGS is a Christian school serving grades 1–12 in Laos. Abi visited the school on a missions trip, and it is one of Spero’s focuses this year. We plan to help cover tuition for students who need financial aid and replenish school supplies so more children can attend and continue their education.',
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
    body: 'Spero previously supported Grace Academie, a Christian secondary school for young women founded by missionary Aileen Chung. Students receive education, room and board, medical care, and transportation to and from their villages at no cost. Our giving contributed to the school’s work of educating and caring for these students.',
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
    body: 'A Christ-centered dance team at UC Berkeley sharing the gospel through dance and testimony. Our collaboration has also included restock distribution.',
    href: 'https://www.instagram.com/abbamodern/',
    logo: '/images/impact/partners/abba-modern.webp',
    darkBackground: true,
  },
  {
    name: 'Laundry Love',
    body: 'Laundry Love works with local groups and laundromats to cover the cost of washing and drying clothing and bedding for people with low or no income.',
    href: 'https://laundrylove.org/',
    logo: '/images/impact/partners/laundry-love.webp',
  },
  {
    name: 'Imago Dei Clinic',
    body: 'A Christian nonprofit providing naloxone and basic health supplies through street outreach in Berkeley, Oakland, and Emeryville.',
    href: 'https://www.instagram.com/imagodeiclinic/',
    logo: '/images/impact/partners/imago-dei-circle.png',
    logoStyle: 'cropped',
    fullCircle: true,
  },
  {
    name: 'Veritas',
    body: 'A Berkeley Christian fellowship connected to Pillar Baptist Church, helping students take part in the life of a local church.',
    href: 'https://www.instagram.com/veritas.berkeley/',
    logo: '/images/impact/partners/veritas-circle.png',
    logoStyle: 'outlined',
    fullCircle: true,
  },
  {
    name: 'Unity in Christ',
    body: 'Unity in Christ brings together leaders from Berkeley’s Christian fellowships and hosts events for the campus Christian community.',
    href: 'https://www.instagram.com/uicucb/',
    logo: '/images/impact/partners/unity-in-christ-circle.png',
    fullCircle: true,
  },
  {
    name: 'Students for Life at Berkeley',
    body: 'A student organization advocating for life through campus conversations, speaker events, and support resources for students.',
    href: 'https://www.instagram.com/sfl_berkeley/',
    logo: '/images/impact/partners/students-for-life-circle.png',
    fullCircle: true,
  },
];
