export interface AboutPhoto {
  /** Stable id for the photo's like count. Changing it starts that photo's count again from zero. */
  id: string;
  src: string;
  alt: string;
  /** CSS object-position, for when a center crop cuts off the subject. Default "center". */
  position?: string;
  /** CSS transform: scale() multiplier, to zoom in on the subject. Default 1. */
  scale?: number;
}

export const ABOUT_PHOTOS: AboutPhoto[] = [
  { id: "about-basketball", src: "/images/about/basketball.jpg", alt: "Playing pickup basketball outdoors", position: "center 30%" },
  { id: "about-dogs", src: "/images/about/dogs.jpg", alt: "My dog chasing a ball across the grass", position: "top" },
  { id: "about-relaxing", src: "/images/about/relaxing.jpg", alt: "Taking a break poolside" },
  { id: "about-money-fair", src: "/images/about/money-fair.jpg", alt: "At The Money Fair, an investing and personal finance event" },
  { id: "about-project-defense", src: "/images/about/project-defense.jpg", alt: "Celebrating project defense day with classmates at Pan-Atlantic University", position: "top" },
  { id: "about-formal-suit", src: "/images/about/formal-suit.jpg", alt: "Dressed up for a formal occasion", position: "center 15%", scale: 1.4 },
  { id: "about-gym-mirror", src: "/images/about/gym-mirror.jpg", alt: "Mirror selfie after a workout", position: "top" },
  { id: "about-video-call", src: "/images/about/video-call.jpg", alt: "About to join a video call on my laptop", position: "top" },
];
