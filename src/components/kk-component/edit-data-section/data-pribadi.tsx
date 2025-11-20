import InputComponent from "@/components/form-component/input-component"
import DropdownComponent from "@/components/form-component/dropdown-component"
import RadioComponent from "@/components/form-component/radio-component";
import DatePickerComponent from "@/components/form-component/datepicker-component";
import { useEffect, useState } from "react";
import { dataKeluargaProps } from "@/app/kk/edit-kk/page";
import { hubunganKeluarga, pendidikanList, pilihan_pekerjaan_kk } from "@/lib/config";
import { convertDateToYYYYMMDD } from "@/helper/dateStringConverter";


export type DataPribadiProps = {
    nama_lengkap: string;                
    hubungan_keluarga: string;
    email: string;          
    jenis_kelamin: string;  
    golongan_darah: string;    // RadioComponent
    tempat_lahir: string;               // InputComponent
    tanggal_lahir: string;              // DatePickerComponent (format: YYYY-MM-DD)
    agama: string; // DropdownComponent
    kewarganegaraan: string;     // RadioComponent
    pendidikan_terakhir: string;        // DropdownComponent
    pekerjaan: string;                  // DropdownComponent
};

type defaultDataProps = {
    nama: string,
    status: string,
    jenis_kelamin : string
}

type DataPribadi = {
    title : string
    defaultData? : dataKeluargaProps
    onChange: (value: Partial<DataPribadiProps>) => void
};


export default function DataPribadiSection({ title, defaultData = null, onChange }: DataPribadi) {
    const [dataPribadi, setDataPribadi] = useState<Partial<dataKeluargaProps>>({});

    useEffect(() => {
        console.log(dataPribadi)
        onChange(dataPribadi)
    }, [dataPribadi, onChange])

    useEffect(() => {
        if (dataPribadi.status !== 'Kepala Keluarga') {
            setDataPribadi(prev => ({
                ...prev, email: null
            }))
        }
    }, [dataPribadi.status])


    return (
        <section>
            <h1 className="text-md font-semibold">{title}</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <InputComponent 
                    keyname="nama_lengkap"
                    name="Nama Lengkap"
                    placeholder="Masukkan nama"
                    defaultValue={defaultData?.namaLengkap === undefined ? "" : defaultData.namaLengkap}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, namaLengkap: data
                        }))
                    }}
                />
                <DropdownComponent 
                    getDropdownStatus={() => {}}
                    label="Hubungan Dalam Keluarga"
                    data={hubunganKeluarga}
                    defaultData={defaultData?.status === undefined ? "" : defaultData.status}
                    placeholder="Pilih hubungan"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, 
                            status: data,
                        }))
                    }}
                />
                {(dataPribadi.status === 'Kepala Keluarga'  || defaultData?.status === "Kepala Keluarga")&&
                    <InputComponent
                        dataType={'email'}
                        name="Email"
                        keyname="email"
                        defaultValue={defaultData?.email === undefined ? "" : defaultData.email}
                        placeholder="Masukkan email"
                        onChange={(data) => {
                            setDataPribadi(prev => ({
                                ...prev, 
                                email: data,
                            }))
                        }}
                    />
                }
                <RadioComponent 
                    cols="grid-cols-2"
                    item={['Laki-laki', 'Perempuan']}
                    name="Jenis Kelamin"
                    defaultItem={defaultData?.jenisKelamin === undefined ? "" : defaultData.jenisKelamin}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, jenisKelamin: data
                        }))
                    }}
                />
                <RadioComponent 
                    cols="grid-cols-4"
                    item={['A', 'B', 'O', 'AB']}
                    name="Golongan Darah"
                    defaultItem={defaultData?.golonganDarah === undefined ? "": defaultData.golonganDarah}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, golongan_darah: data
                        }))
                    }}
                />
                <InputComponent
                    keyname="tempat_lahir"
                    name="Tempat Lahir"
                    defaultValue={defaultData?.tempatLahir === undefined ? "" : defaultData.tempatLahir}
                    placeholder="Masukkan tempat lahir"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, tempatLahir: data
                        }))
                    }}
                />
                <DatePickerComponent
                    getToggleStatus={() => {}}
                    label="Tanggal Lahir"
                    defaultDate={defaultData?.tanggalLahir === undefined ? "" : convertDateToYYYYMMDD(defaultData.tanggalLahir)}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, tanggalLahir: data
                        }))
                    }}
                />
                <DropdownComponent 
                    getDropdownStatus={() => {}}
                    label="Agama"
                    data={['Hindu', 'Islam', 'Kristen', 'Katholik', 'Buddha', 'Konghucu']}
                    defaultData={defaultData?.agama === undefined ? "" : defaultData.agama}
                    placeholder="Pilih agama"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, agama: data
                        }))
                    }}
                />
                <RadioComponent 
                    cols="grid-cols-2"
                    item={['WNI', 'WNA']}
                    name="Kewarganegaraan"
                    defaultItem={defaultData?.kewarganegaraan === undefined ? "" : defaultData.kewarganegaraan}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, kewarganegaraan: data
                        }))
                    }}
                />
                <DropdownComponent 
                    getDropdownStatus={() => {}}
                    label="Pendidikan Terakhir"
                    data={pendidikanList}
                    defaultData={defaultData?.pendidikanTerakhir == undefined ? "" : defaultData.pendidikanTerakhir}
                    placeholder="Pilih jenis pendidikan"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, pendidikanTerakhir: data
                        }))
                    }}
                />
                <DropdownComponent 
                    getDropdownStatus={() => {}}
                    label="Pekerjaan"
                    data={pilihan_pekerjaan_kk}
                    defaultData={defaultData?.pekerjaan === undefined ? "" : defaultData.pekerjaan}
                    placeholder="Pilih jenis pekerjaan"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, pekerjaan: data
                        }))
                    }}
                />
            </div>
        </section>
    )
}