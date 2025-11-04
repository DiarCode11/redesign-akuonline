import { NextRequest, NextResponse } from 'next/server';
import { LoginFormProps } from '@/app/login/page';
import { UserLoginSchema } from '@/schemas/user/UserLoginSchema';
import z from 'zod';
import { db } from '@/lib/firebase-admin';
import { generateJwtToken } from '@/helper/jwtHelper';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const resultValidation = await UserLoginSchema.safeParseAsync(body);
        // Validasi Penuh dengan Zod
        if (!resultValidation.success) {
            return NextResponse.json(
                { errors : z.treeifyError(resultValidation.error) },
                { status: 400 }
            )
        }

        const snapshot = await db
            .collection("users")
            .where("nik", "==", body.nik)
            .get();

        const token = await generateJwtToken({
            id: snapshot.docs[0].id,
            email: snapshot.docs[0].data().email,
            name: snapshot.docs[0].data().name
        })

        const response = NextResponse.json({
            message: "Berhasil login"
        })

        response.cookies.set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            path: '/',
            secure: false,
            maxAge: 60 * 60
        })

        return response

    } catch (e) {
        // Jika JSON body rusak
        if (e instanceof SyntaxError) {
            return NextResponse.json(
                { message: "Invalid JSON format", detail: e.message },
                { status: 400 }
            );
        }

        // Error dari Zod (async refine misalnya)
        if (e instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation failed", errors: z.treeifyError(e) },
                { status: 400 }
            );
        }

        // Error lain (Firestore, Argon, Encrypt, dll)
        return NextResponse.json(
            { 
                message: "Internal Server Error",
                reason: e?.message ?? "Unknown error"
            },
            { status: 500 }
        );
    }
}