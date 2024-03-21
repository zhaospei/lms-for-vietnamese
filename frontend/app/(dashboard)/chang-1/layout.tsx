'use client'

import { TenBoSach, bookIdList } from "@/components/common/ChooseBook";
import { boSachSelector } from "@/redux/bosach/bosachSelector";
import { boSachActions } from "@/redux/bosach/bosachSlice";
import { Breadcrumb, Space, Typography } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { Cửa } from "./page";
import { DEFAULT_DOOR_SLUG, DoorSlug, doorSlugName } from './[cua]/page';
import { usePathname, useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import Link from "next/link";
import { slugToName } from "@/utils/searchParams";
import { ChuyenDeSlug, chuyenDeSlug2Name } from "./[cua]/[chuyende]/page";

const { Text } = Typography;

export default function Chang1Layout({
    children
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
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
        menu: {
            items: menuBoSach
        }
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
        <Space direction='vertical' className="w-full p-5">
            <Breadcrumb itemRender={itemRender} items={items} />
            {children}
        </Space>
    );
}

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
