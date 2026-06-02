import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'FlowWithAI | Discover the Best AI Tools',
  description: 'Explore, compare and find the perfect AI tools for every task in our curated directory.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${plusJakarta.variable}`}>
      <body className="bg-[#0a0a0f] text-white font-sans antialiased min-h-screen flex flex-col overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
