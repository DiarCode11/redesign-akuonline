import { db } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export type SubmissionHistoryType = {
    userId: string,
    docId: string,
    description: string,
    createdAt: Date,
    submissionType: string,
    [ key: string ] : any
}

export async function GET(_: NextRequest, { params }: { params: { id : string } }) {
    const id = params.id
    try {
        const snapshot = await db.collection("submission_history").where("userId", "==", id).get();
        if (snapshot.empty) {
            return NextResponse.json(
                { message: "Data tidak ditemukan" },
                { status: 404 }
            )
        } 

        const histories : SubmissionHistoryType[] = snapshot.docs.map(doc => {
            const data = doc.data()
            return {
                userId: data.userId,
                createdAt: data.createdAt.toDate(),
                description: data.description,
                docId: data.docId,
                submissionType: data.submissionType
            }
        })

        return NextResponse.json(
            { message: "Data berhasil diambil", data: histories }
        )
    } catch (e) {
        return NextResponse.json(
            { message: "Terjadi kesalahan" },
            { status: 500 }
        )
    }
}