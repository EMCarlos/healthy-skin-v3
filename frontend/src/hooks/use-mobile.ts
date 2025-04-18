import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Handle SSR by defaulting to undefined
    if (typeof window === "undefined") return undefined;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    setIsMobile(mql.matches);

    // Add event listener
    mql.addEventListener("change", handleChange);

    // Cleanup
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
