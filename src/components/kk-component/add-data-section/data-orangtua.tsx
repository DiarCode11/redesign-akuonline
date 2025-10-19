import InputComponent from "@/components/form-component/input-component";
import { DataType } from "@/components/form-component/input-component";
import { useEffect, useState } from "react";

export type DataOrangtuaProps = {
    nama_ayah : string,
    nik_ayah : string,
    nama_ibu : string,
    nik_ibu : string
}

type DataOrangtuaType = {
    title : string
    defaultValue? : Partial<DataOrangtuaProps>
    onChange : (value : Partial<DataOrangtuaProps>) => void
}

export default function DataOrangtuaSection({ title, defaultValue, onChange } : DataOrangtuaType) {
    const [dataOrangtua, setDataOrangtua] = useState<Partial<DataOrangtuaProps>>({})

    useEffect(() => {
        onChange(dataOrangtua);
    }, [dataOrangtua, onChange])

    return (
        <section>
            <h1 className="text-md font-semibold">{title}</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <InputComponent
                    keyname="nama_ayah"
                    name="Nama Ayah"
                    defaultValue={defaultValue?.nama_ayah}
                    onChange={(data) => {
                        setDataOrangtua(prev => ({
                            ...prev, nama_ayah: data
                        }))
                    }}
                    placeholder="Masukkan nama ayah"
                    dataType={DataType.Text}
                />
                <InputComponent
                    keyname="nik_ayah"
                    name="NIK Ayah"
                    defaultValue={defaultValue?.nik_ayah}
                    onChange={(data) => {
                        setDataOrangtua(prev => ({
                            ...prev, nik_ayah: data
                        }))
                    }}
                    placeholder="Masukkan NIK ayah"
                    dataType={DataType.Number}
                />
                <InputComponent
                    keyname="nama_ibu"
                    name="Nama ibu"
                    defaultValue={defaultValue?.nama_ibu}
                    onChange={(data) => {
                        setDataOrangtua(prev => ({
                            ...prev, nama_ibu: data
                        }))
                    }}
                    placeholder="Masukkan nama ibu"
                    dataType={DataType.Text}
                />
                <InputComponent
                    keyname="nik_ibu"
                    name="NIK ibu"
                    defaultValue={defaultValue?.nik_ibu ?? ''}
                    onChange={(data) => {
                        setDataOrangtua(prev => ({
                            ...prev, nik_ibu: data
                        }))
                    }}
                    placeholder="Masukkan NIK ibu"
                    dataType={DataType.Number}
                />
            </div>
        </section>
    )
}