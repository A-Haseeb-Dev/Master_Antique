"use client";

import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
