"use client";

import Link from "next/link";
import { ArrowLeft, Check, Download } from "lucide-react";
import Accordion from "@/components/accordion";
import { ReactNode, useCallback, useState } from "react";
import InputComponent from "@/components/form-component/input-component";
import { Button } from "@/components/ui/button";
import RadioComponent from "@/components/form-component/radio-component";
import AktaForm, { jenisAktaProps } from "@/components/akta-component/akta-view-form";
import FileInput from "@/components/form-component/fileinput-component";

export default function BuatAkta() {
    const [NoKK, setNoKK] = useState<string>('');
    const [jenisAktaSelected, setJenisAktaSelected] = useState<string>('');
    const [isKKSubmitted, setIsKKSubmitted] = useState<boolean>(false);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
    const [formState, setFormState] = useState<{ currentStep: number; accordionActive: number }>({
        currentStep: 1,
        accordionActive: 1,
    });

    const dataAnggota = [
        { nama: 'I Wayan Yoga Sastrawan', status: 'Kepala Keluarga', jenis_kelamin: 'Laki-laki' },
        { nama: 'John Smith', status: 'Saudara', jenis_kelamin: 'Laki-laki' },
        { nama: 'Mariah Maclach', status: 'Istri', jenis_kelamin: 'Perempuan' }
    ];

    const jenis_akta : string[] = ['Kelahiran', 'Kematian', 'Perkawinan', 'Perceraian', 'Pengakuan Anak', 'Adopsi Anak', 'Pengesahan Anak'];
    const view_form_akta : Record<Partial<jenisAktaProps>, ReactNode> = {
        'Kelahiran': <AktaForm type="Kelahiran" />,
        'Kematian': <AktaForm type="Kematian" />,
        'Perkawinan' : <AktaForm type="Perkawinan" />,
        'Adopsi Anak' : <AktaForm type="Adopsi Anak" />,
        'Perceraian': <AktaForm type="Perceraian" />,
        "Pengakuan Anak": <AktaForm type="Pengakuan Anak" />,
        "Pengesahan Anak": <AktaForm type="Pengesahan Anak" />
    }

    const nextToStep = useCallback((value: number) => {
        setFormState(prev => ({
            currentStep: Math.max(prev.currentStep, value),
            accordionActive: value
        }));
    }, []);

    return (
        <>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl">Pembuatan Akta Kependudukan</h1>
            </div>

            <div className="flex flex-col space-y-2">
                {/* Accordion 1 */}
                <Accordion
                    title="Informasi Pemohon"
                    number={1}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 1}
                    isOpen={formState.accordionActive === 1}
                    onToggle={(isOpen) => {
                        if (1 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 1 : 0
                            }));
                        }
                    }}
                >
                    <div className="py-4 flex items-end space-x-3 z-0">
                        <InputComponent
                            keyname="No_KK"
                            name="Nomor Kartu Keluarga"
                            dataType="number"
                            onChange={(data) => {setNoKK(data)}}
                            placeholder="Masukkan Nomor KK"
                        />
                        <Button disabled={!NoKK} onClick={() => {setIsKKSubmitted(true)}} className="bg-sky-600 cursor-pointer h-10 text-white px-5" size="md" variant="primary">
                            Cek
                        </Button>
                    </div>

                    {isKKSubmitted && (
                        <>
                        <div>
                            <h3>Data Kartu Keluarga</h3>
                            <div className="overflow-x-auto">
                                <table className="sm:w-full w-max">
                                    <thead>
                                        <tr className="bg-gray-600 w-full">
                                            <th className="text-left w-[200px] px-5 text-white">Nama</th>
                                            <th className="text-left w-[250px] text-white">Status Dalam Keluarga</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-medium">
                                        {dataAnggota.map((item, index) => (
                                            <tr key={index} className="font-medium border-b border-gray-400">
                                                <td className="text-left px-5 py-2">{item.nama}</td>
                                                <td className="text-left">{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="py-5">
                            <RadioComponent
                                cols="sm:grid-cols-3"
                                item={jenis_akta}
                                name="Pilih Jenis Akta"
                                onChange={(data) => {
                                    setJenisAktaSelected(data);
                                    console.log(data);
                                }}
                            />
                        </div>

                        <div className="flex justify-end pt-5">
                            <Button disabled={!jenisAktaSelected} onClick={() => nextToStep(2)} variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                                Simpan
                            </Button>
                        </div>
                        </>
                    )}
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
                    {view_form_akta[jenisAktaSelected]}
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
                            { (jenisAktaSelected !== 'Pengakuan Anak' && jenisAktaSelected !== 'Adopsi Anak' && jenisAktaSelected !== 'Pengesahan Anak') && 
                                <span className="flex items-center space-x-2">
                                    {isAllDocDownloaded ? (<Check size={18} />) : (<Download size={18} />)}
                                    <p>F-2.01 (Permohonan Penerbitan Akta)</p>
                                </span>
                            }
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
                        <FileInput onChange={() => {}} id="form_isian" label="F-2.01 (Formulir Pencatatan Sipil)" />
                        { (jenisAktaSelected !== 'Pengakuan Anak' && jenisAktaSelected !== 'Adopsi Anak' && jenisAktaSelected !== 'Pengesahan Anak' ) && <FileInput onChange={() => {}} id="form_isian_akta" label="F-2.01 (Formulir Permohonan Penerbitan Akta)" /> }
                        { jenisAktaSelected === 'Pengakuan Anak' && <FileInput onChange={() => {}} id="form_persetujuan" label="Surat Pengakuan Anak oleh Ayah Biologis (disetujui ibu)" /> }
                        { jenisAktaSelected === 'Perceraian' && <FileInput onChange={() => {}} id="scan_putusan_pengadilan" label="Scan Putusan Pengadilan" /> }
                        { jenisAktaSelected === 'Kelahiran' && <FileInput onChange={() => {}} id="pendaftaran_peristiwa" label="Surat Keterangan Kelahiran" /> }
                        { jenisAktaSelected === 'Adopsi Anak' &&  <FileInput onChange={() => {}} id="kk-ortu-angkat" label="Scan KK Orangtua Angkat" />}
                        <FileInput onChange={() => {}} id="perubahan_elemen" label="Scan Kartu Keluarga" />
                        { jenisAktaSelected === 'Pengakuan Anak' && <FileInput onChange={() => {}} id="penetapan-pengadilan" label="Scan Penetapan Pengadilan Anak Luar Kawin" /> }
                        { jenisAktaSelected === 'Pengakuan Anak' && <FileInput onChange={() => {}} id="form_persetujuan" label="Surat Keterangan Perkawinan dari Pemuka Agama" /> }
                        { jenisAktaSelected === 'Pengesahan Anak' && <FileInput onChange={() => {}} id="form_persetujuan" label="Scan Penetapan Pengadilan Anak Luar Kawin" /> }
                        { jenisAktaSelected === 'Pengesahan Anak' && <FileInput onChange={() => {}} id="form_persetujuan" label="Surat Keterangan Perkawinan dari Pemuka Agama" /> }
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
