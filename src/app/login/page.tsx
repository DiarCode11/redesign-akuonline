"use client";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, EyeOff, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export type LoginFormProps = {
    nik: string,
    password: string
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState<Partial<LoginFormProps>>({});
    const router = useRouter();
    const [nik, setNIK] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disableButton, setDisableButton] = useState<boolean>(false);


    async function handleSubmit(e : React.FormEvent) {
        e.preventDefault();
        setDisableButton(true)

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ nik, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            router.push('/')
        } else {
            const data = await res.json();
            setErrorMsg(data);
        }
        setDisableButton(false);
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center">
            <div>
                <form onSubmit={handleSubmit} className="w-[400px] flex flex-col space-y-6">
                    <div className="relative">
                        <Input
                            className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan NIK"
                            value={nik}
                            onChange={(e) => setNIK(e.target.value)}
                            type={"text"}
                        />
                        <LockKeyhole className="absolute top-2 right-3 text-slate-400" />
                        {errorMsg.nik && (
                            <span className="text-sm text-red-600">{errorMsg.nik}</span>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text": "password"}
                        />
                        {errorMsg.password && (
                            <span className="text-sm text-red-600">{errorMsg.password}</span>
                        )}
                        <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                            {showPassword ? <EyeIcon /> : <EyeOff />}
                        </span>
                        <Link href={"/forgot-password"} className="text-sm absolute -bottom-8 left-0">Lupa Password?</Link>
                    </div>

                    <Button size={'md'} variant={'primary'} disabled={disableButton} type={"submit"} className={"bg-red-500 py-3 text-white mt-10 cursor-pointer hover:bg-red-600 transition-colors ease-in-out duration-500"}>
                        Masuk
                    </Button>
                </form>
                <p className="w-full flex justify-center">Belum punya akun?
                    <Link href={"/register"} className="ml-2 primary-text font-semibold">Daftar</Link>
                </p>
            </div>
        </div>
    );
}