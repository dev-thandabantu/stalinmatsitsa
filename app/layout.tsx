import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import Script from 'next/script'
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
    images: [{ url: '/assets/og.jpg', width: 1200, height: 630, alt: 'Stalin Matsitsa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stalin Matsitsa',
    description: 'Artist · Dancer · Performer. Afropop / Maskandi / Amapiano from Nkomazi, Mpumalanga.',
    images: ['/assets/og.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <Script id="posthog" strategy="afterInteractive">{`
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",r=t.getElementsByTagName("script")[0],p.async=!0,p.src=s.api_host+"/static/array.js",r.parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+" (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_eGEWU6RADxBS2CjLr80t4TCbOopc268X6QmOUtB6Skn', {
          api_host: 'https://us.i.posthog.com',
          capture_pageview: true,
          capture_pageleave: true,
          session_recording: { maskAllInputs: true }
        });
      `}</Script>
      <body>{children}</body>
    </html>
  )
}
