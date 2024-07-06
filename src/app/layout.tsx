import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import type { Metadata } from 'next'
import { extractRouterConfig } from 'uploadthing/server'

import { ourFileRouter } from '@/app/api/uploadthing/core'
import ClientProvider from '@/providers/ClientProvider'

import './globals.css'
import StoreProvider from './StoreProvider'

export const metadata: Metadata = {
  title: 'Art Of Sunar',
  description: 'Art Of Sunar',
  category: 'ecommerce',
  authors: { name: 'Sagar' },
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Jewellery Shop',
    'Silver jewellery',
    'Gold jewellery',
    'Artificial jewellery',
  ],
  creator: 'Sourabh Verma',
  publisher: 'Sourabh Verma',
  openGraph: {
    title: 'Jewellery Shop',
    description: 'Art Of Sunar',
    siteName: 'Art Of Sunar',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewellery Shop',
    description: 'Art Of Sunar',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <ClientProvider>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <StoreProvider>
            {children}
          </StoreProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
