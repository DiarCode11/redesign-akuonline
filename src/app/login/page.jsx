"use client";
import Image from "next/image";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, EyeOff, EyeIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-[400px] flex flex-col space-y-6">
                <div className="relative">
                    <Input
                        className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                        placeholder="Masukkan NIK"
                        type={"text"}
                    />
                    <LockKeyhole className="absolute top-2 right-3 text-slate-400" />
                </div>
                <div className="relative">
                    <Input
                        className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                        placeholder="Masukkan Password"
                        type={showPassword ? "text": "password"}
                    />
                    <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                        {showPassword ? <EyeIcon /> : <EyeOff />}
                    </span>
                    <span className="text-sm absolute -bottom-5">Lupa Password?</span>
                </div>
                <Button className={"primary-color text-white mt-10"}>
                    Masuk
                </Button>
                <p className="w-full flex justify-center">Belum punya akun?
                    <Link href={"/register"} className="ml-2 primary-text font-semibold">Daftar</Link>
                </p>
            </div>
        </div>
    );
}