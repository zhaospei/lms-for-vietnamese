'use client';

import Image from "next/image";
import './main.css'
import Link from 'next/link'
import HomeImage from '../../../public/images/homepage-removebg.png';
import HomeMain from '../../../public/images/home_main.png';
import CommentHomeImage from '../../../public/images/comment.png';
import { Typography } from "antd";
import ScheduleIcon from "@/components/common/(Icons)/NavIcons/ScheduleIcon";
import MySubjectIcon from "@/components/common/(Icons)/NavIcons/MySubjectIcon";
import img1 from '@/public/images/main/1.svg'
import editimg from '@/public/images/main/edit.svg'
import bookimg from '@/public/images/main/book.svg'
import Hero from '@/public/images/hero.png'
import img2 from '@/public/images/main/2.svg'
import Footer from '@/components/layouts/Footer'
import img3 from '@/public/images/main/3.svg'
import go1 from '@/public/images/main/go1.svg'
import go2 from '@/public/images/main/go2.svg'
import Main from "@/components/layouts/Main";
import useResizeObserver from "use-resize-observer";
import { getURL } from "@/utils/navigation";
import PersonalStat from "@/components/statistic/personal/PersonalStat";
import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';
import Preview from "@/components/common/Preview/Preview";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import MultiCarousel from "@/components/common/MultiCarousel";
import Human1 from '@/public/images/human/1.jpg';
import Human2 from '@/public/images/human/2.jpg';
import Human3 from '@/public/images/human/3.jpg';
import Human4 from '@/public/images/human/4.jpg';
import Human5 from '@/public/images/human/5.jpg';
const { Text, Title } = Typography;
import Typed from 'typed.js';
const documents = [
  {
    id: 1,
    name: "“Trang web chinh phục chuyên đề ngữ văn lớp 10 là một công cụ hữu ích cho học sinh và giáo viên. Nội dung được cung cấp rất đa dạng và phong phú, từ các bài văn mẫu đến các bài tập thực hành, giúp học sinh hiểu sâu hơn về các khái niệm và kỹ năng trong ngữ văn.”",
    download: "Jessica Mitchell",
    tag: "High School Special Education Teacher",
    color: "#A0153E",
    image: Human1,

  },
  {
    id: 2,
    name: "“Giao diện trực quan và dễ sử dụng của trang web là một điểm cộng lớn. Học sinh có thể dễ dàng tìm kiếm thông tin, bài tập, và đề thi, trong khi giáo viên cũng có thể sắp xếp các tài liệu theo chuyên đề để hỗ trợ việc giảng dạy.”",
    download: "Fran Birmingham",
    tag: "High School Teacher",
    color: "#2d70ae",
    image: Human2

  },
  {
    id: 3,
    name: "“Việc thảo luận và trao đổi kiến thức trên trang web đã giúp tôi nâng cao hiệu suất giảng dạy. Đó là một cộng đồng học tập đáng giá.”",
    download: "Latoya Gay",
    tag: "High School Teacher",
    color: "#efa929",
    image: Human3

  },
  {
    id: 4,
    name: "“Một điểm mạnh của trang web là việc cập nhật thường xuyên các thông tin mới nhất về chương trình học và đề thi. Điều này giúp học sinh và giáo viên luôn tiếp cận được với những thông tin mới nhất và phù hợp nhất với nhu cầu học tập và giảng dạy của mình.”",
    download: "Latoya Gay",
    tag: "High School Teacher",
    color: "#240A34",
    image: Human4

  },
  {
    id: 5,
    name: "“Tính tương tác của trang web cũng rất tốt, với khả năng hỏi đáp trực tuyến và các diễn đàn thảo luận cho phép học sinh và giáo viên chia sẻ kiến thức, kinh nghiệm, và giải đáp thắc mắc. Điều này tạo ra một cộng đồng học tập sôi động và tích cực.”",
    download: "Elaina Weaver",
    tag: "High School Teacher",
    color: "#627254",
    image: Human5
  }
]

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
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

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
      <div className="absolute top-0 w-full bg-[#E1F0DA] flex flex-col z-[1]">
        <div className='absolute ' style={{width: '100%', height: '700px', position: 'relative'}}>
          <Image src={HomeMain} alt="home_main" fill sizes="100vw"/>
          
          <div className="flex relative items-center justify-center pt-[150px]" style={{display: 'flex', color: 'white', fontSize: '48px', zIndex: 2}}> 
            <div className={BRICES_FONT.className}>
              <p className="text-[#FFC700]">Chinh phục Chuyên đề</p> 
              <p style={{fontSize: '128px', lineHeight: "96px"}}>Ngữ văn <span className="text-white" style={{fontSize: '200px'}}>10</span></p>
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
      
      <div className="flex flex-col items-center">
        <Image src={Hero} alt="Dược" width={500} height={500} className="mt-16"/>
        <div className="text-center mt-16">
          <div className="text-5xl font-semibold">Tăng tốc độ học tập của bạn lên tới <span className="text-green-900 font-bold text-6xl">90%</span></div>
          <div className="text-5xl font-semibold">Thông qua <span className="font-bold text-green-900 text-6xl">ba chặng hành trình</span></div>
        </div>
        <div style={{
          display: "grid",
          gridAutoColumns: "1fr",
          width: "100%",
          "gridColumnGap": "40px",
          "gridRowGap": "40px",
    "gridTemplateRows": "auto",
    "gridTemplateColumns": "1fr 1fr 1fr",
    "marginTop": "80px"}}>
      <div className="trusted-grid-wrapper" style={{    "opacity": 1,
    "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
    "transformStyle": "preserve-3d",}}>
      <Image src={img1} alt="Dược" width={95} height={500} />
        <p className="trusted-text _1"> Chặng 1: Dữ liệu <span className="text-green-900 font-bold">đa phương thức</span></p>
        <Image className="trusted-yellow-arrow" src={go1} alt="Dược" width={200} height={500} />
      </div>
<div className="trusted-grid-wrapper middle">
<Image src={img2} alt="Dược" width={95} height={500} />
  <p className="trusted-text _2">Chặng 2: <span className="text-green-900 font-bold">Trò chơi </span> <p>kiểm tra tri thức</p> </p>
  <Image className="trusted-yellow-arrow" src={go2} alt="Dược" width={200} height={500} />
</div>
<div className="trusted-grid-wrapper">
<Image src={img3} alt="Dược" width={95} height={500} />
  <p className="trusted-text _3">Chặng 3:  <span className="text-green-900 font-bold">Diễn đàn </span>trao đổi</p>
</div>
        </div>
        <div className="flex bg-[#114232] w-full my-16 px-16 justify-between items-center">
          <div className="p-8">
            <div className="text-white font-bold text-5xl">
              Tham gia diễn đàn 
              <p>trao đổi <span className="text-7xl">RỘNG LỚN</span> </p> 
            </div>
            <div className="text-white text-3xl font-semibold mt-8">
              <div className="flex items-center mb-4"><Image src={bookimg} alt="Dược" width={50} height={50} className="mr-4"/> Chia sẻ sản phẩm của bạn</div>
              <div className="flex items-center"><Image src={editimg} alt="Dược" width={50} height={50} className="mr-4"/> Đặt câu hỏi và cùng tham gia giải đáp </div>
            </div>

          </div>
          <Image src={HomeImage} alt="Dược" width={500} height={500} />
        </div>
        <div className="text-5xl font-semibold mb-16">Mọi người nói gì về <span className="text-green-900 font-bold text-6xl">chúng tôi?</span></div>
        <MultiCarousel width={1000}>
              {(documents ?? Array<null>(5).fill(null)).map((doc, i) => {
                  return (
                    <Preview
                    imgSrc={doc?.image}
                    key={doc?.id ?? i}
                    imgHeight={130}
                    // imgSrc={"https://images.hdqwalls.com/wallpapers/akali-lol-artwork-4k-xu.jpg"}
                    url={'/'}
                    title={doc?.name ?? ''}
                    info={
                        doc?.download
                    }
                    tag = {
                      doc?.tag
                    }
                    color = {doc?.color}
                    // loading={isLoading}
                    />
                  )
              })}
          </MultiCarousel>
        <div className="ell-bottom bg-[#114232] mt-16">
          <div className="mx-auto">
            <h3 className="text-white font-bold text-5xl mb-4">Tham gia ngay nào!</h3>
            <div className="flex items-center justify-center gap-4">
              <button className="border-2 hover:bg-[#114232] hover:text-white rounded-lg font-semibold text-green-900 bg-white text-xl my-6 font-mainfont px-8 py-4">
                <Link href="/signup">
                  Tạo tài khoản
                  {/* <Avatar className="" src={'https://static.vecteezy.com/system/resources/previews/024/241/000/original/colorful-shiba-inu-dog-shiba-inu-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png'} size={96}></Avatar> */}
                  {/* <div className="text-[64px] text-sky-700 font-bold my-8 tracking-tighter">UETable</div> */}
                </Link>
              </button>
              <button className=" border-2 hover:bg-white hover:text-green-900 rounded-lg font-semibold text-white text-xl my-6 font-mainfont px-8 py-4">
                <Link href="/signup">
                  Xem hướng dẫn
                  {/* <Avatar className="" src={'https://static.vecteezy.com/system/resources/previews/024/241/000/original/colorful-shiba-inu-dog-shiba-inu-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png'} size={96}></Avatar> */}
                  {/* <div className="text-[64px] text-sky-700 font-bold my-8 tracking-tighter">UETable</div> */}
                </Link>
              </button>
            </div>
          </div>

        </div>
        
      </div>
      <Footer />
    </div>
  );
}

