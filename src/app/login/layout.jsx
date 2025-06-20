"use client";
import React from "react";
import Image from "next/image";

export default function LoginLayout({ children }) {
    return (
        <div className="w-full h-[100dvh] grid grid-cols-2 primary-color select-none">
            <section className="flex justify-center items-center">
                <Image
                    src={"LoginIcon.svg"}
                    alt="login icon"
                    width={400}
                    height={400}
                />
            </section>
            <section className="bg-white h-full w-full rounded-tl-4xl rounded-bl-4xl">
                <div className="flex justify-center mt-5">
                    <Image
                        src={"Logo.svg"}
                        alt="Logo"
                        width={200}
                        height={200}
                    />
                </div>
                {children}
            </section>
        </div>
    );
}