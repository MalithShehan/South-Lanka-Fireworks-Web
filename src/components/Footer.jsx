function Footer() {
  return (
    <footer className="bg-white/50 text-gray-700 py-8 text-center shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8  ">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-center">South Lanka Fireworks</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
