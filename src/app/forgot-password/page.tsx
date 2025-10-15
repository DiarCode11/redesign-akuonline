"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPassword(){
    const [passwordHasBeedReset, setPasswordHasBeedReset] = useState<boolean>(false);

    return (
        <div className="flex justify-center items-center max-h-screen h-full w-full primary-color">
            <div className="bg-white w-[400px] p-4 rounded-2xl">
                <div className="flex justify-center">
                    <h1 className="text-xl font-semibold">{ passwordHasBeedReset ? "Cek Email Anda" : "Reset Password" }</h1>
                </div>
                { passwordHasBeedReset ? (
                    <div>
                        <p className="text-center py-3">Kami telah berhasil mengirimkan link reset password, silakan cek email anda</p>
                    </div>
                ) :  
                    <div className="pb-4">
                        <p className="text-center py-3">Masukkan email anda yang digunakan saat register</p>
                        <Input
                            className={"h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan email"
                            type={"email"}
                        />
                    </div> 
                }

                { !passwordHasBeedReset ? 
                     <div className="grid grid-cols-2 gap-4">
                        <Link href={"/login"}>
                            <Button variant="default" size="default" className={"bg-gray-300 w-full text-black"}>
                                Batal
                            </Button>
                        </Link>
                        <Button onClick={() => setPasswordHasBeedReset(true)} variant="default" size="default" className={"primary-color text-white"}>
                            Kirim 
                        </Button>
                    </div>
                    : 
                    <Link href={"/login"}>
                        <Button variant="default" size="default" className={"bg-gray-300 cursor-pointer w-full text-black"}>
                            Kembali
                        </Button>
                    </Link>
                }
            </div>
        </div>
    )
}