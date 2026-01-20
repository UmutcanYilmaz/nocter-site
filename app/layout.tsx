import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// BURASI: Tarayıcı sekmesinde görünen isim ve açıklama
export const metadata: Metadata = {
  title: "NOCTÉR | High Fidelity Fragrance",
  description: "Noscanda Group - Silent Authority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning eklendi (Eklenti hatalarını önlemek için)
    <html lang="en" suppressHydrationWarning>
      
      {/* BURASI: Video Preload Kodunu Eklediğimiz Yer */}
      <head>
        <link rel="preload" href="/nocter-video.mp4" as="video" type="video/mp4" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}