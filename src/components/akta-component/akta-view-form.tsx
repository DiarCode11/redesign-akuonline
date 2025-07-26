import { PelaporForm, DataAnakForm, DataKematianForm, DataSuamiIstriForm, DataPerkawinanForm, DataPerceraianForm, DataPengakuanAnakForm, DataAdopsiAnakForm } from "./akta-form"

export type jenisAktaProps = 'Kelahiran' | 'Kematian' | 'Perkawinan' | 'Perceraian' | 'Pengakuan Anak' | 'Adopsi Anak' | 'Pengesahan Anak';

type AktaFormProps = {
    type: jenisAktaProps
}

export default function AktaForm({ type }: AktaFormProps) {
    return (
        <>
            <PelaporForm label="Data Pelapor" formTitle="Tambah Data Pelapor" />
            { type === "Perkawinan" && <DataSuamiIstriForm formTitle="Tambah Data Suami" status="Suami" /> }
            { type === "Perkawinan" && <DataSuamiIstriForm formTitle="Tambah Data Istri" status="Istri" /> }
            { type === "Perceraian" && <PelaporForm label="Data Suami Sebelumnya" buttonName="Data Suami" formTitle="Tambah Data Suami Sebelumnya" />}
            { type === "Perceraian" && <PelaporForm label="Data Istri Sebelumnya" buttonName="Data Istri" formTitle="Tambah Data Istri Sebelumnya" />}
            <PelaporForm label="Data Saksi 1" formTitle="Tambah Data Saksi 1" />
            <PelaporForm label="Data Saksi 2" formTitle="Tambah Data Saksi 2" />
            { type === "Perkawinan" && <DataPerkawinanForm formTitle="Tambah Data Perkawinan" label="Data Perkawinan" /> }
            { !['Perkawinan', 'Perceraian', 'Pengakuan Anak', 'Adopsi Anak'].includes(type) && <PelaporForm label="Data Ayah" formTitle="Tambah Data Ayah" isParent={true} /> }
            { !['Perkawinan', 'Perceraian', 'Pengakuan Anak', 'Adopsi Anak'].includes(type) && <PelaporForm label="Data Ibu" formTitle="Tambah Data Ibu" isParent={true} />} 
            { type === "Kelahiran" &&  <DataAnakForm formTitle="Tambah Data Anak" label="Anak"  />}
            { type === "Kematian" && <DataKematianForm formTitle="Tambah Data Kematian" label="Kematian" /> }
            { type === "Perceraian" && <DataPerceraianForm formTitle="Tambah Data Perceraian" label="Data Perceraian" /> }
            { type === "Pengakuan Anak" && <DataPengakuanAnakForm formTitle="Tambah Data Pengakuan Anak" label="Data Pengakuan Anak" buttonName="Data Pengakuan" /> }
            { type === "Adopsi Anak" && <DataAdopsiAnakForm formTitle="Tambah Data Pengangkatan Anak" label="Data Pengangkatan Anak" buttonName="Data Pengangkatan" /> }
            { type === "Pengesahan Anak" && <DataAdopsiAnakForm formTitle="Tambah Data Pengesahan Anak" label="Data Pengesahan Anak" buttonName="Data Pengesahan" /> }
        </>
    )
}