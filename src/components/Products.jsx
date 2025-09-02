// Products.jsx
import React, { useState } from "react";
import items from "./Items"; // Your fireworks data
import jsPDF from "jspdf";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const productVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const packages = [
  {
    id: 101,
    name: "🎇 Classic Package",
    description:
      "Great for small family gatherings, birthdays, or religious events.",
    items: [
      { name: "Shells (4 inch)", price: 2400, quantity: 12 },
      { name: "Shells (3 inch)", price: 1500, quantity: 2 },
      { name: "Coconut Tree", price: 900, quantity: 4 },
      { name: "Silver Rocket Battery", price: 1800, quantity: 8 },
      { name: "Water Fall", price: 2500, quantity: 1 },
    ],
    discount: 2300,
    bgColor: "bg-blue-200/50",
    hoverColor: "hover:shadow-sky-400/50",
  },
  {
    id: 102,
    name: "🎇 Premium Package",
    description:
      "Perfect for weddings, anniversaries, and medium-sized events.",
    items: [
      { name: "Shells (4 inch)", price: 2400, quantity: 21 },
      { name: "Silver Rocket Battery", price: 1800, quantity: 10 },
      { name: "Star Shell Battery", price: 5000, quantity: 3 },
      { name: "Coconut Tree", price: 900, quantity: 6 },
      { name: "Name & Logo", price: 14000, quantity: 1 },
      { name: "Water Fall", price: 2500, quantity: 1 },
    ],
    discount: 5300,
    bgColor: "bg-yellow-200/50",
    hoverColor: "hover:shadow-orange-400/50",
  },
  {
    id: 103,
    name: "🎇 Elite Package",
    description:
      "Designed for corporate events, festivals, or large public shows.",
    items: [
      { name: "Shells (4 inch)", price: 2400, quantity: 35 },
      { name: "Silver Rocket Battery", price: 1800, quantity: 10 },
      { name: "Star Shell Battery", price: 5000, quantity: 6 },
      { name: "Coconut Tree", price: 900, quantity: 6 },
      { name: "Name & Logo", price: 14000, quantity: 1 },
      { name: "Water Fall", price: 2500, quantity: 1 },
    ],
    discount: 3900,
    bgColor: "bg-red-200/50",
    hoverColor: "hover:shadow-pink-400/50",
  },
];

const Products = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [customPackageItems, setCustomPackageItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Compute cart count dynamically
  const cartCount = customPackageItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Add item to custom package
  const addToCustomPackage = (item, sizeObj) => {
    const exists = customPackageItems.find(
      (i) => i.id === item.id && i.size === sizeObj.size
    );
    if (exists) {
      setCustomPackageItems(
        customPackageItems.map((i) =>
          i.id === item.id && i.size === sizeObj.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCustomPackageItems([
        ...customPackageItems,
        {
          id: item.id,
          name: item.name,
          size: sizeObj.size,
          price: sizeObj.price,
          quantity: 1,
        },
      ]);
    }

    // Show toast
    setToastMessage(`${item.name} (${sizeObj.size}) added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Remove item from custom package
  const removeFromCustomPackage = (item) => {
    setCustomPackageItems(
      customPackageItems.filter(
        (i) => !(i.id === item.id && i.size === item.size)
      )
    );
  };

  // Update item quantity
  const updateCustomPackageQty = (item, qty) => {
    setCustomPackageItems(
      customPackageItems.map((i) =>
        i.id === item.id && i.size === item.size ? { ...i, quantity: qty } : i
      )
    );
  };

  // Calculate total price
  const customPackageTotal = customPackageItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // Generate PDF report
  const generateReport = () => {
    if (customPackageItems.length === 0) {
      alert("No items selected!");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add Logo
    const logo = "/public/assets/SouthLankaFireworks.png";
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      // Header
      doc.addImage(img, "PNG", 14, 10, 30, 20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setDrawColor(200, 0, 0);
      doc.setTextColor(200, 0, 0);
      doc.text("SOUTH LANKA FIREWORKS", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 30);

      // Quotation Title
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text("Invoice", pageWidth / 2, 40, { align: "center" });

      // Table Header
      let startY = 50;
      doc.setFillColor(240, 240, 240);
      doc.rect(14, startY - 6, pageWidth - 28, 10, "F");

      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text("No.", 16, startY);
      doc.text("Item Name", 30, startY);
      doc.text("Size", 95, startY);
      doc.text("Qty", 125, startY);
      doc.text("Unit Price", 150, startY);
      doc.text("Total", 180, startY);

      // Table Body
      let y = startY + 8;
      customPackageItems.forEach((item, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(14, y - 6, pageWidth - 28, 8, "F");
        }
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        doc.text(`${index + 1}`, 16, y);
        doc.text(item.name, 30, y);
        doc.text(item.size, 95, y);
        doc.text(`${item.quantity}`, 125, y);
        doc.text(`Rs.${item.price}`, 150, y);
        doc.text(`Rs.${item.price * item.quantity}`, 180, y);
        y += 8;
      });

      // Grand Total
      y += 6;
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(14, y, pageWidth - 14, y);
      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 100, 0);
      doc.text(`Grand Total: Rs.${customPackageTotal}`, 150, y, {
        align: "right",
      });

      // Footer / Thank You
      y += 20;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(
        "Thank you for choosing South Lanka Fireworks!",
        pageWidth / 2,
        y,
        { align: "center" }
      );

      doc.save("South_Lanka_Fireworks_Quotation.pdf");
    };
  };

  return (
    <section
      className="text-black py-12 px-4 md:px-12 min-h-screen bg-gradient-to-b"
      id="products"
    >
      {/* Floating Cart */}
      {cartCount > 0 && (
        <div
          className="fixed top-20 right-5 z-50 flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            const section = document.getElementById("custom-package");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ShoppingCart size={24} className="text-blue-500" />
          <span className="font-bold text-blue-600">{cartCount}</span>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            className="fixed top-2 left-2 sm:left-5 z-50 w-[85vw] sm:w-80 md:w-96 lg:w-[400px] 
                 bg-gradient-to-r from-green-500 to-teal-400 text-white px-4 sm:px-6 md:px-8 
                 py-3 sm:py-4 md:py-5 rounded-xl shadow-xl border border-white/20
                 text-xs sm:text-sm md:text-base lg:text-lg"
          >
            <h4 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
              Success!
            </h4>
            <p className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg">
              {toastMessage}
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
          Individual Fireworks & Firework Packages
        </h2>
        <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base">
          Explore our exclusive firework package deals and individual fireworks.
        </p>
      </div>

      {/* Individual Fireworks */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-pink-400 mb-6 text-center">
          🎆 Individual Fireworks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-white/60 backdrop-blur-md rounded-xl p-4 md:p-5 border border-gray-200 shadow-lg transition-transform duration-300 transform hover:scale-105 ${item.hoverColor}`}
              variants={productVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden border border-gray-300">
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

              <h3 className="text-base md:text-lg font-semibold mb-1 text-gray-700">
                {item.name}
              </h3>
              <p className="text-gray-500 mb-2 text-xs md:text-sm">
                {item.description}
              </p>

              <ul className="text-red-500 font-semibold list-inside text-xs md:text-sm">
                {item.sizes.map(({ size, price }) => (
                  <li key={size}>
                    💥 {size} - LKR {price.toLocaleString()}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:gap-3 items-center">
                {item.sizes.map((sizeObj, index) => (
                  <button
                    key={index}
                    onClick={() => addToCustomPackage(item, sizeObj)}
                    className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                  >
                    <ShoppingCart size={12} className="sm:size-6" />
                    Add {sizeObj.size}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Package */}
      <div
        className="max-w-6xl mx-auto mb-16 bg-white p-6 rounded-2xl shadow-md"
        id="custom-package"
      >
        <h3 className="text-2xl font-bold mb-4 text-pink-500">
          📦 Your Custom Package
        </h3>
        {customPackageItems.length === 0 ? (
          <p className="text-gray-500 text-sm md:text-base">
            No items added yet.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border text-center table-auto text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Item</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customPackageItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.size}</td>
                      <td className="p-2">Rs.{item.price}</td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCustomPackageQty(
                              item,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 border rounded p-1 text-center"
                        />
                      </td>
                      <td className="p-2 font-semibold text-red-500">
                        Rs.{item.price * item.quantity}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => removeFromCustomPackage(item)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
              <h3 className="text-lg font-semibold text-pink-500">
                Total: Rs.{customPackageTotal}
              </h3>

              <button
                onClick={generateReport}
                className="
      w-full sm:w-auto
      bg-green-500 text-white 
      px-4 sm:px-6 lg:px-8 
      py-2 sm:py-3 
      rounded-lg 
      text-sm sm:text-base lg:text-lg 
      font-semibold 
      hover:bg-green-600 
      transition 
      shadow-md
    "
              >
                📝 Download PDF
              </button>
            </div>

            <br />
            <div className="w-full bg-pink-50 border border-pink-200 rounded-lg p-3 sm:p-4 text-center">
              {/* Normal description */}
              <p className="text-gray-700 text-sm sm:text-base mb-2">
                You can download your records and easily share them on WhatsApp
                for quick reference. Thank you for choosing us! 🙏
              </p>

              {/* WhatsApp button with icon */}
              <a
                href={`https://wa.me/+94777135516?text=${encodeURIComponent(
                  "Here is your PDF copy for quick reference. Thank you for choosing us!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg shadow-md transition"
              >
                <FaWhatsapp className="text-lg" />
                Send on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>

      {/* Standard Packages */}
      <div className="max-w-7xl mx-auto mb-20 px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          🎆 Firework Packages
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pack) => {
            const subtotal = pack.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            const total = subtotal - pack.discount;

            return (
              <motion.div
                key={pack.id}
                className={`relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 ${pack.bgColor}`}
                variants={productVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>

                {/* Card Content */}
                <div className="relative p-6 flex flex-col h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {pack.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {pack.description}
                  </p>

                  <p className="text-indigo-600 font-semibold mb-2 text-sm">
                    Includes:
                  </p>
                  <ul className="space-y-1 mb-4 text-sm text-gray-700">
                    {pack.items.map((i, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b border-gray-100 pb-1"
                      >
                        <span>
                          {i.name} × {i.quantity}
                        </span>
                        <span className="text-red-500 font-semibold">
                          LKR {(i.price * i.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto space-y-1 text-sm text-gray-700">
                    <p className="flex justify-between">
                      <span className="font-medium">Subtotal:</span>
                      <span className="text-blue-600 font-bold">
                        LKR {subtotal.toLocaleString()}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Discount:</span>
                      <span className="text-pink-500 font-bold">
                        - LKR {pack.discount.toLocaleString()}
                      </span>
                    </p>
                    <p className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                      <span>Total:</span>
                      <span className="text-red-600">
                        LKR {total.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
