import Image from 'next/image'
import React from 'react'
import UETLogo from '../../public/images/uet-logo.svg';
import { THEME } from '@/styles/theme';

export default function Footer() {
    return (
        <footer className='bg-secondary p-4 shadow mt-8'>
            <div className='font-bold text-3xl' style={{ color: THEME.PRIMARY_COLOR }}>
                Chinh phục chuyên đề Ngữ văn 10
            </div>
            <div className="flex justify-between">
                <div className='font-semibold' style={{ color: THEME.PRIMARY_COLOR }}>
                    Email: dungbuit1k28@gmail.com
                </div>
                <div className='font-semibold' style={{ color: THEME.PRIMARY_COLOR }}>
                    Số di động: 0375596146 
                </div>
                <div className='font-semibold' style={{ color: THEME.PRIMARY_COLOR }}>
                    Nội dung: Lê Thị Vân, Phan Thị Cẩm Tú
                </div>
                <div className='font-semibold' style={{ color: THEME.PRIMARY_COLOR }}>
                    Xây dựng web : Bùi Tuấn Dũng
                </div>
                {/* <div className='text-gray-400 text-xs'>Nhà E3, 144 Xuân Thuỷ, Cầu Giấy, Hà Nội</div> */}
            </div>
        </footer>
    )
}
