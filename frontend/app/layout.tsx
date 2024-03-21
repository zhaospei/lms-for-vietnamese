import './globals.css'
import 'animate.css'
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next'
import { ReduxProvider } from '@/redux/provider';
import { MAIN_FONT } from '@/styles/fonts';
import { ConfigProvider } from 'antd';
import { THEME } from '@/styles/theme';
import { ToastContainer } from 'react-toastify';
import SWRProvider from '@/components/provider/SWRProvider';
import localFont from 'next/font/local'

// export const dynamic='force-static';
export const metadata: Metadata = {
  title: 'Chinh phục chuyên đề ngữ văn 10',
  description: 'Tham gia diễn đàn trao đổi và xem lại bất kì lúc nào, cũng như sử dụng nhiều tính năng khác khi là một thành viên của Chinh phục chuyên đề ngữ văn 10!',
}

const brices = localFont({
  src: [
    {
      path: '../public/fonts/ClassiqueSaigon.ttf',
      weight: '400'
    },
  ],
  variable: '--font-brices'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${brices.variable} ${MAIN_FONT.className}`}>
      <body className='bg-[#E1F0DA]'>
        <ReduxProvider>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: MAIN_FONT.style.fontFamily,
                // borderRadiusLG: 15
              },
              components: {
                Input: {
                  activeBg: THEME.SECONDARY_COLOR,
                  lineWidth: 2
                },
              }
            }}
          >
            <SWRProvider>
              {children}

              <ToastContainer
                position='bottom-right'
              />
            </SWRProvider>
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

