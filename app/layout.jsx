import { Anton, Inter_Tight } from "next/font/google";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Inter_Tight({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Franco Colapinto · Piloto de Fórmula 1",
  description:
    "Fan site no oficial de Franco Colapinto: la historia del pibe de Pilar que llegó a la Fórmula 1, sus números, sus cascos y todo lo que hay que saber.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${body.variable}`}>
      <body data-bg="celeste">{children}</body>
    </html>
  );
}
