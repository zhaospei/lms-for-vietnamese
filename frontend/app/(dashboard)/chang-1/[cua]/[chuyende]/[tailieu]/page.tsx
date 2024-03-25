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
import Fetcher from '@/api/Fetcher';
import _, { isUndefined } from "lodash";
import Image from "next/image";
import NotFoundImage from '@/public/images/404-Not-found.svg';
import PdfViewer from "@/components/common/PdfViewer";
import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/common/ProgressBar";
import { useRef } from "react";
import { useCallback } from "react";

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
    const [data, setData] = useState(0);
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
    const mainRef = useRef<HTMLElement | null>(null);
    let tên_tài_liệu = decodeURIComponent(tailieu);
    // console.log("Tài liêu", tài_liệu.files)
    let info = _.find(tài_liệu.files, (f) => f.name === tên_tài_liệu);
    const link = `/${tài_liệu.path}/${info?.name}`;
    // useEffect(() => {
    //     // if (offsetNow === 0) return
    //     // console.log("link", link)  
    //     // console.log("cc", offsetNow, pageId, pageType)
    //     // console.log("offsetNow", offsetNow)
    //     const uri = `users/learn/getLearn`
    //     Fetcher.get<any, any>(uri, { params: { "link": link }}).then((response) => {
    //         console.log("getHere", response)
    //         setData(response.Score)
    //     }).catch((error) => {
    
    //     });
    //   }, [link])
      const [readingProgress, setReadingProgress] = useState(0);
      const [maxProgress, setMaxProgress] = useState(0);
    
      const scrollListener = useCallback(() => {
        console.log("scroll", mainRef);
        if (!mainRef.current) {
          return;
        }
    
        const element = mainRef.current;
        const totalHeight =
          element.clientHeight - element.offsetTop - window.innerHeight;
        const windowScrollTop =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
    
        if (windowScrollTop === 0) {
          return setReadingProgress(0);
        }
    
        if (windowScrollTop > totalHeight) {
          return setReadingProgress(100);
        }
    
        setReadingProgress((windowScrollTop / totalHeight) * 100);
        if (maxProgress < Math.round((windowScrollTop / totalHeight) * 10)) {
            setMaxProgress(Math.round((windowScrollTop / totalHeight) * 10));
            console.log((windowScrollTop / totalHeight) * 10)
            // console.log(Math.round((windowScrollTop / totalHeight) * 10))
            console.log(maxProgress);
            Fetcher.post<any, any>('/users/changeLearn/', {
                "score": Math.round((windowScrollTop / totalHeight) * 10),
                "link": link,
              }).then((response : any) => {
                if (response.message === "Comment successfully created") {
                  // router.reload();
                  // setReply('')
                  // setIsSending(1)
                //   setNewState(response.CommentId)
                //   setCntAdd(cntAdd + 1)
                }
              //   console.log(response)
              }).catch((error) => {
              //   console.log(error)
              })
        }
      }, [mainRef, maxProgress]);
    
      useEffect(() => {
        window.addEventListener("scroll", scrollListener);
    
        return () => window.removeEventListener("scroll", scrollListener);
      }, [scrollListener]);
    return (
        <main className="min-h-screen" ref={mainRef}>
            <div className="w-full fixed top-[60px] left-0 right-0 z-[1000]">
            <div
                className="h-[6px] bg-gradient-to-r from-[#90D26D] to-[#2C7865]"
                style={{
                width: `${readingProgress}%`,
                }}
            />
            </div>
            <div className="flex flex-col items-center gap-5">
                {/* {!isUndefined(info) &&
                    <Text strong className="text-lg">{info.name.substring(0, info.name.lastIndexOf('.'))}</Text>
                } */}
                {
                    isUndefined(info) ?
                        <div className="flex flex-col items-center justify-center">
                            <Image src={NotFoundImage} alt="Không tìm thấy tài liệu" />
                            <Text type='secondary' italic className="text-lg">{'Tài liệu bạn cần tìm không tồn tại'}</Text>
                        </div>
                        :
                        (() => {
                            const dir = `${tài_liệu.path}/${info.name}`;
                            
                            // console.log("dir", dir)
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

