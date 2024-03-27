'use client';
import React, { useEffect, useRef } from 'react';
import { Col, Row, Typography } from 'antd';
import 'dayjs/locale/en';
import { useSelector } from 'react-redux';
import { boSachSelector } from '@/redux/bosach/bosachSelector';
import { isUndefined } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { nameToSlug } from '@/utils/searchParams';
import { doorSlugName, DEFAULT_DOOR_SLUG } from "@/types/slug";
import { Cửa } from '@/types/slug';
const { Paragraph, Text, Title } = Typography;
import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';
import Chang2 from '@/public/images/background/chang2.png'
import Chang1Bg from '@/public/images/background/chang1.png'
import ChooseBook from "@/components/common/ChooseBook"
import { TenBoSach, bookIdList} from "@/components/common/ChooseBook";
import { boSachActions } from "@/redux/bosach/bosachSlice";
import { Breadcrumb, Space } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { DoorSlug } from "@/types/slug";
import { usePathname, useRouter } from "next/navigation";
import { slugToName } from "@/utils/searchParams";
import { ChuyenDeSlug, chuyenDeSlug2Name } from "@/types/slug";
import { authSelector } from '@/redux/auth/authSelector'
import Fetcher from "@/api/Fetcher";


const menuBoSach = bookIdList.map((book, i) => {
    return {
        key: i,
        label: (
            <MenuBoSach book={book}/>
        )
    }
})

function MenuBoSach({
    book
}: {
    book: TenBoSach
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    return (
        <button onClick={() => {
            router.push('/chang-1')
            dispatch(boSachActions.updateChoice(book));
        }}>
            <Text strong>{book}</Text>
        </button>
    )
}

const menuCua = Cửa.map((info, i) => ({
    key: i,
    path: `cua-${i+1}`,
    label: info.name
}))

function itemRender(route: ItemType, params: any, routes: ItemType[], paths: string[]): React.ReactNode {
    // if (route.title === 'Tri thức nền tảng')
    // console.log(paths)
    return (
        <Link href={`/${paths.join('/')}`}><Text strong className="text-lg">{route.title}</Text></Link>
    )
}



export default function Chang1Page() {
  const chuaChonSach = useRef(isUndefined(useSelector(boSachSelector.selectChoice)));
  const router = useRouter();
  const authState = useSelector(authSelector);
  const [loaiSach, setLoaiSach] = React.useState(-1);
  const [openBook, setOpenBook] = React.useState(false);
  const toggleBook = () => { setOpenBook(!openBook) }
  useEffect(() => {
    const uri = `users/book/getBook`
    Fetcher.get<any, any>(uri).then((response) => {
        // let newData = response.count;
        setLoaiSach(response.book)
        if (response.book == 1) {
          localStorage.setItem('bosach', 'Cánh diều')
        } else if (response.book == 2) {
          localStorage.setItem('bosach', 'Kết nối tri thức')
        } else if (response.book == 3) {
          localStorage.setItem('bosach', 'Chân trời sáng tạo')
        } else if (response.book == 0) {
          setOpenBook(true)
        }
        

    }).catch((error) => {

    });
}, []);
  console.log(authState)
    const bosach = useSelector(boSachSelector.selectChoice) || 'Cánh diều';
    const pathname = usePathname().split('/').slice(1);
    const doorSlug = pathname.length >= 2 ? pathname[1] : undefined;
    const chuyendeSlug = pathname.length >= 3 ? pathname[2] : undefined;
    // console.log(doorSlug)
    const doorName = !isUndefined(doorSlug) ? slugToName(doorSlugName, doorSlug in doorSlugName ? doorSlug as DoorSlug : DEFAULT_DOOR_SLUG) : undefined;
    const chuyendeName = !isUndefined(chuyendeSlug) ? slugToName(chuyenDeSlug2Name, chuyendeSlug as ChuyenDeSlug) : undefined
    const items: ItemType[] = [{
        title: 'Chặng 1',
        path: 'chang-1'
    }, {
        title: bosach,
        // // menu: {
        // //     items: menuBoSach
        // // }
    }];

    if (!isUndefined(doorName))
        items.push({
            title: doorName,
            path: doorSlug
            // menu: {
            //     'items': menuCua
            // }
        })

    if (!isUndefined(chuyendeName)) {
        items.push({
            title: chuyendeName,
            path: chuyendeSlug
        })
    }
  return (
    <main className='min-h-screen'>
      <div className='absolute top-[-116px]' style={{width: '100%', height: '500px', position: 'relative'}}>
          <Image src={Chang1Bg} alt="home_main" fill sizes="100vw"/>
          
          <div className="flex relative items-center text-center justify-center pt-[148px]" style={{display: 'flex', color: 'white', fontSize: '48px', zIndex: 2}}> 
            <div className="text-[#E8751A] w-8/12 mx-auto bg-[rgba(255,255,255,.5)] px-8 py-4 rounded-lg">
              <p className="font-bold text-3xl"style={{color: "#E8751A"}}>Chặng 1</p> 
              <p className='font-extrabold  text-[#E8751A]'>Hành trang tri thức</p>
              <p className="text-xl text-black text-left "> 
              Chặng 1 xây dựng nguồn dữ liệu đa phương thức cho ba chuyên đề học tập Ngữ văn lớp 10. Nội dung kiến thức chặng 1 được bám sát với Chương trình giáo dục phổ thông 2018 và được xây dựng theo định hướng của ba bộ sách giáo khoa Cánh Diều, Kết nối tri thức với cuộc sống và Chân trời sáng tạo. Hệ thống kiến thức được trình bày dưới hình thức kết hợp của phương tiện ngôn ngữ và phương tiện phi ngôn ngữ.



                </p>
            </div>
          </div>
          <div className="z-[1] absolute w-full h-full top-0" style={{background: 'linear-gradient(0deg, rgba(225,240,218,0.7) 0%, rgba(0,0,0,0.0.4) 70%, rgba(0,0,0,0.8582283255098915) 100%)'}}>

          </div>
        </div>
      <div className='flex flex-col w-full md:w-[70vw] mx-auto gap-10'>
        <Breadcrumb itemRender={itemRender} items={items} />
        <div className='italic'> Bạn đang sử dụng bộ sách <span className='font-bold'>{bosach}</span>, để thay đổi bộ sách vui lòng chọn nút phía dưới.</div>
        {/* <Text strong className='text-xl p-3 bg-light-primary rounded-xl w-fit'>
          Chặng 1: Hành trang tri thức
        </Text> */}
        <div className='w-full'>
          <Row gutter={[25, 33]}>
            {
              Cửa.map((info, i) => {
                return (
                  <Col key={i} lg={{ span: 12 }} xs={{ span: 24 }}>
                    <Link href={`/chang-1/${nameToSlug(doorSlugName, info.name) || DEFAULT_DOOR_SLUG}`}>
                      <div className="p-4 gap-8 bg-[#90D26D] rounded-xl w-full h-full relative flex items-center cursor-pointer transform
                        transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[103%]"
                      >
                        <p className='w-fit'>
                          <Text className='text-xl'>{`Cửa ${i + 1}`}</Text> <br />
                          <Text strong className='text-2xl'>{info.name}</Text>
                          <Paragraph italic className='text-justify'>
                            {info.mota}
                          </Paragraph>
                        </p>
                        <Image src={info.img} alt={info.name} className='ml-auto w-[120px]'></Image>
                      </div>
                    </Link>
                  </Col>
                )
              })
            }
          </Row>
        </div>
        <div className='w-full'>
          <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-lg font-mainfont px-8 py-2" onClick={toggleBook}>
            Thay đổi bộ sách 
          </button>
        </div>

      </div>

       <ChooseBook open={openBook} setOpenBook={setOpenBook}/>
    </main >
  );
}


