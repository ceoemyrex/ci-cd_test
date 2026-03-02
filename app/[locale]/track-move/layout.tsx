import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zinter | Track Move",
  description:
    "Track your move progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
