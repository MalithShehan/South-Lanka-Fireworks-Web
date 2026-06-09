import React, { memo } from "react";
import { motion } from "framer-motion";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import AnimatedSection from "./AnimatedSection";
import GlowCard from "./GlowCard";

const highlights = [
  {
    label: "Shows Delivered",
    value: 1000,
    suffix: "+",
    detail: "Across Sri Lanka",
    glowColor: "rgba(251, 146, 60, 0.26)",
    textColor: "text-orange-300",
  },
  {
    label: "Years Experience",
    value: 20,
    suffix: "+",
    detail: "Trusted since 2005",
    glowColor: "rgba(251, 191, 36, 0.24)",
    textColor: "text-amber-300",
  },
  {
    label: "Safety Planning",
    value: 100,
    suffix: "%",
    detail: "Crew-first execution",
    glowColor: "rgba(16, 185, 129, 0.24)",
    textColor: "text-emerald-300",
  },
  {
    label: "Repeat Clients",
    value: 85,
    suffix: "%",
    detail: "Return for new events",
    glowColor: "rgba(139, 92, 246, 0.22)",
    textColor: "text-violet-300",
  },
];

const eventChips = [
  { text: "Weddings", classes: "border-rose-400/20 text-rose-300 hover:border-rose-400/40 hover:bg-rose-400/5 hover:shadow-[0_0_12px_rgba(244,63,94,0.15)]" },
  { text: "Festivals", classes: "border-amber-400/20 text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/5 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)]" },
  { text: "Corporate launches", classes: "border-cyan-400/20 text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:shadow-[0_0_12px_rgba(34,211,238,0.15)]" },
  { text: "Private celebrations", classes: "border-violet-400/20 text-violet-300 hover:border-violet-400/40 hover:bg-violet-400/5 hover:shadow-[0_0_12px_rgba(139,92,246,0.15)]" },
];

const promises = [
  {
    title: "Safety built into every plan",
    description:
      "We review venue space, firing distance, and timing before the event day.",
    icon: ShieldCheck,
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-400/12",
    borderHover: "hover:border-emerald-400/30 hover:shadow-[0_8px_30px_rgba(52,211,153,0.12)]",
  },
  {
    title: "Islandwide coordination",
    description:
      "Our team supports events across Sri Lanka with setup, launch, and on-site guidance.",
    icon: MapPin,
    iconColor: "text-cyan-300",
    iconBg: "bg-cyan-400/12",
    borderHover: "hover:border-cyan-400/30 hover:shadow-[0_8px_30px_rgba(34,211,238,0.12)]",
  },
  {
    title: "A show that fits the mood",
    description:
      "Elegant, celebratory, or high-energy. We shape the visual style around your audience.",
    icon: Sparkles,
    iconColor: "text-rose-300",
    iconBg: "bg-rose-400/12",
    borderHover: "hover:border-rose-400/30 hover:shadow-[0_8px_30px_rgba(251,113,133,0.12)]",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr",
    Icon: AiFillFacebook,
    hoverClass: "hover:text-blue-400",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1",
    Icon: SiTiktok,
    hoverClass: "hover:text-rose-400",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/southlankafireworks",
    Icon: AiFillInstagram,
    hoverClass: "hover:text-fuchsia-400",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-20 text-stone-100 sm:px-6 lg:px-8"
      aria-label="About South Lanka Fireworks"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="space-y-6">
          <AnimatedSection variant="fadeUp" delay={0}>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200">
              About South Lanka Fireworks
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.1}>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              A trusted fireworks partner for intimate celebrations and large public shows.
            </h2>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.2}>
            <p className="text-base leading-8 text-stone-300 sm:text-lg">
              For more than 20 years, South Lanka Fireworks has created displays for weddings,
              festivals, launches, and national celebrations across Sri Lanka. Our goal is simple:
              make the experience beautiful, safe, and easy to understand for every customer.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.3}>
            <p className="text-sm leading-7 text-stone-400 sm:text-base">
              We start by understanding your event, recommend the right effects for the venue,
              then manage setup and execution with clear communication all the way through.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.35} className="flex flex-wrap gap-2">
            {eventChips.map((chip) => (
              <span
                key={chip.text}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${chip.classes}`}
              >
                {chip.text}
              </span>
            ))}
          </AnimatedSection>

          <div className="grid gap-4 pt-2">
            {promises.map((promise, index) => {
              const Icon = promise.icon;

              return (
                <AnimatedSection key={promise.title} variant="fadeUp" delay={0.4 + index * 0.1}>
                  <div className={`rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 ${promise.borderHover}`}>
                    <div className="flex items-start gap-4">
                      <div className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${promise.iconBg} ${promise.iconColor}`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{promise.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-stone-300 sm:text-base">
                          {promise.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection variant="fadeUp" delay={0.7}>
            <div className="flex flex-wrap gap-3 text-3xl text-stone-400">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#1a110d]/70 p-3 transition-all duration-300 ${social.hoverClass}`}
                >
                  <social.Icon />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="space-y-6">
          <GlowCard
            glowColor="rgba(251, 146, 60, 0.24)"
            delay={0.2}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Why clients book us</p>
            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Dependable from planning to launch.
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
              Families, venues, and event teams choose us because we keep the process organized,
              explain the options clearly, and execute with discipline on the day of the show.
            </p>

            <ul className="mt-5 space-y-3">
              {[
                { text: "Clear recommendations for the venue and event size", color: "text-amber-300" },
                { text: "Professional crew handling setup and launch", color: "text-emerald-300" },
                { text: "Responsive support before, during, and after the event", color: "text-cyan-300" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm leading-6 text-stone-200 sm:text-base">
                  <CheckCircle2 size={18} className={`mt-1 flex-shrink-0 ${item.color}`} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text transition hover:brightness-110"
            >
              Talk to our team
            </motion.a>
          </GlowCard>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <GlowCard
                key={item.label}
                glowColor={item.glowColor}
                delay={0.3 + index * 0.1}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 text-center shadow-lg"
              >
                <p className={`mb-2 text-xs uppercase tracking-[0.22em] ${item.textColor}`}>
                  {item.label}
                </p>
                <AnimatedCounter
                  end={item.value}
                  suffix={item.suffix}
                  duration={2.5}
                  className={`text-2xl font-bold ${item.textColor} sm:text-3xl`}
                />
                <p className="mt-1 text-xs text-stone-400">{item.detail}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
