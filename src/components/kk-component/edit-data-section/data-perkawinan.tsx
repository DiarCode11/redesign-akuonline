import DatePickerComponent from "@/components/form-component/datepicker-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import InputComponent from "@/components/form-component/input-component";
import { useEffect, useState } from "react";

export type DataPerkawinanProps = {
    status_perkawinan : string,
    tgl_kawin : string,
    no_akta_perkawinan : string
    tgl_cerai : string,
    no_akta_perceraian : string
}

type DataPerkawinanType = {
    title : string
    addMode : boolean
    onChange: (value: Partial<DataPerkawinanProps>) => void
}

export default function DataPerkawinanSection({ title, addMode = false, onChange } : DataPerkawinanType) {
    const [dataPerkawinan, setDataPerkawinan] = useState<Partial<DataPerkawinanProps>>({})

    useEffect(() => {
        console.log("Data C: ", dataPerkawinan)
        onChange(dataPerkawinan);
    }, [dataPerkawinan, onChange])

    return (
        <section>
            <h1 className="text-md font-semibold">{title}</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <DropdownComponent
                    getDropdownStatus={() => {}}
                    data={['Belum/Tidak kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']}
                    label="Status Perkawinan"
                    defaultData={addMode ? "" : "Kawin"}
                    onChange={(data) => {setDataPerkawinan(prev => ({
                        ...prev, status_perkawinan: data
                    }))}}
                    placeholder="Pilih status perkawinan"
                />
                {( dataPerkawinan.status_perkawinan && 
                    dataPerkawinan.status_perkawinan !== 'Belum/Tidak kawin' && 
                    dataPerkawinan.status_perkawinan !== 'Cerai Mati') && 
                (
                    <>
                        <DatePickerComponent
                            getToggleStatus={() => {}}
                            label={`Tanggal ${dataPerkawinan.status_perkawinan === 'Kawin' ? 'Perkawinan' : 'Perceraian'}`}
                            onChange={(data) => {
                                if (dataPerkawinan.status_perkawinan === 'Kawin') {
                                    setDataPerkawinan(prev => ({
                                        ...prev, tgl_kawin: data
                                    }))
                                } else if (dataPerkawinan.status_perkawinan === 'Cerai Hidup') {
                                    setDataPerkawinan(prev => ({
                                        ...prev, tgl_cerai: data
                                    }))
                                }
                            }}
                        />
                        <InputComponent
                            keyname="no_akta_perkawinan"
                            name={`Nomor Akta ${dataPerkawinan.status_perkawinan === 'Kawin' ? 'Perkawinan' : 'Perceraian'}`}
                            placeholder="Masukkan nomor akta"
                            dataType="text"
                            onChange={(data) => {
                                if (dataPerkawinan.status_perkawinan === 'Kawin') {
                                    setDataPerkawinan(prev => ({
                                        ...prev, no_akta_perkawinan: data
                                    }))
                                } else if (dataPerkawinan.status_perkawinan === 'Cerai Hidup') {
                                    setDataPerkawinan(prev => ({
                                        ...prev, no_akta_perceraian: data
                                    }))
                                }
                            }}
                        />
                    </>
                )}
            </div>
        </section>
    )
}