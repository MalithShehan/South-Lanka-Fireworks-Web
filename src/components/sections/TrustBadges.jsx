import { useEffect, useRef, useState, memo } from "react";
import { Shield, Award, Users, MapPin, Clock, Sparkles } from "lucide-react";

const trustItems = [
  {
    Icon: Shield,
    title: "100% Safety Record",
    description: "Zero incidents across all 1000+ shows",
    color: "text-emerald-300",
    bgColor: "bg-emerald-400/12",
    borderHover: "hover:border-emerald-400/30 hover:shadow-[0_20px_45px_rgba(16,185,129,0.15)]",
  },
  {
    Icon: Award,
    title: "Licensed & Certified",
    description: "Government-approved pyrotechnicians",
    color: "text-blue-300",
    bgColor: "bg-blue-400/12",
    borderHover: "hover:border-blue-400/30 hover:shadow-[0_20px_45px_rgba(59,130,246,0.15)]",
  },
  {
    Icon: Users,
    title: "25+ Years Experience",
    description: "Trusted by Sri Lanka since 2005",
    color: "text-amber-300",
    bgColor: "bg-amber-400/12",
    borderHover: "hover:border-amber-400/30 hover:shadow-[0_20px_45px_rgba(245,158,11,0.15)]",
  },
  {
    Icon: MapPin,
    title: "Nationwide Coverage",
    description: "Serving all districts across Sri Lanka",
    color: "text-rose-300",
    bgColor: "bg-rose-400/12",
    borderHover: "hover:border-rose-400/30 hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)]",
  },
  {
    Icon: Clock,
    title: "Quick Response",
    description: "Quotes within 2 hours guaranteed",
    color: "text-cyan-300",
    bgColor: "bg-cyan-400/12",
    borderHover: "hover:border-cyan-400/30 hover:shadow-[0_20px_45px_rgba(6,182,212,0.15)]",
  },
  {
    Icon: Sparkles,
    title: "Custom Designs",
    description: "Tailored shows for every budget",
    color: "text-violet-300",
    bgColor: "bg-violet-400/12",
    borderHover: "hover:border-violet-400/30 hover:shadow-[0_20px_45px_rgba(139,92,246,0.15)]",
  },
];

const useInView = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const TrustBadges = () => {
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 md:px-10 overflow-hidden"
      aria-label="Why choose South Lanka Fireworks"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-10 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200 mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Sri Lanka&#39;s Most Trusted Fireworks Company
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From intimate weddings to massive national celebrations, event planners
            across the island rely on our certified team for safe, spectacular shows.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {trustItems.map(({ Icon, title, description, color, bgColor, borderHover }, index) => (
            <div
              key={title}
              className={`group rounded-2xl border border-white/10 bg-[#0d0818]/60 p-3 text-center shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${borderHover} sm:p-5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                transitionDuration: "0.4s",
              }}
            >
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${bgColor} ring-1 ring-white/5 transition-transform group-hover:scale-110`}
              >
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
              <p className="text-xs leading-relaxed text-stone-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TrustBadges);
