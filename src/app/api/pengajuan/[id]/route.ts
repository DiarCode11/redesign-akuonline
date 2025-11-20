import { InternalServerError, NotFound, Ok } from "@/helper/jsonResponseHelper";
import { db } from "@/lib/firebase-admin";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id

    if (!id) {
        return NextResponse.json(
            { message: "Invalid query: userId" },
            { status: 400 }
        )
    }

    // endpoint to get data from database
    try {
        const docRef = db.collection("pengajuan").doc(id);
        const snapshot = await docRef.get();
    
        if (!snapshot.exists) {
            return NextResponse.json(
                { message: "Data tidak ditemukan", data: [] }
            )
        } else {
            const result = {
                id: snapshot.id,
                ...snapshot.data()
            };
    
            return NextResponse.json(
                { message: "Data berhasil diambil", data: result }
            )
        }
    } catch (e) {
        return NextResponse.json(
            { message: "Terjadi kesalahan di server" },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const docRef = await db.collection("pengajuan").doc(id).delete()
        console.log("Berhasil menghapus data pengajuan")
        return NextResponse.json(
            { message: "Berhasil menghapus data pengajuan" }
        )
    } catch (e) {
        return NextResponse.json(
            { message: "Terjadi kesalahan di server" },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest, { params } : { params : { id: string} } ) {
    try {
        const id = params.id
        const data : ServiceProps = await req.json()
        const docRef = db.collection("pengajuan").doc(id);
        const snapshot = await docRef.get()

        if (!snapshot.exists) {
            return NotFound("Data tidak ditemukan")
        }
        await docRef.update(data);

        return Ok("Berhasil memperbarui data")
    } catch (e) {
        console.log(e?.message)
        return InternalServerError(e?.message)
    }
}