import { db } from "@/lib/firebase-admin";
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

        const docRef = await db.collection("kk").add({
            ...body,
            createdAt: new Date()
        });

        return NextResponse.json({id : docRef.id, message: "Berhasil menambah data"})
        
    } catch(error) {
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}