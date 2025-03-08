'use client'

import { Footer } from "@/components/footer";
import "./globals.css";
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useEffect } from 'react';
import { ThemeService } from '@/lib/theme';
import { uiState } from "@/lib/state";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      uiState.theme.systemPreference =
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    }
    const cleanup = ThemeService.initSystemListener();
    ThemeService.applyThemeToDOM();
    return cleanup;
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased select-none bg-white dark:bg-neutral-950`}
      >
        <NavBar items={[
          { name: 'Home', url: '/' },
          { name: 'Blogs', url: '/posts' },
          { name: 'Tweets', url: '/pages/tweets' },
          { name: 'Links', url: '/pages/links' },
          { name: 'About', url: '/pages/about' },
        ]
        } />
        <div className="w-full">
          <div className="box-border min-w-[200px] max-w-3xl mx-auto">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
