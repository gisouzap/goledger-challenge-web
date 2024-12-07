import { Open_Sans } from 'next/font/google';
import Provider from './provider';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html className={openSans.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
