import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const IBMPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"]
});

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500"]
});

export const metadata: Metadata = {
  title: "Debt & Savings | วางแผนการเงิน ปลดหนี้อย่างเป็นระบบ",
  description: "A Simple, smart platform helps you track debt, grow savings, and take back control of your money - all in one place. | แพลตฟอร์มที่เรียบง่ายและชาญฉลาด ช่วยให้คุณติดตามหนี้สิน เพิ่มเงินออม และควบคุมการเงินของคุณได้อย่างเต็มที่ในที่เดียว",
  alternates: {
    canonical: "https://debt-and-savings.vercel.app/",
  },
  openGraph: {
    title: "Debt & Savings | วางแผนการเงิน ปลดหนี้อย่างเป็นระบบ",
    description: "A Simple, smart platform helps you track debt, grow savings, and take back control of your money - all in one place. | แพลตฟอร์มที่เรียบง่ายและชาญฉลาด ช่วยให้คุณติดตามหนี้สิน เพิ่มเงินออม และควบคุมการเงินของคุณได้อย่างเต็มที่ในที่เดียว",
    url: "https://debt-and-savings.vercel.app/",
    siteName: "Debt & Savings",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexSans.variable} ${IBMPlexSansThai.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
