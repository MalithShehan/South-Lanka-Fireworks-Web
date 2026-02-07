import { useEffect, useRef, useState } from "react";
import { Shield, Award, Users, MapPin, Clock, Sparkles } from "lucide-react";

const trustItems = [
  {
    Icon: Shield,
    title: "100% Safety Record",
    description: "Zero incidents across all 1000+ shows",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    Icon: Award,
    title: "Licensed & Certified",
    description: "Government-approved pyrotechnicians",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    Icon: Users,
    title: "25+ Years Experience",
    description: "Trusted by Sri Lanka since 2005",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    Icon: MapPin,
    title: "Nationwide Coverage",
    description: "Serving all districts across Sri Lanka",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    Icon: Clock,
    title: "Quick Response",
    description: "Quotes within 2 hours guaranteed",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    Icon: Sparkles,
    title: "Custom Designs",
    description: "Tailored shows for every budget",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
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
          <p className="text-xs uppercase tracking-[0.4em] text-pink-500 mb-3">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map(({ Icon, title, description, color, bgColor }, index) => (
            <div
              key={title}
              className={`group bg-white/5 border border-white/10 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                transitionDuration: "0.4s",
              }}
            >
              <div
                className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
