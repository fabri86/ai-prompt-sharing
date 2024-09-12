import type { Metadata } from 'next'

import '@styles/globals.css'
import Nav from '@components/nav'

export const metadata: Metadata = {
  title: 'AI prompt sharing',
  description: 'Discover and share AI prompts',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
