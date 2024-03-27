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
import HomeMain from '../../../public/images/home_main.png';
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
import Chang2 from '@/public/images/background/chang2.png'
import Chang3 from '@/public/images/background/chang3.png'
import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';

export default function Profile() {

  return (
    <main className='min-h-screen'>
        <div className='absolute top-[-116px]' style={{width: '100%', height: '500px', position: 'relative'}}>
          <Image src={Chang3} alt="home_main" fill sizes="100vw"/>
          
          <div className="flex relative items-center text-center justify-center pt-[148px]" style={{display: 'flex', color: 'white', fontSize: '48px', zIndex: 2}}> 
            <div className="text-[#E8751A] w-8/12 mx-auto bg-[rgba(255,255,255,.5)] px-8 py-4 rounded-lg">
              <p className="font-bold text-3xl"style={{color: "#E8751A"}}>Chặng 3</p> 
              <p className='font-extrabold  text-[#E8751A]'>Diễn đàn - Triển lãm</p>
              <p className="text-xl text-black text-left "> 
              Chặng 3 được xây dựng dưới dạng một “mạng xã hội thu nhỏ”. Sau khi được đã hoàn thành chặng 1 và chặng 2, học sinh có thể đặt ra các vấn đề mà mình thắc mắc đồng thời chia sẻ sản phẩm là các bài viết, kịch bản, bài nói, vở diễn của cá nhân/tập thể. Ngoài ra, để hỗ trợ cho học sinh luyện tập cách trình bày, ở chặng 3 được tích hợp cả phòng luyện nói cho phép học sinh tự ghi âm, nghe lại giọng nói của mình.
                </p>
            </div>
          </div>
          <div className="z-[1] absolute w-full h-full top-0" style={{background: 'linear-gradient(0deg, rgba(225,240,218,0.7) 0%, rgba(0,0,0,0.0.4) 70%, rgba(0,0,0,0.8582283255098915) 100%)'}}>

          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 relative mx-16">
            <a className="bg-white flex justify-center 
                rounded-lg p-10 
                border-2 border-black
                border-2 relative top-0 
                hover:-top-5 transition-inset duration-300 
                ease-in-out cursor-pointer" 
                style={{"border": "2px solid #f5f6fa"}} 
                href="/chang-3/chia-se-san-pham">
                <div className="absolute z-10 -top-[11px] flex items-start justify-center">
                    <div className="w-[194px] h-[11px] bg-[#1A4301] rounded-t-[10px] relative z-10">

                    </div>
                    <div className="w-[164px] h-[41px] bg-[#74A942] rounded-b-[30px] absolute z-20 
                        text-[#143601] font-[700] text-xl flex items-center justify-center"> 
                        CỬA 1 
                    </div>
                </div>
                <div className="text-center flex flex-col items-center">
                    <Image src={ShareImg} height={180} alt="share" style={{marginTop: '20px'}}></Image>
                    <h3 className="font-bold text-2xl mt-8"> Triển lãm sản phẩm </h3>
                    <p className="font-medium mt-4 text-gray-500"> 
                    Chia sẻ sản phẩm các chuyên đề mà em/nhóm em đã thực hiện. Đồng thời đọc/xem và nhận xét các sản phẩm của mọi người.


                    </p>
                </div>
            </a>

            <a className="bg-white flex justify-center 
                rounded-lg p-10 
                border-2 relative top-0 
                hover:-top-5 transition-inset duration-300 
                ease-in-out cursor-pointer" 
                style={{"border": "2px solid #f5f6fa"}} 
                href="/chang-3/hoi-dap">
                <div className="absolute z-10 -top-[11px] flex items-start justify-center">
                    <div className="w-[194px] h-[11px] bg-[#1A4301] rounded-t-[10px] relative z-10">

                    </div>
                    <div className="w-[164px] h-[41px] bg-[#74A942] rounded-b-[30px] absolute z-20 
                        text-[#143601] font-[700] text-xl flex items-center justify-center"> 
                        CỬA 2 
                    </div>
                </div>
                <div className="text-center flex flex-col items-center">
                    <Image src={QaImg} height={180} alt="share" style={{marginTop: '20px'}}></Image>
                    <h3 className="font-bold text-2xl mt-8"> Câu hỏi và giải đáp </h3>
                    <p className="font-medium mt-4 text-gray-500"> 
                    Đặt câu hỏi về những vấn đề em thắc mắc để cùng mọi người giải đáp. Đồng thời, em có thể vận dụng những hiểu biết của mình để giúp đỡ, hỗ trợ cho khó khăn của các bạn khác khi học tập chuyên đề


                    </p>
                </div>
            </a>
            <a className="bg-white flex justify-center 
                rounded-lg p-10 
                border-2 relative top-0 
                hover:-top-5 transition-inset duration-300 
                ease-in-out cursor-pointer" 
                style={{"border": "2px solid #f5f6fa"}} 
                href="/chang-3/phong-thuc-hanh-noi">
                <div className="absolute z-10 -top-[11px] flex items-start justify-center">
                    <div className="w-[194px] h-[11px] bg-[#1A4301] rounded-t-[10px] relative z-10">

                    </div>
                    <div className="w-[164px] h-[41px] bg-[#74A942] rounded-b-[30px] absolute z-20 
                        text-[#143601] font-[700] text-xl flex items-center justify-center"> 
                        CỬA 3 
                    </div>
                </div>
                <div className="text-center flex flex-col items-center">
                    <Image src={SpeakImg} height={180} alt="share" style={{marginTop: '20px'}}></Image>
                    <h3 className="font-bold text-2xl mt-8"> Phòng thực hành nói </h3>
                    <p className="font-medium mt-4 text-gray-500"> 
                    Luyện tập trình bày, báo cáo trước tập thể bằng cách luyện nói trong Cửa 3- Phòng thực hành nói. Với tính năng cho phép ghi âm, nghe lại, các em sẽ tự điều chỉnh được tốc độ, ngữ điệu khi nói. Từ đó phát huy điểm mạnh, tăng sự tự tin và khắc phục được các khuyết điểm khi trình bày/báo cáo trước tập thể. 

                    </p>
                </div>
            </a>

        </div>


    </main >
  );
}
