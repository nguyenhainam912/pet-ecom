import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';

import '@/app/globals.css';
import NextAuthWrapper from "@/library/next.auth.wrapper";
import MainHeader from "@/components/main/main.header";
import MainFooter from "@/components/main/main.footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NextAuthWrapper>
            <MainHeader />
              {children}
            <MainFooter />
          </NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
