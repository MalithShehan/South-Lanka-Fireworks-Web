// Products.jsx
import React, { useState } from "react";
import items from "./Items";
import jsPDF from "jspdf";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const productVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const Products = () => {
  const [customPackageItems, setCustomPackageItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [invoiceTo, setInvoiceTo] = useState("");

  const cartCount = customPackageItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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

    setToastMessage(`${item.name} (${sizeObj.size}) added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const removeFromCustomPackage = (item) => {
    setCustomPackageItems(
      customPackageItems.filter(
        (i) => !(i.id === item.id && i.size === item.size)
      )
    );
  };

  const updateCustomPackageQty = (item, qty) => {
    setCustomPackageItems(
      customPackageItems.map((i) =>
        i.id === item.id && i.size === item.size ? { ...i, quantity: qty } : i
      )
    );
  };

  const subTotal = customPackageItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const discountValue = Number(discount) || 0;
  const totalAfterDiscount = Math.max(subTotal - discountValue, 0);

  // Helper: compress small icons/images only (not logo or background)
  const loadCompressedImage = (url, maxWidth = 600) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");

        // ✅ Keep transparency (no background fill)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Use PNG to preserve alpha transparency
        const dataURL = canvas.toDataURL("image/png", 0.9);
        resolve(dataURL);
      };
      img.onerror = () => resolve(null);
    });

  // Generate PDF
  const generateReport = async () => {
    if (customPackageItems.length === 0) {
      alert("No items selected!");
      return;
    }

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    doc.setFont("helvetica", "normal");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Load images
    const [bgImg, logoImg] = await Promise.all([
      loadImageAsBase64("/assets/invoice-bg.png"),
      loadImageAsBase64("/assets/SouthLankaFireworks.png"),
    ]);

    const [regIcon, personIcon, addressIcon, phoneIcon, emailIcon, webIcon] =
      await Promise.all([
        loadCompressedImage("/assets/icon-reg.png"),
        loadCompressedImage("/assets/icon-person.png"),
        loadCompressedImage("/assets/icon-address.png"),
        loadCompressedImage("/assets/icon-phone.png"),
        loadCompressedImage("/assets/icon-email.png"),
        loadCompressedImage("/assets/icon-web.png"),
      ]);

    // Background and logo
    if (bgImg) doc.addImage(bgImg, "PNG", 0, 0, pageWidth, pageHeight);
    doc.setFillColor(0, 47, 108);
    doc.rect(0, 0, pageWidth, 25, "F");
    if (logoImg) doc.addImage(logoImg, "PNG", 10, 3, 25, 20);

    // Header text
    doc.setFontSize(30);
    doc.setFont("helvetica", "thin");
    doc.setTextColor(255, 255, 255);
    doc.text("South Lanka Fireworks", pageWidth / 2, 16, { align: "center" });
    doc.setFontSize(14);
    doc.text("INVOICE", pageWidth - 15, 15, { align: "right" });

    // Company details
    let y = 32;
    const iconSize = 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0);

    if (regIcon)
      doc.addImage(regIcon, "PNG", pageWidth - 72, y - 3, iconSize, iconSize);
    doc.text("Reg.No : SG/5276", pageWidth - 66, y);
    y += 5;

    if (personIcon)
      doc.addImage(
        personIcon,
        "PNG",
        pageWidth - 72,
        y - 3,
        iconSize,
        iconSize
      );
    doc.text("J.W. Chaminda Thushara.", pageWidth - 66, y);
    y += 5;

    if (addressIcon)
      doc.addImage(
        addressIcon,
        "PNG",
        pageWidth - 72,
        y - 3,
        iconSize,
        iconSize
      );
    doc.text("07 Dadalla Cross Road,", pageWidth - 66, y);
    y += 5;
    doc.text("Dadalla, Galle.", pageWidth - 66, y);
    y += 5;

    if (phoneIcon)
      doc.addImage(phoneIcon, "PNG", pageWidth - 72, y - 3, iconSize, iconSize);
    doc.text("077 713 5516 / 091 224 6572", pageWidth - 66, y);
    y += 5;

    if (emailIcon)
      doc.addImage(emailIcon, "PNG", pageWidth - 72, y - 3, iconSize, iconSize);
    doc.text("southlankafireworks@gmail.com", pageWidth - 66, y);
    y += 5;

    if (webIcon)
      doc.addImage(webIcon, "PNG", pageWidth - 72, y - 3, iconSize, iconSize);
    doc.text("www.slfireworks.com", pageWidth - 66, y);

    y = 36;
    doc.setFontSize(12);
    doc.text("Invoice to :", 14, y);
    const text = invoiceTo;
    const x = 35;

    doc.text(text, x, y);

    const textWidth = doc.getTextWidth(text);

    // Draw a line just under the text
    doc.setLineWidth(0.2); // Optional: thinner line
    doc.line(x, y + 1, x + textWidth, y + 1);
    y += 7;
    doc.text("Date :", 14, y);
    doc.text(`${new Date().toLocaleDateString()}`, 26, y);

    // Table header
    y += 24;
    doc.setFillColor(0, 153, 102);
    doc.setTextColor(255, 255, 255);
    doc.rect(14, y, pageWidth - 28, 8, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("No", 18, y + 6);
    doc.text("Item Description", 40, y + 6);
    doc.text("Qty", 110, y + 6);
    doc.text("Price", 140, y + 6);
    doc.text("Total", 175, y + 6);

    // Table body
    y += 15;
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    customPackageItems.forEach((item, index) => {
      const total = item.price * item.quantity;
      doc.text(String(index + 1).padStart(2, "0"), 18, y);
      doc.text(item.name + (item.size ? ` (${item.size})` : ""), 30, y);
      doc.text(String(item.quantity), 112, y, { align: "center" });
      doc.text(`Rs. ${item.price.toLocaleString()}`, 155, y, {
        align: "right",
      });
      doc.text(`Rs. ${total.toLocaleString()}`, 190, y, { align: "right" });
      y += 8;
    });

    // Totals
    y += 5;
    doc.line(14, y, pageWidth - 14, y);
    y += 8;
    doc.setFillColor(212, 212, 212);
    doc.rect(pageWidth - 80, y - 6, 65, 10, "F");
    doc.text(`Sub Total: Rs. ${subTotal.toLocaleString()}`, pageWidth - 20, y, {
      align: "right",
    });
    y += 8;
    doc.setFillColor(212, 212, 212);
    doc.rect(pageWidth - 80, y - 6, 65, 10, "F");
    doc.text(
      `Discount: Rs. ${discountValue.toLocaleString()}`,
      pageWidth - 20,
      y,
      { align: "right" }
    );
    y += 8;
    doc.setFillColor(255, 204, 0);
    doc.rect(pageWidth - 80, y - 6, 65, 10, "F");
    doc.setTextColor(0);
    doc.text(
      `Total: Rs. ${totalAfterDiscount.toLocaleString()}`,
      pageWidth - 20,
      y,
      { align: "right" }
    );

    // Footer
    doc.setFillColor(0, 47, 108);
    doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(
      "Thank you for choosing South Lanka Fireworks!",
      pageWidth / 2,
      pageHeight - 8,
      { align: "center" }
    );

    doc.save(`${pdfName}.pdf`);
  };

  // High-quality loader for logo/bg
  const loadImageAsBase64 = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        canvas.width = pageWidth * 4; // scale to reduce distortion
        canvas.height = pageHeight * 4;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
    });

  return (
    <section
      className="text-black py-12 px-4 md:px-12 min-h-screen bg-gradient-to-b"
      id="products"
    >
      <Helmet>
        <title>South Lanka Fireworks - Products</title>
      </Helmet>

      {cartCount > 0 && (
        <div
          className="fixed top-20 right-5 z-50 flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full cursor-pointer"
          onClick={() =>
            document
              .getElementById("custom-package")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ShoppingCart size={24} className="text-blue-500" />
          <span className="font-bold text-blue-600">{cartCount}</span>
        </div>
      )}

      {showToast && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-2 left-2 sm:left-5 z-50 w-[85vw] sm:w-80 bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl"
          >
            <h4 className="font-semibold">Success!</h4>
            <p>{toastMessage}</p>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Individual Fireworks
        </h2>
        <p className="text-gray-500 max-w-3xl mx-auto">
          Explore and build your own custom firework package!
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white/60 rounded-xl p-4 border border-gray-200 shadow-lg hover:scale-105 transition"
              variants={productVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-700">
                {item.name}
              </h3>
              <ul className="text-red-500 font-semibold text-sm">
                {item.sizes.map(({ size, price }) => (
                  <li key={size}>
                    💥 {size} - LKR {price}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {item.sizes.map((sizeObj, index) => (
                  <button
                    key={index}
                    onClick={() => addToCustomPackage(item, sizeObj)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Add {sizeObj.size}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mb-16 bg-white p-6 rounded-2xl shadow-md"
        id="custom-package"
      >
        <h3 className="text-2xl font-bold mb-4 text-pink-500">
          📦 Your Custom Package
        </h3>
        {customPackageItems.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border text-center text-sm">
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
                    <tr key={idx} className="border-t hover:bg-gray-50">
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
                      <td className="p-2 text-red-500 font-semibold">
                        Rs.{item.price * item.quantity}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => removeFromCustomPackage(item)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Enter customer name"
                value={invoiceTo}
                onChange={(e) => setInvoiceTo(e.target.value)}
                className="flex-1 border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Enter PDF name (optional)"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                className="flex-1 border rounded-lg p-2"
              />
              <input
                type="number"
                placeholder="Enter Discount (Rs)"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="flex-1 border rounded-lg p-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <h3 className="text-lg font-semibold text-pink-500">
                Total after discount: Rs.{totalAfterDiscount}
              </h3>
              <button
                onClick={generateReport}
                className="mt-2 sm:mt-0 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                📝 Download PDF
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
