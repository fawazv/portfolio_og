"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/cursor"), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/ui/noise-overlay"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/ui/smooth-scroll"), { ssr: false });

export function ClientProviders() {
    return (
        <>
            <SmoothScroll />
            <NoiseOverlay />
            <CustomCursor />
        </>
    );
}
