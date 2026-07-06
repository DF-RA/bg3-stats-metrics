import type { Metadata } from 'next';
import { Cinzel, EB_Garamond } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css';

// Fuente de títulos: Cinzel evoca la epigrafía romana/fantástica de la UI de BG3.
const display = Cinzel({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700'],
});

// Fuente de cuerpo: serif legible tipo grimorio.
const body = EB_Garamond({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BG3 Stats Metrics',
  description:
    'Panel de estadísticas y escalados de Baldur’s Gate 3 — BFF con Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
