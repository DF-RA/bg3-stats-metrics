'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/templates/AppLayout';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

/** Secciones de navegación de la SPA. */
const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Escalados', href: '/estadisticas' },
];

/**
 * Shell persistente de la app: Header + Main + Footer. Vive como client
 * component para poder usar `usePathname` (ruta activa) y el `Link` de Next
 * (navegación client-side → SPA).
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = NAV.map((item) => ({
    ...item,
    active: item.href === pathname,
  }));

  return (
    <AppLayout
      header={
        <Header
          title="BG3 Stats Metrics"
          navItems={navItems}
          linkComponent={NextLink}
        />
      }
      footer={
        <Footer
          copyright="© 2026 BG3 Stats Metrics"
          links={[
            {
              label: 'GitHub',
              href: 'https://github.com/DF-RA/bg3-stats-metrics',
            },
            { label: 'bg3.wiki', href: 'https://bg3.wiki' },
          ]}
        />
      }
    >
      {children}
    </AppLayout>
  );
}
