'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "@/types/PageProps";
import { Col, Row, Typography } from "antd";
import { nameToSlug, slugToName } from "@/utils/searchParams";
import { cacChuyenDe, ThongTinChuyenDe, chuyenDeSlug2Name } from "@/types/slug";
import Image from "next/image";
import { DoorSlug, doorSlugName, DEFAULT_DOOR_SLUG } from "@/types/slug";

const {Text} = Typography;

import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';
import Chang2 from '@/public/images/background/chang2.png'
import Chang1Bg from '@/public/images/home_main.png'
import { TenBoSach, bookIdList } from "@/components/common/ChooseBook";
import { boSachActions } from "@/redux/bosach/bosachSlice";
import { Breadcrumb, Space } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { ChuyenDeSlug } from "@/types/slug";
import Link from 'next/link';
import { Cửa } from '@/types/slug';
import { useSelector } from 'react-redux';
import { boSachSelector } from '@/redux/bosach/bosachSelector';
import { isUndefined } from 'lodash';

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

export interface Chang1CuaPageParams extends SearchParams {
    cua: DoorSlug
}

export default function Chang1CuaPage({
    params: {
        cua
    }
}: {
    params: {
        cua: string
    }
}) {
    const router = useRouter();
    // console.log(cua)
    if (!(cua in doorSlugName)) {
        router.replace(`/chang-1/${DEFAULT_DOOR_SLUG}`);
        return <></>
    }

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
            path: chuyendeSlug
        })
    }
    
    return (
        <main className="min-h-screen md:w-[70vw] mx-auto">
            <Breadcrumb itemRender={itemRender} items={items} className="mt-8"/>
            <div className="flex flex-col items-center gap-10">
                
                <Text strong className='mt-4 text-xl p-4 font-extrabold text-3xl bg-light-primary rounded-xl w-fit'>
                    {slugToName(doorSlugName, cua as DoorSlug)}
                </Text>
                <div className="w-full">
                    <Row gutter={[25, 33]}>
                        {
                            cacChuyenDe.map((chuyende, i) => {
                                return (
                                    <Col key={i} lg={{ span: 8 }} xs={{ span: 24 }} className="flex" flex={1}>
                                        <div className="flex-1"><Chuyende {...chuyende} cua={cua} /></div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        </main>
    );
}

function Chuyende({
    img,
    id: id,
    ten: ten,
    mota,
    cua
}: ThongTinChuyenDe & {
    cua: string
}) {
    return (
        <a className="bg-white flex flex-col items-center h-full
                rounded-lg p-10
                border-2 relative top-0
                transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[103%]"
            // style={{ "border": "2px solid #f5f6fa" }}
            href={`/chang-1/${cua}/${nameToSlug(chuyenDeSlug2Name, ten)}`}
        >
            <div className="absolute z-10 -top-[11px] flex items-start justify-center">
                <div className="w-[194px] h-[11px] bg-primary rounded-t-[10px] relative z-10"/>
                <div className="w-[164px] h-[41px] bg-primary rounded-b-[30px] absolute z-20
                        text-white font-[700] text-xl flex items-center justify-center">
                    {`Chuyên đề ${id}`}
                </div>
            </div>
            <Image src={img} alt={ten} className="my-5"/>
            <div className="text-center">
                <h3 className="font-bold text-2xl mt-8 ">{ten}</h3>
                <p className="font-medium mt-4 text-gray-500">
                    {mota}
                </p>
            </div>
        </a>
    )
}

