"use client";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, EyeOff, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { SubmitDataHelper } from "@/helper/submitDataHelper";
import { UserLoginSchemaDto } from "@/schemas/user/UserLoginSchema";

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
    const [formData, setFormData] = useState<UserLoginSchemaDto>({
        nik: "",
        password: ""
    })
    const [formError, setFormError] = useState<UserLoginSchemaDto>({
        nik: "",
        password: ""
    })

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    async function submitLogin() {
        setDisableButton(true);
        try {
            const result = await SubmitDataHelper("/api/login", formData)
            setDisableButton(false)
            if (result.ok) {
                console.log(result)
                router.push("/")
            } else {
                const errors_dict = result.data.errors.properties;
                setFormError({
                    nik: errors_dict.nik?.errors?.[0] ?? "",
                    password: errors_dict.password?.errors?.[0] ?? "",
                })
            }

        } catch (e) {
            console.log(e)
            setDisableButton(false)
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div>
                <form className="w-[400px] flex flex-col space-y-6">
                    <div className="relative">
                        <Input
                            className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan NIK"
                            value={formData.nik}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({
                                ...prev, nik: e.target.value
                            }))}
                            type={"text"}
                        />
                        <LockKeyhole className="absolute top-2 right-3 text-slate-400" />
                        {formError.nik && (
                            <span className="text-sm text-red-600">{formError.nik}</span>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan Password"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({
                                ...prev, password: e.target.value
                            }))}
                            type={showPassword ? "text": "password"}
                        />
                        {formError.password && (
                            <span className="text-sm text-red-600">{formError.password}</span>
                        )}
                        <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                            {showPassword ? <EyeIcon /> : <EyeOff />}
                        </span>
                        <Link href={"/forgot-password"} className="text-sm absolute -bottom-8 left-0">Lupa Password?</Link>
                    </div>

                    <Button onClick={() => submitLogin()} size={'md'} variant={'primary'} disabled={disableButton} type={"submit"} className={"bg-red-500 py-3 text-white mt-10 cursor-pointer hover:bg-red-600 transition-colors ease-in-out duration-500"}>
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