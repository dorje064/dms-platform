import './globals.css';
import { Inter, Cinzel } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata = {
  title: 'Degyal Memorial Society (DMS) | Preserving Dharma & Supporting Education',
  description: 'Degyal Memorial Society (DMS) is a non-profit community initiative dedicated to preserving the spiritual lineage of Degyal Rinpoche and supporting student education.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
