// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'A simple and efficient application for managing personal notes.',
};

// додаємо підтримку паралельного слоту `modal`
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; // новий проп для паралельного маршруту
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal /*  тут рендеримо паралельний слот */}
        </TanStackProvider>
      </body>
    </html>
  );
}
