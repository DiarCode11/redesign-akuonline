"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddFamilyForm({ onClose, onSubmit }) {

    const [familyData, setFamilyData] = useState([]);
    const [validation, setValidation] = useState({})

    // State object for all form sections
    const [formState, setFormState] = useState({
        // Section 1
        name: "",
        frontTitle: "",
        backTitle: "",
        gender: "",
        bloodType: "",
        birthPlace: "",
        birthDate: "",
        religion: "",
        nationality: "",
        lastStudy: "",
        occupation: "",

        // Section 2
        thereIsBirthCertificate: null,
        thereIsPassport: null,
        birthCertificateNumber: "",
        passportNumber: "",
        passportExpiredDate: "",
        WNICertificateNumber: "",

        // Section 3
        marriageStatus: "",
        marriageDate: "",
        familyRelationshipStatus: "",
        marriageCertificateNumber: "",

        // Section 4
        disabilityType: "",
        abnormallyType: "",

        // Section 5
        fatherNIK: "",
        motherNIK: "",
        fatherName: "",
        motherName: ""
    });
    function submitData() {
        

        const data = {
            id: Date.now(), // Add unique ID for each entry
            name,
            frontTitle,
            backTitle,
            gender,
            bloodType,
            birthPlace,
            birthDate,
            religion,
            nationality,
            lastStudy,
            occupation,
            thereIsBirthCertificate,
            thereIsPassport,
            birthCertificateNumber,
            passportNumber,
            passportExpiredDate,
            WNICertificateNumber,
            marriageStatus,
            mariageDate,
            familyRelationshipStatus,
            marriageCertificateNumber,
            disabilityType,
            abnormallyType,
            fatherNIK,
            motherNIK,
            fatherName,
            motherName,
            createdAt: new Date().toISOString() // Add timestamp
        };

        // Get current data from sessionStorage to ensure we have the latest
        const currentSessionData = sessionStorage.getItem("familyData");
        let currentFamilyData = [];
        
        if (currentSessionData) {
            try {
                currentFamilyData = JSON.parse(currentSessionData);
            } catch (error) {
                console.error("Error parsing current sessionStorage data:", error);
                currentFamilyData = [];
            }
        }

        // Add new data to the array
        const updatedFamilyData = [...currentFamilyData, data];
        
        // Update state
        setFamilyData(updatedFamilyData);
        
        // Save to sessionStorage
        try {
            sessionStorage.setItem("familyData", JSON.stringify(updatedFamilyData));
            console.log("Data berhasil disimpan ke sessionStorage:", updatedFamilyData);
        } catch (error) {
            console.error("Error saving to sessionStorage:", error);
            alert("Gagal menyimpan data!");
            return;
        }

        // Call parent functions
        if (onSubmit) {
            onSubmit(data);
        }
        
        // Close form
        if (onClose) {
            onClose();
        }
    }
    
    return (
        <>
            {/* Data Pribadi */}
            <section className="text-sm px-3 select-none">
                <h1 className="font-semibold">A. Data Pribadi</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="pt-4">
                        <label htmlFor="name" className="block text-sm text-gray-700">
                            Nama 
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Masukkan nama"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="mt-1 p-2 w-full  border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 pt-4">
                        <div>
                            <label htmlFor="front-title" className="block text-sm text-gray-700">
                                Gelar Depan
                            </label>
                            <input
                                type="text"
                                id="front-title"
                                name="front-title"
                                value={formState.frontTitle}
                                onChange={(e) => setFormState({ ...formState, frontTitle: e.target.value })}
                                placeholder="cth: Drs, Ir dsb."
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="back-title" className="block text-sm text-gray-700">
                                Gelar Belakang
                            </label>
                            <input
                                type="text"
                                id="back-title"
                                name="back-title"
                                value={formState.backTitle}
                                onChange={(e) => setFormState({ ...formState, backTitle: e.target.value })}
                                placeholder="cth: S.Pd, S.PdI, dsb."
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <p>Jenis Kelamin</p>
                        <div className="">
                            <div className="grid grid-cols-2 gap-x-3 pt-3">
                                <label htmlFor="laki-laki" className="flex items-center gap-2 text-gray-500">
                                    <input
                                        type="radio"
                                        id="laki-laki"
                                        name="gender"
                                        checked={formState.gender=== "laki-laki"}
                                        onChange={() => setFormState({ ...formState, gender: "laki-laki" })}
                                    />
                                    Laki-laki
                                </label>
                                <label htmlFor="perempuan" className="flex items-center gap-2 text-gray-500">
                                    <input
                                        type="radio"
                                        id="perempuan"
                                        name="gender"
                                        checked={formState.gender === "perempuan"}
                                        onChange={() => setFormState({ ...formState, gender: "perempuan" })}
                                    />
                                    Perempuan
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <p>Golongan Darah</p>
                        <div className="grid grid-cols-4 gap-x-4 pt-3">
                            <label htmlFor="A" className="flex items-center gap-2 text-gray-500">
                                <input
                                    type="radio"
                                    id="A"
                                    name="blood-type"
                                    checked={formState.bloodType === "A"}
                                    onChange={() => setFormState({ ...formState, bloodType: "A" })}
                                />
                                A
                            </label>
                            <label htmlFor="B" className="flex items-center gap-2 text-gray-500">
                                <input
                                    type="radio"
                                    id="B"
                                    name="blood-type"
                                    checked={formState.bloodType === "B"}
                                    onChange={() => setFormState({ ...formState, bloodType: "B"})}
                                />
                                B
                            </label>
                            <label htmlFor="AB" className="flex items-center gap-2 text-gray-500">
                                <input
                                    type="radio"
                                    id="AB"
                                    name="blood-type"
                                    checked={formState.bloodType === "AB"}
                                    onChange={() => setFormState({ ...formState, bloodType: "AB" })}
                                />
                                AB
                            </label>
                            <label htmlFor="O" className="flex items-center gap-2 text-gray-500">
                                <input
                                    type="radio"
                                    id="O"
                                    name="blood-type"
                                    checked={formState.bloodType === "O"}
                                    onChange={() => setFormState({ ...formState, bloodType: "O" })}
                                />
                                O
                            </label>
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="birth-place">
                            Tempat lahir
                        </label>
                        <input 
                            type="text" 
                            id="birth-place" 
                            name="birth-place" 
                            value={formState.birthPlace}
                            onChange={(e) => setFormState({ ...formState, birthPlace: e.target.value })}
                            placeholder="Masukkan tempat lahir" 
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                    <div className="pt-4">
                        <label htmlFor="birthdate">
                            Tanggal lahir
                        </label>
                        <input 
                            type="text" 
                            id="birthdate" 
                            name="birthdate" 
                            placeholder="dd-mm-yyyy" 
                            value={formState.birthDate}
                            onChange={(e) => handleBirthdateFormat(e)}
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                    <div className="pt-4">
                        <label htmlFor="religion" className="block text-sm">
                            Agama
                        </label>
                        <div>
                            <select
                                id="religion"
                                name="religion"
                                value={formState.religion}
                                onChange={(e) => setFormState({ ...formState, religion: e.target.value })}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${formState.religion === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Pilih agama</option>
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Budha">Budha</option>
                                <option value="Konghucu">Konghucu</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <p>Kewarganegaraan</p>
                        <div className="grid grid-cols-2 gap-x-3 pt-3">
                            <label className="flex items-center text-gray-500">
                                <input 
                                    type="radio" 
                                    name="nationality" 
                                    value="WNI" 
                                    checked={formState.nationality === "WNI"}
                                    onChange={() => setFormState({ ...formState, nationality: "WNI" })}
                                    className="mr-2"
                                />
                                WNI
                            </label>
                            <label className="flex items-center text-gray-500">
                                <input 
                                    type="radio" 
                                    name="nationality" 
                                    value="WNA" 
                                    checked={formState.nationality === "WNA"}
                                    onChange={() => setFormState({ ...formState, nationality: "WNA" })}
                                    className="mr-2"
                                />
                                WNA
                            </label>
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="last_study" className="block text-sm">
                            Pendidikan terakhir
                        </label>
                        <div>
                            <select
                                id="last_study"
                                name="last_study"
                                value={formState.lastStudy}
                                onChange={(e) => setFormState({ ...formState, lastStudy: e.target.value })}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${formState.lastStudy === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Pilih jenis pendidikan</option>
                                <option value="Tidak/belum sekolah">Tidak/belum sekolah</option>
                                <option value="Belum tamat SD">Belum tamat SD</option>
                                <option value="Tamat SD/Sederajat">Tamat SD/Sederajat</option>
                                <option value="SMP/Sederajat">SMP/Sederajat</option>
                                <option value="SMA/SMK/Sederajat">SMA/SMK/Sederajat</option>
                                <option value="D1">D1</option>
                                <option value="D2">D2</option>
                                <option value="D3">D3</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="occupation" className="block text-sm">
                            Pekerjaan
                        </label>
                        <div>
                            <select
                                id="occupation"
                                name="occupation"
                                value={formState.occupation}
                                onChange={(e) => setFormState({ ...formState, occupation: e.target.value })}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${formState.occupation === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Pilih pekerjaan</option>
                                <option value="belum_bekerja">Belum/Tidak Bekerja</option>
                                <option value="pelajar_mahasiswa">Pelajar/Mahasiswa</option>
                                <option value="ibu_rumah_tangga">Ibu Rumah Tangga</option>
                                <option value="pegawai_negeri">PNS</option>
                                <option value="tni_polri">TNI/Polri</option>
                                <option value="karyawan_swasta">Karyawan Swasta</option>
                                <option value="buruh_harian">Buruh Harian Lepas</option>
                                <option value="petani">Petani/Pekebun</option>
                                <option value="nelayan">Nelayan</option>
                                <option value="guru">Guru/Dosen</option>
                                <option value="pedagang">Pedagang</option>
                                <option value="wirausaha">Wiraswasta</option>
                                <option value="sopir">Sopir</option>
                                <option value="tukang">Tukang (Bangunan/Listrik, dll)</option>
                                <option value="pensiunan">Pensiunan</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section> 

            {/* Dokumen Identitas */}
            <section className="text-sm px-3 border-t border-gray-200 mt-8 select-none">
                <h1 className="font-semibold pt-6">B. Dokumen Identitas</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pt-4">
                    <div className="pt-2">
                        <p>Punya akta lahir?</p>
                        <div className="grid grid-cols-2 gap-x-3 pt-1">
                            <label className="flex items-center text-gray-500 pt-3">
                                <input
                                    type="radio"
                                    name="birth_certificate"
                                    value="ada"
                                    checked={formState.thereIsBirthCertificate === true}
                                    onChange={() => setFormState({ ...formState, thereIsBirthCertificate: true })}
                                    className="mr-2"
                                />
                                Ada
                            </label>
                            <label className="flex items-center text-gray-500 pt-3">
                                <input
                                    type="radio"
                                    name="birth_certificate"
                                    value="tidak_ada"
                                    checked={formState.thereIsBirthCertificate === false}
                                    onChange={() => setFormState({ ...formState, thereIsBirthCertificate: false })}
                                    className="mr-2"
                                />
                                Tidak ada
                            </label>
                        </div>
                    </div>
                    <div className="pt-2">
                        <p>Punya Paspor?</p>
                        <div className="grid grid-cols-2 gap-x-3 pt-1">
                            <label className="flex items-center text-gray-500 pt-3">
                                <input
                                    type="radio"
                                    name="passport"
                                    value="ada"
                                    checked={formState.thereIsPassport === true}
                                    onChange={() => setFormState({ ...formState, thereIsPassport: true })}
                                    className="mr-2"
                                />
                                Ada
                            </label>
                            <label className="flex items-center text-gray-500 pt-3">
                                <input
                                    type="radio"
                                    name="passport"
                                    value="tidak_ada"
                                    checked={formState.thereIsPassport === false}
                                    onChange={() => setFormState({ ...formState, thereIsPassport: false })}
                                    className="mr-2"
                                />
                                Tidak ada
                            </label>
                        </div>
                    </div>
                    { formState.thereIsBirthCertificate && (
                        <div className="pt-2 ">
                            <label htmlFor="birth_certificate" className={`block text-sm`}>
                                Nomor Akta Lahir
                            </label>
                            <input
                                type="text"
                                id="birth_certificate"
                                name="birth_certificate"
                                value={formState.birthCertificateNumber}
                                onChange={(e) => setFormState({ ...formState, birthCertificateNumber: e.target.value })}
                                placeholder="Masukkan nomor akta"
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>    
                    )}

                    { formState.thereIsPassport && (
                    <div className="pt-2">
                        <label htmlFor="passport_number" className="block text-sm ">
                            Nomor Paspor
                        </label>
                        <input
                            type="text"
                            id="passport_number"
                            name="passport_number"
                            value={formState.passportNumber}
                            onChange={(e) => setFormState({ ...formState, passportNumber: e.target.value })}
                            placeholder="Nomor paspor (opsional)"
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                    )}

                    { formState.thereIsPassport && (
                    <div className="pt-4">
                        <label htmlFor="passport_expired_date" className="block text-sm ">
                            Tanggal berakhir paspor
                        </label>
                        <input
                            type="text"
                            id="passport_expired_date"
                            name="passport_expired_date"
                            value={formState.passportExpiredDate}
                            onChange={(e) => setFormState({ ...formState, passportExpiredDate: e.target.value })}
                            placeholder="Masukkan tanggal (opsional)"
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                    )}
                    { formState.nationality === "WNA" && (
                    <div className="pt-2">
                        <label htmlFor="SK_WNI_number" className="block text-sm ">
                            Nomor SK Penetapan WNI
                        </label>
                        <input
                            type="text"
                            id="SK_WNI_number"
                            name="SK_WNI_number"
                            value={formState.WNICertificateNumber}
                            onChange={(e) => setFormState({ ...formState, WNICertificateNumber: e.target.value })}
                            placeholder="Masukkan nomor SK (opsional)"
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>   
                    )}
                </div>
            </section>

            {/* Informasi keluarga & Status */}
            <section className="text-sm px-3 border-t border-gray-200 mt-8">
                <h1 className="font-semibold pt-6">C. Informasi keluarga & Status</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="pt-4">
                        <label htmlFor="status_perkawinan" className="block text-sm">
                            Status Perkawinan
                        </label>
                        <div>
                            <select
                                id="status_perkawinan"
                                onChange={(e) => setFormState({ ...formState, marriageStatus: e.target.value })}
                                value={formState.marriageStatus}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${formState.marriageStatus === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Pilih status</option>
                                <option value="kawin">Kawin</option>
                                <option value="belum_kawin">Belum/Tidak Kawin</option>
                                <option value="cerai">Cerai</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="shdk" className="block text-sm">
                            Status Hubungan Dalam Keluarga
                        </label>
                        <div>
                            <select
                                id="shdk"
                                value={formState.familyRelationshipStatus}
                                onChange={(e) => setFormState({ ...formState, familyRelationshipStatus: e.target.value })}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${formState.familyRelationshipStatus === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Pilih status</option>
                                <option value="kepala_keluarga">Kepala Keluarga</option>
                                <option value="istri">Istri</option>
                                <option value="anak">Anak</option>
                                <option value="orang_tua">Orang Tua</option>
                                <option value="mertua">Mertua</option>
                                <option value="famili_lain">Famili lain</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="passport_number" className="block text-sm">
                            Nomor Paspor
                        </label>
                        <input
                            type="text"
                            id="passport_number"
                            value={formState.passportNumber}
                            onChange={(e) => setFormState({ ...formState, passportNumber: e.target.value })}
                            placeholder="Nomor paspor (opsional)"
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                    <div className="pt-4">
                        <label htmlFor="marriage_date" className="block text-sm">
                            Tanggal Perkawinan
                        </label>
                        <input
                            type="text"
                            id="marriage_date"
                            placeholder="dd-mm-yyyy"
                            value={formState.marriageDate}
                            onChange={(e) => setFormState({ ...formState, marriageDate: e.target.value })}
                            className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                        />
                    </div>
                </div>
            </section>

            {/* Kondisi Khusus */}
            <section className="text-sm px-3 border-t border-gray-200 mt-8">
                <h1 className="font-semibold pt-6">D. Kondisi Khusus</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="pt-4">
                        <label htmlFor="disabilitas" className="block text-sm">
                            Penyandang Disabilitas
                        </label>
                        <div>
                            <select
                                id="disabilitas"
                                value={formState.disabilityType}
                                onChange={(e) => setFormState({ ...formState, disabilityType: e.target.value })}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${disabilityType === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Tidak ada</option>
                                <option value="fisik">Disabilitas Fisik</option>
                                <option value="netra">Tuna Netra</option>
                                <option value="rungu">Tuna Rungu</option>
                                <option value="wicara">Tuna Wicara</option>
                                <option value="mental">Disabilitas Mental</option>
                                <option value="ganda">Disabilitas Ganda</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="religion" className="block text-sm">
                            Kelainan Fisik dan Mental
                        </label>
                        <div>
                            <select
                                id="kelainan"
                                value={formState.abnormallyType}
                                onChange={(e) => setFormState({ ...formState, abnormallyType: e.target.value })}
                                className={`mt-1 p-2 w-full border border-gray-300 text-sm rounded-md ${abnormallyType === "" ? "text-gray-500" : ""}`}
                            >
                                <option value="">Tidak ada</option>
                                <option value="kelainan_fisik" >Kelainan Fisik</option>
                                <option value="kelainan_genetik">Kelainan Genetik</option>
                                <option value="kelainan_hormonal">Kelainan Hormonal</option>
                                <option value="kelainan_lain">Kelainan Lain</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data OrangTua */}
            <section className="text-sm px-3 border-t border-gray-200 mt-8">
                <h1 className="font-semibold pt-6">E. Data Keluarga</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="pt-4">
                        <label htmlFor="nama_ayah" className="block text-sm">
                            Nama Ayah
                        </label>
                        <div>
                            <input
                                type="text"
                                id="nama_ayah"
                                value={formState.fatherName}
                                onChange={(e) => setFormState({ ...formState, fatherName: e.target.value })}
                                placeholder="Masukkan nama ayah"
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="nik_ayah" className="block text-sm">
                            NIK Ayah
                        </label>
                        <div>
                            <input
                                type="text"
                                id="nik_ayah"
                                value={formState.fatherNIK}
                                onChange={(e) => setFormState({ ...formState, fatherNIK: e.target.value })}
                                placeholder="Masukkan NIK ayah"
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="nama_ibu" className="block text-sm">
                            Nama Ibu
                        </label>
                        <div>
                            <input
                                type="text"
                                id="nama_ibu"
                                value={formState.motherName}
                                onChange={(e) => setFormState({ ...formState, motherName: e.target.value })}
                                placeholder="Masukkan nama ibu"
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <label htmlFor="nik_ibu" className="block text-sm">
                            NIK Ibu
                        </label>
                        <div>
                            <input
                                type="text"
                                id="nik_ibu"
                                value={formState.motherNIK}
                                onChange={(e) => setFormState({ ...formState, motherNIK: e.target.value })}
                                placeholder="Masukkan NIK ibu"
                                className="mt-1 p-2 w-full border border-gray-300 text-sm rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tombol Simpan */}
            <section>
                <div className="flex items-center justify-end mt-8">
                    <Button onClick={submitData} className={"primary-color text-white mr-2"}>
                        Simpan
                    </Button>
                </div>
            </section>
        </>
    )
}