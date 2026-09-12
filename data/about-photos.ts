export interface AboutPhoto {
  src: string;
  alt: string;
  /** CSS object-position, for when a center crop cuts off the subject. Default "center". */
  position?: string;
}

export const ABOUT_PHOTOS: AboutPhoto[] = [
  { src: "/images/about/basketball.jpg", alt: "Playing pickup basketball outdoors", position: "center 30%" },
  { src: "/images/about/dogs.jpg", alt: "My dog chasing a ball across the grass", position: "top" },
  { src: "/images/about/relaxing.jpg", alt: "Taking a break poolside" },
  { src: "/images/about/money-fair.jpg", alt: "At The Money Fair, an investing and personal finance event" },
  { src: "/images/about/project-defense.jpg", alt: "Celebrating project defense day with classmates at Pan-Atlantic University", position: "top" },
  { src: "/images/about/formal-suit.jpg", alt: "Dressed up for a formal occasion", position: "top" },
  { src: "/images/about/gym-mirror.jpg", alt: "Mirror selfie after a workout", position: "top" },
  { src: "/images/about/with-friends.jpg", alt: "Out with friends", position: "top" },
];
