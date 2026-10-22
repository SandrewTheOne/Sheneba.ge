import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/provider";
import { Header, Footer } from "@/components/shell";
import { Modals } from "@/components/modals";
export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: {
    default: "Sheneba.ge — Architecture, Design & Construction",
    template: "%s | Sheneba.ge",
  },
  description:
    "Find trusted architects, designers, engineers and construction professionals across Georgia.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
          <Modals />
        </Provider>
      </body>
    </html>
  );
}
