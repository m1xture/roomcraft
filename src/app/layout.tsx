import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Mono } from "next/font/google";
import Providers from "./providers";
import "../styles/base/reset.scss";
import "../styles/base/common.scss";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "RoomCraft",
  description: "Сайт конструктор кімнат",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${jetBrainsMono.variable} ${robotoMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
