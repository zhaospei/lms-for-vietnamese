'use client';

import { usePathname, useRouter } from "next/navigation";
import { Col, Modal, Row, Typography } from "antd";
import PdfViewer from "@/components/common/PdfViewer";
import { boSachSlug2Name, TenBoSach, TenBoSachSlug } from "@/components/common/ChooseBook";
import { DoorSlug } from "@/types/slug";
import assets from '@/public/chang-1/assets.json';
import { useSelector } from "react-redux";
import { boSachActions } from "@/redux/bosach/bosachSlice";
import { boSachSelector } from "@/redux/bosach/bosachSelector";
import { nameToSlug, slugToName } from "@/utils/searchParams";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Fetcher from '@/api/Fetcher';
import DownloadImg from '@/public/images/download.png';
import VideoThumbnail from 'react-video-thumbnail';
import PlayVideoImg from '@/public/images/play-button.png';
import { chuyenDeSlug2Name, DEFAULT_CHUYENDE_SLUG, ChuyenDeSlug, AssetInfo } from "@/types/slug";
import { set } from "lodash";
// import vcl from '../../../../../public/pdf.pdf';
// import second from
const { Text } = Typography;

import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';
import Chang2 from '@/public/images/background/chang2.png'
import Chang1Bg from '@/public/images/home_main.png'
import { bookIdList } from "@/components/common/ChooseBook";
import { Space } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { Cửa } from '@/types/slug';
import { isUndefined } from 'lodash';
import {doorSlugName, DEFAULT_DOOR_SLUG } from "@/types/slug";
import { Breadcrumb } from "antd";

const menuBoSach = bookIdList.map((book, i) => {
    return {
        key: i,
        label: (
            <MenuBoSach book={book}/>
        )
    } 
})

import Cookies from "universal-cookie";

const cookies = new Cookies();

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
    const authToken = "http://112.137.129.161:8000/?authToken=" + cookies.get('authToken') + "&chuyende=" + chuyendeSlug; 
    
    const bosach = nameToSlug(boSachSlug2Name, useSelector(boSachSelector.selectChoice) || 'Cánh diều');
    // console.log(cua)
    if (!(chuyendeSlug in chuyenDeSlug2Name)) {
        pathName.pop();
        pathName.push(DEFAULT_CHUYENDE_SLUG);
        router.replace(pathName.join('/'));
        return <></>
    }
    const đéo_có_chặng_1 = pathName.map((f) => f === 'chang-2' ? bosach : f).join('/').substring(1);
    const tên_chuyên_đề = slugToName(chuyenDeSlug2Name, chuyendeSlug as ChuyenDeSlug);
    đéo_có_chặng_1.slice(1)
    
    const items: ItemType[] = [{
        title: 'Chặng 2',
        path: 'chang-2'
    }, {
        title: 'Con cá tham ăn',
        path: 'chuyen-de'
        // menu: {
        //     items: menuBoSach
        // }
    }];

    if (!isUndefined(chuyendeSlug)) {
        items.push({
            title: tên_chuyên_đề,
            path: chuyendeSlug
        })
    }
    return (
        <main >

        <div className="w-[70vw] mx-auto flex flex-col gap-5">
            <Breadcrumb itemRender={itemRender} items={items} className="mt-8"/>
            <div className="w-full flex items-center flex-col gap-5 justify-center">
                <Text strong className='mt-4 text-xl p-4 font-extrabold text-3xl bg-light-primary rounded-xl w-fit'>
                    {tên_chuyên_đề}
                </Text>
                <div className="w-full flex justify-center">
                    <iframe src={authToken}  width="1100px" height="750px" allowFullScreen></iframe>
                </div>
               
            </div>
            
        </div>
            </main>
        )
}