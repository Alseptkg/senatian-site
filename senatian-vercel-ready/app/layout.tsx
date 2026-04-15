import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СЕНАТИАН — ВЭД, таможня и международная логистика",
  description:
    "ООО «СЕНАТИАН» — сопровождение ВЭД под ключ: таможенное оформление, международная логистика, доставка из Китая, документы и расчёт таможенных платежей.",
  keywords: [
    "ВЭД",
    "таможенное оформление",
    "международная логистика",
    "доставка из Китая",
    "финансовое сопровождение ВЭД",
    "СЕНАТИАН",
  ],
  metadataBase: new URL("https://example.vercel.app"),
  openGraph: {
    title: "СЕНАТИАН — ВЭД, таможня и международная логистика",
    description:
      "Комплексное сопровождение ВЭД для бизнеса: таможня, логистика, документы и поставки из Китая.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
