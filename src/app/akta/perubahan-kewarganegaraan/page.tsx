"use client";

import Link from "next/link";
import { ArrowLeft, Check, Download } from "lucide-react";
import Accordion from "@/components/accordion";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputComponent from "@/components/form-component/input-component";
import { Button } from "@/components/ui/button";
import RadioComponent from "@/components/form-component/radio-component";
import AktaForm, { jenisAktaProps } from "@/components/akta-component/akta-view-form";
import FileInput from "@/components/form-component/fileinput-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import tr from "zod/v4/locales/tr.cjs";

const village_data: Record<string, string[]> = {
  "Banjar": [
    "Banjar", "Banjar Tegeha", "Banyuatis", "Banyuseri", "Cempaga", "Dencarik", "Gesing", "Gobleg",
    "Kaliasem", "Kayuputih", "Munduk", "Pedawa", "Sidetapa", "Tampekan", "Temukus", "Tigawasa", "Tirtasari"
  ],
  "Buleleng": [
    "Alasangker", "Anturan", "Bakti Seraga", "Jinengdalem", "Kalibukbuk", "Nagasepaha", "Pemaron", "Penglatan",
    "Petandakan", "Poh Bergong", "Sari Mekar", "Tukadmungga",
    "Astina", "Banjar Bali", "Banjar Jawa", "Banjar Tegal", "Banyuasri", "Banyuning", "Beratan", "Kaliuntu",
    "Kampung Anyar", "Kampung Baru", "Kampung Bugis", "Kampung Kajanan", "Kampung Singaraja", "Kendran",
    "Liligundi", "Paket Agung", "Penarukan"
  ],
  "Busung Biu": [
    "Bengkel", "Bongancina", "Busung Biu", "Kedis", "Kekeran", "Pelapuan", "Pucaksari", "Sepang", "Sepang Kelod",
    "Subuk", "Telaga", "Tinggarsari", "Tista", "Titab", "Umejero"
  ],
  "Gerokgak": [
    "Banyupoh", "Celukanbawang", "Gerokgak", "Musi", "Patas", "Pejarakan", "Pemuteran", "Pengulon", "Penyabangan",
    "Sanggalangit", "Sumberklampok", "Sumberkima", "Tinga-Tinga", "Tukadsumaga"
  ],
  "Kubutambahan": [
    "Bengkala", "Bila", "Bontihing", "Bukti", "Bulian", "Depeha", "Kubutambahan", "Mengening", "Pakisan",
    "Tajun", "Tambakan", "Tamblang", "Tunjung"
  ],
  "Sawan": [
    "Bebetin", "Bungkulan", "Galungan", "Giri Emas", "Jagaraga", "Kerobokan", "Lemukih", "Menyali", "Sangsit",
    "Sawan", "Sekumpul", "Sinabun", "Sudaji", "Suwug"
  ],
  "Seririt": [
    "Banjar Asem", "Bestala", "Bubunan", "Gunungsari", "Joanyar", "Kalianget", "Kalisada", "Lokapaksa",
    "Mayong", "Munduk Bestala", "Pangkung Paruk", "Patemon", "Pengastulan", "Rangdu", "Ringdikit",
    "Sulanyah", "Tangguwisia", "Ularan", "Umeanyar", "Unggahan", "Seririt"
  ],
  "Sukasada": [
    "Ambengan", "Git Git", "Kayu Putih", "Padang Bulia", "Pancasari", "Panji", "Panji Anom", "Pegadungan",
    "Pegayaman", "Sambangan", "Selat", "Silangjana", "Tegal Linggah", "Wanagiri", "Sukasada"
  ],
  "Tejakula": [
    "Bondalem", "Julah", "Les", "Madenan", "Pacung", "Penuktukan", "Sambirenteng", "Sembiran", "Tejakula", "Tembok"
  ]
}

export default function PerubahanKewarganegaraan() {
    const [villages, setVillages] = useState<string[]>([]);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
    const [overflowStatus, setOverflowStatus] = useState<boolean>(true);
    const [accordionStatus, setAccordionStatus] = useState<boolean>(true);
    const [formState, setFormState] = useState<{ currentStep: number; accordionActive: number }>({
        currentStep: 1,
        accordionActive: 1,
    });

    const handleVillages = useCallback((villages: string[]) => {
        setVillages(villages);
    }, [])

    const nextToStep = useCallback((value: number) => {
        setFormState(prev => ({
            currentStep: Math.max(prev.currentStep, value),
            accordionActive: value
        }));
    }, []);


    useEffect(() => {
        if (formState.accordionActive === 0 || formState.accordionActive > 1) {
            setOverflowStatus(true);
        }
    }, [formState.accordionActive])

    return (
        <>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl">Perubahan Kewarganegaraan</h1>
            </div>

            <div className="flex flex-col space-y-2">
                {/* Accordion 1 */}
                <Accordion
                    title="Informasi Dasar"
                    number={1}
                    bulletColor="bg-yellow-700"
                    setOverflow={overflowStatus}
                    active={formState.currentStep >= 1}
                    isOpen={formState.accordionActive === 1}
                    onToggle={(isOpen) => {
                        if (1 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 1 : 0
                            }));

                            if (!isOpen) {
                                setOverflowStatus(true);
                            }
                        }
                    }}
                >
                    <div className="py-4 grid sm:grid-cols-2 gap-4">
                        <DropdownComponent getDropdownStatus={(status) => {status && setOverflowStatus(false)} } data={Object.keys(village_data)} label="Kecamatan" onChange={(data) => {handleVillages(village_data[data])}} placeholder="Pilih kecamatan" />
                        <DropdownComponent getDropdownStatus={(status) => {status && setOverflowStatus(false)} } data={villages} label="Desa" onChange={() => {}} placeholder="Pilih desa" />
                    </div> 
                    <div className="flex justify-end pt-5">
                        <Button onClick={() => nextToStep(2)} variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                            Simpan
                        </Button>
                    </div>
                </Accordion>

                {/* Accordion 2 */}
                <Accordion
                    title="Masukkan Data"
                    number={2}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 2}
                    isOpen={formState.accordionActive === 2}
                    onToggle={(isOpen) => {
                        if (2 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 2 : 0
                            }));
                        }
                    }}
                >
                    {/* Tampilkan data sesuai akta yang dipilih */}
                    <AktaForm type="Perubahan Kewarganegaraan" />
                    <div className="flex justify-end pt-5">
                        <Button onClick={() => nextToStep(3)} variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                            Simpan
                        </Button>
                    </div>
                </Accordion>

                {/* Accordion 3 */}
                <Accordion
                    title="Download Dokumen"
                    number={3}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 3}
                    isOpen={formState.accordionActive === 3}
                    onToggle={(isOpen) => {
                        if (3 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 3 : 0
                            }));
                        }
                    }}
                >
                    <div>
                        <h3 className="text-sm py-4 text-gray-400">Unduh Formulir ini dan lakukan pengisian tandatangan/materai</h3>
                        <div className="flex flex-col space-y-1">
                            <span className="flex items-center space-x-2">
                                {isAllDocDownloaded ? (<Check size={18} />) : (<Download size={18} />)}
                                <p>F-2.01 (Formulir Pencatatan Sipil)</p>
                            </span>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button 
                                onClick={() => {
                                    if (isAllDocDownloaded) {
                                        nextToStep(4);
                                    } else {
                                        setAllDocDownloaded(true);
                                    }   
                                }} 
                                className="flex gap-2 transition-all duration-500 ease-in-out items-center cursor-pointer bg-sky-600 px-4 py-2 rounded-md text-white sm:text-base text-sm"
                            >
                                <span>{isAllDocDownloaded ? 'Lanjut' : 'Download semua'}</span>
                            </button>
                        </div>
                    </div>
                </Accordion>

                {/* Accordion 4 */}
                <Accordion
                    title="Upload Dokumen"
                    number={4}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 4}
                    isOpen={formState.accordionActive === 4}
                    onToggle={(isOpen) => {
                        if (4 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 4 : 0
                            }));
                        }
                    }}
                >
                    <h3 className="text-sm py-4 text-gray-400">Lakukan upload file yang sudah diisi tandatangan/materai</h3>
                    <div className="flex flex-col space-y-3">
                        <FileInput onChange={() => {}} id="form_1" label="F-2.01 (Formulir Pencatatan Sipil)" />
                        <FileInput onChange={() => {}} id="form_2" label="Scan Putusan Menteri" />
                        <FileInput onChange={() => {}} id="form_3" label="Scan Berita Acara Pengucapan Sumpah" />
                        <FileInput onChange={() => {}} id="form_4" label="Kutipan Akta Pencatatan Sipil" />
                        <FileInput onChange={() => {}} id="form_5" label="Scan Kartu Keluarga" />
                        <FileInput onChange={() => {}} id="form_6" label="Scan KTP" />
                    </div>
                    <div className="flex justify-end pt-5">
                        <Link href={'/'}>
                            <Button variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                                Selesai
                            </Button>
                        </Link>
                    </div>
                </Accordion>
            </div>
        </>
    );
}
