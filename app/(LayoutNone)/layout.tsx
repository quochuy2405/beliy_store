'use client'
import { Provider } from 'react-redux'
import '../../styles/global.css'
import { Inter } from 'next/font/google'
import store from '@/redux/features/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
