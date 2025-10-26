import { db } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

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

        const histories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

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