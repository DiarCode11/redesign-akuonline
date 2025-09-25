import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Membuat response dengan status success
        const response = NextResponse.json(
            { 
                success: true, 
                message: 'Logout berhasil' 
            }, 
            { status: 200 }
        );

        // Menghapus cookie auth_token
        response.cookies.set({
            name: 'auth_token',
            value: '',
            httpOnly: true,
            path: '/',
            secure: false,
            expires: new Date(0) // Set expired date ke masa lalu untuk menghapus cookie
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { 
                success: false, 
                message: 'Terjadi kesalahan saat logout' 
            }, 
            { status: 500 }
        );
    }
}

// Optional: Tambahkan method GET untuk logout langsung dari URL
export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.redirect(new URL('/', req.url));
        
        // Menghapus cookie auth_token
        response.cookies.set({
            name: 'auth_token',
            value: '',
            httpOnly: true,
            path: '/',
            secure: false,
            expires: new Date(0)
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { 
                success: false, 
                message: 'Terjadi kesalahan saat logout' 
            }, 
            { status: 500 }
        );
    }
}
