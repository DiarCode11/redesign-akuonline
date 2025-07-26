import InputComponent from "@/components/form-component/input-component"
import DropdownComponent from "@/components/form-component/dropdown-component"
import RadioComponent from "@/components/form-component/radio-component";
import DatePickerComponent from "@/components/form-component/datepicker-component";
import { useEffect, useState } from "react";


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
    defaultData? : defaultDataProps
    onChange: (value: Partial<DataPribadiProps>) => void
};

export const hubunganKeluarga = [
    "Kepala Keluarga",
    "Istri",
    "Anak",
    "Menantu",
    "Cucu",
    "Orang Tua",
    "Mertua",
    "Famili Lain",
    "Lainnya"
];

const defaultValue : defaultDataProps = {
    jenis_kelamin: "",
    nama: "",
    status: ""
}

export default function DataPribadiSection({ title, defaultData = defaultValue, onChange }: DataPribadi) {
    const [dataPribadi, setDataPribadi] = useState<Partial<DataPribadiProps>>({});
    function isDataNull() {
        const isNull = defaultData.nama === "" && 
                        defaultData.jenis_kelamin === "" && 
                        defaultData.status === "";
        return isNull; 
    }


    const pendidikanList = [
        "Tidak/belum Sekolah",
        "Belum Tamat SD",
        "Tamat SD/sederajat",
        "SMP/sederajat",
        "SMA/sederajat",
        "D1",
        "D2",
        "D3",
        "D4/S1",
        "S2",
        "S3"
    ];

    const pilihan_pekerjaan_kk = [
        "Belum / Tidak Bekerja",
        "Mengurus Rumah Tangga",
        "Pelajar / Mahasiswa",
        "Pensiunan",
        "Pegawai Negeri Sipil (PNS)",
        "Tentara Nasional Indonesia (TNI)",
        "Kepolisian RI (POLRI)",
        "Perdagangan",
        "Petani / Pekebun",
        "Peternak",
        "Nelayan / Perikanan",
        "Industri",
        "Konstruksi",
        "Transportasi",
        "Karyawan Swasta",
        "Karyawan BUMN",
        "Karyawan BUMD",
        "Karyawan Honorer",
        "Buruh Harian Lepas",
        "Buruh Tani / Perkebunan",
        "Buruh Nelayan / Perikanan",
        "Buruh Peternakan",
        "Pembantu Rumah Tangga",
        "Tukang Cukur",
        "Tukang Listrik",
        "Tukang Batu",
        "Tukang Kayu",
        "Tukang Sol Sepatu",
        "Tukang Las / Pandai Besi",
        "Tukang Jahit",
        "Penata Rambut",
        "Penata Rias",
        "Penata Busana",
        "Mekanik",
        "Tukang Gigi",
        "Seniman",
        "Tabib",
        "Paraji",
        "Perancang Busana",
        "Penterjemah",
        "Imam Masjid",
        "Pendeta",
        "Pastur",
        "Wartawan",
        "Ustadz / Mubaligh",
        "Juru Masak",
        "Promotor Acara",
        "Anggota DPR-RI",
        "Anggota DPD",
        "Anggota BPK",
        "Presiden",
        "Wakil Presiden",
        "Anggota Mahkamah Konstitusi",
        "Anggota Kabinet / Kementerian",
        "Duta Besar",
        "Gubernur",
        "Wakil Gubernur",
        "Bupati",
        "Wakil Bupati",
        "Walikota",
        "Wakil Walikota",
        "Anggota DPRD Provinsi",
        "Anggota DPRD Kabupaten / Kota",
        "Dosen",
        "Guru",
        "Pilot",
        "Pengacara",
        "Notaris",
        "Arsitek",
        "Akuntan",
        "Konsultan",
        "Dokter",
        "Bidan",
        "Perawat",
        "Apoteker",
        "Psikiater / Psikolog",
        "Penyiar Televisi",
        "Penyiar Radio",
        "Pelaut",
        "Peneliti",
        "Sopir",
        "Pialang",
        "Paranormal",
        "Pedagang",
        "Perangkat Desa",
        "Kepala Desa",
        "Biarawati",
        "Wiraswasta",
        "Anggota Lembaga Tinggi",
        "Artis",
        "Atlet",
        "Chef",
        "Manajer",
        "Tenaga Tata Usaha",
        "Operator",
        "Pekerja Pengolahan, Kerajinan",
        "Teknisi",
        "Asisten Ahli",
        "Lainnya"
    ]

    useEffect(() => {
        console.log(dataPribadi)
        onChange(dataPribadi)
    }, [dataPribadi, onChange])

    useEffect(() => {
        if (dataPribadi.hubungan_keluarga !== 'Kepala Keluarga') {
            setDataPribadi(prev => ({
                ...prev, email: null
            }))
        }
    }, [dataPribadi.hubungan_keluarga])


    return (
        <section>
            <h1 className="text-md font-semibold">{title}</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                <InputComponent 
                    keyname="nama_lengkap"
                    name="Nama Lengkap"
                    placeholder="Masukkan nama"
                    defaultValue={defaultData.nama}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, nama_lengkap: data
                        }))
                    }}
                />
                <DropdownComponent
                    label="Hubungan Dalam Keluarga"
                    data={hubunganKeluarga}
                    defaultData={defaultData.status}
                    placeholder="Pilih hubungan"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, 
                            hubungan_keluarga: data,
                        }))
                    }}
                />
                {dataPribadi.hubungan_keluarga === 'Kepala Keluarga' &&
                    <InputComponent
                        dataType={'email'}
                        name="Email"
                        keyname="email"
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
                    defaultItem={defaultData.jenis_kelamin}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, jenis_kelamin: data
                        }))
                    }}
                />
                <RadioComponent 
                    cols="grid-cols-4"
                    item={['A', 'B', 'O', 'AB']}
                    name="Golongan Darah"
                    defaultItem={isDataNull() ? "" : "B"}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, golongan_darah: data
                        }))
                    }}
                />
                <InputComponent
                    keyname="tempat_lahir"
                    name="Tempat Lahir"
                    defaultValue={isDataNull() ? "" : "New York"}
                    placeholder="Masukkan tempat lahir"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, tempat_lahir: data
                        }))
                    }}
                />
                <DatePickerComponent
                    getToggleStatus={() => {}}
                    label="Tanggal Lahir"
                    defaultDate={isDataNull() ? "" : "1999-12-12"}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, tanggal_lahir: data
                        }))
                    }}
                />
                <DropdownComponent
                    label="Agama"
                    data={['Hindu', 'Islam', 'Kristen', 'Katholik', 'Buddha', 'Konghucu']}
                    defaultData={isDataNull() ? "" : "Hindu"}
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
                    defaultItem={isDataNull() ? "" : "WNI"}
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, kewarganegaraan: data
                        }))
                    }}
                />
                <DropdownComponent
                    label="Pendidikan Terakhir"
                    data={pendidikanList}
                    defaultData={isDataNull() ? "" : "D4/S1"}
                    placeholder="Pilih jenis pendidikan"
                    onChange={(data) => {
                        setDataPribadi(prep => ({
                            ...prep, pendidikan_terakhir: data
                        }))
                    }}
                />
                <DropdownComponent
                    label="Pekerjaan"
                    data={pilihan_pekerjaan_kk}
                    defaultData={isDataNull() ? "" : "Pelajar / Mahasiswa"}
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