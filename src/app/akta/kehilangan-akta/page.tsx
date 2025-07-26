"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FileInput from "@/components/form-component/fileinput-component";
import { Button } from "@/components/ui/button";

export default function KehilanganAkta() {

    return (
        <>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl">Kehilangan Akta</h1>
            </div>
            <div className="bg-white p-5 rounded-md">
                <h2 className="font-medium select-none pb-4">Upload Dokumen</h2>
                <FileInput onChange={() => {}} id="perubahan_elemen" label="Scan Kartu Keluarga" />
                <div className="flex justify-end pt-8">
                    <Link href={'/'}>
                        <Button size={'md'} variant={'primary'} className="bg-sky-600 text-white px-4 py-2">
                            Simpan
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}