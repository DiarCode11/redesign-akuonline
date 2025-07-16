import DropdownComponent from "@/components/form-component/dropdown-component";
import InputComponent from "@/components/form-component/input-component";
import { DataType } from "@/components/form-component/input-component";
import { useEffect, useState } from "react";

export type AlasanProps = {
    alasan : string,
}

type AlasanType = {
    title : string
    onChange : (value : Partial<AlasanProps>) => void
}

export default function AddingDataReason({ title, onChange } : AlasanType) {
    const [alasan, setAlasan] = useState<Partial<AlasanProps>>({})

    useEffect(() => {
        onChange(alasan);
    }, [alasan, onChange])

    return (
        <section>
            <h1 className="text-md font-semibold">{title}</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <DropdownComponent
                    data={['Kelahiran', 'Menikah', 'Pindah datang', 'Adopsi']}
                    label="Alasan"
                    onChange={(data) => { setAlasan({ alasan : data})}}
                    placeholder="Pilih alasan"
                />
            </div>
        </section>
    )
}