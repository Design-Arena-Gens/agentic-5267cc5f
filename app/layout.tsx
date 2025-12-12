import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Gen AI - Advanced Video Generation",
  description: "Create stunning videos from text using advanced AI technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
