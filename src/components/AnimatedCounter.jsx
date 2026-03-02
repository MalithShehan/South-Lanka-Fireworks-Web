import { memo } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

/**
 * Animated counter that triggers when scrolled into view.
 * @param {number} end - Target number
 * @param {string} suffix - Text after number (e.g., "+", "%")
 * @param {string} prefix - Text before number (e.g., "Rs.")
 * @param {number} duration - Animation duration in seconds
 * @param {number} decimals - Decimal places
 */
const AnimatedCounter = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2.5,
  decimals = 0,
  className = "",
  separator = ",",
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          separator={separator}
          useEasing
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
};

export default memo(AnimatedCounter);
