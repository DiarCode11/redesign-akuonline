import "../globals.css";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <>
      <nav className="bg-white h-20 shadow-lg flex justify-between items-center px-4 fixed top-0 left-0 z-10 w-full">
        <div className="font-bold text-xl flex items-center">
          <Image
            src={"IconNavbar.svg"}
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className="pl-2">
            Aku Online-NG
          </h1>
        </div>
        <div>
          <Image
              src={"ProfileIcon.svg"}
              alt="Profile Icon"
              width={40}
              height={40}
            />
        </div>
      </nav>
      <main className="bg-neutral-100 pt-28 h-full z-0">
        {children}
      </main>
    </>
  );
}
