import { CreateSubmissionHistory } from "@/helper/createSubmissionHistory";
import { db } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid"
import { NextRequest, NextResponse } from "next/server";
import { InternalServerError, NotFound, Ok } from "@/helper/jsonResponseHelper";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const noKk = searchParams.get("noKk");

    try {
        let snapshot : FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = null
        if (noKk == null) {
            snapshot = await db.collection("kk").get();
        } else {
            snapshot = await db.collection("kk").where("noKk", "==", noKk).get()
            if (snapshot.empty) {
                return NotFound("Data tidak ditemukan")
            }
        }
        const data = snapshot.docs.map(doc => {
            const raw = doc.data()
            const createdAt = raw.createdAt instanceof Timestamp
                ? raw.createdAt.toDate()
                : null
            
            return {
                id: doc.id,
                ...raw,
                createdAt
            }
        });

        return Ok(data)
    } catch(error) {
        return InternalServerError(error.message)
    }

}

export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        const docRef = await db.collection("kk").add({ ...body, createdAt: Timestamp.now() });
        return Ok({ message: "Berhasil menambahkan data KK", id: docRef.id })
    } catch (e) {
        return InternalServerError(e?.message)
    }
}

