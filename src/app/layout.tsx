import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AOSInitializer from 'src/components/AOSInitializer';
import { ThemeProvider } from '../providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kanban Task Board',
  description: 'Manage your tasks with our kanban board',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AOSInitializer
            options={{
              duration: 600,
              once: true,
              offset: 50,
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

