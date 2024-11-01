import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import "@/app/globals.css";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AntdRegistry>
            <NextAuthWrapper>{children}</NextAuthWrapper>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
