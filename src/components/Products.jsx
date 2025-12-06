// Products.jsx
import React, { useState } from "react";
import items from "./Items"; // Your fireworks data
import jsPDF from "jspdf";
import { ShoppingCart, Sparkles, Boxes, BadgePercent, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
  {
    id: 104,
    name: "🎆 Festival Blast Package",
    description:
      "The ultimate package for large festivals and public displays.",
    items: [
      { name: "Shells (4 inch)", price: 2400, quantity: 70 },
      { name: "Silver Rocket Battery", price: 1800, quantity: 8 },
      { name: "Star Shell Battery", price: 5000, quantity: 8 },
      { name: "Coconut Tree", price: 900, quantity: 6 },
      { name: "Name & Logo", price: 14000, quantity: 1 },
      { name: "Water Fall (100feet)", price: 15000, quantity: 1 },
    ],
    discount: 6800,
    bgColor: "bg-green-200/50",
    hoverColor: "hover:shadow-emerald-400/50",
  },
  {
    id: 105,
    name: "🎆 Grand Celebration Package",
    description:
      "A premium package for grand events, weddings, and large-scale celebrations. Includes a spectacular variety of fireworks for an unforgettable show.",
    items: [
      { name: "Shells (4 inch)", price: 2400, quantity: 100 },
      { name: "Silver Rocket Battery", price: 1800, quantity: 10 },
      { name: "Star Shell Battery", price: 5000, quantity: 12 },
      { name: "Coconut Tree", price: 900, quantity: 8 },
      { name: "Name & Logo", price: 14000, quantity: 1 },
      { name: "Water Fall (100feet)", price: 15000, quantity: 1 },
    ],
    discount: 4200,
    bgColor: "bg-pink-200/50",
    hoverColor: "hover:shadow-rose-400/50",
  },
  {
    id: 106,
    name: "🎆 Ultimate Spectacle Package",
    description:
      "The ultimate package for the most spectacular events and grand celebrations. This package offers an extensive array of fireworks to create a breathtaking display that will leave a lasting impression on your guests.",
    items: [
      { name: "Shells (4 inch)", price: 2400, quantity: 140 },
      { name: "Silver Rocket Battery", price: 1800, quantity: 20 },
      { name: "Star Shell Battery", price: 5000, quantity: 19 },
      { name: "Coconut Tree", price: 900, quantity: 15 },
      { name: "Name & Logo", price: 14000, quantity: 1 },
      { name: "Water Fall (100feet)", price: 15000, quantity: 1 },
    ],
    discount: 9500,
    bgColor: "bg-purple-200/50",
    hoverColor: "hover:shadow-violet-400/50",
  },
];

const categorizeItem = (item) => {
  const name = item.name.toLowerCase();
  if (name.includes("shell")) return "Shells";
  if (name.includes("rocket") || name.includes("battery")) return "Aerial Effects";
  if (name.includes("water fall") || name.includes("coconut")) return "Special FX";
  if (name.includes("name") || name.includes("logo")) return "Custom Shows";
  return "Highlights";
};

const Products = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [customPackageItems, setCustomPackageItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const enhancedItems = items.map((item) => ({
    ...item,
    category: categorizeItem(item),
  }));
  const categories = [
    "All",
    ...Array.from(new Set(enhancedItems.map((item) => item.category))),
  ];
  const filteredItems =
    activeCategory === "All"
      ? enhancedItems
      : enhancedItems.filter((item) => item.category === activeCategory);

  const totalDiscount = packages.reduce((sum, pack) => sum + pack.discount, 0);
  const avgDiscount = packages.length
    ? Math.round(totalDiscount / packages.length)
    : 0;
  const stats = [
    {
      label: "Individual Fireworks",
      value: `${items.length}+`,
      helper: "Ready to mix & match",
      Icon: Sparkles,
    },
    {
      label: "Curated Packages",
      value: `${packages.length}`,
      helper: "Tailored for every event",
      Icon: Boxes,
    },
    {
      label: "Avg. Savings",
      value: `Rs. ${avgDiscount.toLocaleString()}`,
      helper: "Package discounts",
      Icon: BadgePercent,
    },
  ];

  const formatCurrency = (value) => `Rs. ${value.toLocaleString()}`;

  const calculatePackageTotals = (pack) => {
    const subtotal = pack.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal - pack.discount;
    return { subtotal, total };
  };

  const buildPackageSummaryMessage = (pack) => {
    const { subtotal, total } = calculatePackageTotals(pack);
    const lines = [
      `Package: ${pack.name}`,
      pack.description,
      "",
      ...pack.items.map(
        (item, idx) =>
          `${idx + 1}. ${item.name} x${item.quantity} — ${formatCurrency(
            item.price * item.quantity
          )}`
      ),
      "",
      `Subtotal: ${formatCurrency(subtotal)}`,
      `Discount: ${formatCurrency(pack.discount)}`,
      `Total: ${formatCurrency(total)}`,
      "",
      "Shared via South Lanka Fireworks",
    ];
    return lines.join("\n");
  };

  const getPackageWhatsappUrl = (pack) => {
    const message = buildPackageSummaryMessage(pack);
    return `https://wa.me/+94777135516?text=${encodeURIComponent(message)}`;
  };

  const createPackagePdfDoc = (pack) => {
    const { subtotal, total } = calculatePackageTotals(pack);
    const summaryLines = buildPackageSummaryMessage(pack).split("\n");
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    doc.setFillColor(5, 10, 30);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("South Lanka Fireworks", 105, 18, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(pack.name, 105, 42, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(pack.description, 20, 52, { maxWidth: 170 });

    let y = 70;
    doc.setFont("helvetica", "bold");
    doc.text("Includes", 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");

    pack.items.forEach((item, idx) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${idx + 1}. ${item.name} x${item.quantity}`, 20, y);
      doc.text(formatCurrency(item.price * item.quantity), 190, y, {
        align: "right",
      });
      y += 7;
    });

    y += 5;
    doc.setLineWidth(0.4);
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: ${formatCurrency(subtotal)}`, 20, y);
    y += 7;
    doc.text(`Discount: ${formatCurrency(pack.discount)}`, 20, y);
    y += 7;
    doc.text(`Total: ${formatCurrency(total)}`, 20, y);

    y += 12;

    // Inject the same WhatsApp summary text inside the PDF for quick sharing
    const summaryLineHeight = 6;
    const blankLineHeight = 3;
    const summaryHeight =
      summaryLines.reduce(
        (acc, line) =>
          acc + (line.trim().length === 0 ? blankLineHeight : summaryLineHeight),
        0
      ) + 20;

    if (y + summaryHeight > 285) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(209, 213, 219);
    doc.setFillColor(245, 247, 255);
    doc.roundedRect(18, y, 174, summaryHeight, 4, 4, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(5, 10, 30);
    doc.text("WhatsApp Share Summary", 24, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    let summaryY = y + 16;
    summaryLines.forEach((line) => {
      if (line.trim().length === 0) {
        summaryY += blankLineHeight;
      } else {
        doc.text(line, 24, summaryY, { maxWidth: 160 });
        summaryY += summaryLineHeight;
      }
    });

    y = summaryY + 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(
      "Share this PDF on WhatsApp or email to confirm your booking.",
      20,
      y,
      { maxWidth: 170 }
    );

    return doc;
  };

  const downloadPackagePdf = (pack) => {
    const doc = createPackagePdfDoc(pack);
    const safeName = pack.name.replace(/[^a-z0-9]+/gi, "_");
    doc.save(`${safeName}_SouthLankaFireworks.pdf`);
  };

  const sharePackageViaWhatsApp = async (pack) => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      alert("Sharing is not supported in this environment.");
      return;
    }

    try {
      const doc = createPackagePdfDoc(pack);
      const blob = doc.output("blob");
      const safeName = pack.name.replace(/[^a-z0-9]+/gi, "_");
      const file = new File([blob], `${safeName}_SouthLankaFireworks.pdf`, {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: pack.name,
          text: `Check out this fireworks package: ${pack.name}`,
        });
      } else {
        alert(
          "Your device/browser cannot attach files directly to WhatsApp. Please download the PDF and share it manually."
        );
      }
    } catch (error) {
      console.error("Package PDF share failed", error);
      alert("Unable to share the package PDF right now. Please try again later.");
    }
  };

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

  const buildInvoicePdf = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

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

    const uniqueItems = customPackageItems.length;
    const totalQuantity = customPackageItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const subTotal = customPackageItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    if (bgImg) doc.addImage(bgImg, "PNG", 0, 0, pageWidth, pageHeight);
    doc.setFillColor(0, 47, 108);
    doc.rect(0, 0, pageWidth, 25, "F");
    if (logoImg) doc.addImage(logoImg, "PNG", 10, 3, 25, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.text("South Lanka Fireworks", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(14);
    doc.text("INVOICE", pageWidth - 15, 15, { align: "right" });

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
    doc.text("Invoice To:", 14, y);
    const text = "";
    const x = 40;
    doc.text(text, x, y);
    const textWidth = doc.getTextWidth(text);
    doc.setLineWidth(0.2);
    doc.line(x, y + 1, x + textWidth, y + 1);

    y += 7;
    doc.text("Date:", 14, y);
    doc.text(new Date().toLocaleDateString(), 30, y);

    y += 28;
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

    y += 14;
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    customPackageItems.forEach((item, index) => {
      const total = item.price * item.quantity;
      if (y > pageHeight - 40) {
        doc.addPage();
        y = 20;
      }
      doc.text(String(index + 1).padStart(2, "0"), 18, y);
      doc.text(`${item.name}${item.size ? ` (${item.size})` : ""}`, 35, y);
      doc.text(String(item.quantity), 115, y, { align: "right" });
      doc.text(`Rs. ${item.price.toLocaleString()}`, 153, y, {
        align: "right",
      });
      doc.text(`Rs. ${total.toLocaleString()}`, 188, y, { align: "right" });
      y += 7;
    });

    y += 5;
    doc.setLineWidth(0.5);
    doc.line(14, y, pageWidth - 14, y);
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text(`Sub Total: Rs. ${subTotal.toLocaleString()}`, pageWidth - 20, y, {
      align: "right",
    });

    y += 8;
    doc.setTextColor(0, 128, 0);
    doc.text(`Total: Rs. ${subTotal.toLocaleString()}`, pageWidth - 20, y, {
      align: "right",
    });

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

    return doc;
  };

  const ensureItemsSelected = () => {
    if (customPackageItems.length === 0) {
      alert("No items selected!");
      return false;
    }
    return true;
  };

  const generateReport = async () => {
    if (!ensureItemsSelected()) return;
    const doc = await buildInvoicePdf();
    doc.save(`SouthLankaFireworks_Invoice.pdf`);
  };

  const shareInvoiceViaWhatsApp = async () => {
    if (!ensureItemsSelected()) return;
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      alert("Sharing is not supported in this environment.");
      return;
    }
    try {
      const doc = await buildInvoicePdf();
      const blob = doc.output("blob");
      const file = new File([blob], "SouthLankaFireworks_Invoice.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "South Lanka Fireworks",
          text: "Here is your fireworks package summary 🔥",
        });
      } else {
        alert(
          "Your device/browser cannot attach files directly to WhatsApp. Please download the PDF and share it manually."
        );
      }
    } catch (error) {
      console.error("WhatsApp share failed", error);
      alert("Unable to share via WhatsApp. Please try downloading the PDF instead.");
    }
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
      className="relative text-black py-16 px-4 md:px-12 min-h-screen bg-gradient-to-b  overflow-hidden"
      id="products"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-64 w-64 bg-pink-200/40 blur-3xl" />
        <div className="absolute -bottom-10 left-8 h-72 w-72 bg-amber-100/40 blur-[160px]" />
      </div>
      <div className="relative">
      <Helmet>
        <title>South Lanka Fireworks - Products & Packages</title>
        <meta
          name="description"
          content="Explore South Lanka Fireworks' individual fireworks and exclusive packages for weddings, festivals, and corporate events in Sri Lanka."
        />
        <meta
          name="keywords"
          content="Fireworks, Firework Packages, Individual Fireworks, Wedding Fireworks, Festival Fireworks, Corporate Fireworks, Sri Lanka"
        />
        <meta name="author" content="South Lanka Fireworks" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="South Lanka Fireworks - Products & Packages"
        />
        <meta
          property="og:description"
          content="Explore South Lanka Fireworks' individual fireworks and exclusive packages for weddings, festivals, and corporate events in Sri Lanka."
        />
        <meta property="og:image" content="/assets/SouthLankaFireworks.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://slfireworks.com/products" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="South Lanka Fireworks - Products & Packages"
        />
        <meta
          name="twitter:description"
          content="Explore South Lanka Fireworks' individual fireworks and exclusive packages for weddings, festivals, and corporate events in Sri Lanka."
        />
        <meta name="twitter:image" content="/assets/SouthLankaFireworks.png" />
      </Helmet>

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
      <div className="max-w-6xl mx-auto text-center mb-14">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-500 mb-3">
          Curated For Every Spark
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Individual Fireworks & Signature Packages
        </h2>
        <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base">
          Browse ready-to-book productions or mix your own inventory for a
          bespoke celebration.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur border border-white/70 shadow-lg shadow-black/5 px-6 py-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                <stat.Icon size={20} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  {stat.label}
                </p>
                <div className="text-3xl font-bold text-pink-500">{stat.value}</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{stat.helper}</p>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-pink-200/20 via-transparent to-yellow-200/20" />
          </div>
        ))}
      </div>

      {/* Individual Fireworks */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-pink-400 mb-6 text-center">
          🎆 Individual Fireworks
        </h3>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                    : "bg-white/80 text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
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
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-pink-500">
                  {item.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Crowd Favorite
                </span>
              </div>

              <h3 className="text-base md:text-lg font-semibold mb-1 text-gray-700">
                {item.name}
              </h3>
              <p className="text-gray-500 mb-2 text-xs md:text-sm">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {item.sizes.map(({ size, price }) => (
                  <span
                    key={size}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold"
                  >
                    💥 {size} · LKR {price.toLocaleString()}
                  </span>
                ))}
              </div>

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
                      <td className="p-2">Rs.{item.price.toLocaleString()}</td>
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
                        Rs.{(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => removeFromCustomPackage(item)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          <span className="inline-flex items-center gap-1">
                            <Trash2 size={16} color="#fff" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
              <h3 className="text-lg font-semibold text-pink-500">
                Total: Rs.{customPackageTotal.toLocaleString()}
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
              <button
                type="button"
                onClick={shareInvoiceViaWhatsApp}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg shadow-md transition"
              >
                <FaWhatsapp className="text-lg" />
                Share via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>

      {/* Standard Packages */}
      <div className="max-w-7xl mx-auto mb-20 px-4">
        <h3 className="text-2xl md:text-3xl font-semibold text-pink-400 mb-6 text-center">
          🎆 Firework Packages
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pack) => {
            const { subtotal, total } = calculatePackageTotals(pack);
            const highlightLabel =
              pack.discount >= 6000
                ? "Best Value"
                : pack.discount >= 3500
                ? "Popular"
                : null;
            const whatsappUrl = getPackageWhatsappUrl(pack);

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
                {highlightLabel && (
                  <span className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-semibold tracking-wide px-3 py-1 rounded-full shadow-lg">
                    {highlightLabel}
                  </span>
                )}

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
                    <p className="text-xs text-gray-500 text-right">
                      You save Rs. {pack.discount.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full border border-emerald-400 text-emerald-600 text-sm font-semibold py-2 rounded-lg hover:bg-emerald-50 transition"
                    >
                      <FaWhatsapp /> Book via WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Products;
