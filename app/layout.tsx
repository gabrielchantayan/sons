import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from '@/theme-provider';


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

const ppEditorialNewRegular = localFont({
  src: "./fonts/PPEditorialNew-Regular.otf",
  variable: "--font-pp-editorial-new-regular",
})

const ppEditorialNewUltralight = localFont({
	src: './fonts/PPEditorialNew-Ultralight.otf',
	variable: '--font-pp-editorial-new-ultralight',
});


export const metadata: Metadata = {
  title: "Sounds",
  description: "Background music for your life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${ppEditorialNewRegular.variable} ${ppEditorialNewUltralight.variable} antialiased bg-gradient-to-r from-[#E3FDF5] to-[#FFE6FA] `}>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
  );
}
