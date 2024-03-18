'use client';

import Image from "next/image";
import HomeImage from '../../../public/images/homepage-removebg.png';
import HomeMain from '../../../public/images/home_main.png';
import CommentHomeImage from '../../../public/images/comment.png';
import { Typography } from "antd";
import ScheduleIcon from "@/components/common/(Icons)/NavIcons/ScheduleIcon";
import MySubjectIcon from "@/components/common/(Icons)/NavIcons/MySubjectIcon";
import Main from "@/components/layouts/Main";
import PersonalStat from "@/components/statistic/personal/PersonalStat";
import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
const { Text, Title } = Typography;
import Typed from 'typed.js';

const headerText = "text-[#143601]";

export default function NotSignedInHomePage() {
  // const [vantaEffect, setVantaEffect] = useState(null)
  // const myRef = useRef(null)
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(BIRDS({
  //       el: myRef.current
  //     }))
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy()
  //   }
  // }, [vantaEffect])
  return (
    <Main className="flex flex-col" title='Trang chủ'>
      <AboutScheduleAndMySubjects />
      {/* <div className="vanta" ref={vantaRef}>
        <span>Foreground content goes here</span>
      </div> */}

      {/* <AboutAllSubjects />

      <AboutStats /> */}
    </Main>
  );
}

function AboutScheduleAndMySubjects() {
  const el = useRef(null);
  let times = 0;

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Chặng 1: Tri thức nền tảng',
        'Chặng 1: Tài liệu tham khảo',
        'Chặng 2: Trò chơi kiểm tra tri thức',
        'Chặng 3: Phòng thực hành nói',
      ],
      typeSpeed: 50,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
      <div className="absolute top-0 w-full bg-white flex flex-col z-[0]">
        <div className='relative ' style={{width: '100%', height: '700px', position: 'relative'}}>
          <Image src={HomeMain} alt="home_main" fill sizes="100vw"/>
          
          <div className="flex relative items-center justify-center pt-[150px]" style={{display: 'flex', color: 'white', fontSize: '48px', zIndex: 2}}> 
            <div className={BRICES_FONT.className}>
              <p className="text-[#FFC700]">Chinh phục Chuyên đề</p> 
              <p style={{fontSize: '128px', lineHeight: "96px"}}>Ngữ văn <span className="text-[#007F73]" style={{fontSize: '200px'}}>10</span></p>
              <div className={MAIN_FONT.className} style={{fontSize: '30px'}}> 
                <span ref={el} />
              </div>
            </div>
            
            <div className="ml-[100px] w-[500px] h-[500px]">
              {/* <Image src={HomeImage} alt="Dược" width={500} height={500} /> */}
            </div>
            {/* <p style={{fontSize: '36px'}}>Hiểu biết - Tư duy - Phát triển</p> */}
          </div>
          <div className="z-[1] absolute w-full h-full top-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.6'}}>

          </div>
        </div>
      
      <div className="flex flex-col items-center max-w-5xl mx-auto">
        <div className="flex">
          <Image src={HomeImage} alt="Dược" width={500} height={500} />
        </div>
        <div className="flex-1 p-8">
        <div className="flex flex-col flex-1">
          <Title className={headerText}>
            <div className="whitespace-nowrap text-[#1A4301] font-bold">Chinh phục chuyên đề Ngữ văn 10</div>
          </Title>
          <Text type="secondary" className="mb-[20px] text-xl">Chinh phục chuyên đề Ngữ văn 10 là website hỗ trợ HS và GV dạy và học các
chuyên đề Ngữ văn lớp 10. Với 3 chặng: <span className="text-[#245501]">Dữ liệu đa phương thức</span> - <span className="text-[#245501]">Trò chơi kiểm tra
tri thức </span> - <span className="text-[#245501]">Diễn đàn trao đổi</span>, website hỗ trợ cho học sinh tự học các chuyên đề ở nhà
đồng thời giáo viên có thể tạo các lớp học ảo để học sinh nhận nhiệm vụ và nộp
sản phẩm.</Text>
<Title className={headerText}>
            <div className="whitespace-nowrap text-[#1A4301]">Hướng dẫn sử dụng Website</div>
          </Title>
          <Text type="secondary" className="mb-[20px] text-xl">Học sinh đăng nhập, chọn bộ sách đang học.
    <ul>
      <li>
      Lựa chọn chặng 1: Dữ liệu đa phương thức. Học sinh lần lượt hoàn thành 4 cửa
trong chặng 1: Tri thức nền tảng - Gợi mở - Tài liệu tham khảo - Bài mẫu.
      </li>
      <li>
      Lựa chọn chặng 2: Trò chơi kiểm tra tri thức.
      </li>
      <li>
      Chặng 3: Diễn đàn trao đổi. Học sinh hoàn thành 3 cửa trong chặng 3: Chia sẻ
sản phẩm - Câu hỏi và giải đáp - Phòng thực hành nói.
      </li>
    </ul>
 </Text>
        </div>
        </div>
        
      </div>
    </div>
  );
}

