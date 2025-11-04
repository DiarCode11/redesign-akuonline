"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Check,
  Download
} from "lucide-react";
import Accordion from "@/components/accordion";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import Link from "next/link";
import DataPribadiSection from "@/components/kk-component/edit-data-section/data-pribadi";
import InputComponent from "@/components/form-component/input-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import FileInput from "@/components/form-component/fileinput-component";
import { SubmitDataHelper } from "@/helper/submitDataHelper";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { useAuth } from "@/context/authContext";

// ====== TYPES =======
type dataKKProps = {
  jenis_data: string;
  kecamatan: string;
  desa: string;
  dusun: string;
  kode_pos: string;
  diwakilkan: boolean | null;
  nama_perwakilan?: string;
  nik_perwakilan?: string;
};

type formDataProps = any; // gabungan semua props
type dataKeluargaProps = {
  nama: string;
  status: string;
  jenis_kelamin: string;
};

type addAnddeleteDataProps = {
  alasan: string;
};

type UpdateKKProps = {
  noKk: string;
  updateType: string[];
  latestData: any;
  deletedData?: any;
  addedData?: any;
};

// ====================================
export default function EditKK() {
  const auth = useAuth();
  const [accordionActive, setAccordionActive] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dataAnggota, setDataAnggota] = useState<dataKeluargaProps[]>([
    { nama: "I Wayan Yoga Sastrawan", status: "Kepala Keluarga", jenis_kelamin: "Laki-laki" },
    { nama: "John Smith", status: "Saudara", jenis_kelamin: "Laki-laki" },
    { nama: "Mariah Maclach", status: "Istri", jenis_kelamin: "Perempuan" },
  ]);

  const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
  const [showDataAnggota, setShowDataAnggota] = useState<boolean>(false);

  const [listDeletedData, setListDeletedData] = useState<any[]>([]);
  const [listUpdatedData, setListUpdatedData] = useState<any[]>([]);
  const [listAddedData, setListAddedData] = useState<any[]>([]);

  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  const [isEditDataModalOpen, setIsEditDataModalOpen] = useState(false);
  const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = useState(false);

  const [formData, setFormData] = useState<any>({});
  const [deletedData, setDeletedData] = useState<any>({});
  const [updatedData, setUpdatedData] = useState<any>({});
  const [disableDelete, setDisableDelete] = useState<boolean>(true);

  const handleCallback = useCallback((data: Partial<formDataProps>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  // ===== CRUD HANDLERS =====
  function selectDeletedData(index: number) {
    const data = dataAnggota[index];
    setDeletedData(data);
    setIsDeleteDataModalOpen(true);
  }

  function confirmDelete() {
    setDataAnggota((prev) => prev.filter((item) => item.nama !== deletedData.nama));
    setListDeletedData((prev) => [...prev, deletedData]);
    setIsDeleteDataModalOpen(false);
    setDeletedData({});
  }

  function updateData(index: number) {
    const data = dataAnggota[index];
    setUpdatedData(data);
    setIsEditDataModalOpen(true);
  }

  function saveData() {
    if (updatedData.nama && updatedData.status && updatedData.jenis_kelamin) {
      setListUpdatedData((prev) => [...prev, updatedData]);
    }
    setIsEditDataModalOpen(false);
  }

  function saveAddData() {
    setListAddedData((prev) => [...prev, formData]);
    setFormData({});
    setIsAddDataModalOpen(false);
  }

  // ======= FINAL SUBMIT FUNCTION =======
  async function submitFinalData() {
    try {
      // gabungkan semua perubahan
      const payload: UpdateKKProps = {
        noKk: "1234567890123456",
        updateType: [
          ...(listUpdatedData.length > 0 ? ["update"] : []),
          ...(listDeletedData.length > 0 ? ["delete"] : []),
          ...(listAddedData.length > 0 ? ["add"] : []),
        ],
        latestData: dataAnggota,
        deletedData: listDeletedData.map((d) => ({
          nama: d.nama,
          alasan: d.alasan,
          status: d.status,
          jenis_kelamin: d.jenis_kelamin,
        })),
        addedData: listAddedData.map((a) => ({
          nama_lengkap: a.nama_lengkap,
          alasan: a.alasan,
          hubungan_keluarga: a.hubungan_keluarga,
          jenis_kelamin: a.jenis_kelamin,
          tempat_lahir: a.tempat_lahir,
          tanggal_lahir: a.tanggal_lahir,
        })),
      };

      const newService: ServiceProps = {
        serviceName: "Perubahan Kartu Keluarga",
        serviceType: "KK",
        description: "Pengajuan perubahan data anggota keluarga",
        createdAt: new Date(),
        userId: auth.id,
        userName: auth.name,
        data: payload,
      };

      console.log("Payload dikirim:", newService);

      const response = await SubmitDataHelper("/api/pengajuan", newService);

      console.log("Response:", response);
      alert("Data berhasil dikirim!");
    } catch (e) {
      console.error("Gagal mengirim data:", e);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  }

  // ====== RENDER ======
  return (
    <div>
      {/* Modal Tambah */}
      <Modal
        title={"Tambah Data Anggota Keluarga"}
        isOpen={isAddDataModalOpen}
        onClose={() => setIsAddDataModalOpen(false)}
      >
        <div className="p-4">
          <DropdownComponent
            getDropdownStatus={() => {}}
            data={["Kelahiran", "Menikah", "Pindah datang", "Adopsi"]}
            label="Alasan"
            onChange={(data) => handleCallback({ alasan: data })}
            placeholder="Pilih alasan"
          />
          <DataPribadiSection title="Data Pribadi" onChange={handleCallback} />
          <div className="flex justify-end mt-5">
            <Button
                onClick={saveAddData}
                className="bg-sky-600 text-white px-4 py-2" variant={undefined} size={undefined}            >
                Simpan
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Hapus */}
      <Modal
        title={`Hapus Data Anggota`}
        isOpen={isDeleteDataModalOpen}
        onClose={() => setIsDeleteDataModalOpen(false)}
      >
        <DropdownComponent
          getDropdownStatus={() => {}}
          data={[
            "Kesalahan data",
            "Meninggal dunia",
            "Perceraian",
            "Pindah Domisili",
          ]}
          label={`Alasan pengurangan anggota "${deletedData.nama}"`}
          onChange={(data) => setDeletedData((prev) => ({ ...prev, alasan: data }))}
          placeholder="Pilih alasan"
        />
        <div className="flex justify-end mt-5">
          <Button
            variant={undefined} size={undefined}
            disabled={!deletedData.alasan}
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2"
          >
            Hapus
          </Button>
        </div>
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Edit Data Anggota Keluarga"
        isOpen={isEditDataModalOpen}
        onClose={() => setIsEditDataModalOpen(false)}
      >
        <DataPribadiSection
          defaultData={{
            nama: updatedData.nama,
            status: updatedData.status,
            jenis_kelamin: updatedData.jenis_kelamin,
          }}
          title="Data Pribadi"
          onChange={handleCallback}
        />
        <div className="flex justify-end mt-5">
          <Button onClick={saveData} variant={undefined} size={undefined} className="bg-sky-600 text-white px-4 py-2">
            Simpan
          </Button>
        </div>
      </Modal>

      {/* Header */}
      <div className="flex space-x-6 items-center pb-10">
        <Link href={"/"}>
          <ArrowLeft />
        </Link>
        <h1 className="font-semibold text-xl">Edit Kartu Keluarga</h1>
      </div>

      {/* Accordion Langkah-langkah */}
      <div className="flex flex-col space-y-2">
        {/* Langkah 1 */}
        <Accordion
          title="Informasi KK"
          number={1}
          active={currentStep >= 1}
          isOpen={accordionActive === 1}
          onToggle={(isOpen) => setAccordionActive(isOpen ? 1 : 0)}
        >
          <div className="py-4">
            <InputComponent
              keyname="No_KK"
              name="Nomor KK"
              dataType="number"
              onChange={(data) => {
                data.length >= 8 && setShowDataAnggota(true);
              }}
              placeholder="Masukkan nomor KK"
            />
            {showDataAnggota && (
              <>
                <div className="mt-4">
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-600 text-white">
                        <th>Nama</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataAnggota.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nama}</td>
                          <td>{item.status}</td>
                          <td className="flex gap-2 justify-center py-2">
                            <Button
                                variant={undefined} size={undefined}
                                onClick={() => updateData(index)}
                                className="bg-yellow-600 text-white"
                            >
                              Ubah
                            </Button>
                            <Button
                                variant={undefined} size={undefined}
                                onClick={() => selectDeletedData(index)}
                                className="bg-red-600 text-white"
                            >
                              Hapus
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-5">
                    <Button
                        variant={undefined} size={undefined}
                        onClick={() => setIsAddDataModalOpen(true)}
                        className="border-2 border-sky-600 text-sky-600"
                    >
                      Tambah Data Baru
                    </Button>
                  </div>
                </div>
              </>
            )}
            {(listDeletedData.length > 0 ||
              listUpdatedData.length > 0 ||
              listAddedData.length > 0) && (
              <div className="flex justify-end mt-8">
                <Button
                    variant={undefined} size={undefined}
                    onClick={() => setAccordionActive(2)}
                    className="bg-sky-600 text-white"
                >
                  Lanjut
                </Button>
              </div>
            )}
          </div>
        </Accordion>

        {/* Langkah 2 */}
        <Accordion
          title="Download Formulir"
          number={2}
          active={currentStep >= 2}
          isOpen={accordionActive === 2}
          onToggle={(isOpen) => setAccordionActive(isOpen ? 2 : 0)}
        >
          <div>
            <h3 className="text-sm py-4 text-gray-400">
              Unduh semua formulir dan isi tanda tangan/materai
            </h3>
            <div className="flex flex-col space-y-2">
              <span className="flex items-center space-x-2">
                {isAllDocDownloaded ? <Check size={18} /> : <Download size={18} />}
                <p>Formulir Isian KK</p>
              </span>
            </div>
            <div className="pt-4 flex justify-end">
              <Button
                variant={undefined} size={undefined}
                onClick={() => {
                  if (isAllDocDownloaded) {
                    setAccordionActive(3);
                  } else {
                    setAllDocDownloaded(true);
                  }
                }}
                className="bg-sky-600 text-white"
              >
                {isAllDocDownloaded ? "Lanjut" : "Download Semua"}
              </Button>
            </div>
          </div>
        </Accordion>

        {/* Langkah 3 */}
        <Accordion
          title="Upload Formulir"
          number={3}
          active={currentStep >= 3}
          isOpen={accordionActive === 3}
          onToggle={(isOpen) => setAccordionActive(isOpen ? 3 : 0)}
        >
          <div>
            <h3 className="text-sm py-4 text-gray-400">
              Upload file yang sudah ditandatangani (PDF)
            </h3>
            <div className="flex flex-col space-y-3">
              <FileInput id="form_isian_kk" label="Formulir Isian KK" />
              <FileInput id="pendaftaran_peristiwa" label="Pendaftaran Peristiwa" />
              <FileInput id="perubahan_elemen" label="Pernyataan Perubahan Elemen" />
            </div>
            <div className="pt-10 flex justify-end">
              <Button onClick={submitFinalData} variant={undefined} size={undefined} className="bg-sky-600 text-white">
                Kirim Pengajuan
              </Button>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
