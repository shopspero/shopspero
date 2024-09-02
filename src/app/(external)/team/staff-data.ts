export interface StaffInfo {
  name: string;
  role: string;
  bio: string;
  img: string;
}

const staffData: StaffInfo[] = [
  {
    name: 'Will Park',
    role: 'Co-President',
    bio: "Hello I'm Will and I am a first year at UC Berkeley as a pre law student. I love to play volleyball and sports in general. I love Spero and bought their clothing and Sam told me to join so I took the opportunity to do so. I love Jesus!",
    img: '/images/team/will.jpg',
  },
  {
    name: 'Hogan Kim',
    role: 'Co-President',
    bio: "Hi, my name is Hogan and I am a first year at Berkeley majoring in Economics and Data Science. I joined Spero with the goal to bring the Gospel to campus through Christian clothing! My hopes is that Christian clothing would remind people to be more Christ-like, along with starting conversations with many others. I have many hobbies in the fields of Sports( especially golf and basketball), business, and life in general!",
    img: '/images/team/hogan.jpg',
  },
  {
    name: 'Ryan Amiri',
    role: 'Web Development',
    bio: "Hey! I'm Ryan and I am a first year studying Computer Science and minoring in business. I love to play Basketball, Guitar, and watching movies. I joined Spero to use the skills that God has given me to serve Him. I also love Spero's designs and I think it is a great way to spread the Gospel so that more can know of Jesus!",
    img: '/images/team/ryan.jpg',
  },
  // {
  //   name: 'Daniel Lee',
  //   role: 'Operations',
  //   bio: "Howdy Yall! I'm Daniel and I am a 4th year at UC Berkeley majoring in Cognitive Science! I love to play volleyball and Spikeball and love exploring new places in the Bay Area! I joined Spero because I think it is so cool that I can use clothes as a way to have genuine Gospel conversations and love other people!",
  //   img: '/images/team/daniel-lee.jpg',
  // },
  // {
  //   name: 'Jeffrey Liang',
  //   role: 'Web Development',
  //   bio: "Hey! I'm Jeffrey, fourth-year computer science student at UC Berkeley. In my free time, I enjoy listening to podcasts, reading, solving puzzles, and going on long walks or bike rides. I joined Spero to use my skills to share the gospel on our campus.",
  //   img: '/images/team/jeffrey.jpg',
  // },
  {
    name: 'Buiry Min',
    role: 'Design and Photography',
    bio: "Hi, my name is Buiry and I'm a sophomore studying Molecular Environmental Biology at Berkeley. I love hot and sweet coffee in the mornings, reading a book in one sitting, and having late night talks with friends. I'm looking forward to being able to spread the gospel and engage in conversations about Jesus through Spero and the power of fashion!",
    img: '/images/team/buiry.jpg',
  },
  // {
  //   name: 'Daniel Oh',
  //   role: 'Operations and Web Development',
  //   bio: 'Hi! My name is Daniel and I am a senior majoring in Data Science. I enjoy lifting and just chilling with others. I hope that through Spero, Christ will be magnified!',
  //   img: '/images/team/daniel-oh.jpg',
  // },
  {
    name: 'Sarah Ung',
    role: 'Operations',
    bio: "Hi! I'm Sarah and I'm a sophomore majoring in Data Science at Berkeley. My interests include baby kittens, going to cafes, exploring food places, and hanging out with friends! I'm excited to glorify God and proclaim Jesus on this campus through Spero.",
    img: '/images/team/sarah.jpg',
  },
  {
    name: 'Nikhil Verghese',
    role: 'Web Development and Marketing',
    bio: "I'm Nikhil and I am a freshman at Northeastern University pursuing a combined major in CS and Business Administration. I enjoy cooking, music production, piano, and jazz. I joined Spero because I want to be a part of a collective that uses their gifts to give glory to God and to share the good news to other students.",
    img: '/images/team/nikhil.jpg',
  },
];

export default staffData;
