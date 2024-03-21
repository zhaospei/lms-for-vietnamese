import { Inter } from 'next/font/google'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
// import { Quicksand } from 'next/font/google'
// export const MAIN_FONT = Be_Vietnam_Pro({ 
//     subsets: ['vietnamese'],
//     weight: ["400", "500", "600", "700", "800", "900"]
// })

// export const MAIN_FONT = Inter({ subsets: ['latin'] })

export const MAIN_FONT = Work_Sans({ subsets: ['latin'] })

export const BRICES_FONT = localFont({
    src: [
      {
        path: '../public/fonts/ClassiqueSaigon.ttf',
        weight: '400'
      },
    ],
    variable: '--font-brices'
  })