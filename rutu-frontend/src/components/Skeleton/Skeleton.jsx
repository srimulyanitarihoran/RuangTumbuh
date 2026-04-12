import React from "react";
import styles from "./Skeleton.module.css";

/**
 * Reusable Skeleton Component
 * @param {string} variant - 'rect' | 'circle' | 'text'
 * @param {string|number} width
 * @param {string|number} height
 * @param {string} className - tambahan custom class jika diperlukan
 */
export const Skeleton = ({
  variant = "rect",
  width = "100%",
  height = "20px",
  className = "",
}) => {
  const variantClass = styles[variant] || styles.rect;

  return (
    <div
      className={`${styles.skeleton} ${variantClass} ${className}`}
      style={{ width, height }}
    />
  );
};
