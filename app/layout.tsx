import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ReduxProvider } from "@/app/redux/provider";
export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          cx(sfPro.variable, inter.variable) + " dark h-screen bg-[#141b23]"
        }
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
        {/* <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
         <Suspense fallback="...">
          <Nav />
        </Suspense>  
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
        <Analytics /> */}
      </body>
    </html>
  );
}
