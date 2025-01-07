import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from '@/theme-provider';
import Script from 'next/script';


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
			<Script
				defer
				src='Umami URL'
				data-website-id='Umami ID'
			/>
			

			<body
				className={`${geistSans.variable} ${geistMono.variable} ${ppEditorialNewRegular.variable} ${ppEditorialNewUltralight.variable} antialiased bg-gradient-to-r from-[#E3FDF5] to-[#FFE6FA] `}>
				<div className='bg-gradient-to-r from-[#ddd6f3] to-[#faaca8] fixed inset-0 -z-10 w-screen h-screen h-full animate-breathing'></div>
				{/* <div className='bg-gradient-to-r from-[#e3eeff] to-[#f3e7e9] fixed inset-0 -z-10 w-screen h-screen h-full animate-breathing'></div> */}
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
  );
}
