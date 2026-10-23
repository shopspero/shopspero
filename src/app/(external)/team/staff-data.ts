export interface StaffInfo {
  name: string;
  role: string;
  bio: string;
  major?: string;
  favoriteBibleVerse?: string;
  img: string;
  section: string;
  archived?: boolean;
  objectPosition?: string;
}

const staffData: StaffInfo[] = [
  {
    name: "Hogan Kim",
    role: "Chief Executive Officer",
    major: "Economics & Data Science",
    bio: "Spero is a way to share and live the Gospel through everyday wear, spark meaningful conversations about Christ, and remind believers to reflect the light of Christ wherever they go.",
    favoriteBibleVerse: "“Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.” — Matthew 5:16",
    img: "/images/team/hogan-kim.webp",
    section: "executive",
    objectPosition: "center 45%"
  },
  {
    name: "Ethan Yang",
    role: "Chief Operating Officer",
    major: "Computer Science and Data Science",
    bio: "I truly believe that our clothing can open opportunities for Christians to share the Gospel truth to others. Beyond that, my hope is that wearing Spero would serve as a constant reminder of His goodness and to be the aroma of Christ wherever we go.",
    favoriteBibleVerse: "“Know therefore that the Lord your God is God, the faithful God who keeps covenant and steadfast love with those who love him and keep his commandments, to a thousand generations” — Deuteronomy 7:9",
    img: "/images/team/ethan-yang.webp",
    section: "executive",
    objectPosition: "center 45%"
  },
  {
    name: "Michael Dai",
    role: "Chief Financial Officer",
    major: "Electrical Engineering & Computer Sciences and Economics",
    bio: "Spero is an opportunity to use the education that God has provided me for His glory. I am grateful to be a witness to the work that God is doing through this faithful organization.",
    favoriteBibleVerse: "“For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord” — Romans 8:38–39",
    img: "/images/team/michael-dai.webp",
    section: "executive",
    objectPosition: "center 45%"
  },
  {
    name: "Abigail Cho",
    role: "Chief Marketing Officer",
    major: "Legal Studies",
    bio: "Hi, my name is Abi, and I’m a second year majoring in Legal Studies at UC Berkeley, hoping to become a lawyer in the future. I saw Spero as an avenue of witnessing through the clothing they make, and I joined because I wanted to use my interest in fashion to serve in this unique ministry. Outside of school, I really enjoy anything music related.",
    favoriteBibleVerse: "“Lead me, O LORD, in your righteousness because of my enemies; make your way straight before me.” — Psalm 5:8",
    img: "/images/team/abigail-cho.webp",
    section: "executive",
    objectPosition: "center 45%"
  },
  {
    name: "Mabel Kim",
    role: "Operations Head",
    major: "Neuroscience and Data Science",
    bio: "I deeply resonate with Spero’s mission and heart for evangelism and pray that our clothing can be one way to spread His good word on campus!",
    favoriteBibleVerse: "“Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.” — Romans 12:2 (ESV)",
    img: "/images/team/mabel-kim.webp",
    section: "executive",
    objectPosition: "center 45%"
  },
  {
    name: "Sharon Choi",
    role: "Clothing Designer",
    major: "English",
    bio: "It’s so rewarding getting to create beautiful things that point to the most beautiful Creator, and wearing Scripture makes us like lamps! We shine light on the hope that exists in Jesus.",
    favoriteBibleVerse: "“You have given me the shield of your salvation, and your right hand supported me, and your gentleness made me great.” — Psalm 18:35",
    img: "/images/team/sharon-choi.webp",
    section: "designer",
    objectPosition: "center 45%"
  },
  {
    name: "Lauren Lee",
    role: "Clothing Designer",
    major: "Chemistry",
    bio: "I love that Spero focuses on sharing the word of God and professing faith through our designs. It's such a joy to collaborate with fellow brothers and sisters in Christ to work the Gospel into everyday clothing!",
    favoriteBibleVerse: "“You will say in that day: 'I will give thanks to you, O LORD, for though you were angry with me, your anger turned away, that you might comfort me. Behold, God is my salvation; I will trust, and will not be afraid; for the LORD GOD is my strength and my song, and he has become my salvation.'” — Isaiah 12:1–2",
    img: "/images/team/lauren-lee.webp",
    section: "designer",
    objectPosition: "center 45%"
  },
  {
    name: "Katie Hwang",
    role: "Clothing Designer",
    major: "Cognitive Science",
    bio: "Spero gives my passions a Gospel-centered purpose. I wanted to be part of the mission that gives people the confidence to proclaim themselves as believers and followers of Christ.",
    favoriteBibleVerse: "“For the mountains may depart and the hills be removed, but my steadfast love shall not depart from you, and my covenant of peace shall not be removed,” says the Lord, who has compassion on you.” — Isaiah 54:10",
    img: "/images/team/katie-hwang.webp",
    section: "designer",
    objectPosition: "center 45%"
  },
  {
    name: "Bella Cha",
    role: "Marketing",
    major: "Cognitive Science",
    bio: "Spero is a community where I can use my passion for creativity to spread the Gospel and connect with others who share the same heart for Christ and His love!",
    favoriteBibleVerse: "“let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith, who for the joy that was set before him endured the cross, despising the shame, and is seated at the right hand of the throne of God.” — Hebrews 12:1–2",
    img: "/images/team/bella-cha.webp",
    section: "marketing",
    objectPosition: "center 45%"
  },
  {
    name: "Cindy Jin",
    role: "Operations",
    major: "Economics",
    bio: "I joined Spero because I want to be part of a Christian community that uses their talents to glorify God through creative work and grow together spiritually. Spero’s mission really resonates with me because it creates opportunities to bring Christ into everyday life and encourages us to walk confidently in our faith through our Scripture-based apparel.",
    favoriteBibleVerse: "“Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.” — Philippians 4:6–7",
    img: "/images/team/cindy-jin.webp",
    section: "operations",
    objectPosition: "center 45%"
  },
  {
    name: "Hailey Cho",
    role: "Operations",
    major: "Psychology",
    bio: "I see Spero as a creative opportunity to use something as universal as clothing to spread the Gospel and God’s goodness across campus. I love how it encourages people to confidently carry Scripture with them wherever they go.",
    favoriteBibleVerse: "“Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you.” — 1 Thessalonians 5:16–18",
    img: "/images/team/hailey-cho.webp",
    section: "operations",
    objectPosition: "center 45%"
  },
  {
    name: "Kaylin Kim",
    role: "Photographer",
    major: "Integrative Biology",
    bio: "I joined Spero because I deeply resonate with the mission of evangelism and want to serve in a community that reflects this heart by using creativity and clothing to share Christ’s love with others.",
    favoriteBibleVerse: "“When I said, 'My foot is slipping,' your unfailing love, Lord, supported me” — Psalm 94:18",
    img: "/images/team/kaylin-kim.webp",
    section: "photographer",
    objectPosition: "center 45%"
  },
  {
    name: "Haram Park",
    role: "Web Developer",
    major: "Computer Science",
    bio: "I joined Spero because designing Christian clothes sounded amazing and I wanted to be a part of such blessed purpose.",
    favoriteBibleVerse: "“…Before Philip called you, when you were under the fig tree, I saw you.” — John 1:48",
    img: "/images/team/haram-park.webp",
    section: "developer",
    objectPosition: "center 45%"
  },
  {
    name: "Ryan Suh",
    role: "Web Developer",
    major: "Data Science",
    bio: "I joined Spero so I can learn how to incorporate my faith into the workplace in college before I head out into the real world.",
    favoriteBibleVerse: "“For the LORD gives wisdom; from his mouth come knowledge and understanding;” — Proverbs 2:6",
    img: "/images/team/ryan-suh.webp",
    section: "developer",
    objectPosition: "center 45%"
  },
  {
    name: 'Ryan Amiri',
    archived: true,
    role: 'Chief Web Developer',
    bio: "Hi, I’m Ryan, a third-year Computer Science student at Northeastern University pursuing a career in AI and software engineering to build useful, trustworthy technology. I joined Spero to create everyday designs that point people to Jesus and to serve my campus with work that reflects my faith. Outside class I run and love to work from cafes with a matcha, my Bible, and my laptop.",
    img: '/images/team/ryan_amiri.webp',
    section: 'developer',
  },
  {
    name: 'Nikhil Verghese',
    archived: true,
    role: 'Chief Web Developer',
    bio: "I'm Nikhil and I am a third year at Northeastern University majoring in CS and Finance. I joined Spero because I want to be a part of a collective that uses their gifts to give glory to God and to share the good news to all students.",
    img: '/images/team/nikhil.webp',
    section: 'developer',
  },
  {
    name: 'Kay Karsono',
    archived: true,
    role: 'Photographer',
    bio: "Hi, I'm Kay, a senior at UC Berkeley. I joined Spero to use my passion for photography to glorify God and share His love through visual storytelling. In my free time, I enjoy exploring new places, capturing moments through my camera, and spending time with friends and family.",
    img: '/images/team/kay.JPG',
    section: 'photographer',
  },
];

export default staffData;
