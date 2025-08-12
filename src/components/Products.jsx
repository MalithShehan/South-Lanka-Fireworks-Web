import React, { useState } from "react";
import { motion } from "framer-motion";
import { image } from "framer-motion/client";

const productVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const items = [
  {
    id: 1,
    name: "Red Color Shell",
    image: "/assets/RedShell.jpg",
    video: "/assets/RedShellVideo.mp4", // Add your video path here
    description:
      "A dazzling red aerial burst that lights up the night sky — perfect for grand finales and festive highlights.",
    sizes: [
      { size: "Medium", price: 1500 },
      { size: "Large", price: 2400 },
    ],
    hoverColor: "hover:shadow-red-400/70",
  },
  {
    id: 2,
    name: "Crackling Gold Shell",
    image: "/assets/CracklingShell.jpg",
    video: "/assets/CracklingShell.mp4",
    description:
      "Ignites the sky with golden crackles and a shimmering rain effect — perfect for adding dramatic flair to any show.",
    sizes: [{ size: "Large", price: 2400 }],
    hoverColor: "hover:shadow-yellow-400/70",
  },
  {
    id: 3,
    name: "Gold Shell",
    image: "/assets/GoldShell.jpg",
    video: "/assets/GoldShell.mp4",
    description: "Classic golden bloom with a smooth, quiet finish.",
    sizes: [{ size: "Large", price: 2400 }],
    hoverColor: "hover:shadow-amber-400/70",
  },
  {
    id: 4,
    name: "Purple Shell",
    image: "/assets/PurpleShell.jpg",
    video: "/assets/PurpleShell.mp4",
    description: "Soft purple bursts with a graceful bloom effect.",
    sizes: [{ size: "Large", price: 2400 }],
    hoverColor: "hover:shadow-purple-400/70",
  },
  {
    id: 5,
    name: "Green Shell",
    image: "/assets/GreenShell.jpg",
    video: "/assets/GreenShell.mp4",
    description: "Bright green bursts with a vibrant, lively effect.",
    sizes: [
      { size: "Medium", price: 1500 },
      { size: "Large", price: 2400 },
    ],
    hoverColor: "hover:shadow-green-400/70",
  },
  {
    id: 6,
    name: "White Shell",
    image: "/assets/WhiteShell.jpg",
    video: "/assets/WhiteShell.mp4",
    description: "Elegant white bursts with a sparkling finish.",
    sizes: [{ size: "Large", price: 2400 }],
    hoverColor: "hover:shadow-gray-500/70",
  },
  {
    id: 7,
    name: "Blue Shell",
    image: "/assets/BlueShell.jpg",
    video: "/assets/BlueShell.mp4",
    description: "Stunning blue bursts with a cool, calming effect.",
    sizes: [{ size: "Large", price: 2400 }],
    hoverColor: "hover:shadow-blue-400/70",
  },
  {
    id: 8,
    name: "Silver Shell",
    image: "/assets/SilverShell.jpg",
    video: "/assets/SilverShell.mp4",
    description: "Elegant silver bursts with a sparkling finish.",
    sizes: [{ size: "Medium", price: 1500 }],
    hoverColor: "hover:shadow-gray-400/70",
  },
  {
    id: 9,
    name: "Star Shell Battery",
    image: "/assets/MultiColorShell.jpg",
    video: "/assets/MultiColorShell.mp4",
    description: "A vibrant mix of colors bursting in the sky.",
    sizes: [{ size: "Free ", price: 5000 }],
    hoverColor: "hover:shadow-pink-400/70",
  },
  {
    id: 10,
    name: "Water Fall",
    image: "/assets/WaterFall.jpg",
    video: "/assets/WaterFall.mp4",
    description: "A beautiful silver cascade combo ideal for weddings.",
    sizes: [{ size: "Free Size", price: 2500 }],
    hoverColor: "hover:shadow-sky-400/70",
  },
  {
    id: 11,
    name: "Silver Rocket Battery",
    image: "/assets/SilverRocketBattery.jpg",
    video: "/assets/SilverRocketBattery.mp4",
    description:
      "A stunning silver rocket battery that lights up the sky with cascading effects.",
    sizes: [{ size: "Free Size", price: 1800 }],
    hoverColor: "hover:shadow-gray-300/70",
  },
  {
    id: 12,
    name: "Coconut Tree",
    image: "/assets/CoconutTree.jpg",
    video: "/assets/CoconutTree.mp4",
    description: "Festive palm bursts and brilliant red shells.",
    sizes: [{ size: "Free Size", price: 900 }],
    hoverColor: "hover:shadow-orange-400/70",
  },
  {
    id: 13,
    name: "Name & Logo",
    image: "/assets/NameLogo.jpg",
    video: "/assets/NameLogo.mp4",
    description: "Custom fireworks display featuring your name or logo.",
    sizes: [{ size: "Free Size", price: 14000 }],
    hoverColor: "hover:shadow-yellow-500/70",
  },
];

const packages = [
  {
    id: 101,
    name: "Basic Package",
    description: "A beautiful silver cascade combo ideal for weddings.",
    items: [
      { name: "Water Fall", price: 2500, quantity: 2 },
      { name: "Gold Shell", price: 2400, quantity: 2 },
    ],
    discount: 1000,
    bgColor: "bg-blue-200/50",
    hoverColor: "hover:shadow-sky-400/70",
  },
  {
    id: 102,
    name: "Standard Package",
    description: "Festive palm bursts and brilliant red shells.",
    items: [
      { name: "Coconut Tree", price: 900, quantity: 3 },
      { name: "Red Shell", price: 1500, quantity: 2 },
    ],
    discount: 700,
    bgColor: "bg-yellow-200/50",
    hoverColor: "hover:shadow-orange-400/70",
  },
  {
    id: 103,
    name: "Premium Package",
    description: "A vibrant selection of shells and fountaining effects.",
    items: [
      { name: "Purple Shell", price: 2400, quantity: 1 },
      { name: "Green Shell", price: 2400, quantity: 2 },
      { name: "Silver Shell", price: 1500, quantity: 2 },
    ],
    discount: 1200,
    bgColor: "bg-red-200/50",
    hoverColor: "hover:shadow-pink-400/70",
  },
];

const renderPackageCard = (pack) => {
  const subtotal = pack.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - pack.discount;

  return (
    <motion.div
      key={pack.id}
      className={`${pack.bgColor} backdrop-blur-sm rounded-xl p-5 border border-black/10 shadow-lg transition duration-300 cursor-pointer ${pack.hoverColor}`}
      variants={productVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-semibold mb-2 text-black">{pack.name}</h3>
      <p className="text-gray-500 mb-4 text-sm">{pack.description}</p>

      <p className="text-indigo-400 font-semibold mb-2">Includes:</p>
      <ul className="text-gray-500 text-sm list-disc list-inside mb-4">
        {pack.items.map((item, idx) => (
          <li key={idx}>
            {item.name} - {item.quantity} × LKR {item.price.toLocaleString()} ={" "}
            <span className="text-red-400 font-semibold">
              LKR {(item.price * item.quantity).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-sm mt-4 text-gray-600 space-y-1">
        <p>
          <span className="text-gray-500">Subtotal: </span>
          <span className="text-blue-500 font-bold">
            LKR {subtotal.toLocaleString()}
          </span>
        </p>
        <p>
          <span className="text-gray-500">Discount: </span>
          <span className="text-pink-500 font-bold">
            - LKR {pack.discount.toLocaleString()}
          </span>
        </p>
        <p>
          <span className="text-gray-500">Total: </span>
          <span className="text-red-500 font-bold text-lg">
            LKR {total.toLocaleString()}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

const Packages = () => {
  const grandTotal = packages.reduce(
    (sum, pack) =>
      sum +
      pack.items.reduce((s, item) => s + item.price * item.quantity, 0) -
      pack.discount,
    0
  );

  // We'll store hovered id in state to know which item is hovered
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="text-black py-16 px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black   mb-4">
          Individual Fireworks & Firework Packages
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explore our exclusive firework package deals and individual fireworks.
        </p>
      </div>

      {/* Individual Fireworks */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-2xl font-semibold text-pink-400 mb-6 text-center">
          🎆 Individual Fireworks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-gradient-to-r from-yellow-100/50 via-red-200/50 to-green-50-300/50 backdrop-blur-sm rounded-xl p-5 border border-black/10 shadow-lg transition duration-300 cursor-pointer ${item.hoverColor}`}
              variants={productVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative w-full h-48 mb-4 border border-white/10 rounded-md overflow-hidden">
                {hoveredId === item.id && item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-600">
                {item.name}
              </h3>
              <p className="text-gray-500 mb-2 text-sm">{item.description}</p>

              <ul className="text-red-500 font-bold list-inside">
                {item.sizes.map(({ size, price }) => (
                  <li key={size}>
                    💥 {size} - LKR {price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-pink-400 mb-6 text-center">
          🎁 Firework Packages
        </h3> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {packages.map((pack) => renderPackageCard(pack))}
        </div>

        {/* Added text below packages */}
        <p className="text-center mt-6 text-gray-600 italic">
          Customize your own fireworks package to make your celebration truly unique!
        </p>
      </div>
    </section>
  );
};

export default Packages;
