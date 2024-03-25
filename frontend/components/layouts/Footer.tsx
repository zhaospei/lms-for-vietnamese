import Image from 'next/image'
import React from 'react'
import UETLogo from '../../public/images/logo_dark.png';
import { THEME } from '@/styles/theme';
import LogoIconDark from '@/public/images/logo_dark.png';
import LogoUET from '@/public/images/logo_dark.png';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathName = usePathname();
    if ('.pdf' === pathName.slice(-4)) {
        return null;
    }
    return (
        <footer className='w-full mb-8 footer'>
            <div className='flex py-[60px] w-11/12 mx-auto justify-between' style={{marginTop: '3.5rem' }}>
                <div className='w-1/5 font-bold text-3xl flex flex-col justify-between' style={{ color: THEME.PRIMARY_COLOR }}>
                    <Image src={LogoUET} alt="logo"></Image>
                    <div >
                        <a className='flex items-center' href="https://support.quizizz.com/hc/en-us/articles/360055566272-Quizizz-Accessibility-and-Inclusion-Statement" target="_blank" dir="ltr">
                            <Image width='50' height='50' src="https://assets-global.website-files.com/60aca2b71ab9a5e4ececf1cf/64a3c543f0df3bde4580f844_Accessibility_Icon.png" loading="lazy" alt="" className="accescibility-image" dir="ltr"></Image>
                            <div className="text-base font-normal leading-4	text-[#2d70ae]" i18next-orgval-1="Accessibility " i18next-orgval-3="&amp; Inclusion" dir="ltr"><p>Accessibility</p> &amp; Inclusion</div></a></div>
                </div>
                <div className="flex justify-between gap-4 w-8/12 text-lg font-medium"  dir="ltr">
   <div className="flex flex-col gap-8"  dir="ltr">
        <a href="/" target="_blank">Trang chủ</a>
        <a href="/chang-1/" target="_blank">Hành trang tri thức</a>
        <a href="/chang-2/" target="_blank">Trò chơi ôn tập</a>
        <a href="/chang-3/" target="_blank">Diễn đàn trao đổi</a>
        <a href="/help/" target="_blank">Hướng dẫn sử dụng</a>
    </div>
   <div className="flex flex-col gap-8"  dir="ltr">
        <a href="/blog/" target="_blank">Blog</a>
        <a href="/terms/" target="_blank">Điều khoản sử dụng</a>
        <a href="/privacy/" target="_blank">Chính sách bảo mật</a>
        <a href="/contact/" target="_blank">Liên hệ</a>
        <a href="/about/" target="_blank">Về chúng tôi</a>
    </div>
   <div className="flex flex-col gap-8"  dir="ltr">
      <div>
        Nội dung: 
        <p className='font-bold'>Lê Thị Vân, Phan Thị Cẩm Tú</p>
      </div>
      <div>
       Xây dựng web : 
       <p className='font-bold'> <a className="hover:text-green-900" href="https://github.com/zhaospei">Bùi Tuấn Dũng</a>, Bùi Huy Dược</p>
      </div>
      <div>
       Liên hệ: <a className='font-bold hover:text-green-900' href="https://zhaospei.github.io/">ZhaoSPei</a>
      </div>
   </div>
</div>
            </div>
        <div className="text-center">
        Trang web được xây dựng nhằm mục đích học tập và nghiên cứu, không có mục đích thương mại. 
        <p>Mọi thông tin liên quan đến bản quyền, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:dungbuit1k28@gmail.com"> dungbuit1k28@gmail.com </a> </p>
        </div>
        </footer>
    )
}
