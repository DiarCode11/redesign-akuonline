# API Logout dan Cookie Management

## 1. API Endpoint Logout

### File: `src/app/api/logout/route.ts`

API logout menyediakan dua method:
- **POST**: Untuk logout dengan response JSON
- **GET**: Untuk logout dengan redirect langsung

### Cara Kerja:
1. Menghapus cookie `auth_token` dengan mengset expired date ke masa lalu
2. Mengembalikan response success atau error
3. Untuk GET method, langsung redirect ke halaman utama

## 2. Utility Functions

### File: `src/lib/logout.ts`

Menyediakan fungsi utility untuk logout:
- `logout()`: Logout dan redirect ke `/login`
- `logoutWithRedirect(path)`: Logout dan redirect ke path tertentu

## 3. Custom Hook

### File: `src/lib/hooks/useLogout.ts`

Hook React untuk logout dengan state management:
- `logout(path)`: Fungsi logout
- `isLoading`: State loading
- `error`: Error message jika ada

### Contoh Penggunaan:
```tsx
import { useLogout } from "@/lib/hooks/useLogout";

function MyComponent() {
    const { logout, isLoading, error } = useLogout();
    
    return (
        <button 
            onClick={() => logout('/login')}
            disabled={isLoading}
        >
            {isLoading ? 'Logging out...' : 'Logout'}
        </button>
    );
}
```

## 4. Middleware Authentication

### File: `middlewares/auth.ts`

Middleware untuk proteksi route:
- Mengecek cookie `auth_token`
- Redirect ke `/login` jika tidak ada token
- Public routes tidak perlu authentication

## 5. Implementasi di Navbar

Navbar sudah diupdate untuk menggunakan hook logout dengan:
- Loading state
- Error handling
- Disabled button saat loading

## 6. Cara Menggunakan

### A. Menggunakan Hook (Recommended):
```tsx
import { useLogout } from "@/lib/hooks/useLogout";

const { logout, isLoading, error } = useLogout();
```

### B. Menggunakan Utility Function:
```tsx
import { logout } from "@/lib/logout";

// Logout dan redirect ke /login
await logout();

// Logout dan redirect ke path tertentu
await logout('/dashboard');
```

### C. Menggunakan API Langsung:
```tsx
const response = await fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
});
```

## 7. Security Features

- Cookie dihapus dengan `httpOnly: true`
- Expired date di-set ke masa lalu
- Path di-set ke `/` untuk memastikan cookie terhapus di seluruh aplikasi
- Error handling yang proper

## 8. Testing

Untuk testing logout:
1. Login terlebih dahulu
2. Klik tombol logout di navbar
3. Pastikan redirect ke halaman login
4. Pastikan cookie `auth_token` sudah terhapus
5. Coba akses halaman yang memerlukan auth, harus redirect ke login
