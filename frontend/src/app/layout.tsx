import "./globals.css";

export const metadata = {
  title: "GreenPoint",
  description: "Aplikasi Bank Sampah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}