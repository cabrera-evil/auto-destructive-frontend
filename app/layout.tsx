import Providers from '@/providers/providers';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://auto-destructive-frontend.vercel.app/',
    languages: {
      en: '/',
    },
  },
  authors: [
    {
      name: 'cabrera-dev',
      url: 'https://cabrera-dev.com/',
    },
  ],
  creator: 'cabrera-dev',
  description: 'Example for kubernetes pod replacement',
  keywords: ['Next.js', 'React', 'TypeScript'],
  openGraph: {
    title: 'Self-Destruct Control Panel',
    description: 'Example for kubernetes pod replacement',
    url: 'https://auto-destructive-frontend.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://auto-destructive-frontend.vercel.app/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1723581090%2Ffront%2Fnext-conf-2024%2Ftakeover.png&w=1080&q=75&dpl=dpl_4kWRRdpV5mEWMp9Zhahs8vP5fgBq',
        width: 800,
        height: 600,
        alt: 'Self-Destruct Control Panel',
      },
    ],
  },
  publisher: 'cabrera-dev',
  title: 'Self-Destruct Control Panel',
  verification: {
    google: 'google-site-verification=token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
