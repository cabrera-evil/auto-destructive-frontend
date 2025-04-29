import React from 'react';
import { Toaster } from '../components/ui/toaster';
import { GoogleAdsenseProvider } from './google-adsence';
import { GoogleAnalyticsProvider } from './google-analytics';
import { QueryProvider } from './query';
import { ThemeProvider } from './theme';

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <GoogleAnalyticsProvider>
          <GoogleAdsenseProvider>{children}</GoogleAdsenseProvider>
        </GoogleAnalyticsProvider>
      </QueryProvider>
      <Toaster />
    </ThemeProvider>
  );
}
