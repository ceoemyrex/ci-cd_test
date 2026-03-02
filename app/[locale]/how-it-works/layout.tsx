import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Zinter | How it works",
  description: "Zinter focuses on one thing first: creating a clear inventory. Once that's done, move coordination becomes faster, easier, and more accurate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
        {children}
    </main>
  );
}
