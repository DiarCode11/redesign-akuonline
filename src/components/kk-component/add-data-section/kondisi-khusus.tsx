import DropdownComponent from "@/components/form-component/dropdown-component";
import { useEffect, useState } from "react";

export type KondisiKhususProps = {
    disabilitas : string,
    kelainan: string
}

type KondisiKhususType = {
    onChange: (value: Partial<KondisiKhususProps>) => void
}

export default function KondisiKhususSection({ onChange } : KondisiKhususType) {
    const [kondisiKhusus, setKondisiKhusus] = useState<Partial<KondisiKhususProps>>({})

    const jenisDisabilitas = [
        "Tidak Ada",
        "Disabilitas Fisik",
        "Tuna Netra",
        "Tuna Rungu",
        "Tuna Wicara",
        "Disabilitas Mental",
        "Disabilitas Ganda"
    ];

    const jenisKelainan = [
        "Tuna Daksa",
        "Tuna Netra",
        "Tuna Rungu",
        "Tuna Wicara",
        "Tuna Ganda",
        "Lumpuh",
        "Gangguan perkembangan",
        "Disabilitas Mental"
    ];

    useEffect(() => {
        console.log(kondisiKhusus)
        onChange(kondisiKhusus)
    }, [kondisiKhusus, onChange])

    return (
        <section>
            <h1 className="text-md font-semibold">D. Kondisi Khusus</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <DropdownComponent
                    data={jenisDisabilitas}
                    label="Penyandang Disabilitas"
                    onChange={(data) => {
                        setKondisiKhusus(prev => ({
                            ...prev, disabilitas: data
                        }))
                    }}
                    placeholder="Pilih jenis penyandang"
                />
                <DropdownComponent
                    data={jenisKelainan}
                    label="Kelainan Fisik & Mental"
                    onChange={(data) => {
                        setKondisiKhusus(prev => ({
                            ...prev, kelainan: data
                        }))
                    }}
                    placeholder="Pilih jenis kelainan"
                />
            </div>
        </section>
    )
}