import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation/Navigation' // @ denota una ruta absoluta por lo cual empieza a buscar desde la ruta raiz
import { Hanken_Grotesk, Poppins, Ubuntu } from 'next/font/google'

const hankenGrotesk = Hanken_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-hanken-grotesk',
  weight: ['500', '700', '800'] 
})

const poppins = Poppins({ 
  variable: '--font-poppins',
  subsets: ['latin'], 
  style: ['normal', 'italic'],
  weight: ['400', '700', '800'] 
})

const ubuntu = Ubuntu({ 
  variable: '--font-ubuntu',
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'My First Next.js App',
  description: 'Generated by create next app',
  keywords: "nextjs, react, app"
}

//Layout es el contenedor de todas las paginas
const RootLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${ubuntu.variable} ${poppins.variable}`}>
      <body>
        {/* <Navigation /> */}
        {children}
      </body>
    </html>
  )
}

export default RootLayout
