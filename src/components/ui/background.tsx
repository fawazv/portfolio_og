"use client";

import Image from "next/image";

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
            <Image
                src="/background-glass.webp"
                alt=""
                fill
                className="object-cover opacity-50 dark:opacity-50 blur-[2px] scale-105 saturate-0 dark:saturate-100"
                quality={100}
                priority
                style={{ transform: "translateZ(0)", containIntrinsicSize: "100vw 100vh" }}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-white/80 dark:bg-black/50" />
        </div>
    );
}
