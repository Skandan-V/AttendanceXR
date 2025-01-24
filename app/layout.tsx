import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "AttendanceXR - Simplify Attendance Tracking",
  description:
    "AttendanceXR is a powerful tool for teachers to easily mark and manage student attendance, generate reports, and streamline administrative tasks.",
  keywords: "attendance, education, school management, teacher tools, student tracking",
  authors: [{ name: "Skandan V" }],
  openGraph: {
    title: "AttendanceXR - Simplify Attendance Tracking",
    description: "Streamline your attendance management with AttendanceXR",
    type: "website",
    url: "https://attendancexr.com",
    images: [
      {
        url: "https://attendancexr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AttendanceXR Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AttendanceXR - Simplify Attendance Tracking",
    description: "Streamline your attendance management with AttendanceXR",
    images: ["https://attendancexr.com/twitter-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

