import * as React from 'react';
import { Link, useLocation, type LinkProps } from 'react-router';
import { AppLayout } from '@/components/templates/AppLayout';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

/**
 * Adaptador: MUI pasa `href` a su LinkComponent, pero el Link de React Router
 * usa `to`. Este wrapper traduce uno en otro, manteniendo el Header agnóstico.
 */
const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, 'to'> & { href?: string }
>(function RouterLink({ href = '', ...props }, ref) {
  return <Link ref={ref} to={href} {...props} />;
});

/** Secciones de navegación de la SPA. */
const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Escalados', href: '/estadisticas' },
  { label: 'Laboratorio', href: '/laboratorio' },
];

/**
 * Shell persistente de la app: Header + Main + Footer. Usa `useLocation` para
 * marcar la ruta activa y el `Link` de React Router (vía RouterLink) para
 * navegación client-side.
 */
export default function AppChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();

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
          linkComponent={RouterLink}
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
