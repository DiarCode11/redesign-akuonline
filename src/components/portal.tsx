'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';


interface PortalProps {
    children: React.ReactNode;
    wrapperId?: string;
}

export default function Portal({ children, wrapperId = 'portal-wrapper' }: PortalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Cek apakah wrapper sudah ada
        let element = document.getElementById(wrapperId);
        if (!element) {
            // Buat element baru jika belum ada
            element = document.createElement('div');
            element.setAttribute('id', wrapperId);
            document.body.appendChild(element);
        }
        
        return () => {
            // Cleanup saat komponen unmount
            const element = document.getElementById(wrapperId);
            if (element) {
                document.body.removeChild(element);
            }
        };
    }, [wrapperId]);

    // Jangan render apa-apa di server
    if (!mounted) return null;

    return createPortal(
        children,
        document.getElementById(wrapperId) as HTMLElement
    );
}