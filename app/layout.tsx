import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HomeSphere, OrbRearLight, OrbWallpapers } from "./matrix-sphere";
import { K9Tile } from "./k9-tile";
import { MorselsRibbon } from "./morsels-ribbon";
import { SemperFiTile } from "./semper-fi-tile";
import { SiteGhost } from "./site-ghost";
import {
  CenterFigure,
  ChannelBackground,
  VisualChannelProvider,
} from "./visual-channel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "character zer0",
  description: "character zer0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VisualChannelProvider>
          <ChannelBackground />
          <OrbRearLight />
          <OrbWallpapers />
          <HomeSphere />
          <CenterFigure />
          <MorselsRibbon />
          <SemperFiTile />
          <K9Tile />
          <SiteGhost />
          <div className="relative z-20 flex-1 flex flex-col">
            {children}
          </div>
        </VisualChannelProvider>
      </body>
    </html>
  );
}
