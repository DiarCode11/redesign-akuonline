import { db } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId");

    if (!id) {
        return NextResponse.json(
            { message: "Invalid query: userId" },
            { status: 400 }
        )
    }

    try {
        const snapshot = await db.collection("pengajuan").where("userId", "==", id).get();
    
        if (snapshot.empty) {
            return NextResponse.json(
                { message: "Data tidak ditemukan", data: [] }
            )
        } else {
            const results = snapshot.docs.map(doc => ({
                id: doc.id,   
                ...doc.data()
            }));
    
            return NextResponse.json(
                { message: "Data berhasil diambil", data: results }
            )
        }
    } catch (e) {
        return NextResponse.json(
            { message: `Terjadi kesalahan ${e?.message}` },
            { status: 500 }
        )
    }

    
}

// Buat Pengajuan
export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        const id = uuidv4()
        const docRef = await db.collection("pengajuan").doc(id).set({
            ...body
        })

        return NextResponse.json(
            { message: "Berhasil menyimpan data pengajuan" }
        )
    } catch (e) {
        return NextResponse.json(
            { message: "Terjadi kesalahan di server" },
            { status: 500 }
        )
    }
}

