"use client";

import Image from "next/image";

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] hidden dark:block pointer-events-none">
            <Image
                src="/background-glass.png"
                alt="Background"
                fill
                className="object-cover opacity-50 blur-[2px] scale-105"
                quality={100}
                priority
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/50" />
        </div>
    );
}
