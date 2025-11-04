import { db } from "@/lib/firebase-admin"

export type SubmissionType = "Buat KK" | 
    "Ubah KK" | 
    "KK Hilang" | 
    "KK Rusak" |
    "Buat KTP" |
    "Ubah KTP" |
    "KTP Hilang" |
    "KTP Rusak" |
    "Buat Akta" |
    "Ubah Akta" |
    "Ubah Kewarganegaraan" | 
    "Akta Hilang"

export type SubmissionHistoryType = {
    userId: string,
    docId: string,
    submissionType: SubmissionType,
    description: string, 
    createdAt: Date
}

export async function CreateSubmissionHistory(data : SubmissionHistoryType) {
    try {
        const ref = await db.collection("submission_history").add(data);
        const snapshot = await ref.get();
        const savedData = snapshot.data();
        return {
            ok: true,
            status: 200,
            message: "Berhasil membuat riwayat pengajuan",
            data: savedData
        };
    } catch (e) {
        return {
            ok: false,
            status: 500,
            message: "Gagal membuat riwayat pengajuan",
            error: e?.message
        };
    }
}