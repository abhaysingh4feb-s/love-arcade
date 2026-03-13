export interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  intro: string;
  completion: string;
  color: string;
}

export const levels: LevelData[] = [
  {
    id: 1,
    title: "Memory Match",
    subtitle: "The moments that built us",
    icon: "🧠",
    intro: "Let's start with the moments that built us.",
    completion: "Every memory with you is my favorite.",
    color: "#F472B6",
  },
  {
    id: 2,
    title: "Love Quiz",
    subtitle: "How well do you know us?",
    icon: "💝",
    intro: "Let's see how well you know the little things.",
    completion: "See? We're kind of perfect.",
    color: "#E6A57E",
  },
  {
    id: 3,
    title: "Catch the Hearts",
    subtitle: "Catch the love I throw at you",
    icon: "💕",
    intro: "Catch the love I keep throwing at you.",
    completion: "I'd catch you every time.",
    color: "#FB7185",
  },
  {
    id: 4,
    title: "Love Timeline",
    subtitle: "Our story in order",
    icon: "📖",
    intro: "Our story deserves a timeline.",
    completion: "Look how far we've come.",
    color: "#A78BFA",
  },
  {
    id: 5,
    title: "Fix My Heart",
    subtitle: "Piece it back together",
    icon: "💗",
    intro: "Thank you for loving me on difficult days.",
    completion: "You've always handled my heart with care.",
    color: "#F472B6",
  },
  {
    id: 6,
    title: "Choose Our Date",
    subtitle: "Where shall we go?",
    icon: "🌹",
    intro: "No matter where we go… as long as it's with you.",
    completion: "It's a date then.",
    color: "#FACC15",
  },
  {
    id: 7,
    title: "Compliment Bubbles",
    subtitle: "Pop to reveal",
    icon: "✨",
    intro: "You are my safe place.",
    completion: "And I mean every single word.",
    color: "#34D399",
  },
  {
    id: 8,
    title: "Love Meter",
    subtitle: "How much do I love you?",
    icon: "❤️‍🔥",
    intro: "It overflows… every time I think of you.",
    completion: "Off the charts. Always.",
    color: "#EF4444",
  },
  {
    id: 9,
    title: "Final Confession",
    subtitle: "The big moment",
    icon: "💎",
    intro: "There are thousands of people in the world…",
    completion: "You never stopped being my favorite person.",
    color: "#E6A57E",
  },
];
