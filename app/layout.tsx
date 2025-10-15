import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les Petits Plats",
  description: "Le nouveau site référence des petits plats sérieux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${anton.variable} ${manrope.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
