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
    console.log(bosach, tên_chuyên_đề, đéo_có_chặng_1)
    const ok = đéo_có_chặng_1.includes('tri-thuc-nen-tang')
    if (ok) {
        if (bosach == 'canh-dieu' && tên_chuyên_đề == 'Văn học dân gian') {
            console.log("Here we go")
            return CD_CD1(tên_chuyên_đề, tài_liệu)
        } else if (bosach == 'canh-dieu' && tên_chuyên_đề == 'Sân khấu hoá') {
            return CD_CD2(tên_chuyên_đề, tài_liệu)
        } else if (bosach == 'canh-dieu' && tên_chuyên_đề == 'Thơ, truyện, tiểu thuyết') {
            return CD_CD3(tên_chuyên_đề, tài_liệu)
        } else if (bosach == 'ket-noi-tri-thuc' && tên_chuyên_đề == 'Văn học dân gian') {
            return KN_CD1(tên_chuyên_đề, tài_liệu)
        } else if (bosach == 'ket-noi-tri-thuc' && tên_chuyên_đề == 'Sân khấu hoá') {
            return KN_CD2(tên_chuyên_đề, tài_liệu)
        } else if (bosach == 'ket-noi-tri-thuc' && tên_chuyên_đề == 'Thơ, truyện, tiểu thuyết') {
            return KN_CD3(tên_chuyên_đề, tài_liệu)
        }
    }

    const bosachX = useSelector(boSachSelector.selectChoice) || 'Cánh diều';
    const pathname = usePathname().split('/').slice(1);
    const doorSlug = pathname.length >= 2 ? pathname[1] : undefined;
    const chuyendeSlugX = pathname.length >= 3 ? pathname[2] : undefined;
    // console.log(doorSlug)
    const doorName = !isUndefined(doorSlug) ? slugToName(doorSlugName, doorSlug in doorSlugName ? doorSlug as DoorSlug : DEFAULT_DOOR_SLUG) : undefined;
    const chuyendeName = !isUndefined(chuyendeSlugX) ? slugToName(chuyenDeSlug2Name, chuyendeSlugX as chuyendeSlugX) : undefined
    const items: ItemType[] = [{
        title: 'Chặng 1',
        path: 'chang-1'
    }, {
        title: bosachX,
        // menu: {
        //     items: menuBoSach
        // }
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
            path: chuyendeSlugX
        })
    }
    return (
        <main >

        <div className="w-[70vw] mx-auto flex flex-col gap-5">
            <Breadcrumb itemRender={itemRender} items={items} className="mt-8"/>
            <Text strong className='mt-4 text-xl p-4 font-extrabold text-3xl bg-light-primary rounded-xl w-fit'>
                    {tên_chuyên_đề}
                </Text>
            <Row gutter={[25, 33]}>
                {
                    tài_liệu.files.map((t:any) => {
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
        )
}

function CD_CD1(tên_chuyên_đề:any, tài_liệu:any) {
    const [isNext, setIsNext] = useState(false);
    const handleNext = () => { setIsNext(true) }
    return isNext ? (
        <main >

            <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
                <Text strong>{tên_chuyên_đề}</Text>
                <Row gutter={[25, 33]}>
                    {
                        tài_liệu.files.map((t:any) => {
                            return (
                                <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Preview path={tài_liệu.path} {...t} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </main>) : (
        <main className="max-w-5xl mx-auto py-16">
            <div className="w-full flex items-end">

                <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                    Tiếp tục
                </button>
            </div>
            <table className="tonghop" style={{ "tableLayout": "auto", "width": "100%" }}>
                <caption className="caption-top mb-8 font-bold text-3xl">
                BẢNG THỐNG KẾ CÁC TÁC PHẨM VĂN HỌC DÂN GIAN <br/> TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH CÁNH DIỀU
                </caption>
                <thead>
                    <tr>
                        <th>Thể loại </th>
                        <th className="min-w-[100px]">Lớp <br /> (đã học)</th>
                        <th>Văn bản</th>
                        <th>Trang </th>
                        <th>Ghi chú </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/1vllPpXIevxcNEa4LepBKeuzR6mwWJLHb/view?usp=drive_link">Truyện truyền thuyết và truyện cổ tích</a> </td>
                        <td> 6 tập 1</td>
                        <td>Thánh Gióng <br />Thạch Sanh <br />Sự tích hồ Gươm </td>
                        <td>15<br />19<br />25</td>
                        <td>Bài 1: Truyện truyền thuyết và truyện cổ tích</td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/1ysBWtdq8W7ENHzTd8eKsIevAkCKQfbJc/view?usp=drive_link">Ca dao </a></td>
                        <td>6 tập 1 </td>
                        <td>Ca dao Việt Nam (Thực hành đọc hiểu) </td>
                        <td><br />42 </td>
                        <td>Bài 2: Thơ </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/13LMDSm0OcMf34OdQ50xSpSg6AvmBBWmw/view?usp=drive_link">Truyện ngụ ngôn </a></td>
                        <td>7 tập 2 </td>
                        <td>Ếch ngồi đáy giếng<br />Đẽo cày giữa đường<br />Bụng và  răng, miệng , tay, chân (Ê - dốp)<br /> <br />Thầy bói xem voi (tự học) </td>
                        <td>4<br />6<br />10<br /><br />17 </td>
                        <td>Bài 6: Truyện ngụ ngôn và tục ngữ </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/1AxM0eL5ys6qfpTIvb6VFnYgx3qT_jLXE/view?usp=drive_link">Tục ngữ, thành ngữ </a></td>
                        <td>7 tập 2 </td>
                        <td>Tục ngữ về thiên nhiên, lao động và con người, xã hội (1) <br />Tục ngữ về thiên nhiên, lao động và con người, xã hội (2)</td>
                        <td>7<br /><br /><br />12</td>
                        <td>Bài 6: Truyện ngụ ngôn và tục ngữ </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/10QV_9NWpB5FUCuION1B_cyUh5Ns06jNt/view?usp=drive_link">Truyện cười dân gian </a> </td>
                        <td>8 tập 1 </td>
                        <td>Cái kính - Nê - xin <br />Thi nói khoác (Theo truyencuoihay.vn)</td>
                        <td>93<br />102<br />  </td>
                        <td>Bài 4: Hài kịch và truyện cười </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/12EBu1NKiWRRBUxubyK8jRF4NvbHLLM-I/view?usp=drive_link">Thần thoại</a> </td>
                        <td>10 tập 1 </td>
                        <td>Hê-ra-clet đi tìm táo vàng (trích thần thoại Hi Lạp) <br />Thần Trụ trời (Thần thoại Việt Nam) <br />Nữ Oa (Thần thoại Trung Quốc) </td>
                        <td>13<br /><br /><br />26<br /><br />40</td>
                        <td>Bài 1: Thần thoại và sử thi </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/1Qnd21qJ524Fk4jf_19ANQoZi0jySBY5q/view?usp=drive_link">Sử thi </a></td>
                        <td>10 tập 1 </td>
                        <td>Chiến thắng Mtao Mxay (Trích sử thi Đăm Săn) <br />Ra-ma buộc tội (Trích sử thi Ra-ma-ya-na - Van-mi-ki)</td>
                        <td>19<br /><br /><br />28 </td>
                        <td>Bài 1: Thần thoại và sử thi </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/1lnzaonr-jufD8ypwHtgSdhWhbZoteyyB/view?usp=drive_link">Chèo </a></td>
                        <td>10 tập 1 </td>
                        <td>Xúy Vân giả dại ( Trích chèo Kim Nham) <br />Thị Mầu lên chùa (Trích chèo Quan Âm Thị Kính) </td>
                        <td>65<br /><br />76</td>
                        <td>Bài 3: Kịch bản chèo và tuồng </td>
                    </tr>
                    <tr>
                        <td><a href="https://drive.google.com/file/d/13Rs5YI7pqrP1esm02_W1SKEG9BH5LxvM/view?usp=drive_link">Tuồng </a></td>
                        <td>10 tập 1 </td>
                        <td>Mắc mưu Thị Hến (Trích tuồng Nghêu, Sò, Ốc, Hến) <br />Xử kiện (Trích tuồng Nghêu, Sò, Ốc, Hến) </td>
                        <td>69<br /><br /><br />88</td>
                        <td>Bài 3: Kịch bản chèo và tuồng</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

function CD_CD2(tên_chuyên_đề:any, tài_liệu:any) {
    const [isNext, setIsNext] = useState(false);
    const handleNext = () => { setIsNext(true) }
    return isNext ? (
        <main >

            <div className="w-[75vw] mx-auto flex flex-col items-center gap-5">
                <Text strong>{tên_chuyên_đề}</Text>
                <Row gutter={[25, 33]}>
                    {
                        tài_liệu.files.map((t:any) => {
                            return (
                                <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Preview path={tài_liệu.path} {...t} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </main>) : (
        <main className="max-w-5xl mx-auto py-16">
            <div className="w-full flex items-end">

                <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                    Tiếp tục
                </button>
                
            </div>

            <table>
                <caption className="caption-top mb-8 font-bold text-3xl">
                BẢNG THỐNG KẾ CÁC TÁC PHẨM PHÙ HỢP <br />
ĐỂ TỔ CHỨC SÂN KHẤU HÓA <br />
TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH CÁNH DIỀU

                </caption>
<thead>
  <tr>
    <th>Lớp</th>
    <th>Thể loại </th>
    <th>Văn bản</th>
    <th>Trang </th>
    <th>Ghi chú </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>6 tập 1 </td>
    <td>Truyện </td>
    <td>Thánh Gióng <br />Thạch Sanh <br />Sự tích hồ Gươm </td>
    <td>15<br />19<br />25</td>
    <td>Bài 1: Truyện truyền thuyết và truyện cổ tích</td>
  </tr>
  <tr>
    <td>6 tập 1</td>
    <td>Kí </td>
    <td>Những ngày thơ ấu</td>
    <td>51</td>
    <td>Bài 3: Kí </td>
  </tr>
  <tr>
    <td>6 tập 2 </td>
    <td>Truyện </td>
    <td>Bài học đường đời đầu tiên (Tô Hoài) <br />Ông lão đánh cá và con cá vàng - Puskin <br />Cô bé bán diêm - Andersen </td>
    <td>4<br /><br />11<br /><br />16 </td>
    <td>Bài 6: Truyện </td>
  </tr>
  <tr>
    <td>6 tập 2 </td>
    <td>Truyện</td>
    <td>Bức tranh của em gái tôi (Tạ Duy Anh) <br />Điều không tính trước (Nguyễn Nhật Ánh) <br />Chích bông ơi! (Cao Duy Sơn) </td>
    <td>66<br /><br />70 <br /><br />76</td>
    <td>Bài 9: Truyện</td>
  </tr>
  <tr>
    <td>7 tập 1 </td>
    <td>Truyện </td>
    <td>Người đàn ông cô độc giữa rừng (Đoàn Giỏi) <br />Buổi học cuối cùng (An-phông-xơ Đô - đê)<br />Dọc đường xứ Nghệ (Sơn Tùng) <br />Bố của Xi - Mông (Guy-đơ Mô-pa-xăng) </td>
    <td>15<br /><br />21<br /><br />27<br /><br />39 </td>
    <td>Bài 1: Truyện ngắn và tiểu thuyết </td>
  </tr>
  <tr>
    <td>7 tập 2 </td>
    <td>Truyện ngụ ngôn </td>
    <td>Ếch ngồi đáy giếng<br />Đẽo cày giữa đường<br />Bụng và  răng, miệng , tay, <br />chân  (Ê - dốp) <br />Thầy bói xem voi (tự học) </td>
    <td>4<br />6<br />10<br /><br />17 </td>
    <td>Bài 6: Truyện ngụ ngôn và tục ngữ </td>
  </tr>
  <tr>
    <td>8 tập 1 </td>
    <td>Truyện ngắn </td>
    <td>Gió lạnh đầu mùa (Thạch Lam) <br />Người mẹ vườn cau (Nguyễn Ngọc Tư) </td>
    <td>18<br /><br />25 </td>
    <td>Bài 1: Truyện ngắn </td>
  </tr>
  <tr>
    <td>8 tập 1 </td>
    <td>Hài kịch  và truyện cười </td>
    <td>Đổi tên cho xã (Trích vở kịch Bệnh sĩ) - Lưu Quang Vũ <br />Cái kính - Nê-xin <br />Ông Giuốc - đanh mặc lễ phục (Mô-li-e) <br />Thi nói khoác (Truyện cười dân gian) </td>
    <td>85 <br /><br />93<br />98 <br /><br />102 </td>
    <td>Bài 4: Hài kịch truyện cười </td>
  </tr>
  <tr>
    <td>8 tập 2 </td>
    <td>Truyện </td>
    <td>Lão Hạc - Nam Cao<br />Trong mắt trẻ (trích Hoàng tử bé) - Antoine Luperi <br />Người thầy đầu tiên - Ai-ma-tốp <br />Cố hương - Lỗ Tấn </td>
    <td>4<br />13<br /><br />20 <br /><br />32 </td>
    <td>Bài 6: Truyện </td>
  </tr>
  <tr>
    <td>8 tập 2 </td>
    <td>Truyện </td>
    <td>Hoàng Lê nhất thống chí (Hồi thứ mười bốn) - Ngô gia Văn phái <br />Đánh nhau với cối xay gió( trích tiểu thuyết Đôn-ki-hô-tê) - Cervantes <br />Bên bờ Thiên Mạc (Hà Ân)<br />Tức nước vỡ bờ (trích Tắt đèn) - Ngô Tất Tố </td>
    <td>56<br /><br /><br />63<br /><br /><br />68 <br />77</td>
    <td>Bài 8: Truyện lịch sử và tiểu thuyết </td>
  </tr>
  <tr>
    <td>9 tập 1 </td>
    <td>Truyện thơ Nôm </td>
    <td>Cảnh ngày xuân (trích Truyện Kiều) - Nguyễn Du <br />Lục Vân Tiên cứu Kiều Nguyệt Nga (trích Lục Vân Tiên) - Nguyễn Đình Chiểu <br />Kiều ở lầu Ngưng Bích (trích Truyện Kiều) - Nguyễn Du <br />Lục Vân Tiên gặp nạn (trích Lục Vân Tiên) - Nguyễn Đình Chiểu </td>
    <td>37<br /><br />40<br /><br /><br />46 <br /><br />52 </td>
    <td>Bài 2: Truyện thơ Nôm </td>
  </tr>
  <tr>
    <td>9 tập 1 </td>
    <td>Truyện ngắn </td>
    <td>Làng - Kim Lân <br />Ông lão bên chiếc cầu - Hê-minh-uê<br />Chiếc lược ngà - Nguyễn Quang Sáng <br />Chiếc lá cuối cùng - O.Henry<br />Những con cá cờ - Trần Đức Tiến </td>
    <td>82<br />90<br /><br />96<br /><br />103<br />112</td>
    <td>Bài 4: Truyện ngắn </td>
  </tr>
  <tr>
    <td>9 tập 2 </td>
    <td>Truyện truyền kì và và truyện trinh thám </td>
    <td>Chuyện người con gái Nam Xương - Nguyễn Dữ <br />Vụ cải trang bất thành thành- Sê lốc hôm <br />Dế Chọi- Bồ Tùng Linh<br /> <br />Gói thuốc lá - Thế Lữ </td>
    <td>5 <br /><br />11 <br />19 <br /><br />28 </td>
    <td>Bài 6: Truyện truyền kì truyện trinh thám </td>
  </tr>
  <tr>
    <td>9 tập 2 </td>
    <td>Truyện, Kịch </td>
    <td>Sống, hay không sống (Hămlet - Sếchxpia) <br />Người thứ 7 (Murakami) <br />Đình công và nổi dậy (Vi Huyền Đắc) <br />Chị Tôi - Nguyễn Thị Thu Huệ </td>
    <td>80<br /><br />86<br />93<br />102 </td>
    <td>Bài 9: Bi kịch và truyện </td>
  </tr>
  <tr>
    <td>10 tập 1 </td>
    <td>Thần thoại và sử thi </td>
    <td>Hê-ra-clet đi tìm táo vàng (trích thần thoại Hy Lạp) <br />Thần Trụ trời (Thần thoại Việt Nam) <br />Nữ Oa (Thần thoại Trung Quốc) </td>
    <td>13<br /><br />26<br /><br />40</td>
    <td>Bài 1: Thần thoại và sử thi </td>
  </tr>
  <tr>
    <td>10 tập 1 </td>
    <td>Chèo </td>
    <td>Xúy Vân giả dại ( Trích chèo Kim Nham) <br />Thị Mầu lên chùa (Trích chèo Quan Âm Thị Kính) </td>
    <td>65<br /><br />76</td>
    <td>Bài 3: Kịch bản chèo và tuồng </td>
  </tr>
  <tr>
    <td>10 tập 1 </td>
    <td>Tuồng </td>
    <td>Mắc mưu Thị Hến (Trích tuồng Nghêu, Sò, Ốc, Hến) <br />Xử kiện (Trích tuồng Nghêu, Sò, Ốc, Hến) </td>
    <td>69<br /><br />88</td>
    <td>Bài 3: Kịch bản chèo và tuồng</td>
  </tr>
  <tr>
    <td>10 tập 2 </td>
    <td>Truyện </td>
    <td>Kiêu binh nổi loạn (Ngô gia văn phái) <br />Người ở bến sông Châu (Sương Nguyệt Minh)<br />Hồi trống Cổ Thành  (La Quán) </td>
    <td>35 <br /><br />42 <br /><br />50 </td>
    <td>Bài 6: Tiểu thuyết và truyện ngắn </td>
  </tr>
  <tr>
    <td>11 tập 1 </td>
    <td>Truyện </td>
    <td>Chí Phèo - Nam Cao <br />Chữ người tử tù tù- Nguyễn Tuân <br />Tấm lòng người mẹ - Victor Hugo<br />Kép Tư Bền - Nguyễn Công Hoan </td>
    <td>66<br />76<br /><br />84<br /><br />97 </td>
    <td>Bài 3: Truyện </td>
  </tr>
  <tr>
    <td>11 tập 2 </td>
    <td>Truyện </td>
    <td>Trái tim Đankô (Go-rơ-ki) <br />Một người Hà Nội (Nguyễn Khải) <br />Tầng hai (Phong Điệp) <br />Nắng đẹp miền quê ngoại (Trang Thế Hy) </td>
    <td>5<br />11<br /><br />17 <br />28 </td>
    <td>Bài 5: Truyện ngắn </td>
  </tr>
  <tr>
    <td>11 tập 2 </td>
    <td>Tùy bút, tản văn, truyện kí </td>
    <td>Vào chùa gặp lại (Minh Chuyên)</td>
    <td>60 </td>
    <td>Bài 7: Tùy bút, tản văn, truyện kí </td>
  </tr>
  <tr>
    <td>11 tập 2 </td>
    <td>Bi kịch </td>
    <td>Vĩnh biệt Cửu Trùng Đài (trích Vũ Như Tô) - Nguyễn Huy Tưởng<br />Thề nguyện và vĩnh biệt (Trích Rô-mê-ô và Giu-li-ét) - Sếch-pia<br />Tôi muốn được là tôi toàn vẹn (Trích Hồn Trương Ba, da hàng thịt) - Lưu Quang Vũ<br />Trương Chi - Nguyễn Đình Thi </td>
    <td>88<br /><br /><br />96<br /><br />102 <br /><br /><br />116 </td>
    <td>Bài 8: Bi kịch </td>
  </tr>
  <tr>
    <td>12 tập 1 </td>
    <td>Truyền kì và truyện ngắn hiện đại</td>
    <td>Chuyện chức phán sự đền Tản Viên - Nguyễn Dữ <br />Muối của rừng - Nguyễn Huy Thiệp <br />Chiếc thuyền ngoài xa - Nguyễn Minh Châu <br />Hỡi cõi U Minh (Sơn Nam) </td>
    <td>14<br /><br />20<br /><br />25<br /><br />43</td>
    <td>Bài 1: Truyền kì và truyện ngắn hiện đại </td>
  </tr>
  <tr>
    <td>12 tập 1 </td>
    <td> Nhật kí, phóng sự, hồi kí </td>
    <td>Nhật kí Đặng Thuỳ Trâm - Đặng Thùy Trâm <br />Khúc tráng ca nhà giàn - Xuân Ba<br />Quyết định khó khăn nhất - trích Điện Biên Phủ điểm hẹn lịch sử - Võ Nguyên Giáp <br />Một lít nước mắt - Kito Aya</td>
    <td>49<br /><br />53<br /><br />60<br /><br /><br />71 </td>
    <td>Bài 2: Nhật kí, phóng sự, hồi kí </td>
  </tr>
  <tr>
    <td>12 tập 1 </td>
    <td>Hài kịch </td>
    <td>Quan thanh tra - Gogol <br />Thực thi công lí - Người lái buôn thành Vơ-ni-dơ - Sếch pia <br />Loạn đến rồi - Xuân Trinh<br />Tiền tội nghiệp của tôi ơi -  Mô li e </td>
    <td>78<br />85<br /><br /><br />91 <br />105</td>
    <td>Bài 3: Hài kịch </td>
  </tr>
  <tr>
    <td>12 tập 2 </td>
    <td>Tiểu thuyết hiện đại</td>
    <td>Hạnh phúc của một tang gia - Vũ Trọng Phụng <br />Ánh sáng cứu rỗi - Bảo Ninh <br />Thiếu nữ và cây sồi già bên đường - Lép tôn xtôi <br />Con người không thể bị đánh bại - Hemingway</td>
    <td>35<br /><br />42<br />49<br /><br />58</td>
    <td>Bài 7: Tiểu thuyết hiện đại </td>
  </tr>
</tbody>
</table>
        </main>)
}

function CD_CD3(tên_chuyên_đề:any, tài_liệu:any) {
    const [isNext, setIsNext] = useState(false);
    const handleNext = () => { setIsNext(true) }
    return isNext ? (
        <main >

            <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
                <Text strong>{tên_chuyên_đề}</Text>
                <Row gutter={[25, 33]}>
                    {
                        tài_liệu.files.map((t:any) => {
                            return (
                                <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Preview path={tài_liệu.path} {...t} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </main>) : (
        <main className="max-w-5xl mx-auto py-16">
            <div className="w-full flex items-end">

                <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                    Tiếp tục
                </button>
                
            </div>

            <table>
                <caption className="caption-top mb-8 font-bold text-3xl">
                BẢNG THỐNG KẾ CÁC TẬP THƠ/TRUYỆN NGẮN/TIỂU THUYẾT <br />
TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH CÁNH DIỀU <br />
<span className="font-normal text-base">Lưu ý: Chúng tôi đã cố gắng để thống kê được đầy đủ, tuy nhiên sẽ không tránh khỏi những thiếu sót. <br/>Bảng thống kê chỉ mang tính tham khảo.</span> 
</caption>
<thead>
  <tr>
    <th>Lớp</th>
    <th>Thể loại </th>
    <th>Văn bản</th>
    <th>Trang </th>
    <th>Ghi chú </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>6 tập 1 </td>
    <td>Truyện </td>
    <td>Thánh Gióng <br />Thạch Sanh <br />Sự tích hồ Gươm </td>
    <td>15<br />19<br />25</td>
    <td>Bài 1: Truyện truyền thuyết và truyện cổ tích</td>
  </tr>
  <tr>
    <td>6 tập 1</td>
    <td>Kí </td>
    <td>Những ngày thơ ấu</td>
    <td>51</td>
    <td>Bài 3: Kí </td>
  </tr>
  <tr>
    <td>6 tập 2 </td>
    <td>Truyện </td>
    <td>Bài học đường đời đầu tiên (Tô Hoài) <br />Ông lão đánh cá và con cá vàng - Puskin <br />Cô bé bán diêm - Andersen </td>
    <td>4<br /><br />11<br /><br />16 </td>
    <td>Bài 6: Truyện </td>
  </tr>
  <tr>
    <td>6 tập 2 </td>
    <td>Truyện</td>
    <td>Bức tranh của em gái tôi (Tạ Duy Anh) <br />Điều không tính trước (Nguyễn Nhật Ánh) <br />Chích bông ơi! (Cao Duy Sơn) </td>
    <td>66<br /><br />70 <br /><br />76</td>
    <td>Bài 9: Truyện</td>
  </tr>
  <tr>
    <td>7 tập 1 </td>
    <td>Truyện </td>
    <td>Người đàn ông cô độc giữa rừng (Đoàn Giỏi) <br />Buổi học cuối cùng (An-phông-xơ Đô - đê)<br />Dọc đường xứ Nghệ (Sơn Tùng) <br />Bố của Xi - Mông (Guy-đơ Mô-pa-xăng) </td>
    <td>15<br /><br />21<br /><br />27<br /><br />39 </td>
    <td>Bài 1: Truyện ngắn và tiểu thuyết </td>
  </tr>
  <tr>
    <td>7 tập 2 </td>
    <td>Truyện ngụ ngôn </td>
    <td>Ếch ngồi đáy giếng<br />Đẽo cày giữa đường<br />Bụng và  răng, miệng , tay, <br />chân  (Ê - dốp) <br />Thầy bói xem voi (tự học) </td>
    <td>4<br />6<br />10<br /><br />17 </td>
    <td>Bài 6: Truyện ngụ ngôn và tục ngữ </td>
  </tr>
  <tr>
    <td>8 tập 1 </td>
    <td>Truyện ngắn </td>
    <td>Gió lạnh đầu mùa (Thạch Lam) <br />Người mẹ vườn cau (Nguyễn Ngọc Tư) </td>
    <td>18<br /><br />25 </td>
    <td>Bài 1: Truyện ngắn </td>
  </tr>
  <tr>
    <td>8 tập 1 </td>
    <td>Hài kịch  và truyện cười </td>
    <td>Đổi tên cho xã (Trích vở kịch Bệnh sĩ) - Lưu Quang Vũ <br />Cái kính - Nê-xin <br />Ông Giuốc - đanh mặc lễ phục (Mô-li-e) <br />Thi nói khoác (Truyện cười dân gian) </td>
    <td>85 <br /><br />93<br />98 <br /><br />102 </td>
    <td>Bài 4: Hài kịch truyện cười </td>
  </tr>
  <tr>
    <td>8 tập 2 </td>
    <td>Truyện </td>
    <td>Lão Hạc - Nam Cao<br />Trong mắt trẻ (trích Hoàng tử bé) - Antoine Luperi <br />Người thầy đầu tiên - Ai-ma-tốp <br />Cố hương - Lỗ Tấn </td>
    <td>4<br />13<br /><br />20 <br /><br />32 </td>
    <td>Bài 6: Truyện </td>
  </tr>
  <tr>
    <td>8 tập 2 </td>
    <td>Truyện </td>
    <td>Hoàng Lê nhất thống chí (Hồi thứ mười bốn) - Ngô gia Văn phái <br />Đánh nhau với cối xay gió( trích tiểu thuyết Đôn-ki-hô-tê) - Cervantes <br />Bên bờ Thiên Mạc (Hà Ân)<br />Tức nước vỡ bờ (trích Tắt đèn) - Ngô Tất Tố </td>
    <td>56<br /><br /><br />63<br /><br /><br />68 <br />77</td>
    <td>Bài 8: Truyện lịch sử và tiểu thuyết </td>
  </tr>
  <tr>
    <td>9 tập 1 </td>
    <td>Truyện thơ Nôm </td>
    <td>Cảnh ngày xuân (trích Truyện Kiều) - Nguyễn Du <br />Lục Vân Tiên cứu Kiều Nguyệt Nga (trích Lục Vân Tiên) - Nguyễn Đình Chiểu <br />Kiều ở lầu Ngưng Bích (trích Truyện Kiều) - Nguyễn Du <br />Lục Vân Tiên gặp nạn (trích Lục Vân Tiên) - Nguyễn Đình Chiểu </td>
    <td>37<br /><br />40<br /><br /><br />46 <br /><br />52 </td>
    <td>Bài 2: Truyện thơ Nôm </td>
  </tr>
  <tr>
    <td>9 tập 1 </td>
    <td>Truyện ngắn </td>
    <td>Làng - Kim Lân <br />Ông lão bên chiếc cầu - Hê-minh-uê<br />Chiếc lược ngà - Nguyễn Quang Sáng <br />Chiếc lá cuối cùng - O.Henry<br />Những con cá cờ - Trần Đức Tiến </td>
    <td>82<br />90<br /><br />96<br /><br />103<br />112</td>
    <td>Bài 4: Truyện ngắn </td>
  </tr>
  <tr>
    <td>9 tập 2 </td>
    <td>Truyện truyền kì và và truyện trinh thám </td>
    <td>Chuyện người con gái Nam Xương - Nguyễn Dữ <br />Vụ cải trang bất thành thành- Sê lốc hôm <br />Dế Chọi- Bồ Tùng Linh<br /> <br />Gói thuốc lá - Thế Lữ </td>
    <td>5 <br /><br />11 <br />19 <br /><br />28 </td>
    <td>Bài 6: Truyện truyền kì truyện trinh thám </td>
  </tr>
  <tr>
    <td>9 tập 2 </td>
    <td>Truyện, Kịch </td>
    <td>Sống, hay không sống (Hămlet - Sếchxpia) <br />Người thứ 7 (Murakami) <br />Đình công và nổi dậy (Vi Huyền Đắc) <br />Chị Tôi - Nguyễn Thị Thu Huệ </td>
    <td>80<br /><br />86<br />93<br />102 </td>
    <td>Bài 9: Bi kịch và truyện </td>
  </tr>
  <tr>
    <td>10 tập 1 </td>
    <td>Thần thoại và sử thi </td>
    <td>Hê-ra-clet đi tìm táo vàng (trích thần thoại Hy Lạp) <br />Thần Trụ trời (Thần thoại Việt Nam) <br />Nữ Oa (Thần thoại Trung Quốc) </td>
    <td>13<br /><br />26<br /><br />40</td>
    <td>Bài 1: Thần thoại và sử thi </td>
  </tr>
  <tr>
    <td>10 tập 1 </td>
    <td>Chèo </td>
    <td>Xúy Vân giả dại ( Trích chèo Kim Nham) <br />Thị Mầu lên chùa (Trích chèo Quan Âm Thị Kính) </td>
    <td>65<br /><br />76</td>
    <td>Bài 3: Kịch bản chèo và tuồng </td>
  </tr>
  <tr>
    <td>10 tập 1 </td>
    <td>Tuồng </td>
    <td>Mắc mưu Thị Hến (Trích tuồng Nghêu, Sò, Ốc, Hến) <br />Xử kiện (Trích tuồng Nghêu, Sò, Ốc, Hến) </td>
    <td>69<br /><br />88</td>
    <td>Bài 3: Kịch bản chèo và tuồng</td>
  </tr>
  <tr>
    <td>10 tập 2 </td>
    <td>Truyện </td>
    <td>Kiêu binh nổi loạn (Ngô gia văn phái) <br />Người ở bến sông Châu (Sương Nguyệt Minh)<br />Hồi trống Cổ Thành  (La Quán) </td>
    <td>35 <br /><br />42 <br /><br />50 </td>
    <td>Bài 6: Tiểu thuyết và truyện ngắn </td>
  </tr>
  <tr>
    <td>11 tập 1 </td>
    <td>Truyện </td>
    <td>Chí Phèo - Nam Cao <br />Chữ người tử tù tù- Nguyễn Tuân <br />Tấm lòng người mẹ - Victor Hugo<br />Kép Tư Bền - Nguyễn Công Hoan </td>
    <td>66<br />76<br /><br />84<br /><br />97 </td>
    <td>Bài 3: Truyện </td>
  </tr>
  <tr>
    <td>11 tập 2 </td>
    <td>Truyện </td>
    <td>Trái tim Đankô (Go-rơ-ki) <br />Một người Hà Nội (Nguyễn Khải) <br />Tầng hai (Phong Điệp) <br />Nắng đẹp miền quê ngoại (Trang Thế Hy) </td>
    <td>5<br />11<br /><br />17 <br />28 </td>
    <td>Bài 5: Truyện ngắn </td>
  </tr>
  <tr>
    <td>11 tập 2 </td>
    <td>Tùy bút, tản văn, truyện kí </td>
    <td>Vào chùa gặp lại (Minh Chuyên)</td>
    <td>60 </td>
    <td>Bài 7: Tùy bút, tản văn, truyện kí </td>
  </tr>
  <tr>
    <td>11 tập 2 </td>
    <td>Bi kịch </td>
    <td>Vĩnh biệt Cửu Trùng Đài (trích Vũ Như Tô) - Nguyễn Huy Tưởng<br />Thề nguyện và vĩnh biệt (Trích Rô-mê-ô và Giu-li-ét) - Sếch-pia<br />Tôi muốn được là tôi toàn vẹn (Trích Hồn Trương Ba, da hàng thịt) - Lưu Quang Vũ<br />Trương Chi - Nguyễn Đình Thi </td>
    <td>88<br /><br /><br />96<br /><br />102 <br /><br /><br />116 </td>
    <td>Bài 8: Bi kịch </td>
  </tr>
  <tr>
    <td>12 tập 1 </td>
    <td>Truyền kì và truyện ngắn hiện đại</td>
    <td>Chuyện chức phán sự đền Tản Viên - Nguyễn Dữ <br />Muối của rừng - Nguyễn Huy Thiệp <br />Chiếc thuyền ngoài xa - Nguyễn Minh Châu <br />Hỡi cõi U Minh (Sơn Nam) </td>
    <td>14<br /><br />20<br /><br />25<br /><br />43</td>
    <td>Bài 1: Truyền kì và truyện ngắn hiện đại </td>
  </tr>
  <tr>
    <td>12 tập 1 </td>
    <td> Nhật kí, phóng sự, hồi kí </td>
    <td>Nhật kí Đặng Thuỳ Trâm - Đặng Thùy Trâm <br />Khúc tráng ca nhà giàn - Xuân Ba<br />Quyết định khó khăn nhất - trích Điện Biên Phủ điểm hẹn lịch sử - Võ Nguyên Giáp <br />Một lít nước mắt - Kito Aya</td>
    <td>49<br /><br />53<br /><br />60<br /><br /><br />71 </td>
    <td>Bài 2: Nhật kí, phóng sự, hồi kí </td>
  </tr>
  <tr>
    <td>12 tập 1 </td>
    <td>Hài kịch </td>
    <td>Quan thanh tra - Gogol <br />Thực thi công lí - Người lái buôn thành Vơ-ni-dơ - Sếch pia <br />Loạn đến rồi - Xuân Trinh<br />Tiền tội nghiệp của tôi ơi -  Mô li e </td>
    <td>78<br />85<br /><br /><br />91 <br />105</td>
    <td>Bài 3: Hài kịch </td>
  </tr>
  <tr>
    <td>12 tập 2 </td>
    <td>Tiểu thuyết hiện đại</td>
    <td>Hạnh phúc của một tang gia - Vũ Trọng Phụng <br />Ánh sáng cứu rỗi - Bảo Ninh <br />Thiếu nữ và cây sồi già bên đường - Lép tôn xtôi <br />Con người không thể bị đánh bại - Hemingway</td>
    <td>35<br /><br />42<br />49<br /><br />58</td>
    <td>Bài 7: Tiểu thuyết hiện đại </td>
  </tr>
</tbody>
</table>
        </main>)
}

function KN_CD1(tên_chuyên_đề:any, tài_liệu:any) {
    const [isNext, setIsNext] = useState(false);
    const handleNext = () => { setIsNext(true) }
    return isNext ? (
        <main >

            <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
                <Text strong>{tên_chuyên_đề}</Text>
                <Row gutter={[25, 33]}>
                    {
                        tài_liệu.files.map((t:any) => {
                            return (
                                <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Preview path={tài_liệu.path} {...t} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </main>) : (
        <main className="max-w-5xl mx-auto py-16">
            <div className="w-full flex items-end">

                <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                    Tiếp tục
                </button>
                
            </div>
            <table>
              <caption className="caption-top mb-8 font-bold text-3xl"> BẢNG THỐNG KẾ CÁC TÁC PHẨM VĂN HỌC DÂN GIAN <br/> 
TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
</caption>
<thead>
  <tr>
    <th>Thể loại </th>
    <th>Lớp (đã học)</th>
    <th>Văn bản</th>
    <th>Trang </th>
    <th>Ghi chú </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="https://drive.google.com/file/d/1wU6e2iykQ2EgBlIo3xnvNteB1n4LKyyh/view?usp=sharing">Truyền thuyết</a></td>
    <td>Lớp 6 </td>
    <td>Thánh Gióng<br />Sơn Tinh, Thủy Tinh</td>
    <td> 06<br />10</td>
    <td>Bài 6: Chuyện kể về những anh hùng</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1fzqNYGVRCyeWrkhQt-IPj7h9iGEef9OP/view?usp=sharing">Truyện cổ tích </a></td>
    <td>Lớp 6 </td>
    <td>Thạch Sanh  <br />Cây khế<br />Vua chích chòe <br />Sọ Dừa</td>
    <td>26<br />32<br />36<br />48</td>
    <td>Bài 7: Thế giới cổ tích </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1UMY8lRJ1Rxtc5Pxet1U0tPfUF_PXECpZ/view?usp=sharing">Ca dao  </a></td>
    <td>Lớp 6 </td>
    <td>Chùm ca dao về quê hương đất nước </td>
    <td>90</td>
    <td>Bài 4: Quê hương yêu dấu</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1w7SIdT7UHhThXwI7Gx7BRhry3RyCmE36/view?usp=sharing">Truyện ngụ ngôn</a></td>
    <td>7</td>
    <td>Đẽo cày giữa đường<br />Ếch ngồi đáy giếng</td>
    <td>6<br />7</td>
    <td>Bài 6: Bài học cuộc sống</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1w7SIdT7UHhThXwI7Gx7BRhry3RyCmE36/view?usp=sharing">Tục ngữ, thành ngữ</a></td>
    <td>7</td>
    <td>Một số câu tục ngữ Việt Nam</td>
    <td>12</td>
    <td>Bài 6: Bài học cuộc sống</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1btpizgcJVF3EMpcd0MrwfbeU0OGhYH2f/view?usp=drive_link">Truyện cười dân gian </a></td>
    <td>8</td>
    <td>Chùm Truyện  cười dân gia Việt Nam ( Lợn cưới, áo mới; Treo biển; Nói dóc gặp nhau)<br />Chùm ca dao trào phúng</td>
    <td>108<br /><br /><br /><br />111</td>
    <td>Bài 5: Những câu chuyện hài</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1kqjpPfnHagNMo81JZYpsgUmOi39mvKiU/view?usp=drive_link">Thần thoại</a></td>
    <td>10</td>
    <td>Truyện về các vị thần sáng tạo thế giới </td>
    <td>11</td>
    <td>Bài 1: Sức hấp dẫn của truyện kể </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/15c9e8q7oUkdJPCL_h2Gw396E67ivDtHb/view?usp=sharing">Sử thi</a></td>
    <td>10</td>
    <td>Héc-to từ biệt Ăng-đrô-mác (trích I-li-át - Homeros)<br />Đăm Săn đi bắt Nữ thần Mặt Trời (Đăm Săn - Sử thi Ê Đê)<br />Rama buộc tội (Ramayana - Va-mi-ki)</td>
    <td>99<br /><br />105<br /><br />112</td>
    <td>Bài 4: Sức sống sử thi</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1Y1non5iSYqpkHgKk4ksOiA9RxGtPq9AN/view?usp=sharing">Chèo. tuồng (Sân khấu dân gian) </a></td>
    <td>10</td>
    <td>Xúy Vân giả dại (trích chèo Kim Nham)<br />Huyện đường (trích  tuồng Nghêu Sò Ốc Hến)</td>
    <td>127<br />132</td>
    <td>Bài 5: Tích trò sân khấu dân gian </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1orZBj7D8Zsp4XBkWRswbitcmLTP6mcFd/view?usp=drive_link">Truyện thơ dân gian</a></td>
    <td>11</td>
    <td>Lời tiễn dặn (Trích Tiễn dặn người yêu - dân tộc Thái) <br />Nàng Ờm nhắn nhủ (Trích Nàng Ờm, chàng Bồng Hương - dân tộc Mường )</td>
    <td>102<br /><br />122</td>
    <td>Bài 4: Tự sự trong truyện thơ dân gian và thơ trữ tình</td>
  </tr>
</tbody>
</table>
        </main>)
}

function KN_CD2(tên_chuyên_đề:any, tài_liệu:any) {
  const [isNext, setIsNext] = useState(false);
  const handleNext = () => { setIsNext(true) }
  return isNext ? (
      <main >

          <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
              <Text strong>{tên_chuyên_đề}</Text>
              <Row gutter={[25, 33]}>
                  {
                      tài_liệu.files.map((t:any) => {
                          return (
                              <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                  <Preview path={tài_liệu.path} {...t} />
                              </Col>
                          )
                      })
                  }
              </Row>
          </div>
      </main>) : (
      <main className="max-w-5xl mx-auto py-16">
          <div className="w-full flex items-end">

              <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                  Tiếp tục
              </button>
              
          </div>
          <table>
          <caption className="caption-top mb-8 font-bold text-3xl"> BẢNG THỐNG KẾ CÁC TÁC PHẨM PHÙ HỢP <br /> 
ĐỂ TỔ CHỨC SÂN KHẤU HÓA <br />
TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG

</caption>
<thead>
  <tr>
    <th>Lớp</th>
    <th>Thể loại </th>
    <th>Văn bản</th>
    <th>Trang </th>
    <th>Ghi chú </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td >6 </td>
    <td><a href="https://drive.google.com/file/d/1s8OqZCj4rNC5vne74_kmFJElHDl5Ui46/view?usp=drive_link">Truyện đồng thoại</a> </td>
    <td>Bài học đường đời đầu tiên (trích Dế Mèn phiêu lưu kí, Tô Hoài)<br />Nếu có một người bạn… (Trích Hoàng tử bé - Ăng-toan đơ Xanh-tơ Ê-xu-pe-ri)<br />Những người bạn.. (Trích Tôi là Bê tô - Nguyễn Nhật Ánh )</td>
    <td>12<br /><br />21<br /><br /><br />34</td>
    <td>Bài 1: Tôi và các bạn</td>
  </tr>
  <tr>
    <td>Truyện ngắn </td>
    <td>Bức tranh của em gái tôi <br />(Tạ Duy Anh )<br />Cô bé bán diêm (An- đéc - xen)<br />Gió lạnh đầu mùa (Thạch Lam)<br /></td>
    <td>48<br />61<br />67</td>
    <td>Bài 2: Gõ cửa trái tim <br />Bài 3: Yêu thương và chia sẻ</td>
  </tr>
  <tr>
    <td>Truyện dài/tiểu thuyết</td>
    <td>Lắc-ki thực sự may mắt (trích Chuyện con mèo dạy hải âu bay, Lu-i Xe-punveda)</td>
    <td>84</td>
    <td>Bài 3: Yêu thương và chia sẻ </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1wU6e2iykQ2EgBlIo3xnvNteB1n4LKyyh/view?usp=sharing">Truyền thuyết</a></td>
    <td>Thánh Gióng<br />Sơn Tinh, Thủy Tinh</td>
    <td> 06<br />10</td>
    <td>Bài 6: Chuyện kể về những anh hùng</td>
  </tr>
  <tr>
    <td >7 </td>
    <td>Truyện ngắn </td>
    <td>Bầy chim chìa vôi (Nguyễn Quang Thiều)</td>
    <td>11</td>
    <td>Bài 1: Bầu trời tuổi thơ</td>
  </tr>
  <tr>
    <td >Truyện dài/tiểu thuyết</td>
    <td>Đi lấy mật (trích Đất rừng phương Nam, Đoàn Giỏi)</td>
    <td>18</td>
    <td>Bài 1: Bầu trời tuổi thơ</td>
  </tr>
  <tr>
    <td>Ngôi nhà trên cây (trích Tốt-tô-chan bên cửa sổ, Cư-rô-ya-na-gi Tê-sư-cô)</td>
    <td>33</td>
    <td>Bài 1: Bầu trời tuổi thơ</td>
  </tr>
  <tr>
    <td>Truyện vừa</td>
    <td>Người thầy đầu tiên (trích, Tri-ghi-dơ Ai-tơ-ma-tốp)</td>
    <td>70</td>
    <td >Bài 3: Cội nguồn yêu thương</td>
  </tr>
  <tr>
    <td>Hồi kí </td>
    <td>Trong lòng mẹ (Những ngày thơ ấu, Nguyên Hồng)</td>
    <td>84</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1w7SIdT7UHhThXwI7Gx7BRhry3RyCmE36/view?usp=sharing">Truyện ngụ ngôn</a></td>
    <td>Đẽo cày giữa đường<br />Ếch ngồi đáy giếng</td>
    <td>6<br />7</td>
    <td>Bài 6: Bài học cuộc sống</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1MOeDDOO40Oe3X-3bG8h9Vu08b5I3jWUp/view?usp=sharing">Truyện viễn tưởng </a></td>
    <td>Cuộc chạm trán trên đại dương (trích Hai vạn dặm dưới biển, Giuyn Véc-nơ)<br />Đường vào vũ trụ (trích Thiên Mã, Hà Thủy Nguyên)<br />Chiếc đũa thần (trích Tinh vân Tiên nữ, Ivan Antonovich Efremov)</td>
    <td>27<br /><br />35<br />51</td>
    <td>Bài 7: Thế giới viễn tưởng</td>
  </tr>
  <tr>
    <td >8</td>
    <td><a href="https://drive.google.com/file/d/1QC9vT-JYRM2X_J2FNwfWTuEBHnbkbajM/view?usp=sharing">Truyện lịch sử</a></td>
    <td>Lá cờ thêu sáu chữ vàng (trích, Nguyễn Huy Tưởng)<br />Quang Trung đại phá quân Thanh (trích Hoàng Lê nhất thống chí, Ngô Gia Văn Phái)<br />Minh sư (trích, Thái Bá Lợi)</td>
    <td>10<br />18<br /><br />35</td>
    <td>Bài 1: Câu chuyện của lịch sử</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1ZGKR0697WfgyNOhWshyfEXpRvwjuYZ16/view?usp=sharing">Hài kịch </a></td>
    <td>Trưởng giả học làm sang (trích, Mô-li-e)</td>
    <td>101</td>
    <td>Bài 5: Những câu chuyện hài</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1btpizgcJVF3EMpcd0MrwfbeU0OGhYH2f/view?usp=drive_link">Truyện cười dân gian</a></td>
    <td>Chùm Truyện  cười dân gian Việt Nam ( Lợn cưới, áo mới; Treo biển; Nói dóc gặp nhau)<br />Chùm ca dao trào phúng</td>
    <td>108<br /><br />111</td>
    <td>Bài 5: Những câu chuyện hài</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1ZGKR0697WfgyNOhWshyfEXpRvwjuYZ16/view?usp=sharing">Truyện cười (viết)</a></td>
    <td>Giá không có ruồi (trích A-dít Ne-xin, Aziz Nesin)</td>
    <td>120</td>
    <td>Bài 5: Những câu chuyện hài</td>
  </tr>
  <tr>
    <td >Truyện ngắn</td>
    <td>Mắt soi (Đa-ni-en Pen-nắc)<br />Lặng lẽ Sa Pa (Nguyễn Thành Long)<br />Chiếc lá cuối cùng (O.Hen-ry)</td>
    <td>5<br />14<br />33<br /></td>
    <td>Bài 6: Chân dung cuộc sống<br /><br /><br /><br /></td>
  </tr>
  <tr>
    <td>Những ngôi sao xa xôi (Nguyễn Minh Khuê)<br />Xe đêm (trích, Konstantin Paustovsky)</td>
    <td>42<br />71</td>
    <td>Bài 7: Tin yêu và ước vọng </td>
  </tr>
  <tr>
    <td >9</td>
    <td><a href="https://drive.google.com/file/d/1ZNYx2SKUVp8faXB62WWrb2FJcX46EY03/view?usp=drive_link">Truyện truyền kì</a></td>
    <td>Chuyện người con gái Nam Xương (Nguyễn Dữ)<br />Dế chọi (Liêu Trai chí dị, Bồ Tùng Lĩnh)<br />Ngọc nữ về tay chân chủ (Thánh Tông di thảo)</td>
    <td>10<br />18<br />36</td>
    <td>Bài 1: Thế giới kì ảo</td>
  </tr>
  <tr>
    <td>Ngâm khúc</td>
    <td>Buổi tiễn đưa (trích Chinh phụ ngâm, Đặng Trần Côn - bản diễn Nôm Đoàn Thị Điểm)<br />Nỗi sầu oán của người cung nữ (trích Cung oán ngâm khúc, Nguyễn Gia Thiều)</td>
    <td>41<br /><br /><br />61</td>
    <td>Bài 2: Những cung bậc tâm trạng </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/187Em6-Zt4ZtR1bWtPoLeDxPCwMA8k-p7/view?usp=sharing">Truyện thơ Nôm</a></td>
    <td>Kim - Kiều gặp gỡ (trích Truyện Kiều, Nguyễn Du)<br />Lục Vân Tiên đánh cướp cứu Kiều Nguyệt Nga (trích Lục Vân Tiên, Nguyễn Đình Chiểu)<br />Kiều ở lầu Ngưng Bích (trích Truyện Kiều, Nguyễn Du)</td>
    <td>67<br /><br />72<br /><br /><br />86</td>
    <td>Bài 3: Hồn nước nằm trong tiếng mẹ cha</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1AEjnR3JgPfvw7IeZokbRbes21LrzQnDv/view?usp=sharing">Bi kịch </a></td>
    <td>Rô-mê-ô và Giu-lí-ét (trích, Uy-li-am Sếch-xpia)<br />Lơ Xít (trích, Coóc-nây)<br />Âm mưu và tình yêu (trích, Giô-han Cơ-rít-xtốp-phơ Phri-đơ-rích Si-lơ)</td>
    <td>119<br />124<br />140</td>
    <td>Bài 5: Đối diện với nỗi đau</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1e0xhTUccNBrY-iOOTUePGpKucqznepXB/view?usp=sharing">Truyện trinh thám</a> </td>
    <td>Ba chàng sinh viên <br />(Athow Cô-nan Đoi-lơ)<br />Bài hát đồng sáu xu (A-ga-tơ Crit-xti)</td>
    <td>7<br />16</td>
    <td>Bài 6: Giải mã những bí mật</td>
  </tr>
  <tr>
    <td >10</td>
    <td><a href="https://drive.google.com/file/d/1ZNYx2SKUVp8faXB62WWrb2FJcX46EY03/view?usp=sharing">Truyện truyền kì </a></td>
    <td>Tản Viên từ Phán sự lục (Nguyễn Dữ) </td>
    <td>15</td>
    <td>Bài 1: Sức hấp dẫn của truyện kể </td>
  </tr>
  <tr>
    <td>Truyện ngắn</td>
    <td>Chữ người tử tù (Nguyễn Tuân)</td>
    <td>21</td>
    <td>Bài 1: Sức hấp dẫn của truyện kể </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1kqjpPfnHagNMo81JZYpsgUmOi39mvKiU/view?usp=drive_link">Thần thoại</a></td>
    <td>Truyện về các vị thần sáng tạo thế giới </td>
    <td>11</td>
    <td>Bài 1: Sức hấp dẫn của truyện kể </td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/15c9e8q7oUkdJPCL_h2Gw396E67ivDtHb/view?usp=sharing">Sử thi</a></td>
    <td>Héc-to từ biệt Ăng-đrô-mác (trích I-li-át - Homeros)<br />Đăm Săn đi bắt Nữ thần Mặt Trời (Đăm Săn - Sử thi Ê Đê)<br />Rama buộc tội (Ramayana - Va-mi-ki)</td>
    <td>99<br /><br />105<br />112</td>
    <td>Bài 4: Sức sống sử thi</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1Y1non5iSYqpkHgKk4ksOiA9RxGtPq9AN/view?usp=sharing">Chèo. tuồng (Sân khấu dân gian) </a></td>
    <td>Xúy Vân giả dại (trích chèo Kim Nham)<br />Huyện đường (trích  tuồng Nghêu Sò Ốc Hến)</td>
    <td>127<br />132</td>
    <td>Bài 5: Tích trò sân khấu dân gian </td>
  </tr>
  <tr>
    <td>Tiểu thuyết </td>
    <td>Người cầm quyền khôi phục uy quyền (trích Những người khốn khổ, Victor Hugo) </td>
    <td>39</td>
    <td>Bài 7: Quyền năng của người kể chuyện</td>
  </tr>
  <tr>
    <td>Truyện ngắn </td>
    <td>Dưới bóng hoàng lan (Thạch Lam)<br />Một chuyện đùa nho nhỏ (Anton Chekhov)</td>
    <td>46<br />53</td>
    <td>Bài 7: Quyền năng của người kể chuyện</td>
  </tr>
  <tr>
    <td >11</td>
    <td><a href="https://drive.google.com/file/d/1fhJpefc8gONmSUTEL3QZNJ4qvs3lJvfm/view?usp=drive_link">Truyện ngắn/ truyện ngắn hiện đại</a></td>
    <td>Vợ nhặt (trích, Kim Lân)<br />Chí phèo (Nam cao)<br />Cải ơi (Nguyễn Ngọc Tư)</td>
    <td>12<br />23<br />48)</td>
    <td>Bài 1: Câu chuyện và điểm nhìn trong truyện kể</td>
  </tr>
  <tr>
    <td ><a href="https://drive.google.com/file/d/1lwmqN_bbmKAp5FYTMIvKfyBygi2glP2y/view?usp=sharing">Bi kịch </a></td>
    <td>Sống, hay không sống - đó là vấn đề (William Shakespeare)</td>
    <td>126</td>
    <td >Bài 5: Nhân vật và xung đột trong bi kịch </td>
  </tr>
  <tr>
    <td>Vĩnh biệt Cửu Trùng Đài (Vũ Như Tô, Nguyễn Huy Tưởng)</td>
    <td>132</td>
  </tr>
  <tr>
    <td>Pro-me-te bị xích (Esin - Eschyle)</td>
    <td>152</td>
  </tr>
  <tr>
    <td><a href="https://drive.google.com/file/d/1W5MVMl2jnoHU_jenmeCeKgRqwXffm_KX/view?usp=sharing">Truyện thơ Nôm</a></td>
    <td>Trao duyên  (trích Truyện Kiều, Nguyễn Du)<br />Chí khí anh hùng (trích Truyện Kiều, Nguyễn Du)</td>
    <td>14<br />29</td>
    <td>Bài 6: Nguyễn Du - Những điều trông thấy mà đau đớn lòng</td>
  </tr>
  <tr>
    <td >12</td>
    <td ><br /><a href="https://drive.google.com/file/d/10EdK2ALXl7WUlv993WNzzvTCvPlxPHH-/view?usp=sharing">Tiểu thuyết</a></td>
    <td>Xuân Tóc đỏ cứu quốc (trích Số đỏ - Vũ Trọng Phụng)</td>
    <td>11</td>
    <td >Bài 1: Khả năng lớn lao của tiểu thuyết </td>
  </tr>
  <tr>
    <td>Nỗi buồn chiến tranh (trích Bảo Ninh) </td>
    <td>19</td>
  </tr>
  <tr>
    <td>Muối của rừng (trích, Nguyễn Huy Thiệp) </td>
    <td>106</td>
    <td >Bài 4: Yếu tố kỳ ảo trong truyện kể</td>
  </tr>
  <tr>
    <td>Bến trần gian (thuộc tập truyện ngắn Mưa sâm cầm, Lưu Minh Sơn)</td>
    <td>124</td>
  </tr>
  <tr>
    <td ><a href="https://drive.google.com/file/d/1S0Mm9W01zfk7n8WqXRsJT4Xe59Eek6Fx/view?usp=sharing">Hài kịch </a></td>
    <td>Nhân vật quan trọng (Trích Quan thanh tra - Nikolai Gogol)</td>
    <td>132</td>
    <td >Bài 5: Tiếng cười của hài kịch </td>
  </tr>
  <tr>
    <td>Dấu của (Trích Quẫn - Luận Chương)</td>
    <td>140</td>
  </tr>
  <tr>
    <td>Cẩn thận bão (Trích Thợ cạo thành Xê-vin, Bô-mác-xe)</td>
    <td>153</td>
  </tr>
  <tr>
    <td>Chính kịch </td>
    <td>Hồn Trương Ba, da hàng thịt (trích, Lưu Quang Vũ)</td>
    <td>102</td>
    <td>Bài 9: Văn học và cuộc đời</td>
  </tr>
</tbody>
</table>
      </main>)
}

function KN_CD3(tên_chuyên_đề:any, tài_liệu:any) {
  const [isNext, setIsNext] = useState(false);
  const handleNext = () => { setIsNext(true) }
  return isNext ? (
      <main >

          <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
              <Text strong>{tên_chuyên_đề}</Text>
              <Row gutter={[25, 33]}>
                  {
                      tài_liệu.files.map((t:any) => {
                          return (
                              <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                  <Preview path={tài_liệu.path} {...t} />
                              </Col>
                          )
                      })
                  }
              </Row>
          </div>
      </main>) : (
      <main className="max-w-5xl mx-auto py-16">
          <div className="w-full flex items-end">

              <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                  Tiếp tục
              </button>
              
          </div>
<table>
<caption className="caption-top mb-8 font-bold text-3xl">
                BẢNG THỐNG KẾ CÁC TẬP THƠ/TRUYỆN NGẮN/TIỂU THUYẾT <br />
TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG <br />
<span className="font-normal text-base">Lưu ý: Chúng tôi đã cố gắng để thống kê được đầy đủ, tuy nhiên sẽ không tránh khỏi những thiếu sót. <br/>Bảng thống kê chỉ mang tính tham khảo.</span> 
</caption>
<thead>
  <tr>
    <th>Lớp </th>
    <th>Tên tác phẩm/Đoạn trích được học </th>
    <th>Tên tập thơ/Tập truyện ngắn/Tiểu thuyết và tác giả</th>
    <th>Trang </th>
    <th>Ghi chú </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td >6</td>
    <td>Bài học đường đời đầu tiên<br /> </td>
    <td>Tiểu thuyết: Dế Mèn phiêu lưu kí (Tô Hoài)</td>
    <td>12</td>
    <td >Bài 1: Tôi và các bạn</td>
  </tr>
  <tr>
    <td>Nếu có một người bạn…</td>
    <td>Tiểu thuyết: Hoàng tử bé (Ăng-toan đơ Xanh-tơ Ê-xu-pe-ri)</td>
    <td>21</td>
  </tr>
  <tr>
    <td>Bắt nạt</td>
    <td>Tập thơ: Ta vườn nhặt nắng (Nguyễn Thế Hoàng Linh)</td>
    <td>28</td>
  </tr>
  <tr>
    <td>Những người bạn.. </td>
    <td>Tiểu thuyết: Tôi là Bê tô - Nguyễn Nhật Ánh </td>
    <td>34</td>
  </tr>
  <tr>
    <td>Chuyện cổ tích về loài người </td>
    <td>Tập thơ: Lời ru trên mặt đất (Xuân Quỳnh)</td>
    <td>40</td>
    <td >Bài 2: Gõ cửa trái tim</td>
  </tr>
  <tr>
    <td>Mây và sóng</td>
    <td>Tập thơ: Trăng non (R.Ta-go)</td>
    <td>46</td>
  </tr>
  <tr>
    <td>Bức tranh của em gái tôi</td>
    <td>Tập truyện ngắn: Bản nhạc của con đà điểu (Tạ Duy Anh)</td>
    <td>51</td>
  </tr>
  <tr>
    <td>Những cánh buồm</td>
    <td>Tập thơ: Những cánh buồm (Hoàng Trung Thông)</td>
    <td>57</td>
  </tr>
  <tr>
    <td>Gió lạnh đầu mùa </td>
    <td>Tập truyện: Gió đầu mùa (Thạch Lam)</td>
    <td>73</td>
    <td >Bài 3: Yêu thương và chia sẻ</td>
  </tr>
  <tr>
    <td>Con chào mào</td>
    <td>Tập thơ: Bầu trời không mái che (Mai Văn Phấn)</td>
    <td>75</td>
  </tr>
  <tr>
    <td>Lắc-ki thật sự may mắn</td>
    <td>Tiểu thuyết: Chuyện con mèo dạy hải âu bay (Luis Sepúlveda)</td>
    <td>84</td>
  </tr>
  <tr>
    <td>7</td>
    <td>Bầy chim chìa vôi</td>
    <td>Tập truyện ngắn Mùa hoa cải bên sông (Nguyễn Quang Thiều)</td>
    <td>11</td>
    <td >Bài 1: Bầu trời tuổi thơ</td>
  </tr>
  <tr>
    <td>Đi lấy mật </td>
    <td>Tiểu thuyết: Đất rừng phương Nam (Đoàn Giỏi)</td>
    <td>18</td>
  </tr>
  <tr>
    <td>Ngôi nhà trên cây</td>
    <td>Tiểu thuyết: Tốt-tô-chan bên cửa sổ, (Cư-rô-ya-na-gi Tê-sư-cô)</td>
    <td>33</td>
  </tr>
  <tr>
    <td>Đồng dao mùa xuân</td>
    <td>Tập thơ: Thơ Nguyễn Khoa Điềm, Tuyển tập 40 năm do tác giả chọn, NXB Văn học, Hà Nội</td>
    <td>40</td>
    <td >Bài 2: Khúc nhạc tâm hồn</td>
  </tr>
  <tr>
    <td>Gặp lá cơm nếp</td>
    <td>Tập thơ: Dấu chân qua trảng cỏ (Thanh Thảo)</td>
    <td>43</td>
  </tr>
  <tr>
    <td>Chiều sông Thương </td>
    <td>Tập thơ: Tiếng hát trong rừng (Hữu Thỉnh)</td>
    <td>56</td>
  </tr>
  <tr>
    <td>Vừa nhắm mắt vừa mở cửa sổ</td>
    <td>Tập truyện ngắn: Vừa nhắm mắt vừa mở cửa sổ (Nguyễn Ngọc Thuần)</td>
    <td>63</td>
    <td >Bài 3: Cội nguồn yêu thương </td>
  </tr>
  <tr>
    <td>Người thầy đầu tiên </td>
    <td>Tiểu thuyết: Jaymilya - Truyện đồi núi và thảo nguyên (Tri-ghi-dơ Ai-tơ-ma-tốp)</td>
    <td>70</td>
  </tr>
  <tr>
    <td>Trong lòng mẹ</td>
    <td>Tiểu thuyết/Hồi kí: Những ngày thơ ấu (Nguyên Hồng)</td>
    <td>84</td>
  </tr>
  <tr>
    <td>Gò me</td>
    <td>Tập thơ: Từ nhớ đến thương (Hoàng Tố Nguyên)</td>
    <td>96</td>
    <td >Bài 4: Giai điệu đất nước</td>
  </tr>
  <tr>
    <td>Chiều biên giới </td>
    <td>Tập thơ: Tuyển tập thơ Lò Ngân Sủn</td>
    <td>104</td>
  </tr>
  <tr>
    <td>Cuộc chạm trán trên đại dương</td>
    <td> Tiểu thuyết: Hai vạn dặm dưới biển, Giuyn Véc-nơ</td>
    <td>27<br /><br /></td>
    <td >Bài 7: Thế giới viễn tưởng</td>
  </tr>
  <tr>
    <td>Đường vào vũ trụ</td>
    <td>Tiểu thuyết: Thiên Mã  (Hà Thủy Nguyên)</td>
    <td>35</td>
  </tr>
  <tr>
    <td>Chiếc đũa thần </td>
    <td>Tinh vân Tiên nữ (Ivan Antonovich Efremov)</td>
    <td>51</td>
    <td></td>
  </tr>
  <tr>
    <td >8</td>
    <td>Lặng lẽ Sa Pa</td>
    <td>Tập truyện ngắn: Giữa trong xanh (Nguyễn Thành Long)</td>
    <td>15</td>
    <td>Bài 6: Chân dung cuộc sống</td>
  </tr>
  <tr>
    <td>Bếp lửa </td>
    <td>Tập thơ: Hương cây - bếp lửa (Bằng Việt)</td>
    <td>25</td>
    <td ><br />Bài 7: Tin yêu và ước vọng</td>
  </tr>
  <tr>
    <td>Đồng chí</td>
    <td>Tập thơ: Đầu súng trăng treo (Chính Hữu)</td>
    <td>38</td>
  </tr>
  <tr>
    <td>Bài thơ về tiểu đội xe không kính </td>
    <td>Tập thơ: Vầng trăng quầng lửa (Phạm Tiến Duật)</td>
    <td>58</td>
  </tr>
  <tr>
    <td >9</td>
    <td>Ba chàng sinh viên </td>
    <td>Tập truyện ngắn: Sự trở về của Sơ - lốc Hôm  (Athow Cô-nan Đoi-lơ)</td>
    <td>14</td>
    <td >Bài 6: Giải mã những bí mật </td>
  </tr>
  <tr>
    <td>Bài hát đồng sáu xu </td>
    <td>Tập truyện ngắn: Bí mật của Lít-tơ-đeo/Nhân chứng buộc tội (A-ga-tơ Crit-xti)</td>
    <td>23</td>
  </tr>
  <tr>
    <td>Tiếng Việt </td>
    <td>Tập thơ: Mây trắng của đời tôi (Lưu Quang Vũ)</td>
    <td>49</td>
    <td >Bài 7: Hồn thơ muôn điệu</td>
  </tr>
  <tr>
    <td>Mưa xuân </td>
    <td>Tập thơ: Lỡ bước sang ngang (Nguyễn Bính)</td>
    <td>51</td>
  </tr>
  <tr>
    <td>Miền quê</td>
    <td>Tập thơ: Thơ Nguyễn Khoa Điềm, Tuyển tập 40 năm do tác giả chọn, NXB Văn học, Hà Nội</td>
    <td>65</td>
  </tr>
  <tr>
    <td >10</td>
    <td>Chữ người tử từ</td>
    <td>Tập truyện ngắn: Vang bóng một thời (Nguyễn Tuân)</td>
    <td>21</td>
    <td>Bài 1: Sức hấp dẫn của truyện kể</td>
  </tr>
  <tr>
    <td>Mùa xuân chín</td>
    <td>Tập thơ: Đau thương (Hàn Mặc Tử)</td>
    <td>50</td>
    <td>Bài 2: Vẻ đẹp của thơ ca</td>
  </tr>
  <tr>
    <td>Bảo kính cảnh giới<br />Ngôn chí </td>
    <td>Tập thơ: Quốc âm thi tập (Nguyễn Trãi)<br /></td>
    <td>23<br />34</td>
    <td >Bài 6: Nguyễn Trãi - “Dành còn để trợ dân này”</td>
  </tr>
  <tr>
    <td>Dục Thúy Sơn </td>
    <td>Tập thơ: Ức Trai thi tập (Nguyễn Trãi)</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Dưới bóng hoàng lan (Thạch Lam)<br /><br /></td>
    <td>Tập truyện ngắn: Tuyển tập Thạch Lam, NXB Văn học, Hà Nội (1988)</td>
    <td>51</td>
    <td ><br />Bài 7: Quyền năng của người kể chuyện</td>
  </tr>
  <tr>
    <td>Một chuyện đùa nho nhỏ (Anton Chekhov)</td>
    <td>Tập truyện ngắn: Anton Chekhov, Truyện ngắn Sê - khốp, NXB Cầu Vồng, Moskva, 1988</td>
    <td></td>
  </tr>
  <tr>
    <td>Người cầm quyền khôi phục uy quyền (trích Những người khốn khổ, Victor Hugo) </td>
    <td>Tiểu thuyết: Những người khốn khổ (Victor Hugo)</td>
    <td>39</td>
  </tr>
  <tr>
    <td>Con khướu sổ lồng (Nguyễn Quang Sáng)</td>
    <td>Tập truyện ngắn: Con mèo của Phu-gi-ta, Nguyễn Quang Sáng</td>
    <td>72</td>
  </tr>
  <tr>
    <td >11</td>
    <td>Vợ nhặt </td>
    <td>Tập truyện ngắn: Con chó xấu xí ( Kim Lân)</td>
    <td>12<br /></td>
    <td >Bài 1: Câu chuyện và điểm nhìn trong truyện kể</td>
  </tr>
  <tr>
    <td>Chí phèo</td>
    <td>Tập truyện ngắn: Chí Phèo (Nam Cao)</td>
    <td>23</td>
  </tr>
  <tr>
    <td>Cải ơi </td>
    <td>Tập truyện ngắn: Cánh đồng bất tận (Nguyễn Ngọc Tư)</td>
    <td>48</td>
  </tr>
  <tr>
    <td>Nhớ đồng</td>
    <td>Tập thơ: Từ ấy (Tố Hữu)</td>
    <td>56</td>
    <td >Bài 2: Cấu tứ và hình ảnh trong thơ trữ tình</td>
  </tr>
  <tr>
    <td>Tràng giang</td>
    <td>Tập thơ: Lửa Thiêng (Huy Cận)</td>
    <td>59</td>
  </tr>
  <tr>
    <td>Thời gian </td>
    <td>Tập thơ: Tuyển tập Văn Cao - Thơ (Văn Cao)</td>
    <td>74</td>
  </tr>
  <tr>
    <td>Thuyền và biển</td>
    <td>Tập thơ: Không bao giờ là cuối (Xuân Quỳnh)</td>
    <td>110</td>
    <td>Bài 3: Tự sự trong truyện thơ dân gian và trong thơ trữ tình</td>
  </tr>
  <tr>
    <td >12</td>
    <td>Xuân Tóc đỏ cứu quốc </td>
    <td>Tiểu thuyết: Số đỏ - Vũ Trọng Phụng)</td>
    <td>11</td>
    <td>Bài 1: Khả năng lớn lao của tiểu thuyết </td>
  </tr>
  <tr>
    <td>Nỗi buồn chiến tranh </td>
    <td>Tiểu thuyết: Nỗi buồn chiến tranh - Nguyễn Huy Thiệp</td>
    <td>19</td>
    <td></td>
  </tr>
  <tr>
    <td>Muối của rừng (trích Nguyễn Huy Thiệp) </td>
    <td>Tập truyện ngắn Nguyễn Huy Thiệp</td>
    <td>106</td>
    <td>Bài 4: Yếu tố kỳ ảo trong truyện kể</td>
  </tr>
  <tr>
    <td>Bến trần gian </td>
    <td> Tập truyện ngắn Mưa sâm cầm, Lưu Minh Sơn)</td>
    <td>124</td>
    <td >Bài 4: Yếu tố kỳ ảo trong truyện kể</td>
  </tr>
  <tr>
    <td>Tây Tiến - Bài 2 những thế giới thơ</td>
    <td> Tuyển tập Quang Dũng, nhà xuất bản Văn học, Hà Nội, 1999  </td>
    <td> 45</td>
  </tr>
  <tr>
    <td>Đàn Ghita Của Lorca</td>
    <td>Tập thơ: Khối vuông ru-bích(Thanh Thảo)</td>
    <td>48</td>
  </tr>
  <tr>
    <td>Mộ </td>
    <td >Tập thơ: Nhật kí trong tù - (Hồ Chí Minh)</td>
    <td>18</td>
    <td >Bài 6: Văn hóa phải soi đường cho quốc dân đi</td>
  </tr>
  <tr>
    <td>Vọng nguyệt </td>
    <td>37</td>
  </tr>
  <tr>
    <td>Vội vàng </td>
    <td>Tập thơ Thơ thơ  (Xuân Diệu)</td>
    <td>93</td>
    <td >Bài 9: Văn học và cuộc đời</td>
  </tr>
  <tr>
    <td>Trở về </td>
    <td>Tiểu thuyết: Ông già và biển cả  (Ernest Hemingway) </td>
    <td>96</td>
  </tr>
</tbody>
</table>
      </main>)
}


function X(tên_chuyên_đề:any, tài_liệu:any) {
    const [isNext, setIsNext] = useState(false);
    const handleNext = () => { setIsNext(true) }
    return isNext ? (
        <main >

            <div className="max-w-5xl w-fit mx-auto flex flex-col items-center gap-5">
                <Text strong>{tên_chuyên_đề}</Text>
                <Row gutter={[25, 33]}>
                    {
                        tài_liệu.files.map((t:any) => {
                            return (
                                <Col key={t.name} xs={{ span: 24 }} lg={{ span: 12 }}>
                                    <Preview path={tài_liệu.path} {...t} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </main>) : (
        <main className="max-w-5xl mx-auto py-16">
            <div className="w-full flex items-end">

                <button className="float-right text-white font-bold rounded-lg hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-xl my-6 font-mainfont px-8 py-2" onClick={handleNext}>
                    Tiếp tục
                </button>
                
            </div>
            <caption className="caption-top mb-8 font-bold text-3xl"> BẢNG THỐNG KẾ CÁC TÁC PHẨM PHÙ HỢP <br /> 
ĐỂ TỔ CHỨC SÂN KHẤU HÓA <br />
TỪ LỚP 6 ĐẾN LỚP 12 BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG

</caption>
        </main>)
}

function Preview({
    name,
    type,
    path
}: AssetInfo & {
    path: string
}): React.ReactNode {
    const pathName = usePathname();
    const [readingProgress, setReadingProgress] = React.useState(0);
    useEffect(() => {
        const uri = `users/learn/getLearn`
        const link = `/${path}/${name}`
        console.log("link", link)
        Fetcher.get<any, any>(uri, { params: { "link": link } }).then((response) => {
            console.log("getHere", response)
            setReadingProgress(response.Score)
        }).catch((error) => {

        });
    }, [name, path])
    return (
        <Link href={`${pathName}/${name}`}>
            <div className="text-base font-medium bg-white rounded-lg flex flex-col gap-y-4 items-center h-full w-full p-4 min-w-[450px]
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
                                            <Image src={PlayVideoImg} alt={""} width={50} className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 group-hover/card:opacity-0 transition-opacity duration-300 ease-in-out" />
                                        </>
                                    )
                            }
                        })()
                    }
                </div>
                {readingProgress * 10 == 100 ? (


                    <div> Đã hoàn thành </div>


                ) :
                    (
                        readingProgress * 10 == 0 ? (<div> Chưa đọc </div>) :
                            (<div className="w-full z-[1000] bg-green">
                                Tiến độ hoàn thành: 
                                <div
                                    className="relative rounded-lg h-[6px] bg-gray-400"
                                    style={{
                                        width: `100%`,
                                    }}
                                >
                                  <div
                                    className="absolute top-0 left-0 rounded-lg h-[6px] bg-gradient-to-r from-[#90D26D] to-[#2C7865]"
                                    style={{
                                        width: `${readingProgress * 10}%`,
                                    }}
                                />
                                </div>
                                

                            </div>
                            
                            ))
                }
                {/* <Text strong className="text-2xl mx-4 mb-4 group-hover/card:text-blue-300">{name.substring(0, name.lastIndexOf('.'))}</Text> */}
            </div>
        </Link>
    )
}
