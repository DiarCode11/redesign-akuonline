import { db } from "@/lib/firebase-admin";
import { UserCommonRegisterSchema, UserAdditionRegisterSchema, UserCommonRegisterDto } from "@/schemas/user/UserRegisterSchema";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import * as z from "zod";
import { encrypt } from "@/helper/securityHelper";
import { generateJwtToken, JwtPayloadInterface } from "@/helper/jwtHelper";

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const session = searchParams.get("session");

    try {
        const body = await req.json();
        let resultValidation : any;
        switch (session) {
            case "1": {
                resultValidation = await UserCommonRegisterSchema.safeParseAsync(body);
                if (!resultValidation.success) {
                    return NextResponse.json(
                        { errors : z.treeifyError(resultValidation.error) },
                        { status: 400 }
                    )
                }

                const validData : UserCommonRegisterDto = resultValidation.data;
                const hashedPassword = await argon2.hash(validData.password, { type: argon2.argon2id });
                // const encryptedNik = encrypt(validData.nik);
                const docRef = await db.collection("users").add({
                    email: validData.email,
                    password: hashedPassword,
                    nik: validData.nik,
                    createdAt: new Date()
                });

                return NextResponse.json({
                    id: docRef.id,
                    message: "Berhasil menambahkan data users : common"
                })
            }
            case "2": {
                const id = searchParams.get("id");
                if (!id) {
                    return NextResponse.json(
                        { message: "Invalid parameter: id" },
                        { status: 400 }
                    ); 
                }
                resultValidation = UserAdditionRegisterSchema.safeParse(body);
                const ref = db.collection("users").doc(id);
                const snap = await ref.get();

                if (!snap.exists) {
                    return NextResponse.json(
                        { message: "User ID tidak ditemukan" },
                        { status: 404 }
                    );
                }

                const validData = resultValidation.data;
                if (!resultValidation.success) {
                    return NextResponse.json(
                        { errors : z.treeifyError(resultValidation.error) },
                        { status: 400 }
                    )
                }

                await ref.update({...validData, createdAt: new Date() });

                const response = NextResponse.json({
                    id: ref.id,
                    message: "Berhasil menambahkan data users: tambahan"
                })

                const payloadJwt : JwtPayloadInterface = {
                    id: snap.id,
                    email: snap.data().email,
                    name: validData.name
                }

                const jwtToken = await generateJwtToken(payloadJwt);

                response.cookies.set({
                    name: 'access_token',
                    value: jwtToken,
                    httpOnly: true,
                    path: '/',
                    secure: false,
                    maxAge: 60 * 60
                });

                return response;
            }
            default:
                return NextResponse.json(
                    { message: "Invalid parameter: session" },
                    { status: 400 }
                ); 
        }
    } 
    catch (e: any) {
        console.error("🔥 [REGISTER API ERROR] >>> ", e);

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