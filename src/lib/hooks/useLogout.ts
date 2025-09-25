"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LogoutState {
    isLoading: boolean;
    error: string | null;
}

export function useLogout() {
    const [state, setState] = useState<LogoutState>({
        isLoading: false,
        error: null
    });
    const router = useRouter();

    const logout = async (redirectPath: string = '/login') => {
        setState({ isLoading: true, error: null });

        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Hapus data dari localStorage jika ada
                localStorage.removeItem('data');
                
                // Reset state
                setState({ isLoading: false, error: null });
                
                // Redirect ke halaman yang ditentukan
                router.push(redirectPath);
            } else {
                const errorData = await response.json();
                setState({ 
                    isLoading: false, 
                    error: errorData.message || 'Logout gagal' 
                });
            }
        } catch (error) {
            setState({ 
                isLoading: false, 
                error: 'Terjadi kesalahan saat logout' 
            });
        }
    };

    return {
        logout,
        isLoading: state.isLoading,
        error: state.error
    };
}
