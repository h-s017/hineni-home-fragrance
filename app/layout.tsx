import type { Metadata } from "next";
import "./globals.css";
import Footer from "./Footer";
export const metadata: Metadata={title:"HINENI 此域 選物",description:"SCENT & LIVING OBJECTS｜蠟燭、融蠟燈與空間噴霧。",other:{"codex-preview":"development"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body>{children}<Footer/></body></html>}
