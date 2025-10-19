import InputComponent from "@/components/form-component/input-component";
import RadioComponent from "@/components/form-component/radio-component";
import { DataType } from "@/components/form-component/input-component";
import DatePickerComponent from "@/components/form-component/datepicker-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import { useEffect, useState } from "react";


export type DokumenIdentitasType = {
    no_akta_lahir: string,
    paspor: boolean,
    no_paspor: string,
    tgl_akhir_paspor: string,
    tipe_sponsor: string,
    nama_sponsor: string,
    alamat_sponsor: string,
    dokumen_ijin_tinggal: string,
    no_kitas_kitap: string,
    tmp_terbit_kitas_kitap: string,
    tgl_terbit_kitas_kitap: string,
    tgl_akhir_kitas_kitap: string,
    tmp_datang_pertama: string,
    tgl_datang_pertama: string
}

type DokumenIdentitasProps = {
    title : string
    defaultValue? : Partial<DokumenIdentitasType>
    isWNA? : boolean
    addMode: boolean
    onChange : (value: Partial<DokumenIdentitasType>) => void 
}

export default function DokumenIdentitasSection({ title, isWNA = false, defaultValue = {}, onChange} : DokumenIdentitasProps) {
    const [dokumenIdentitas, setDokumenIdentitas] = useState<Partial<DokumenIdentitasType>>(defaultValue);

    useEffect(() => {
        console.log('Data B: ', dokumenIdentitas)
        onChange(dokumenIdentitas);
    }, [dokumenIdentitas, onChange])

    return (
        <section>
            <h1 className="text-md font-semibold">{title}</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <InputComponent
                    keyname="no_akta_lahir"
                    name="Nomor Akta Lahir"
                    dataType={DataType.Text}
                    defaultValue={defaultValue?.no_akta_lahir ?? ""}
                    placeholder="Masukkan nomor akta"
                    onChange={(data) => {
                        setDokumenIdentitas(prev => ({
                            ...prev, no_akta_lahir: data
                        }))
                    }}
                />
                {!isWNA && (
                    <RadioComponent
                        cols="grid-cols-2"
                        item={['Ada', 'Tidak ada']}
                        name="Punya paspor?"
                        defaultItem={defaultValue?.paspor ? 'Ada' : 'Tidak ada'}
                        onChange={(data) => {
                            let data_doc = (data === 'Ada')
                            setDokumenIdentitas(prev => ({
                                ...prev, paspor: data_doc
                            }))
                        }}
                    />
                )}
                {(isWNA || dokumenIdentitas.paspor == true) && (
                    <InputComponent
                        keyname="no_paspor"
                        name="Nomor Paspor"
                        dataType={DataType.Text}
                        placeholder="Masukkan nomor paspor"
                        defaultValue={defaultValue?.no_paspor ?? ''}
                        onChange={(data) => {
                            setDokumenIdentitas(prev => ({
                                ...prev, no_paspor: data
                            }))
                        }}
                    />
                )}
                {(isWNA || dokumenIdentitas.paspor == true) && (
                    <DatePickerComponent
                        getToggleStatus={() => {}}
                        label="Tanggal Berakhir Paspor"
                        defaultDate={defaultValue?.tgl_akhir_paspor ?? ''}
                        onChange={(data) => {
                            setDokumenIdentitas(prev => ({
                                ...prev, tgl_akhir_paspor: data
                            }))
                        }}
                    />
                )}
                {isWNA && (
                    <>
                        <DropdownComponent
                            getDropdownStatus={() => {}}
                            data={['Individu', 'Badan Usaha/Perusahaan', 'Institusi Pendidikan', 'Organisasi Keagamaan', 'Lainnya']}
                            label="Tipe Sponsor"
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, tipe_sponsor: data
                                }))
                            }}
                            placeholder="Pilih jenis sponsor"
                            defaultData={defaultValue?.tipe_sponsor ?? ''}
                        />
                        <InputComponent
                            keyname="nama_sponsor"
                            name="Nama Sponsor"
                            dataType={DataType.Text}
                            placeholder="Masukkan nama sponsor"
                            defaultValue={defaultValue?.nama_sponsor ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, nama_sponsor: data
                                }))
                            }}
                        />
                        <InputComponent
                            keyname="alamat_sponsor"
                            name="Alamat Sponsor"
                            dataType={DataType.Text}
                            placeholder="Masukkan alamat sponsor"
                            defaultValue={defaultValue?.alamat_sponsor ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, alamat_sponsor: data
                                }))
                            }}
                        />
                        <RadioComponent
                            cols="grid-cols-2"
                            item={['KITAS', 'KITAP']}
                            name="Dokumen Ijin Tinggal"
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, dokumen_ijin_tinggal: data
                                }))
                            }}
                            defaultItem={defaultValue?.dokumen_ijin_tinggal ?? ''}
                        />
                        <InputComponent
                            keyname="no_kitas/kitap"
                            name={`Nomor ${dokumenIdentitas.dokumen_ijin_tinggal === 'KITAP' ? 'KITAP': 'KITAS'}`}
                            dataType={DataType.Number}
                            placeholder={`Nomor ${dokumenIdentitas.dokumen_ijin_tinggal === 'KITAP' ? 'KITAP': 'KITAS'}`}
                            defaultValue={defaultValue?.no_kitas_kitap ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, no_kitas_kitap: data
                                }))
                            }}
                        />
                        <InputComponent
                            keyname="tempat_terbit_kitas/kitap"
                            name={`Tempat Terbit ${dokumenIdentitas.dokumen_ijin_tinggal === 'KITAP' ? 'KITAP': 'KITAS'}`}
                            dataType={DataType.Text}
                            placeholder="Masukkan nama tempat"
                            defaultValue={defaultValue?.tmp_terbit_kitas_kitap ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, tmp_terbit_kitas_kitap: data
                                }))
                            }}
                        />
                        <DatePickerComponent
                            getToggleStatus={() => {}}
                            label={`Tanggal Terbit ${dokumenIdentitas.dokumen_ijin_tinggal === 'KITAP' ? 'KITAP': 'KITAS'}`}
                            defaultDate={defaultValue?.tgl_terbit_kitas_kitap ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, tgl_terbit_kitas_kitap: data
                                }))
                            }}
                        />
                        <DatePickerComponent
                            getToggleStatus={() => {}}
                            label={`Tanggal Akhir ${dokumenIdentitas.dokumen_ijin_tinggal === 'KITAP' ? 'KITAP': 'KITAS'}`}
                            defaultDate={defaultValue?.tgl_akhir_kitas_kitap ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, tgl_akhir_kitas_kitap: data
                                }))
                            }}
                        />
                        <InputComponent
                            keyname="tempat_datang_pertama"
                            name="Tempat Datang Pertama"
                            dataType={DataType.Text}
                            placeholder="Masukkan nama tempat"
                            defaultValue={defaultValue?.tmp_datang_pertama ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, tmp_datang_pertama: data
                                }))
                            }}
                        />
                        <DatePickerComponent
                            getToggleStatus={() => {}}
                            label="Tanggal Datang Pertama"
                            defaultDate={defaultValue?.tgl_datang_pertama ?? ''}
                            onChange={(data) => {
                                setDokumenIdentitas(prev => ({
                                    ...prev, tgl_datang_pertama: data
                                }))
                            }}
                        />
                    </>
                )}
            </div>
        </section>
    )
}

