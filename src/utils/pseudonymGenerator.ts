
const adjectives = [
  "dreamy", "analog", "vintage", "classic", "timeless", "retro", "nostalgic",
  "creative", "mystic", "gentle", "quiet", "cosmic", "mindful", "peaceful"
];

const nouns = [
  "typewriter", "camera", "journal", "polaroid", "vinyl", "letter",
  "postcard", "darkroom", "notebook", "telescope", "compass", "manuscript"
];

export const generatePseudonym = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  
  return `${adjective}_${noun}_${number}`;
};
