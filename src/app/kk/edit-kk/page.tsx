"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Check,
  CircleAlert,
  CircleAlertIcon,
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
import { GetDataHelper } from "@/helper/getDataHelper";
import { UpdateDataHelper } from "@/helper/updateDataHelper";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";

type formDataProps = any; // gabungan semua props
export type dataKeluargaProps = {
  id: string,
  noKk: string,
  email?: string,
  namaLengkap: string,
  status: string,
  jenisKelamin: string,
  golonganDarah: string,
  tempatLahir: string,
  tanggalLahir: string,
  agama: string,
  kewarganegaraan: string,
  pendidikanTerakhir: string,
  pekerjaan: string,
  createdAt: string
};

type addAnddeleteDataProps = {
  alasan: string;
} & dataKeluargaProps;

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
  const router = useRouter()
  const [accordionActive, setAccordionActive] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dataAnggota, setDataAnggota] = useState<dataKeluargaProps[]>([]);

  const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
  const [showDataAnggota, setShowDataAnggota] = useState<boolean>(false);

  const [listDeletedData, setListDeletedData] = useState<addAnddeleteDataProps[]>([]);
  const [listUpdatedData, setListUpdatedData] = useState<any[]>([]);
  const [listAddedData, setListAddedData] = useState<any[]>([]);

  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  const [isEditDataModalOpen, setIsEditDataModalOpen] = useState(false);
  const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = useState(false);
  const [noKk, setNoKk] = useState<string>("")

  const [formData, setFormData] = useState<any>({});
  const [deletedData, setDeletedData] = useState<addAnddeleteDataProps>(null);
  const [updatedData, setUpdatedData] = useState<dataKeluargaProps | null>(null);
  const [disableDelete, setDisableDelete] = useState<boolean>(true);
  const [isResponseSuccess, setIsResponseSuccess] = useState<boolean | null>(null);
  const [updatedDataId, setUpdatedDataId] = useState<string>("")
  const [deletedDataId, setDeletedDataId] = useState<string>("")
	const [deletedDataIndex, setDeletedDataIndex] = useState<number>(null)
  const [alasan, setAlasan] = useState<string | null>(null)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const handleCallback = useCallback((data: any) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  // ===== CRUD HANDLERS =====
  function selectDeletedData(index: number) {
		setDeletedDataIndex(index)
    const data : addAnddeleteDataProps = { ...deletedData,  };
    setDeletedData(data);
    setIsDeleteDataModalOpen(true);
  }

  function confirmDelete() {
    setListDeletedData((prev) => [...prev, deletedData]);
    const deletedDataKeluarga = dataAnggota[deletedDataIndex]
		const filterNewList = dataAnggota.filter((data, idx) => idx != deletedDataIndex)
		setDataAnggota(filterNewList)
    setIsDeleteDataModalOpen(false);
    setListDeletedData([...listDeletedData, {
      ...deletedDataKeluarga,
      alasan: alasan
    }])
  }

  function updateData(index: number) {
    const data = dataAnggota[index];
    setUpdatedData(data);
    setIsEditDataModalOpen(true);
  }

  function saveUpdatedData() {
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
        noKk: noKk,
        updateType: [
          ...(listUpdatedData.length > 0 ? ["update"] : []),
          ...(listDeletedData.length > 0 ? ["delete"] : []),
          ...(listAddedData.length > 0 ? ["add"] : []),
        ],
        latestData: dataAnggota,
        deletedData: listDeletedData,
        addedData: listAddedData
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
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push('/');
      }, 2000)

      console.log("Response:", response);
    } catch (e) {
      console.error("Gagal mengirim data:", e);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  }
  
  
  async function getDataKk (noKk: string) {
    const response = await GetDataHelper(`/api/kk?noKk=${noKk}`)
    console.log(response.data.data)

    if (response.ok){
      setIsResponseSuccess(true)
      setDataAnggota(response.data.data)
    } else {
      setIsResponseSuccess(false)
    }
  }

  async function submitUpdatedData() {
    try {
      const response = await UpdateDataHelper(`/api/kk/${updatedDataId}`, formData)
      if (response.ok) {
        console.log(response.data);
        await getDataKk(noKk)
        setIsEditDataModalOpen(false);
        setIsEdited(true)

      }
    } catch (e) {
      console.log(e.message)
    }
  }

    // Fetch ketiika nik 10 digit
  useEffect(() => {
    console.log(noKk)
    if (noKk.length == 10) {
      (async () => await getDataKk(noKk))()
    } else {
      setIsResponseSuccess(null)
    }
  }, [noKk])

  function cancelDeleteDataAnggota(idx: number) {
    const dataCancelled = listDeletedData[idx];
    const filterDataList = listDeletedData.filter((data, index) => index != idx)
    setListDeletedData(filterDataList)
    setDataAnggota([ ...dataAnggota, dataCancelled as dataKeluargaProps ])
  }

  function cancelAddDataAnggota(idx: number) {
    const dataCancelled = listAddedData[idx];
    const filterDataList = listAddedData.filter((dataAnggota, index) => index != idx);
    setListAddedData(filterDataList)
  }

  return (
    <div>
      {/* Alert */}
      <Alert title="Berhasil membuat pengajuan" isShow={showAlert} onClose={(data) => setShowAlert(false)} prefixIcon={<CircleAlertIcon className="text-green-800" />} />

      {/* Modal Tambah */}
      <Modal
        title={"Tambah Data Anggota Keluarga"}
        isOpen={isAddDataModalOpen}
        onClose={() => {
          setIsAddDataModalOpen(false);
          setAlasan(null);
        }}
      >
        <div className="p-4">
          <DropdownComponent
            getDropdownStatus={() => {}}
            data={["Kelahiran", "Menikah", "Pindah datang", "Adopsi"]}
            label="Alasan Penambahan"
            onChange={(data) => setAlasan(data)}
            placeholder="Pilih alasan"
          />
          <DataPribadiSection title="" onChange={handleCallback} />
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
        onClose={() => {
          setIsDeleteDataModalOpen(false);
          setAlasan(null);
        }}
      >
        <DropdownComponent
          getDropdownStatus={() => {}}
          data={[
            "Kesalahan data",
            "Meninggal dunia",
            "Perceraian",
            "Pindah Domisili",
          ]}
          label={`Alasan pengurangan anggota "${deletedData?.namaLengkap}"`}
          onChange={(data) => setAlasan(data)}
          placeholder="Pilih alasan"
        />
        <div className="flex justify-end mt-5 pb-16">
          <Button
            variant={undefined} size={undefined}
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
          defaultData={updatedData}
          title="Data Pribadi"
          onChange={handleCallback}
        />
        <div className="flex justify-end mt-5">
          <Button onClick={submitUpdatedData} variant={undefined} size={undefined} className="bg-sky-600 text-white px-4 py-2">
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
              onChange={(data) => setNoKk(data)}
              placeholder="Masukkan nomor KK"
            />
            {(isResponseSuccess == true && noKk.length == 10) && (
              <>
                <div className="mt-4 overflow-x-scroll md:overflow-x-hidden">
                  <table className="md:w-full w-max">
                    <thead>
                      <tr className="bg-sky-600 text-white">
                        <th className="text-left font-normal px-2">Nama</th>
                        <th className="text-left font-normal px-2">Status</th>
                        <th className="text-left font-normal px-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataAnggota.map((data, idx) => (
                        <tr key={data.id} className={`${idx % 2 != 0 ? "bg-sky-100" : ""}`}>
                          <th className="text-left font-normal px-2">{data.namaLengkap}</th>
                          <th className="text-left font-normal px-2">{data.status}</th>
                          <th className="text-left font-normal px-2 flex gap-3 py-1">
                            <Button
                                variant={undefined} size={undefined}
                                onClick={() => {
                                  updateData(idx);
                                  setUpdatedDataId(data.id)
                                }}
                                className="bg-yellow-600 text-white"
                            >
                              Ubah
                            </Button>
                            <Button
                                variant={undefined} size={undefined}
                                onClick={() => {
                                  selectDeletedData(idx);
                                  setDeletedDataId(data.id);
                                }}
                                className="bg-red-600 text-white"
                            >
                              Hapus
                            </Button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-5">
                  <Button
                      variant={undefined} size={undefined}
                      onClick={() => setIsAddDataModalOpen(true)}
                      className="border-2 border-sky-600 text-sky-600"
                  >
                    Tambah Data Baru
                  </Button>
                </div>
              </>
            )}

            {(isResponseSuccess == false && noKk.length == 10) && (
              <div className="flex bg-red-100 px-5 py-3 space-x-4 mt-2 items-center rounded-2xl">
                  <span>
                      <CircleAlert size={30} className="text-red-700" />
                  </span>
                  <span className="">
                      <h3 className="font-semibold text-red-700 text-sm">Data nomor KK tidak ditemukan</h3>
                  </span>
              </div>
            )}

            {listDeletedData.length > 0 && (
              <>
								<h1 className="mt-5">Data yang dihapus</h1>
                <div className="mt-4 overflow-x-scroll md:overflow-x-hidden">
                  <table className="md:w-full w-max">
                    <thead>
                      <tr className="bg-red-600 text-white">
                        <th className="text-left font-normal px-2">Nama</th>
                        <th className="text-left font-normal px-2">Alasan</th>
                        <th className="text-left font-normal px-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listDeletedData.map((data, idx) => (
                        <tr key={idx} className={`${idx % 2 != 0 ? "bg-sky-100" : ""}`}>
                          <th className="text-left font-normal px-2">{data.namaLengkap}</th>
                          <th className="text-left font-normal px-2">{data.alasan}</th>
                          <th className="text-left font-normal px-2 flex gap-3 py-1">
                            <Button
                                variant={undefined} size={undefined}
                                onClick={() => {
                                  cancelDeleteDataAnggota(idx);
                                }}
                                className="bg-red-600 text-white"
                            >
                              Batalkan
                            </Button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
            )}

            {listAddedData.length > 0 && (
              <>
								<h1 className="mt-5">Data yang ditambahkan</h1>
                <div className="mt-4 overflow-x-scroll md:overflow-x-hidden">
                  <table className="md:w-full w-max">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="text-left font-normal px-2">Nama</th>
                        <th className="text-left font-normal px-2">Status</th>
                        <th className="text-left font-normal px-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAddedData.map((data, idx) => (
                        <tr key={idx} className={`${idx % 2 != 0 ? "bg-sky-100" : ""}`}>
                          <th className="text-left font-normal px-2">{data.namaLengkap}</th>
                          <th className="text-left font-normal px-2">{data.status}</th>
                          <th className="text-left font-normal px-2 flex gap-3 py-1">
                            <Button
                                variant={undefined} size={undefined}
                                onClick={() => cancelAddDataAnggota(idx)}
                                className="bg-red-600 text-white"
                            >
                              Batalkan
                            </Button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {(listDeletedData.length > 0 ||
              isEdited ||
              listAddedData.length > 0) && (
              <div className="flex justify-end mt-8">
                <Button
                    variant={undefined} size={undefined}
                    onClick={() => {
                      setCurrentStep(2)
                      setAccordionActive(2);
                    }}
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
              <span className="flex items-center space-x-2">
                {isAllDocDownloaded ? <Check size={18} /> : <Download size={18} />}
                <p>Formulir Pendaftaran Peristiwa</p>
              </span>
              <span className="flex items-center space-x-2">
                {isAllDocDownloaded ? <Check size={18} /> : <Download size={18} />}
                <p>Formulir Pernyatan Perubahan Elemen</p>
              </span>
            </div>
            <div className="pt-4 flex justify-end">
              <Button
                variant={undefined} size={undefined}
                onClick={() => {
                  if (isAllDocDownloaded) {
                    setCurrentStep(3)
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
              Scan file pengajuan yang telah ditandatangani kemudian upload dalam bentuk PDF
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
