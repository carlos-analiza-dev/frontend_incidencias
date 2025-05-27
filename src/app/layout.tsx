import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers/TanStackProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Incidencias Laboratorios Centroamericanos",
  description:
    "En este sitio web podras enviar tus incidencias dentro de las instalaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanStackProvider>
        <body className={poppins.className}>
          <main className="h-full w-full">{children}</main>
          <Toaster />
        </body>
      </TanStackProvider>
    </html>
  );
}
