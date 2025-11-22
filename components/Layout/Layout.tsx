import { ReactNode } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
