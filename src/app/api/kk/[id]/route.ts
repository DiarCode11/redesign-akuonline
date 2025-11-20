import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { InternalServerError, Ok } from "@/helper/jsonResponseHelper";

// GET: Ambil KK berdasarkan ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const snapshot = await db.collection("kk").doc(params.id).get();
    console.log(params.id)
    if (!snapshot.exists) {
      return NextResponse.json({ ok: false, message: "Data KK tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: { id: snapshot.id, ...snapshot.data() } });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Gagal mengambil data KK" }, { status: 500 });
  }
}


// PUT: Update KK berdasarkan ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await db.collection("kk").doc(params.id).update({ ...body, createdAt: Timestamp.now() });

    return Ok("Data KK berhasil diperbarui")
  } catch (error) {
    return InternalServerError(error?.message)
  }
}

