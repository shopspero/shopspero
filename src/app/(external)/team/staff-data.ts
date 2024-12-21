export interface StaffInfo {
  name: string;
  role: string;
  bio: string;
  img: string;
}

const staffData: StaffInfo[] = [
  {
    name: 'Hogan Kim',
    role: 'President',
    bio: "Hi, my name is Hogan and I am a second year at Berkeley majoring in Economics and Data Science. I joined Spero with the goal to bring the Gospel to campus through Christian clothing! My hopes is that Christian clothing would remind people to be more Christ-like, along with starting conversations with many others. I have many hobbies in the fields of Sports (especially golf and basketball), business, and life in general!",
    img: '/images/team/hogan.jpg',
  },
  {
    name: 'Ryan Amiri',
    role: 'Web Development',
    bio: "Hey! I'm Ryan and I am a first year studying Computer Science and minoring in business. I love to play Basketball, Guitar, and watching movies. I joined Spero to use the skills that God has given me to serve Him. I also love Spero's designs and I think it is a great way to spread the Gospel so that more can know of Jesus!",
    img: '/images/team/ryan.jpg',
  },
  {
    name: 'Buiry Min',
    role: 'Design and Photography',
    bio: "Hi, my name is Buiry and I'm a junior studying Molecular Environmental Biology at Berkeley. I love hot and sweet coffee in the mornings, reading a book in one sitting, and having late night talks with friends. I'm looking forward to being able to spread the gospel and engage in conversations about Jesus through Spero and the power of fashion!",
    img: '/images/team/buiry.jpg',
  },
  {
    name: 'Alex Mohammad',
    role: 'Operations',
    bio: "Alex Mohammed, a second-year Business Major at Northeastern University, is passionate about spreading the love of God through clothing. With a focus on brand management and data science, Alex aims to create meaningful fashion that inspires faith and connection.",
    img: '/images/team/alex.jpg',
  },
  {
    name: 'Sarah Ung',
    role: 'Operations',
    bio: "Hi! I'm Sarah and I'm a junior majoring in Data Science at Berkeley. My interests include baby kittens, going to cafes, exploring food places, and hanging out with friends! I'm excited to glorify God and proclaim Jesus on this campus through Spero.",
    img: '/images/team/sarah.jpg',
  },
  {
    name: 'Nikhil Verghese',
    role: 'Web Development',
    bio: "I'm Nikhil and I am a second year at Northeastern University pursuing a combined major in CS and Business Administration. I enjoy cooking, music production, piano, and jazz. I joined Spero because I want to be a part of a collective that uses their gifts to give glory to God and to share the good news to other students.",
    img: '/images/team/nikhil.jpg',
  },
];

export default staffData;