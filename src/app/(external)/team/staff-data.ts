export interface StaffInfo {
  name: string;
  role: string;
  bio: string;
  img: string;
  section: string;
  objectPosition?: string;
}

const staffData: StaffInfo[] = [
  {
    name: 'Hogan Kim',
    role: 'Chief Executive Officer',
    bio: "Hi, my name is Hogan and I’m a third-year student at UC Berkeley pursuing Economics and Data Science, passionate about entering corporate finance. My goal for Spero is to create daily Gospel-wear that evangelizes and reminds believers to be the aroma of Christ wherever they go. My hobbies include sports (especially golf), food reviewing, and reading.",
    img: '/images/team/hogan.JPG',
    section: 'executive',
  },
  {
    name: 'Ethan Yang',
    role: 'Chief Operating Officer',
    bio: "Hi! My name is Ethan, and I'm currently studying Computer Science & Data Science at UC Berkeley. Spero is something I'm deeply passionate about, and it's genuinely one of the few things I love to pour my time and effort into. I truly believe that our clothing can open opportunities for Christians to share the Gospel truth to others, which I've personally experienced firsthand. Beyond that, my hope is that wearing Spero would serve as a constant reminder of His goodness and to be the aroma of Christ wherever we go.",
    img: '/images/team/ethan.JPG',
    section: 'executive',
  },
  {
    name: 'Michael Dai',
    role: 'Chief Financial Officer',
    bio: "Hi, my name is Michael and I am a second year at Berkeley triple majoring in Electrical Engineering and Computer Science, Data Science, and Economics. My hobbies are baking, cooking, and going to the gym. It has been a joy to use God-given talents to spread His word. I hope that Spero will be a source of expression for Christian students on campus to share their faith in Jesus.",
    img: '/images/team/michael.JPG',
    section: 'executive',
  },
  {
    name: 'Abi Cho',
    role: 'Chief Marketing Officer',
    bio: "Hi, my name is Abi, and I’m a second year majoring in Legal Studies at UC Berkeley, hoping to become a lawyer in the future. I saw Spero as an avenue of witnessing through the clothing they make, and I joined because I wanted to use my interest in fashion to serve in this unique ministry. Outside of school, I really enjoy anything music related.",
    img: '/images/team/abi.JPG',
    section: 'executive',
  },
  {
    name: 'Ryan Amiri',
    role: 'Chief Web Developer',
    bio: "Hi, I’m Ryan, a third-year Computer Science student at Northeastern University pursuing a career in AI and software engineering to build useful, trustworthy technology. I joined Spero to create everyday designs that point people to Jesus and to serve my campus with work that reflects my faith. Outside class I run and love to work from cafes with a matcha, my Bible, and my laptop.",
    img: '/images/team/ryan_amiri.webp',
    section: 'developer',
  },
  {
    name: 'Nikhil Verghese',
    role: 'Chief Web Developer',
    bio: "I'm Nikhil and I am a third year at Northeastern University majoring in CS and Finance. I joined Spero because I want to be a part of a collective that uses their gifts to give glory to God and to share the good news to all students.",
    img: '/images/team/nikhil.webp',
    section: 'developer',
  },
  {
    name: 'Chloe Lee',
    role: 'Clothing Designer',
    bio: "Hi! My name is Chloe, and I’m a first-year student at UC Berkeley majoring in Nutrition and Metabolic Biology, with plans to pursue a career in dentistry. Through Spero, I hope to grow deeper in my walk with Christ and glorify His name by sharing His love with others. In my free time, I enjoy reading, watching good movies, and thrifting.",
    img: '/images/team/Chloe.JPG',
    section: 'designer',
    objectPosition: 'center 15%',
  },
  {
    name: 'Lauren Lee',
    role: 'Clothing Designer',
    bio: "Hi, my name is Lauren and I'm a first year majoring in Chemistry at UC Berkeley on a pre-med track. I joined Spero because I want to help fulfill the Great Commission that our Father has called us in to. I hope I can make designs for Spero that profess faith and begin gospel-centered conversations. Outside of class, I enjoy watching films, playing the bass, and baking.",
    img: '/images/team/lauren.JPG',
    section: 'designer',
    objectPosition: 'center 15%',
  },
  {
    name: 'Sharon Choi',
    role: 'Clothing Designer',
    bio: "Hello! My name is Sharon, and I'm studying English & Film at UC Berkeley. I enjoy worshipping our God through artistic mediums, which is why I find Spero's blend of creative expression and evangelism so rewarding. I pray that through our pieces, we will make visible even the smallest glimmer of our Father's beauty to those who have not yet met Him. Aside from design, I love storytelling, sketching, and playing the drums.",
    img: '/images/team/sharon.JPG',
    section: 'designer',
  },
  {
    name: 'Bella Cha',
    role: 'Clothing Designer',
    bio: "Hi, my name is Bella, and I'm studying Cognitive Science at UC Berkeley (currently on a gap year), with an interest in pursuing UI/UX design. Spero has allowed me to use clothing as a creative way to reflect and share the Gospel in daily life. In my free time, I enjoy baking, hiking, and exploring new cafes.",
    img: '/images/team/bella_cha.webp',    
    section: 'designer',
    objectPosition: 'center 65%',
  },
  {
    name: 'Mabel Kim',
    role: 'Admin',
    bio: "Hi, I’m Mabel and I’m a first year at UC Berkeley studying Integrative Biology and Business. My interests include exploring, eating, and reading. I deeply resonate with Spero’s mission and heart for evangelism and pray that our clothing can be one way to spread His good word on campus!",
    img: '/images/team/mabel.JPG',
    section: 'admin',
  },
  {
    name: 'Kay Karsono',
    role: 'Photographer',
    bio: "Hi, I'm Kay, a senior at UC Berkeley. I joined Spero to use my passion for photography to glorify God and share His love through visual storytelling. In my free time, I enjoy exploring new places, capturing moments through my camera, and spending time with friends and family.",
    img: '/images/team/kay.JPG',
    section: 'photographer',
  },
  {
    name: 'Kaylin Kim',
    role: 'Photographer',
    bio: "Hi! My name is Kaylin, and I’m majoring in Integrative Biology at UC Berkeley with hopes of becoming a nurse in the future. I joined Spero because I deeply resonate with the mission of evangelism and wanted to serve in a community that reflects this heart by using creativity and clothing to share Christ’s love with others. Outside of Spero, I love spending quality time with friends, eating yummy food, and of course photography. Through our clothing, I hope we are all encouraged to live boldly in our faith and reflect His love to the people around us!",
    img: '/images/team/Kaylin.JPG',
    section: 'photographer',
  },
];

export default staffData;