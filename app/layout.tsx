import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import '../styles/hub.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stalin Matsitsa',
  description: 'Artist · Dancer · Performer. Afropop / Maskandi / Amapiano from Nkomazi, Mpumalanga.',
  icons: { icon: '/assets/favicon.svg', shortcut: '/assets/favicon.svg' },
  openGraph: {
    title: 'Stalin Matsitsa',
    description: 'Artist · Dancer · Performer. Afropop / Maskandi / Amapiano from Nkomazi, Mpumalanga.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
