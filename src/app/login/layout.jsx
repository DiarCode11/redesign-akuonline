import Image from "next/image";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginLayout({ children }) {
      const cookiesStore = await cookies();
      const token = cookiesStore.get('auth_token')?.value
    
      if (token) {
        redirect('/') // Tidak sempat render Home sama sekali
      }

    return (
        <div className="w-full h-[100dvh] grid sm:grid-cols-2 grid-cols-1 primary-color select-none">
            <section className="justify-center items-center sm:flex hidden">
                <Image
                    src={"LoginIcon.svg"}
                    alt="login icon"
                    width={400}
                    height={400}
                />
            </section>
            <section className="bg-white h-full w-full sm:rounded-tl-4xl sm:rounded-bl-4xl flex justify-center items-center">
                <div className="px-10 w-full">
                    <div className="flex justify-center">
                        <Image
                            src={"Logo.svg"}
                            alt="Logo"
                            width={150}
                            height={150}
                        />
                    </div>
                    {children}
                </div>
            </section>
        </div>
    );
}