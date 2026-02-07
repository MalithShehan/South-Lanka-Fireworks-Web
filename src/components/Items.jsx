import { asset } from "../lib/assetPath";

const items = [
  {
    id: 1,
    name: "Red Color Shell",
    image: asset("/assets/RedShell.webp"),
    video: asset("/assets/RedShellVideo.mp4"),
    description:
      "A dazzling red aerial burst that lights up the night sky — perfect for grand finales and festive highlights.",
    sizes: [
      { size: "3 inch", price: 1500 },
      { size: "4 inch", price: 2400 },
    ],
    hoverColor: "hover:shadow-red-400/70",
  },
  {
    id: 2,
    name: "Yellow Color Shell",
    image: asset("/assets/YellowShell.webp"),
    video: asset("/assets/YellowShell.mp4"),
    description:
      "A bright yellow aerial shell that bursts into a stunning display — perfect for celebrations and festive occasions.",
    sizes: [
      { size: "3 inch", price: 1500 },
      { size: "4 inch", price: 2400 },
    ],
    hoverColor: "hover:shadow-yellow-400/70",
  },
  
  {
    id: 3,
    name: "Green Shell",
    image: asset("/assets/GreenShell.webp"),
    video: asset("/assets/GreenShell.mp4"),
    description: "Bright green bursts with a vibrant, lively effect.",
    sizes: [
      { size: "3 inch", price: 1500 },
      { size: "4 inch", price: 2400 },
    ],
    hoverColor: "hover:shadow-green-400/70",
  },
  {
    id: 4,
    name: "Gold Shell",
    image: asset("/assets/GoldShell.webp"),
    video: asset("/assets/GoldShell.mp4"),
    description: "Classic golden bloom with a smooth, quiet finish.",
    sizes: [{ size: "4 inch", price: 2400 }],
    hoverColor: "hover:shadow-amber-400/70",
  },
  {
    id: 5,
    name: "Purple Shell",
    image: asset("/assets/PurpleShell.webp"),
    video: asset("/assets/PurpleShell.mp4"),
    description: "Soft purple bursts with a graceful bloom effect.",
    sizes: [{ size: "4 inch", price: 2400 }],
    hoverColor: "hover:shadow-purple-400/70",
  },
  {
    id: 6,
    name: "Crackling Gold Shell",
    image: asset("/assets/CracklingShell.webp"),
    video: asset("/assets/CracklingShell.mp4"),
    description:
      "Ignites the sky with golden crackles and a shimmering rain effect — perfect for adding dramatic flair to any show.",
    sizes: [{ size: "4 inch", price: 2400 }],
    hoverColor: "hover:shadow-yellow-400/70",
  },
  {
    id: 7,
    name: "White Shell",
    image: asset("/assets/WhiteShell.webp"),
    video: asset("/assets/WhiteShell.mp4"),
    description: "Elegant white bursts with a sparkling finish.",
    sizes: [{ size: "4 inch", price: 2400 }],
    hoverColor: "hover:shadow-gray-500/70",
  },
  {
    id: 8,
    name: "Blue Shell",
    image: asset("/assets/BlueShell.webp"),
    video: asset("/assets/BlueShell.mp4"),
    description: "Stunning blue bursts with a cool, calming effect.",
    sizes: [{ size: "4 inch", price: 2400 }],
    hoverColor: "hover:shadow-blue-400/70",
  },
  {
    id: 9,
    name: "Silver Shell",
    image: asset("/assets/SilverShell.webp"),
    video: asset("/assets/SilverShell.mp4"),
    description: "Elegant silver bursts with a sparkling finish.",
    sizes: [{ size: "3 inch", price: 1500 }],
    hoverColor: "hover:shadow-gray-400/70",
  },
  {
    id: 10,
    name: "Star Shell Battery",
    image: asset("/assets/MultiColorShell.webp"),
    video: asset("/assets/MultiColorShell.mp4"),
    description:
      "A vibrant mix of colors bursting in the sky, firing 3 shells at once for a grand display.",
    sizes: [{ size: "Free Size", price: 5000 }],
    hoverColor: "hover:shadow-pink-400/70",
  },
  {
    id: 11,
    name: "Water Fall",
    image: asset("/assets/WaterFall.webp"),
    video: asset("/assets/WaterFall.mp4"),
    description:
      "A beautiful silver cascade combo ideal for weddings and special events.",
    sizes: [{ size: "Free Size", price: 2500 }],
    hoverColor: "hover:shadow-sky-400/70",
  },
  {
    id: 12,
    name: "Silver Rocket Battery",
    image: asset("/assets/SilverRocketBattery.webp"),
    video: asset("/assets/SilverRocketBattery.mp4"),
    description:
      "A stunning silver rocket battery that lights up the sky with cascading effects.",
    sizes: [{ size: "Free Size", price: 1800 }],
    hoverColor: "hover:shadow-gray-300/70",
  },
  {
    id: 13,
    name: "Coconut Tree",
    image: asset("/assets/CoconutTree.webp"),
    video: asset("/assets/CoconutTree.mp4"),
    description:
      "Coconut Magic Blossom — a beautiful coconut tree effect in a single brilliant color.",
    sizes: [{ size: "Free Size", price: 900 }],
    hoverColor: "hover:shadow-orange-400/70",
  },
  {
    id: 14,
    name: "Name & Logo",
    image: asset("/assets/NameLogo.webp"),
    video: asset("/assets/NameLogo.mp4"),
    description: "Custom fireworks display featuring your name or logo.",
    sizes: [{ size: "Free Size", price: 14000 }],
    hoverColor: "hover:shadow-yellow-500/70",
  },
];

export default items;
