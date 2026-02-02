"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "white" | "color";
}

export function Logo({ className = "w-10 h-10", variant = "white" }: LogoProps) {
  // Use logo-white.svg for 'white' variant (dark backgrounds)
  // Use logo-color.svg for 'color' variant (light backgrounds or specific use cases)
  const src = variant === "white" ? "/images/logo-white.svg" : "/images/logo-color.svg";

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt="Barella Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
