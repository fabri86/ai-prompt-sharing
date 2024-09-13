import type { Metadata } from 'next'

import '@styles/globals.css'
import Nav from '@components/nav'
import Provider from '@components/provider'

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
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
