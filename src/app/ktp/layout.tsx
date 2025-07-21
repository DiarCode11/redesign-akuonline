import RootLayout from "../(main)/layout"

export default function CreateDocumentLayout({ children }) {
    return (
        <RootLayout>
            <div className="container mx-auto md:w-[700px] md:px-0 w-full px-5">
                {children}
            </div>
        </RootLayout>
    );
}