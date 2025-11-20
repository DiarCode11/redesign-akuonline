"use client";
import { Button } from "../ui/button";
import { Plus, SquarePen } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import Modal from "../modal";
import InputComponent from "../form-component/input-component";
import RadioComponent from "../form-component/radio-component";
import DatePickerComponent from "../form-component/datepicker-component";
import DropdownComponent from "../form-component/dropdown-component";
import CounterComponent from "../form-component/counter-component";


type PelaporFormProps = {
    label: string,
    formTitle: string,
    isParent?: boolean,
    buttonName?: string,
    onDataChange?: (data: any) => void
}

type StatusProps =  {
    status : "Suami" | "Istri";
}

export function PelaporForm({ label, formTitle, isParent = false, buttonName = '' }: Partial<PelaporFormProps>) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [form, setForm] = useState({})

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent name="Nama" onChange={(data) => {setSelectedName(data)}} keyname="nama" placeholder="Masukkan nama" />
                        <InputComponent name="NIK" onChange={() => {}} keyname="nik" placeholder="Masukkan NIK" />
                        <InputComponent name="Nomor KK" onChange={() => {}} keyname="no-kk" placeholder="Masukkan nomor KK" />
                        {isParent && <DatePickerComponent label="Tanggal Lahir" onChange={() => {}} getToggleStatus={() => {}} /> }
                        <RadioComponent cols="sm:grid-cols-2" item={['WNI', 'WNA']} name="Kewarganegaraan" onChange={() => {}} />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedName && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedName}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {buttonName ? buttonName : label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}


export function DataAnakForm({ label, formTitle }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent name="Nama" onChange={(data) => {setSelectedName(data)}} keyname="nama" placeholder="Masukkan nama" />
                        <RadioComponent cols="sm:grid-cols-2" item={['Laki-laki', 'Perempuan']} name="Jenis kelamin" onChange={() => {}} />
                        <DropdownComponent getDropdownStatus={() => {}} data={['Rumah Sakit', 'Puskesmas', 'Polindes', 'Lainnya']} label="Tempat dilahirkan" onChange={() => {}} placeholder="Pilih tempat" />
                        <InputComponent name="Tempat kelahiran" onChange={() => {}} keyname="tempat-kelahiran" placeholder="Masukkan nama daerah" />
                        <DatePickerComponent label="Tanggal lahir" onChange={() => {}} getToggleStatus={() => {}} />
                        <InputComponent keyname="waktu-lahir" name="Waktu lahir" onChange={() => {}} placeholder="Pilih waktu"/>
                        <DropdownComponent getDropdownStatus={() => {}} data={['Tunggal', 'Kembar 2', 'Kembar 3', 'Kembar 4', 'Lainnya']} label="Jenis kelahiran" onChange={(data) => {}} placeholder={"Pilih jenis kelahiran"} />
                        <DropdownComponent getDropdownStatus={() => {}} data={['Dokter', 'Bidan/Perawat', 'Dukun', 'Lainnya']} label="Penolong kelahiran" onChange={(data) => {}} placeholder={"Pilih jenis kelahiran"} />
                        <InputComponent name="Kelahiran ke" onChange={() => {}} keyname="kelahiran-ke" placeholder="Masukkan urutan kelahiran" dataType="number" />
                        <InputComponent name="Berat bayi (kg)" onChange={() => {}} keyname="berat-bayi" placeholder="Masukkan berat bayi" dataType="number" />
                        <InputComponent name="Panjang bayi (cm)" onChange={() => {}} keyname="panjang-bayi" placeholder="Masukkan panjang bayi" dataType="number" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedName && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedName}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah data {label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}


export function DataKematianForm({ label, formTitle }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent name="Nama" onChange={(data) => {setSelectedName(data)}} keyname="nama" placeholder="Masukkan nama" />
                        <DropdownComponent getDropdownStatus={() => {}} data={['Sakit biasa/tua', 'Wabah penyakit', 'Kecelakaan', 'Kriminalitas', 'Bunuh diri', 'Lainnya']} label="Sebab kematian" onChange={() => {}} placeholder="Pilih sebab" />
                        <DatePickerComponent label="Tanggal kematian" onChange={() => {}} getToggleStatus={() => {}} />
                        <InputComponent keyname="waktu-lahir" name="Waktu kematian" onChange={() => {}} placeholder="Pilih waktu"/>
                        <InputComponent name="Tempat kematian" onChange={() => {}} keyname="kelahiran-ke" placeholder="Masukkan urutan kelahiran" dataType="number" />
                        <DropdownComponent getDropdownStatus={() => {}} data={['Dokter', 'Tenaga Kesehatan', 'Kepolisian', 'Kepala desa', 'Lainnya']} label="Yang menerangkan" onChange={() => {}} placeholder="Pilih jenis" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedName && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedName}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export function DataSuamiIstriForm({ formTitle, status = "Suami" }: Partial<PelaporFormProps & StatusProps>) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleCounterValue = useCallback((value: number) => {
        console.log(value);
    }, [])

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 sm:gap-y-7 gap-y-4 px-4">
                        <InputComponent name="Nama" onChange={(data) => {setSelectedName(data)}} keyname="nama" dataType="text" placeholder="Masukkan nama" />
                        <InputComponent name="NIK" onChange={(data) => {}} keyname="nik" placeholder="Masukkan NIK" dataType="number" />
                        <InputComponent name="Nomor KK" onChange={(data) => {}} keyname="KK" placeholder="Masukkan nomor KK" />
                        <RadioComponent cols="sm:grid-cols-2" item={['WNI', 'WNA']} name="Kewarganegaraan" onChange={() => {}} />
                        <InputComponent name="Nama Ayah" onChange={(data) => {}} keyname="nama-ayah" dataType="text" placeholder="Masukkan nama" />
                        <InputComponent name="NIK Ayah" onChange={(data) => {}} keyname="nik-ayah" dataType="number" placeholder="Masukkan NIK" />
                        <InputComponent name="Nama Ibu" onChange={(data) => {}} keyname="nama-Ibu" dataType="text" placeholder="Masukkan nama" />
                        <InputComponent name="NIK Ibu" onChange={(data) => {}} keyname="nik-Ibu" dataType="number" placeholder="Masukkan NIK" />
                        <DropdownComponent getDropdownStatus={() => {}} data={['Belum Kawin', 'Kawin', 'Cerai Mati', 'Cerai Hidup']} label="Status Perkawinan Sebelumnya" onChange={() => {}} placeholder="Pilih jenis" />
                        <CounterComponent label="Pernikahan Ke" onChange={handleCounterValue} />
                    </div>
                    <div className="pt-10 flex justify-end px-4">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>Data {status}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedName && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedName}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah data {status}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export function DataPerkawinanForm({ label, formTitle }: Partial<PelaporFormProps>) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [usingNotaris, setUsingNotaris] = useState<boolean>(false);

    const handleCounterValue = useCallback((value: number) => {
        console.log(value);
    }, [])

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 sm:gap-y-7 gap-y-4 px-4">
                        <DatePickerComponent label="Tanggal Perkawinan" getToggleStatus={() => {}} onChange={() => {}} placeholder="Pilih tanggal" />
                        <DropdownComponent 
                            getDropdownStatus={() => {}}
                            label="Agama"
                            data={['Hindu', 'Islam', 'Kristen', 'Katholik', 'Buddha', 'Konghucu']}
                            placeholder="Pilih agama"
                            onChange={() => {}}
                        />
                        <InputComponent name="Kepercayaan" onChange={(data) => {}} keyname="Kepercayaan" dataType="text" placeholder="Masukkan nama" />
                        <InputComponent name="Organisasi Kepercayaan" onChange={(data) => {}} keyname="Organisasi Kepercayaan" dataType="text" placeholder="Masukkan kepercayaan" />
                        <InputComponent name="Nama Pengadilan" onChange={(data) => {}} keyname="Nama Pengadilan" dataType="text" placeholder="Masukkan nama" />
                        <InputComponent name="Nomor Penetapan Pengadilan" onChange={(data) => {}} keyname="Nomor Penetapan Pengadilan" dataType="text" placeholder="Masukkan nomor" />
                        <DatePickerComponent label="Tanggal Penetapan Pengadilan" onChange={() => {}} getToggleStatus={() => {}} />
                        <InputComponent name="Nama Pemuka Agama" onChange={(data) => {}} keyname="Nomor Penetapan Pengadilan" dataType="text" placeholder="Masukkan nomor" />
                        <RadioComponent cols="grid-cols-2" item={['Ya', 'Tidak']} name="Perjanjian pernikahan dibuat oleh notaris?" 
                            onChange={(data) => {
                                if (data === 'Ya') {
                                    setUsingNotaris(true);
                                } else {
                                    setUsingNotaris(false);
                                }
                            }} 
                        />
                        { usingNotaris && (
                            <>
                                <InputComponent name="Nomor akta notaris" onChange={(data) => {}} keyname="Nama Pengadilan" dataType="text" placeholder="Masukkan nomor" />
                                <DatePickerComponent label="Tanggal perjanjian dibuat" onChange={() => {}} getToggleStatus={() => {}} />
                            </>
                        ) }
                   </div>
                    <div className="pt-10 flex justify-end px-4">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedName && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedName}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export function DataPerceraianForm({ label, formTitle }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedNomor, setSelectedNomor] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent keyname="no-akta-perkawinan" name="Nomor Akta Perkawinan" onChange={(data) => {setSelectedNomor(data)}} dataType="number" placeholder="Masukkan nomor" />
                        <DatePickerComponent label="Tanggal Akta Perkawinan" onChange={() => {}} getToggleStatus={() => {}} />
                        <InputComponent keyname="tmp-pencatatan" name="Tempat Pencatatan" onChange={() => {}} placeholder="Masukkan nama tempat" />
                        <InputComponent keyname="nama-pengadilan" name="Nama Pengadilan" onChange={() => {}} placeholder="Masukkan nama " />
                        <DatePickerComponent label="Tanggal Putusan Pengadilan" onChange={() => {}} getToggleStatus={() => {}} />
                        <InputComponent keyname="no-putusan" name="Nomor Putusan Pengadilan" onChange={() => {}} placeholder="Masukkan nomor" dataType="text" />
                        <InputComponent keyname="no-sk-panitera" name="No SK Panitera Pengadilan" onChange={() => {}} placeholder="Masukkan nomor" dataType="text" />
                        <DatePickerComponent label="Tgl SK Panitera Pengadilan" onChange={() => {}} getToggleStatus={() => {}} />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedNomor && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedNomor}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export function DataPengakuanAnakForm({ label, formTitle, buttonName = '' }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedNomor, setSelectedNomor] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent keyname="no-akta-lahir" name="Nomor Akta Kelahiran" onChange={(data) => {setSelectedNomor(data)}} placeholder="Masukkan nomor" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tgl Penerbitan Akta Kelahiran" onChange={() => {}} placeholder="Pilih Tanggal" />
                        <InputComponent keyname="dinas-penerbit" name="Dinas yang menerbitkan" onChange={() => {}} placeholder="Masukkan nama" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tgl Kelahiran Anak" onChange={() => {}} placeholder="Pilih Tanggal" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tgl Perkawinan Agama" onChange={() => {}} placeholder="Pilih Tanggal" />
                        <InputComponent keyname="nama-ibu" name="Nama Ibu Kandung" onChange={() => {}} placeholder="Masukkan nama" dataType="text" />
                        <InputComponent keyname="nik-ibu" name="NIK Ibu Kandung" onChange={() => {}} placeholder="Masukkan nomor" dataType="number" />
                        <RadioComponent cols="grid-cols-2" item={['WNI', 'WNA']} name="Kewarganegaraan Ibu Kandung" onChange={() => {}} />
                        <InputComponent keyname="nama-Ayah" name="Nama Ayah Kandung" onChange={() => {}} placeholder="Masukkan nama" dataType="text" />
                        <InputComponent keyname="nik-Ayah" name="NIK Ayah Kandung" onChange={() => {}} placeholder="Masukkan nomor" dataType="number" />
                        <RadioComponent cols="grid-cols-2" item={['WNI', 'WNA']} name="Kewarganegaraan Ayah Kandung" onChange={() => {}} />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tgl Penetapan Pengadilan" onChange={() => {}} />
                        <InputComponent keyname="no-penetapan" name="Nomor Penetapan Pengadilan" onChange={() => {}} placeholder="Masukkan nomor" dataType="text" />
                        <InputComponent keyname="nama-lembaga-pengadilan" name="Nama Lembaga Pengadilan" onChange={() => {}} placeholder="Masukkan nama" dataType="text" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedNomor && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedNomor}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {buttonName ? buttonName: label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export function DataAdopsiAnakForm({ label, formTitle, buttonName = '' }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedNama, setSelectedNama] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent keyname="nama" name="Nama Anak Angkat" onChange={(data) => {setSelectedNama(data)}} placeholder="Masukkan nama" />
                        <InputComponent keyname="no-akta" name="Nomor Akta Kelahiran" onChange={(data) => {}} placeholder="Masukkan nomor" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tgl Terbit Akta Kelahiran" onChange={() => {}} />
                        <InputComponent keyname="dinas" name="Dinas yang Menerbitkan Akta" onChange={(data) => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nama-ibu-kandung" name="Nama Ibu Kandung" onChange={(data) => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nik-ibu-kandung" name="NIK Ibu Kandung" onChange={(data) => {}} placeholder="Masukkan nama" />
                        <RadioComponent cols="grid-cols-2" item={['WNI', 'WNA']} name="Kewarganegaraan Ibu Kandung" onChange={() => {}} />
                        <InputComponent keyname="nama-ayah-kandung" name="Nama Ayah Kandung" onChange={(data) => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nik-ayah-kandung" name="NIK Ayah Kandung" onChange={(data) => {}} placeholder="Masukkan nomor" />
                        <RadioComponent cols="grid-cols-2" item={['WNI', 'WNA']} name="Kewarganegaraan Ayah Kandung" onChange={() => {}} />
                        <InputComponent keyname="nama-Ibu-Angkat" name="Nama Ibu Angkat" onChange={(data) => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nik-Ibu-Angkat" name="NIK Ibu Angkat" onChange={(data) => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="no-paspor-ibu-angkat" name="Nomor Paspor Ibu Angkat (opsional)" onChange={(data) => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nama-Ayah-Angkat" name="Nama Ayah Angkat" onChange={(data) => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nik-Ayah-Angkat" name="NIK Ayah Angkat" onChange={(data) => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="no-paspor-ayah-angkat" name="Nomor Paspor Ayah Angkat (opsional)" onChange={(data) => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nama-lembaga-pengadilan" name="Nama Pengadilan" onChange={() => {}} placeholder="Masukkan nama" dataType="text" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tgl Penetapan Pengadilan" onChange={() => {}} />
                        <InputComponent keyname="no-penetapan" name="Nomor Penetapan Pengadilan" onChange={() => {}} placeholder="Masukkan nomor" dataType="text" />
                        <InputComponent keyname="nama-lembaga-pengadilan" name="Lembaga Penetapan Pengadilan" onChange={() => {}} placeholder="Masukkan nama" dataType="text" />
                        <InputComponent keyname="tmp-lembaga-pengadilan" name="Tempat Lembaga Pengadilan" onChange={() => {}} placeholder="Masukkan nama" dataType="text" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedNama && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedNama}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {buttonName ? buttonName: label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}


export function PembetulanAktaForm({ label, formTitle, buttonName = '' }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedNama, setSelectedNama] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent keyname="nama" name="Nomor Akta yang Dibetulkan" onChange={() => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nik" name="Nama Ayah" onChange={(data) => {setSelectedNama(data)}} placeholder="Masukkan nama" />
                        <InputComponent keyname="kk" name="NIK Ayah" onChange={() => {}} placeholder="Masukkan NIK" />
                        <InputComponent keyname="nama ibu" name="Nama Ibu" onChange={() => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nik ibu" name="NIK Ibu" onChange={() => {}} placeholder="Masukkan NIK" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedNama && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedNama}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {buttonName ? buttonName: label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export function PerubahanKewarganegaraanForm({ label, formTitle, buttonName = '' }: PelaporFormProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedNama, setSelectedNama] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => {setModalOpen(false)}} title={formTitle} >
                <div className="py-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-7 px-4">
                        <InputComponent keyname="nama" name="Kewarganegaraan Baru" onChange={() => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nik" name="Nomor Akta Kelahiran" onChange={() => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="kk" name="Nomor Akta Perkawinan" onChange={() => {}} placeholder="Masukkan NIK" />
                        <InputComponent keyname="nama ibu" name="Nama Suami atau Istri" onChange={() => {}} placeholder="Masukkan nama" />
                        <InputComponent keyname="nik ibu" name="NIK Suami atau Istri" dataType="number" onChange={() => {}} placeholder="Masukkan NIK" />
                        <InputComponent keyname="nik ibu" name="Nomor Paspor" dataType="number" onChange={() => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nik ibu" name="Nomor Afidavit" onChange={() => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nik ibu" name="Nomor Keputusan Presiden" onChange={() => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nik ibu" name="Nomor Berita Acara Sumpah" onChange={() => {}} placeholder="Masukkan nomor" />
                        <InputComponent keyname="nik ibu" name="Nama Jabatan yang Menerbitkan" onChange={() => {}} placeholder="Masukkan nama" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tanggal diterbitkan" onChange={() => {}} placeholder="Pilih tanggal" />
                        <InputComponent keyname="nik ibu" name="Nomor Keputusan Menteri" onChange={() => {}} placeholder="Masukkan nomor" />
                        <DatePickerComponent getToggleStatus={() => {}} label="Tanggal terbit keputusan" onChange={() => {}} placeholder="Pilih tanggal" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => {
                                setIsSubmitted(true);
                                setModalOpen(false);
                            }} 
                            className={'bg-sky-600 text-white px-4 py-2 cursor-pointer'} size={'md'} variant={'primary'}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Tampilan button */}
            <div className="grid sm:grid-cols-2 grid-cols-1 border-b-2 border-gray-300">
                <div className="h-16 flex items-center">
                    <h1>{label}</h1>
                </div>
                <div className="h-16 flex items-center">
                    {(selectedNama && isSubmitted) ? (
                        <div className="flex space-x-4">
                            <p className="font-xsemibold text-sky-600">{selectedNama}</p>
                            <SquarePen />
                        </div>
                    ) : (
                        <Button onClick={() => setModalOpen(true)} className={'border-2 cursor-pointer select-none w-[250px] hover:bg-sky-600 hover:text-white border-sky-600 px-6 py-2 rounded-md text-sky-600 transitio'} size={'md'} variant={'primary'}>
                            <Plus />
                            Tambah {buttonName ? buttonName: label}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

