import { NextRequest, NextResponse } from 'next/server';
import { LoginFormProps } from '@/app/login/page';

export async function POST(req: NextRequest) {
    const fakeUser : LoginFormProps = {
        nik: '123456789',
        password: 'password123'
    }

    const errorMsg : LoginFormProps = { nik: null, password: null }
    
    const { nik, password } : LoginFormProps = await req.json();
    if (!nik) {
        errorMsg.nik= "NIK Tidak boleh kosong";
    }

    if (!password) {
        errorMsg.password = "Password tidak boleh kosong"
    }

    if (errorMsg.nik || errorMsg.password) {
        return NextResponse.json(errorMsg, { status: 400});
    }


    if (nik === fakeUser.nik && password === fakeUser.password) {
        const response = NextResponse.json({ success: true }, { status: 200 })
        response.cookies.set({
            name: 'auth_token',
            value: 'test-token',
            httpOnly: true,
            path: '/',
            secure: false
        });
        return response;
    }

    errorMsg.password = "email atau password salah";
    return NextResponse.json(errorMsg, { status: 400});
}