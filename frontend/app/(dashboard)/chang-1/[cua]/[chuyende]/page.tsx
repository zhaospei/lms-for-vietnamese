'use client';

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { usePathname, useRouter } from "next/navigation";
import Vhdg from '@/public/images/chang-1/van-hoc-dan-gian.jpg';
import Skh from '@/public/images/chang-1/san-khau-hoa.jpg';
import Tttt from '@/public/images/chang-1/tho-truyen-tieu-thuyet.jpg';
import { Col, Modal, Row, Typography } from "antd";
import PdfViewer from "@/components/common/PdfViewer";
import { boSachSlug2Name, TenBoSach, TenBoSachSlug } from "@/components/common/ChooseBook";
import { DoorSlug } from "../page";
import assets from '@/public/chang-1/assets.json';
import { useSelector } from "react-redux";
import { boSachActions } from "@/redux/bosach/bosachSlice";
import { boSachSelector } from "@/redux/bosach/bosachSelector";
import { nameToSlug, slugToName } from "@/utils/searchParams";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import DownloadImg from '@/public/images/download.png';
import VideoThumbnail from 'react-video-thumbnail';
import PlayVideoImg from '@/public/images/play-button.png';
// import vcl from '../../../../../public/pdf.pdf';
// import second from
const { Text } = Typography;

export default function ChuyenDePage({
    params: {
        chuyende: chuyendeSlug
    }
}: {
    params: {
        chuyende: string
    }
}) {
    const router = useRouter();
    const pathName = usePathname().split('/');
    const bosach = nameToSlug(boSachSlug2Name, useSelector(boSachSelector.selectChoice) || 'Cánh diều');
    // console.log(cua)
    if (!(chuyendeSlug in chuyenDeSlug2Name)) {
        pathName.pop();
        pathName.push(DEFAULT_CHUYENDE_SLUG);
        router.replace(pathName.join('/'));
        return <></>
    }
    const đéo_có_chặng_1 = pathName.map((f) => f === 'chang-1' ? bosach : f).join('/').substring(1);
    const tên_chuyên_đề = slugToName(chuyenDeSlug2Name, chuyendeSlug as ChuyenDeSlug);
    đéo_có_chặng_1.slice(1)
    const tài_liệu: {
        path: string,
        files: AssetInfo[]
    } = assets[đéo_có_chặng_1];
    // console.log(tài_liệu.files)
    return (
        <main >
            <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
                <Text strong>{tên_chuyên_đề}</Text>
                <Row gutter={[25, 33]}>
                    {
                        tài_liệu.files.map((t) => {
                            return (
                                <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Preview path={tài_liệu.path} {...t} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </main>
    );
}

export type ChuyenDe = 'Văn học dân gian' | 'Sân khấu hoá' | 'Thơ, truyện, tiểu thuyết';
export type ChuyenDeSlug = 'van-hoc-dan-gian' | 'san-khau-hoa' | 'tho-truyen-tieu-thuyet';
export const DEFAULT_CHUYENDE_SLUG: ChuyenDeSlug = 'san-khau-hoa';
export const chuyenDeSlug2Name: Record<ChuyenDeSlug, ChuyenDe> = {
    'san-khau-hoa': 'Sân khấu hoá',
    'van-hoc-dan-gian': 'Văn học dân gian',
    'tho-truyen-tieu-thuyet': 'Thơ, truyện, tiểu thuyết'
};
export interface ThongTinChuyenDe {
    id: string;
    ten: ChuyenDe;
    mota: string;
    img: StaticImport;
}

export const cacChuyenDe: ThongTinChuyenDe[] = [{
    id: "1",
    ten: "Văn học dân gian",
    mota: "Tập nghiên cứu và báo báo về một vấn đề văn học dân gian",
    img: Vhdg
}, {
    id: "2",
    ten: 'Sân khấu hoá',
    mota: "Sân khấu hoá tác phẩm văn học",
    img: Skh
}, {
    id: "3",
    ten: "Thơ, truyện, tiểu thuyết",
    mota: "Đọc, viết và giới thiệu một tập thơ, một tập truyện hoặc một tiểu thuyết",
    img: Tttt
}];

export interface AssetInfo {
    name: string,
    type: 'pdf' | 'img' | 'video' | 'other'
};

function Preview({
    name,
    type,
    path
}: AssetInfo & {
    path: string
}): React.ReactNode {
    const pathName = usePathname();
    return (
        <Link href={`${pathName}/${name}`}>
            <div className="bg-white rounded-lg flex flex-col gap-y-4 items-center h-full w-full p-4 min-w-[450px]
        transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[103%] group/card
        ">
                <div className="w-full h-[300px] overflow-hidden flex flex-col items-center relative hover:opacity-90">
                    {
                        ((): React.ReactNode => {
                            const dir = `${path}/${name}`;
                            switch (type) {
                                case 'img':
                                    return <Image src={`/${dir}`} alt={name} width={200} height={200} className="!w-full" />
                                case 'pdf':
                                    return <PdfViewer file={`${dir}`} viewType='preview' width={'100%'} height={300} />
                                // return <PdfViewer file={'changCửa 1 và 2_Bộ Cánh Diều.pdf'}/>
                                case 'other':
                                    return (
                                        <a href="#" download={`/${dir}`}>
                                            <Image src={DownloadImg} alt={name} height={300} />
                                        </a>
                                    )
                                case 'video':
                                    return (
                                        <>
                                            <VideoThumbnail
                                                videoUrl={`/${dir}`}
                                                thumbnailHandler={(thumbnail: any) => console.log(thumbnail)}
                                                // width={120}
                                                height={300}
                                                snapshotAtTime={1}
                                            />
                                            <Image src={PlayVideoImg} alt={""} width={50} className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 group-hover/card:opacity-0 transition-opacity duration-300 ease-in-out"/>
                                        </>
                                    )
                            }
                        })()
                    }
                </div>
                <Text strong className="text-2xl mx-4 mb-4 group-hover/card:text-blue-300">{name.substring(0, name.lastIndexOf('.'))}</Text>
            </div>
        </Link>
    )
}