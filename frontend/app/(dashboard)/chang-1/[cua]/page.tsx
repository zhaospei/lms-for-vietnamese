'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "@/types/PageProps";
import { Col, Row, Typography } from "antd";
import { nameToSlug, slugToName } from "@/utils/searchParams";
import { cacChuyenDe, ThongTinChuyenDe, chuyenDeSlug2Name } from "./[chuyende]/page";
import Image from "next/image";

const {Text} = Typography;

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
    return (
        <main className="min-h-screen">
            <div className="flex flex-col items-center gap-10">
                <Text strong className='text-xl p-3 bg-light-primary rounded-xl w-fit'>
                    {slugToName(doorSlugName, cua as DoorSlug)}
                </Text>
                <div className="w-[70vw]">
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
                        text-dark-primary font-[700] text-xl flex items-center justify-center">
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
export type DoorName = 'Tri thức nền tảng' | 'Gợi mở' | 'Tài liệu tham khảo' | 'Bài mẫu';
export type DoorSlug = 'tri-thuc-nen-tang' | 'goi-mo' | 'tai-lieu-tham-khao' | 'bai-mau';
export const DEFAULT_DOOR_SLUG: DoorSlug = 'tri-thuc-nen-tang';
export const doorSlugName: Record<DoorSlug, DoorName> = {
    'tri-thuc-nen-tang': 'Tri thức nền tảng',
    'goi-mo': 'Gợi mở',
    'tai-lieu-tham-khao': 'Tài liệu tham khảo',
    'bai-mau': 'Bài mẫu'
};


