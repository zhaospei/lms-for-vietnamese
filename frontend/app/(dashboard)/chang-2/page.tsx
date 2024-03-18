'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LikeOutlined, DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography, Progress, Avatar, DatePicker, DatePickerProps, List, Space } from 'antd';
import Image from 'next/image';
import ShareImg from '../../../public/images/ill/share.png'; 
import QaImg from '../../../public/images/ill/qa.png';
import SpeakImg from '../../../public/images/ill/speak.jpg';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import Cookies from 'universal-cookie';
import HomeMain from '../../../public/images/fish_game.png';
import FishComing from '../../../public/images/fish_game_2.jpg';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useRouter, useSearchParams } from 'next/navigation';
import { DocumentClass } from '@/types/document';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import EditableText from '@/components/common/EditableText';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { authSelector } from '@/redux/auth/authSelector';
import { PageProps } from '@/types/PageProps';
import DocumentImage from '@/components/common/DocumentImage';
import { getExtOfFile } from '@/utils/getExtOfFile';
import Link from 'next/link';
import { getURL } from '@/utils/navigation';
import LikeIcon from '@/components/common/(Icons)/LikeIcon';
import DownloadIcon from '@/components/common/(Icons)/DownloadIcon';
import { useDebouncedCallback } from 'use-debounce';
import search from '@/utils/search';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Editor from '@/components/common/Editor/Editor';
const { Paragraph, Text, Title } = Typography;

const cookies = new Cookies();
export default function Profile() {

  return (
    <main className='min-h-screen'>
        <div className='flex items-center justify-center m-12 mb-24'>
            <div className='bg-[#AAD576] font-bold text-3xl rounded-full inline-block px-3'>
              Chặng 2: Trò chơi kiểm tra tri thức
            </div>
        </div>

        <div className="flex flex-col max-w-5xl mx-auto">
            <a className="bg-white flex justify-center 
                mb-[30px]
                rounded-lg p-10 
                border-2 border-black
                border-2 relative top-0 
                hover:-top-5 transition-inset duration-300 
                h-[200px]
                ease-in-out cursor-pointer" 
                // style={{}} 
                href="/chang-2/chuyen-de" style={{
                  "border": "2px solid #f5f6fa",
                  // transition: 'padding-left 0.3s ease-in-out',
                  background: `url(${HomeMain.src})`,
                  // backgroundRepeat: 'no-repeat',
                  // backgroundSize: '100% 100%'
                }}>
                  <div className="z-[1] absolute w-full h-full top-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.6', "border": "2px solid #f5f6fa",}}>

</div>
                <div className="text-center flex-col items-center flex text-white relative z-[100]">
                    {/* <Image src={ShareImg} width={600} height={400} alt="share"></Image> */}
                    <h3 className="font-bold text-5xl mt-8"> CON CÁ THAM ĂN </h3>
                    <p className="font-medium mt-4 text-gray-100"> 
                    Trên đỉnh ngọn núi cao, mây trắng phô bày như tấm thảm vô tận. Bên dưới, thung lũng rợp cây xanh mướt mắt, những cơn gió nhẹ nhàng thổi qua, đưa lá rơi lả tảo xuống đất. Con sông hát vang từng nốt nhạc.
                    </p>
                </div>
            </a>

            <div className="bg-white flex justify-center 
                rounded-lg p-10 
                my-[30px]
                border-2 relative top-0 
                hover:-top-5 transition-inset duration-300 
                ease-in-out cursor-pointer" 
                // style={{"border": "2px solid #f5f6fa"}} 
                style={{
                  "border": "2px solid #f5f6fa",
                  // transition: 'padding-left 0.3s ease-in-out',
                  background: `url(${FishComing.src})`,
                  // backgroundRepeat: 'no-repeat',
                  // backgroundSize: '100% 100%'
                }}
                >
                  <div className="z-[1] absolute w-full h-full top-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.6', "border": "2px solid #f5f6fa",}}>

</div>
                <div className="text-center flex-col items-center flex text-white relative z-[100]">
                    {/* <Image src={ShareImg} width={600} height={400} alt="share"></Image> */}
                    <h3 className="font-bold text-5xl mt-8"> THU PHỤC ĐẠI DƯƠNG </h3>
                    <p className="font-medium mt-4 text-gray-100"> 
                     <i>Sắp có</i>
                    </p>
                </div>
            </div>

        </div>


    </main >
  );
}
