import "../styles/main.scss"
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/components/provider/Web3Provider';
import Navbar from '@/components/ui/navbar';;
import Footer from '@/components/ui/footer';
import MobileMenu from '@/components/ui/mobile-menu';
import { ThemeProvider } from "@/components/provider/ThemeProvider";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ThemeProvider>
        <Web3Provider>
          <Navbar />
          <MobileMenu />
          <main >
            {children}
          </main>
          <Footer />
        </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}