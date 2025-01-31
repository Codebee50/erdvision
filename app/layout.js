import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ERD Vision",
  description: "Database diagramming application",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Header />
            <Toaster/>
            {children}
          </body>
        </html>
      </StoreProvider>
    </ReactQueryProvider>
  );
}
