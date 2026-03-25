import type { Metadata } from "next";
import "./globals.css";
// import "bootstrap-icons/font/bootstrap-icons.css"
import "swiper/css";
import "swiper/css/free-mode";
import Script from "next/script";


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
        <div id="portal-root"></div>
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18023297865"
          strategy="afterInteractive"
        />

        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-18023297865');
          `}
        </Script>
      </body>
    </html>
  );
}
