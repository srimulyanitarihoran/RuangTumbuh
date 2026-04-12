import { useTransform } from "framer-motion";

export const useFlowAnimation = (scrollYProgress, index) => {
  // Timing antar card (lebih rapat & smooth)
  const sStart = index * 0.18;
  const sEnd = sStart + 0.25;

  // Animasi halus & tidak transparan
  const y = useTransform(scrollYProgress, [sStart, sEnd], [418, 0]);
  const opacity = useTransform(scrollYProgress, [sStart, sEnd], [1, 1]);
  const scale = useTransform(scrollYProgress, [sStart, sEnd], [0.8, 1]);

  return { y, opacity, scale };
};
