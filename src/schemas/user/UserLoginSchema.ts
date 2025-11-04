import { db } from "@/lib/firebase-admin";
import argon2 from "argon2"
import z from "zod";

export const UserLoginSchema = z.object({
    nik: z.string().nonempty("NIK harus diisi"),
    password: z.string().nonempty("Password harus diisi"),
}).superRefine(async (data, ctx) => {
    const snapshot = await db
        .collection("users")
        .where("nik", "==", data.nik)
        .get();

    if (snapshot.empty) {
        // Tidak ada user ditemukan
        ctx.addIssue({
            code: "custom",
            path: ["nik"],
            message: "NIK atau password salah",
        });
        return;
    }

    const auth = snapshot.docs[0].data()
    const isValid = await argon2.verify(auth.password, data.password);
    if (!isValid) {
        ctx.addIssue({
            code: "custom",
            path: ["nik"],
            message: "NIK atau password salah",
        });
    }
})

export type UserLoginSchemaDto = z.infer<typeof UserLoginSchema>