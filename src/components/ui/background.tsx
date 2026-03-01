"use client";
import Image from "next/image";

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
            {/* Light mode — pre-baked: desaturated, blurred, white overlay */}
            <Image
                src="/background-light.webp"
                alt=""
                fill
                className="object-cover dark:hidden"
                quality={100}
                priority
            />
            {/* Dark mode — pre-baked: full colour, blurred, black overlay */}
            <Image
                src="/background-dark.webp"
                alt=""
                fill
                className="object-cover hidden dark:block"
                quality={100}
                priority
            />
        </div>
    );
}
