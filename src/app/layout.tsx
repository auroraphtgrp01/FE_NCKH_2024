import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider, ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer"

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={inter.className} suppressHydrationWarning={true} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AppProvider>
            <Header />
            <div className="container">
              {children}
            </div>
            <Toaster />
            <div className="">
              <Footer />
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
