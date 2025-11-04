import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET() {
    const snapshoot = await db.collection("akta").get();
    const data = snapshoot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    
}