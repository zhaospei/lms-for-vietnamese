'use client';

import { usePathname, useRouter } from "next/navigation";
import { Typography } from "antd";
import { boSachSlug2Name } from "@/components/common/ChooseBook";
import assets from '@/public/chang-1/assets.json';
import { useSelector } from "react-redux";
import { boSachSelector } from "@/redux/bosach/bosachSelector";
import { nameToSlug } from "@/utils/searchParams";
import React from "react";
import { AssetInfo } from "@/types/slug";
import _, { isUndefined } from "lodash";
import Image from "next/image";
import NotFoundImage from '@/public/images/404-Not-found.svg';
import PdfViewer from "@/components/common/PdfViewer";

// import vcl from '../../../../../public/pdf.pdf';
// import second from
const { Text } = Typography;

export default function ChuyenDePage({
    params: {
        tailieu
    }
}: {
    params: {
        tailieu: string
    }
}) {
    const router = useRouter();
    const pathName = usePathname().split('/');
    pathName.pop();
    const bosach = nameToSlug(boSachSlug2Name, useSelector(boSachSelector.selectChoice) || 'Cánh diều');
    // console.log(cua)
    const đéo_có_chặng_1 = pathName.map((f) => f === 'chang-1' ? bosach : f).join('/').substring(1);
    đéo_có_chặng_1.slice(1)
    const tài_liệu: {
        path: string,
        files: AssetInfo[]
    } = assets[đéo_có_chặng_1];
    let tên_tài_liệu = decodeURIComponent(tailieu);
    // console.log(tài_liệu.files)
    let info = _.find(tài_liệu.files, (f) => f.name === tên_tài_liệu);
    return (
        <main className="min-h-screen">
            <div className="flex flex-col items-center gap-5">
                {!isUndefined(info) &&
                    <Text strong className="text-lg">{info.name.substring(0, info.name.lastIndexOf('.'))}</Text>
                }
                {
                    isUndefined(info) ?
                        <div className="flex flex-col items-center justify-center">
                            <Image src={NotFoundImage} alt="Không tìm thấy tài liệu" />
                            <Text type='secondary' italic className="text-lg">{'Tài liệu bạn cần tìm không tồn tại'}</Text>
                        </div>
                        :
                        (() => {
                            const dir = `${tài_liệu.path}/${info.name}`;
                            switch (info.type) {
                                case 'pdf':
                                    return <PdfViewer file={dir} width={'100%'}/>
                                case 'video':
                                    return (
                                        <video src={`/${dir}`} controls className="w-[80vw]">
                                        </video>
                                    )
                                case 'img':
                                    return (
                                        <Image src={`/${dir}`} alt={info.name} />
                                    )
                            }
                            return ''
                        })()
                }
            </div>
        </main>
    );
}

