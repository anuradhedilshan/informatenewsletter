import React from "react";

interface LogoProps {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  logoUrl?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: "h-8",
  md: "h-12",
  lg: "h-16",
  xl: "h-20",
};

export function Logo({ className = "", primaryColor, accentColor, size = "md", logoUrl, style }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`} style={style}>
      <img
        src={logoUrl || "/Infomate-Logo2.png"}
        alt="Infomate — A John Keells Group Company"
        className={`${style?.height ? "h-full" : sizeMap[size]} ${style?.width ? "w-full" : "w-auto"} object-contain`}
        draggable={false}
      />
    </div>
  );
}
