import { Inter } from 'next/font/google';

import { AppConfigProvider } from '@/providers/AppConfigProvider';
import ToastsProvider from '@/providers/Toasts/ToastsProvider';

import '@/main.scss';

export const metadata = {
  title: 'WeHiveOn',
  description: 'Generated by create next app',
};

const inter = Inter({
  subsets: ['latin'],
  families: ['Inter'],
  display: 'swap',
  weight: '400',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-soft-gray`}>
        <AppConfigProvider>
          <ToastsProvider>{children}</ToastsProvider>
        </AppConfigProvider>
      </body>
    </html>
  );
}
