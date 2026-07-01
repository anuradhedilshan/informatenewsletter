import React from "react";

interface LogoProps {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  logoUrl?: string;
}

const sizeMap = {
  sm: "h-8",
  md: "h-12",
  lg: "h-16",
  xl: "h-20",
};

export function Logo({ className = "", primaryColor, accentColor, size = "md", logoUrl }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoUrl || "/Infomate-Logo2.png"}
        alt="Infomate — A John Keells Group Company"
        className={`${sizeMap[size]} w-auto object-contain`}
        draggable={false}
      />
    </div>
  );
}
