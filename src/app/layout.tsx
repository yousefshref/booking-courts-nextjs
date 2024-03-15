import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'
import AuthContext from '@/contexts/AuthContext'
import CourtsContext from '@/contexts/CourtsContext'
import BooksContext from '@/contexts/BooksContext'
import StateContext from '@/contexts/StateContext'
import SettingsContext from '@/contexts/SettingsContext'
import StaffsContext from '@/contexts/StaffsContext'
import App from '@/components/App'



export const metadata: Metadata = {
  title: '',
  description: '',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow' />
      </Head>
      <body>
        <AuthContext>
          <CourtsContext>
            <BooksContext>
              <StateContext>
                <SettingsContext>
                  <StaffsContext>
                    <App children={children} />
                  </StaffsContext>
                </SettingsContext>
              </StateContext>
            </BooksContext>
          </CourtsContext>
        </AuthContext>
      </body>
    </html>
  )
}
