import { db } from "@/lib/firebase-admin";
import { z } from "zod";

export const UserCommonRegisterSchema = z.object({
    email: z.email("Format email tidak valid"),
    nik: z.string().length(10, "NIK harus 10 digit"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter")
}).superRefine(async (data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Konfirmasi password harus sama dengan password",
    });
  }
  
  // 2. Cek email di Firestore (Admin SDK)
  const snapshot = await db
    .collection("users")
    .where("nik", "==", data.nik)
    .get();

  if (!snapshot.empty) {
    ctx.addIssue({
      code: "custom",
      path: ["nik"],
      message: "NIK sudah terdaftar, silahkan login",
    });
  }

});

export const UserAdditionRegisterSchema = z.object({
    name: z.string().min(3, "Nama harus lebih dari 3 karakter"),
    phone: z.string()
        .regex(/^\d+$/, "Format nomor telepon tidak valid")
        .min(10, "Nomor terlalu pendek")
        .max(15, "Nomor terlalu panjang"),
    subdistrict: z.string().min(1),
    village: z.string().min(1),
});

export type UserCommonRegisterDto = z.infer<typeof UserCommonRegisterSchema>
export type UserAdditionRegisterDto = z.infer<typeof UserAdditionRegisterSchema>