// Utility function untuk logout
export async function logout() {
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
            
            // Redirect ke halaman login
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

// Utility function untuk logout dengan redirect manual
export async function logoutWithRedirect(redirectPath: string = '/login') {
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
            
            // Redirect ke path yang ditentukan
            window.location.href = redirectPath;
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}
