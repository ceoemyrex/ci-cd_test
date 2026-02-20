import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css"


export const metadata: Metadata = {
  title: "Zinter",
  description: " Zinter helps you plan and coordinate your move by creating a clear inventory first. Upload photos using AI or build a manual list whichever works best for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      
      className="font-dm"

      >
        {children}
      </body>
    </html>
  );
}
