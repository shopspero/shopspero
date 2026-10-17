/** Edit ministry stories and partnerships here. Array order sets display order. */
export type MinistryStory = {
  id: string;
  place: string;
  category: string;
  name: string;
  title: string;
  intro: string;
  body: string;
  href: string;
  /** Country initials appear when no photo is provided. */
  mark: string;
  /** Image paths begin with /images/ and refer to files in public/images/. */
  image?: string;
  photoCredit?: string;
  photoSource?: string;
  photoAlt?: string;
};

export type CommunityPartner = {
  name: string;
  kind: string;
  body: string;
  href: string;
  /** Optional logo. Initials are displayed when omitted. */
  image?: string;
};

// Draft stories based on the team's supplied notes. Confirm giving years,
// amounts, and outcomes before adding an annual giving report.
export const stories: MinistryStory[] = [
  {
    id: 'taiwan',
    place: 'Taichung, Taiwan',
    category: 'Equipping church leaders',
    name: 'Trinity Baptist Church',
    title: 'Rooted in a church. Reaching a nation.',
    intro:
      'Investing in the people who will carry the gospel into new communities.',
    body: 'Through Trinity Baptist Church and Pastor Chris Phillips, Spero has supported the training of future church leaders in Taiwan. For men who want to attend seminary, the cost of study can stand in the way of that calling. Our giving helps support this preparation, with the hope that these leaders will plant churches and serve communities across Taiwan.',
    href: 'https://trinitytaichung.com/',
    mark: 'TW',
  },
  {
    id: 'haiti',
    place: 'Grand Goâve, Haiti',
    category: 'Investing in discipleship',
    name: 'More Than Bread',
    title: 'Today’s students. Tomorrow’s shepherds.',
    intro:
      'Supporting biblical education with a vision that extends beyond the classroom.',
    body: 'Spero has supported More Than Bread’s work with Pastor Willio to equip future pastors in Haiti. Through biblical training, emerging leaders prepare to teach, disciple, and serve their own communities. Our giving comes alongside this work so that financial barriers do not have the final word in a future pastor’s preparation.',
    href: 'https://www.mtbhaiti.org/',
    mark: 'HT',
    image: '/images/impact/more-than-bread.jpg',
    photoCredit: 'Photo: More Than Bread',
    photoSource: 'https://www.mtbhaiti.org/',
    photoAlt: 'Students studying in a More Than Bread classroom in Haiti',
  },
  {
    id: 'niger',
    place: 'Niger',
    category: 'Opening doors to education',
    name: 'Grace Academie',
    title: 'An education that reaches generations.',
    intro:
      'Coming alongside young women as they learn, grow, and imagine their futures.',
    body: 'Founded by missionary Aileen Chung, Grace Academie is a Christian secondary school for young women in Niger. Students receive education, room and board, medical care, and transportation to and from their villages at no cost. Spero has given toward this ministry, supporting an education rooted in faith and a vision for the students’ families and communities.',
    href: 'https://www.gemforniger.org/',
    mark: 'NE',
    image: '/images/impact/grace-academie.webp',
    photoCredit: 'Photo: Peninsula Bible Church / Grace Academie',
    photoSource:
      'https://pbc.org/team/grace-education-ministries-grace-academie-niger',
    photoAlt: 'A group from Grace Academie in Niger',
  },
];

export const partners: CommunityPartner[] = [
  {
    name: 'Abba Modern',
    kind: 'Dance & testimony',
    body: 'A Christ-centered dance team at UC Berkeley sharing the gospel through movement and testimony. Our collaboration has also included restock distribution.',
    href: 'https://www.instagram.com/abbamodern/',
    image: '/images/partners/abba.jpg',
  },
  {
    name: 'Laundry Love',
    kind: 'Practical care',
    body: 'Helping people with low or no income wash their clothing and bedding through local laundromat partnerships. A practical way to meet neighbors with care and dignity.',
    href: 'https://laundrylove.org/',
    image: '/images/partners/laundry love.png',
  },
  {
    name: 'Imago Dei Clinic',
    kind: 'Community outreach',
    body: 'A Christian nonprofit bringing naloxone and basic health supplies to neighbors in Berkeley, Oakland, and Emeryville, alongside gospel-centered street outreach.',
    href: 'https://imagodeiclinic.com/',
  },
  {
    name: 'Veritas',
    kind: 'Campus fellowship',
    body: 'A Berkeley Christian fellowship connecting students with the life and ministry of Pillar Baptist Church, with an emphasis on belonging to a local church.',
    href: 'https://www.instagram.com/veritas.berkeley/',
  },
  {
    name: 'Unity in Christ',
    kind: 'Campus connection',
    body: 'Bringing Berkeley’s Christian fellowships and their leaders together to build relationships and gather the campus community in unity.',
    href: 'https://www.instagram.com/uicucb/',
    image: '/images/partners/uic.png',
  },
  {
    name: 'Students for Life at Berkeley',
    kind: 'Campus advocacy',
    body: 'A student organization advocating for life through campus conversations, speaker events, and support resources for students.',
    href: 'https://www.instagram.com/sfl_berkeley/',
  },
];
