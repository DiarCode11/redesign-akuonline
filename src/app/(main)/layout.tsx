import Alert from "@/components/alert";
import "../globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-200 pt-28 pb-28 min-h-[600px] z-0">
        {children}
      </main>
      <footer className="bottom-0 w-full">
        <div className="bg-white w-ful px-10 py-3 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Aku Online-NG. All rights reserved.
        </div>
      </footer>
    </>
  );
}
