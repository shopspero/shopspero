import { Container } from '@chakra-ui/react';
import SOFCard, { SOFPOSITION } from '@/components/SOFCard';

export const metadata = {
  title: 'Statement of Faith - Spero',
};

import "./statement-of-faith.css"

const sofCards = [
  {
    id: 1,
    title: "The Bible is Inspired by God & Without Error",
    position: SOFPOSITION.LEFT,
    content: `We believe that Almighty God has revealed all that is necessary to life and salvation in the sixty-six books of Holy Scripture, which are the Word of God. The Scriptures of both the Old and New Testaments, being God-breathed, are infallible and inerrant in all their parts and are, therefore, trustworthy in all that they affirm concerning history, science, doctrine, ethics, religious practice, or any other topic. The authority of the Bible is derived from its Author and not from the opinions of men. While we believe in the ongoing power and ministry of the Holy Spirit in regenerating, equipping, illuminating, leading, and teaching God's people, we also believe in the final authority and sufficiency of the Bible over all areas of faith and practice.`
  },
  {
    id: 2,
    title: "There is One True God",
    position: SOFPOSITION.RIGHT,
    content: `We believe in the one true and living God, in three Persons: the Father, the Son and the Holy Spirit, who is invisible, personal, omnipresent, eternal, dependent on none, unchanging, truthful, trustworthy, almighty, sovereign, omniscient, righteous, holy, good, loving, merciful, long-suffering and gracious.`
  },
  {
    id: 3,
    title: "The Lord Jesus Christ is Fully God & Fully Human",
    position: SOFPOSITION.LEFT,
    content: `The Lord Jesus Christ, the Son of God, has always existed. He too is without beginning or end (Revelation 1:8). In order to complete His earthly sacrificial mission, He became human by being born of a virgin, conceived by the Holy Spirit (Matthew 1:23; Luke 1:31, 35). He lived a perfect life, absolutely without sin (Hebrews 7:26; 1 Peter 2:22). While on earth He worked many miracles through the anointing of the Holy Spirit (Acts 2:22, 10:38). In order to restore fallen mankind, He died on the cross as a substitute for the sins of every person (1 Corinthians 15:3, 2 Corinthians 5:21). He was raised from the dead by the supernatural power of God (Matthew 28:6; Luke 24:38, 1 Corinthians 6:14, 15:4). Since His resurrection He has been exalted, and is seated at the right hand of God (Acts 1:9, 11, 2:33; Philippians 2:9-11; Hebrews 1:3).`
  },
  {
    id: 4,
    title: "The Fall of Humankind in Sin",
    position: SOFPOSITION.RIGHT,
    content: "\"Just as through one man sin entered into the world, and death through sin, and so sin spread through all men\" (Romans 5:12). One of the immediate effects of the Fall was that mankind was separated from God. In the Garden of Eden, Adam and Eve had perfect communion and fellowship with God. When they rebelled against Him, that fellowship was broken. Because of the Fall, death became a reality, and all creation was subject to it. \"For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.\" (Romans 6:23)"
  },
  {
    id: 5,
    title: "The Salvation of Humankind in Christ",
    position: SOFPOSITION.LEFT,
    content: "God made a way through His Son, Jesus Christ. Romans 5:8 says, \"But God demonstrates His own love for us in that while we were still sinners Christ died for us!\" You receive this gift of salvation by faith alone. Ephesians 2:8 says, \"For by grace you are saved, through faith, and this not from yourselves; it is God's gift-not from works, so that no one can boast.\" Jesus Christ died in our place when He was crucified on the cross. We deserved to be the ones placed on that cross to die because we are the ones who live sinful lives. But Christ took the punishment on Himself in our place—He substituted Himself for us and took what we rightly deserved. \"God made him who had no sin to be sin for us, so that in him we might become the righteousness of God\" (2 Corinthians 5:21)."
  },
  {
    id: 6,
    title: "The Role of the Holy Spirit",
    position: SOFPOSITION.RIGHT,
    content: "The Holy Spirit is the seal of man's salvation (John 14:26-27; Eph. 1:13). He teaches us (John 16:13) and brings revelation to us (John 14:26; Rom. 8:26-27). He also works out sanctification in our lives by God's Word, helping us become more like Jesus (Eph. 5:26; 1 Pet. 1:2); and gives spiritual gifts to us so that we might represent God's kingdom to the fullest within our communities (Acts 2:1-21; 1 Cor. 12:4-11; Acts 4:27-31; Heb. 2:2-4; Eph. 4:7-16; 1 Pet. 4:10-11)."
  },
  {
    id: 7,
    title: "The Blessed Hope of Christ's Return",
    position: SOFPOSITION.LEFT,
    content: "Titus 2:12–13 teaches us \"to live self-controlled, upright and godly lives in this present age, while we wait for the blessed hope—the appearance of the glory of our great God and Savior, Jesus Christ.\" We will be blessed beyond measure when we see Christ. The trials of this life will be over, and we will see that \"our present sufferings are not worth comparing with the glory that will be revealed in us\" (Romans 8:18). The bodies of those who have died will be raised to be joined with their souls, and then the bodies of those believers still living on earth will be changed into a body like the Lord's resurrection body."
  }
];

export default function Page() {
  return (
    <div className={"sof-page"}>
      <span className={"sof-header"}>
        Statement of Faith
      </span>
      {sofCards.map((card, index) => (
        <div
          className={"sof-card-wrapper" + (index % 2 === 0 ? " sof-left" : " sof-right")}
          key={index}>
          <SOFCard
            id={card.id}
            title={card.title}
            position={card.position}
          >
            {card.content}
          </SOFCard>
        </div>
      ))}
    </div>
  );
}
