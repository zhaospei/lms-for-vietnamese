'use client'
import { Modal, Space, Typography } from 'antd'
import Image from 'next/image';
import React, { useState } from 'react'
import CanhDieu from '@/public/images/logo-sachcanhdieu.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import MyButtonWrapper from './(MyButton)/MyButtonWrapper';
import { THEME } from '@/styles/theme';
import SuccessIcon from './(Icons)/SuccessIcon';
import SelectedIcon from './(Icons)/SelectedIcon';
import { FcOk } from "react-icons/fc";
import { boSachActions } from '@/redux/bosach/bosachSlice';
import { useDispatch, useSelector } from 'react-redux';
import { boSachSelector } from '@/redux/bosach/bosachSelector';


const { Text, Title } = Typography;

const books: BookInfo[] = [{
    img: CanhDieu,
    name: 'Bộ cánh diều',
    id: 'Cánh diều'
}, {
    img: CanhDieu,
    name: 'Bộ kết nối tri thức với cuộc sống',
    id: 'Kết nối tri thức'
}, {
    img: CanhDieu,
    name: 'Bộ Chân trời sáng tạo',
    id: 'Chân trời sáng tạo'
}]

export default function ChooseBook({
    open,
    setOpenBook,
    children,
}: {
    open: boolean,
    setOpenBook: (open: boolean) => void,
    children?: React.ReactNode
}) {
    const choosenBook: TenBoSach = useSelector(boSachSelector.selectChoice) || 'Cánh diều';
    const dispatch = useDispatch();
    return (
        <Modal
            open={open}
            onCancel={() => {
                dispatch(boSachActions.updateChoice(choosenBook));
                setOpenBook(false);
            }}
            footer={[
            ]}
            className='!w-[60vw]'
        >
            <Space direction='vertical' align='center'>
                <Title level={3}>Lựa chọn bộ sách</Title>
                <div className="flex gap-5">
                {
                    books.map((book) => (
                        <div key={book.id}>
                            <Box {...book} onClick={onClick} isChoosen={choosenBook === book.id}/>
                        </div>
                    ))
                }
                </div>
            </Space>
        </Modal>
    )
    function onClick(id: TenBoSach) {
        dispatch(boSachActions.updateChoice(id));
        setOpenBook(false);
    }
}

function Box({
    img,
    name,
    id,
    isChoosen = false,
    onClick
}: BookInfo & {
    isChoosen?: boolean,
    onClick: (id: TenBoSach) => void
}) {
    // return (
    //     <button
    //         className="flex flex-col gap-2 items-center justify-center relative bg-[rgb(242,245,247)] rounded-xl border-[3px] pb-2"
    //         onClick={() => onClick(id)}

    //         style={
    //             isChoosen ? {
    //                 borderColor: THEME.PRIMARY_COLOR

    //             } : {
    //                 opacity: 0.7
    //             }
    //         }
    //     >
    //         <div className="px-10"><Image src={img} alt={name}/></div>
    //         <div className='border border-gray-300 w-full'/>
    //         <div className='text-left px-2 w-full flex'>
    //             <Text strong >{name}</Text>
    //             {isChoosen && <FcOk size={'10%'} className='ml-auto'/>}
    //         </div>
    //     </button>
    // )
    return (
        <button className="flex flex-col gap-5 items-center justify-center relative text-center" onClick={() => onClick(id)}>
            <div
                className={`bg-[rgb(242,245,247)] rounded-xl px-10 border-[3px] hover:border-light-primary`}
                style={
                    isChoosen ? {
                        borderColor: THEME.PRIMARY_COLOR

                    } : {
                        opacity: 0.7
                    }
                }
            >
                <Image src={img} alt={name} ></Image>
            </div>
            {isChoosen && <FcOk className='absolute top-0 right-0 translate-x-[45%] -translate-y-[40%]' size={'10%'} />}
            <Text strong >{name}</Text>
        </button>
    )
}

export type TenBoSach = 'Cánh diều' | 'Kết nối tri thức' | 'Chân trời sáng tạo';
export const bookIdList: TenBoSach[] = ['Cánh diều', 'Kết nối tri thức', 'Chân trời sáng tạo'];
export type TenBoSachSlug = 'canh-dieu' | 'ket-noi-tri-thuc' | 'chan-troi-sang-tao';
export const boSachSlug2Name: Record<TenBoSachSlug, TenBoSach> = {
    'canh-dieu': 'Cánh diều',
    'chan-troi-sang-tao': 'Chân trời sáng tạo',
    'ket-noi-tri-thuc': 'Kết nối tri thức'
};

interface BookInfo {
    img: StaticImport,
    name: string,
    id: TenBoSach
}


