import "./globals.css";

export const metadata = {
    title: "todo.jsx",
};

export default function RootLayout({children}) {
    return (
        <html lang="fa" className="bg-zinc-100">
            <body>
                {children}
            </body>
        </html>
    );
}
