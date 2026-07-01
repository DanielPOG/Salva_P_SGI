import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/sidenav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SGI",
  description: "Sistema de Gestión de Inventario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
        <aside className="w-full flex-none bg-gray-100 md:w-64">
          <section>
            <SideNav />
          </section>
        </aside>
        <main className="grow bg-sky-50 p-6 md:overflow-y-auto md:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
