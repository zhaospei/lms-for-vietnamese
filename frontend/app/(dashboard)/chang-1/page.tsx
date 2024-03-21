'use client';
import React, { useRef } from 'react';
import { Col, Row, Typography } from 'antd';
import 'dayjs/locale/en';
import { useSelector } from 'react-redux';
import { boSachSelector } from '@/redux/bosach/bosachSelector';
import { isUndefined } from 'lodash';
import Cua1 from '@/public/images/chang-1/cua-1.png';
import Cua2 from '@/public/images/chang-1/cua-2.png';
import Cua3 from '@/public/images/chang-1/cua-3.png';
import Cua4 from '@/public/images/chang-1/cua-4.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { nameToSlug } from '@/utils/searchParams';
import { DoorName, doorSlugName, DEFAULT_DOOR_SLUG } from './[cua]/page';
const { Paragraph, Text, Title } = Typography;

export const Cửa: {
  name: DoorName,
  img: StaticImport
}[] = [{
  name: 'Tri thức nền tảng',
  img: Cua1
}, {
  name: 'Gợi mở',
  img: Cua2
}, {
  name: 'Tài liệu tham khảo',
  img: Cua3
}, {
  name: 'Bài mẫu',
  img: Cua4
},];

export default function Chang1Page() {
  const chuaChonSach = useRef(isUndefined(useSelector(boSachSelector.selectChoice)));
  return (
    <main className='min-h-screen'>
      <div className='flex flex-col w-full gap-10 items-center'>
        <Text strong className='text-xl p-3 bg-light-primary rounded-xl w-fit'>
          Chặng 1: Dữ liệu đa phương thức
        </Text>
        <div className='w-[75%]'>
          <Row gutter={[25, 33]}>
            {
              Cửa.map((info, i) => {
                return (
                  <Col key={i} lg={{ span: 12 }} xs={{ span: 24 }}>
                    <Link href={`/chang-1/${nameToSlug(doorSlugName, info.name) || DEFAULT_DOOR_SLUG}`}>
                      <div className="p-4 bg-light-primary rounded-xl w-full relative flex
                        transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[103%]"
                      >
                        <p className='w-fit'>
                          <Text className='text-xl'>{`Cửa ${i + 1}`}</Text> <br />
                          <Text strong className='text-2xl'>{info.name}</Text>
                          <Paragraph italic>
                            Mô tả
                          </Paragraph>
                        </p>
                        <Image src={info.img} alt={info.name} className='ml-auto h-[90px] w-auto'></Image>
                      </div>
                    </Link>
                  </Col>
                )
              })
            }
          </Row>
        </div>

      </div>

      {/* {chuaChonSach.current && <ChooseBook />} */}
    </main >
  );
}


