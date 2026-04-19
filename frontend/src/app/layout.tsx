import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus OS — AI Digital Workforce",
  description:
    "Multi-Agent platform for orchestrating AI digital workers. Built with Temporal, LangChain4j, and React Flow.",
  keywords: [
    "AI agents",
    "multi-agent",
    "digital workforce",
    "Temporal",
    "LangChain4j",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
