import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FaFire, FaGlobe, FaRocket, FaStar } from "react-icons/fa";
import AnimatedSection from "../ui/AnimatedSection";
import GlowCard from "../ui/GlowCard";

const serviceBadges = [
  { text: "Tailored packages", border: "border-amber-400/20 text-amber-300 bg-amber-400/5 hover:border-amber-400/40 hover:bg-amber-400/10 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)]" },
  { text: "On-site coordination", border: "border-emerald-400/20 text-emerald-300 bg-emerald-400/5 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]" },
  { text: "Islandwide travel", border: "border-cyan-400/20 text-cyan-300 bg-cyan-400/5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_12px_rgba(34,211,238,0.15)]" },
];

const services = [
  {
    id: "01",
    title: "Custom fireworks displays",
    description:
      "Signature shows designed around your venue, audience, and event timing.",
    tag: "Signature moments",
    Icon: FaFire,
    glowColor: "rgba(251, 146, 60, 0.22)",
    gradient: "from-orange-400/20 via-rose-400/10 to-transparent",
    iconClass: "bg-orange-400/14 text-orange-300",
    bulletColor: "text-orange-300",
    linkClass: "text-orange-300 hover:text-orange-200",
    bullets: [
      "Wedding finales and first-dance moments",
      "Countowns, entrances, and celebratory reveals",
      "Color and pacing matched to your event style",
    ],
  },
  {
    id: "02",
    title: "Special effects for live events",
    description:
      "Enhance the stage, atmosphere, and crowd energy with coordinated effects.",
    tag: "Atmosphere and impact",
    Icon: FaStar,
    glowColor: "rgba(251, 191, 36, 0.2)",
    gradient: "from-amber-400/20 via-yellow-300/10 to-transparent",
    iconClass: "bg-amber-400/14 text-amber-300",
    bulletColor: "text-amber-300",
    linkClass: "text-amber-300 hover:text-amber-200",
    bullets: [
      "Festival moments and live performance cues",
      "Effects timed to music, speeches, or countdowns",
      "Stronger audience impact without visual clutter",
    ],
  },
  {
    id: "03",
    title: "Safety planning and licensing guidance",
    description:
      "Professional advice to help your event run within the right safety conditions.",
    tag: "Confidence before launch",
    Icon: FaRocket,
    glowColor: "rgba(16, 185, 129, 0.2)",
    gradient: "from-emerald-400/18 via-teal-300/10 to-transparent",
    iconClass: "bg-emerald-400/14 text-emerald-300",
    bulletColor: "text-emerald-300",
    linkClass: "text-emerald-300 hover:text-emerald-200",
    bullets: [
      "Venue spacing and firing distance checks",
      "Practical guidance for organizers and venues",
      "Planning support before the event day arrives",
    ],
  },
  {
    id: "04",
    title: "Nationwide delivery and setup",
    description:
      "From transport to on-site preparation, our crew supports your event across Sri Lanka.",
    tag: "End-to-end service",
    Icon: FaGlobe,
    glowColor: "rgba(59, 130, 246, 0.18)",
    gradient: "from-blue-400/18 via-cyan-300/10 to-transparent",
    iconClass: "bg-blue-400/14 text-blue-300",
    bulletColor: "text-cyan-300",
    linkClass: "text-cyan-300 hover:text-cyan-200",
    bullets: [
      "Travel, setup, launch, and coordination in one service",
      "Suitable for private events and public celebrations",
      "A single team managing the full execution flow",
    ],
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-4 py-16 text-stone-100 sm:px-6 md:px-12 md:py-24"
      aria-label="Our fireworks services"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-0 h-44 w-44 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-0 right-12 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <AnimatedSection variant="fadeUp" className="mx-auto mb-12 max-w-5xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-amber-200">Services</p>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Choose the support your event needs.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
            We help customers understand the options quickly, then tailor the right mix of
            fireworks, effects, planning, and on-site support for the occasion.
          </p>
        </AnimatedSection>

        <AnimatedSection
          variant="scaleUp"
          delay={0.2}
          className="mb-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 md:mb-14"
        >
          {serviceBadges.map((badge) => (
            <span
              key={badge.text}
              className={`rounded-full border px-4 py-2 transition-all duration-300 ${badge.border}`}
            >
              {badge.text}
            </span>
          ))}
        </AnimatedSection>

        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <GlowCard
              key={service.id}
              glowColor={service.glowColor}
              delay={index * 0.12}
              borderRadius="2rem"
              className="bg-white/[0.03] backdrop-blur-md p-6 shadow-lg"
            >
              <div className="relative flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.45 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.iconClass}`}
                  >
                    <service.Icon size={24} />
                  </motion.div>
                  <span className="text-xs uppercase tracking-[0.28em] text-stone-500">
                    {service.id}
                  </span>
                </div>

                <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-stone-200">
                  {service.tag}
                </span>

                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{service.description}</p>

                <ul className="mt-5 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-stone-200">
                      <CheckCircle2 size={16} className={`mt-1 flex-shrink-0 ${service.bulletColor}`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  whileHover={{ x: 4 }}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition ${service.linkClass}`}
                >
                  Ask about this service
                  <ArrowRight size={16} />
                </motion.a>
              </div>
            </GlowCard>
          ))}
        </div>

        <AnimatedSection variant="fadeUp" delay={0.4} className="mx-auto mt-16 max-w-3xl text-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8">
            <h3 className="text-2xl font-semibold text-white">Need help choosing the right package?</h3>
            <p className="mt-3 text-sm leading-7 text-stone-300 sm:text-base">
              Tell us the event type, date, and location. We will recommend a display plan that feels right for the audience and the budget.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1a110d] shadow-lg shadow-black/10 transition-all hover:scale-[1.03] hover:bg-amber-50"
            >
              Get a Free Quote
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Services);
