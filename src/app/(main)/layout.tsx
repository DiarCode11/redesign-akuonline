import Alert from "@/components/alert";
import "../globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/authContext";
import { cookies } from "next/headers";
import { decodeJwtToken, JwtPayloadInterface } from "@/helper/jwtHelper";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('access_token')?.value
  let auth: JwtPayloadInterface = null

  if (!token) {
    redirect('/login') // Tidak sempat render Home sama sekali
  }
  
  try {
    auth = await decodeJwtToken(token)
    console.log(auth)
  } catch (e) {
    console.log(e)
    redirect('/login') // Redirect ketika jwt tidak valid / kadaluarsa
  }

  return (
    <>
      <AuthProvider auth={auth}>
        <header>
          <Navbar />
        </header>
        <main className="bg-slate-200 pt-28 pb-28 min-h-[600px] z-0">
          {children}
        </main>
      </AuthProvider>
      <footer className="bottom-0 w-full">
        <div className="bg-white w-ful px-10 py-3 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Aku Online-NG. All rights reserved.
        </div>
      </footer>
    </>
  );
}
