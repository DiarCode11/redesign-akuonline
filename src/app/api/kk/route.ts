import { CreateSubmissionHistory } from "@/helper/createSubmissionHistory";
import { db } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const snapshot = await db.collection("kk").get();
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(data);
    } catch(error) {
        return NextResponse.json(
            { message: "Internal server error", error: error.message},
            { status: 500 }
        )
    }
}

// Buat KK
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const newId = uuidv4();
        const createdAt = new Date();

        const [docRef, history] = await Promise.all([
            db.collection("kk").doc(newId).set({
                ...body, createdAt
            }),
            CreateSubmissionHistory({
                userId: body.requestedBy.id,
                docId: newId,
                description: "Pengajuan pembuatan kartu keluarga baru",
                createdAt,
                submissionType: "Buat KK"
            })
        ])

        return NextResponse.json({id : newId, message: "Berhasil menambah data", data: history})
        
    } catch(error) {
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}

