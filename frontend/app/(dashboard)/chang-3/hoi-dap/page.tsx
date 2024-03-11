'use client';
import React, { use, useEffect, useMemo, useState } from 'react';
import { LikeOutlined, DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography, Progress, Avatar, DatePicker, DatePickerProps, List, Space } from 'antd';
import Image from 'next/image';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
import TitleWithBox from "@/components/common/TitleWithBox";
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useRouter, useSearchParams } from 'next/navigation';
import { DocumentClass } from '@/types/document';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import EditableText from '@/components/common/EditableText';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { authSelector } from '@/redux/auth/authSelector';
import { PageProps } from '@/types/PageProps';
import DocumentImage from '@/components/common/DocumentImage';
import { getExtOfFile } from '@/utils/getExtOfFile';
import Link from 'next/link';
import { getURL } from '@/utils/navigation';
import LikeIcon from '@/components/common/(Icons)/LikeIcon';
import DownloadIcon from '@/components/common/(Icons)/DownloadIcon';
import { useDebouncedCallback } from 'use-debounce';
import search from '@/utils/search';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import Editor from '@/components/common/Editor/Editor';
const { Paragraph, Text, Title } = Typography;
import MessageIcon from '@/components/common/(Icons)/MessageIcon';
import EditIcon from '@/components/common/(Icons)/EditIcon';
import UserUpload from "@/components/common/UserUpload";
import { FaPlus } from "react-icons/fa6";
import {CauHoiType} from '@/types/cauhoi';
import ClipLoader from "react-spinners/ClipLoader";
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';

const cookies = new Cookies();
export default function Profile() {

//   const searchParams = useSearchParams();
  const authState = useSelector(authSelector);
  const [data, setData] = useState<CauHoiType[]>();
  const [isOpen, setOpen] = useState(false);
  const [otherAvt, setOtherAvt] = useState('')
  const [inputReply, setReply] = useState("");
  const [isSending, setIsSending] = useState(-1);
  const [inputTitle, setTitle] = useState("");
  const [newState, setNewState] = useState(0);

  const toggleOpen = () => setOpen(!isOpen);

  async function onSubmit() {
    
    setIsSending(0)

    Fetcher.post<any, any>('document/createDocument', {
      "name": inputTitle,
      "content": inputReply,
    //   "pageType": pageType,
    //   "pageId": pageId,
    //   "parentId": 0,
    //   "preCommentId": 0
    }).then((response : any) => {
      console.log(response)
      if (response.message === "Comment successfully created") {
        // router.reload();
        // setReply('')
        setIsSending(1)
        toggleOpen()
        setNewState(response.CommentId) 
      }
    //   console.log(response)
    }).catch((error) => {
    //   console.log(error)
    })
  }

  useEffect(() => {
    // if (offsetNow === 0) return
    // console.log("cc", offsetNow, pageId, pageType)
    // console.log("offsetNow", offsetNow)
    const uri = `document/getDocumentOfSubject`
    Fetcher.get<any, CauHoiType[]>(uri, { params: { "subjectId": 1 }}).then((response) => {
        console.log(response)
        // console.log("data", data)
        console.log(response.length)
        // for (let i = 0; i < response.length; i++) {
        //     setData((oldData) => [...(oldData ?? []), response[i]])
        // }
        // console.log("new aeppend data", data)
        setData(response?? [])
        // console.log("data", data)
    }).catch((error) => {

    });
  }, [])

  useEffect(() => {
    // console.log("This state", newState)
    if (newState === 0) return 
    const uri = `/document/getDocumentById`
    Fetcher.get<any, CauHoiType>(uri, { params: { "id": newState }}).then((response) => {
        // let newData = data ? [...data] : []
        // newData?.unshift(response);
        // console.log(newData)
        // setData(newData ? [...newData] : [])
        setData((oldData) => [response, ...(oldData ?? [])])
        // console.log(data)
        setTitle('')
        setReply('')
        // setIsSending(1)
    }).catch((error) => {

    });
}, [newState]);

  return (
    <main className='min-h-screen'>
        <div className='flex items-center justify-center m-12'>
            <div className='bg-[#AAD576] font-bold text-3xl rounded-full inline-block px-3'>
              Hỏi đáp chuyên đề ngữ văn 10
            </div>
        </div>
        
        
        
        <div className='flex max-w-3xl mx-auto flex-col'>
          
            <div className='mb-12'>
                <div className="flex justify-end items-end mt-2">
                    <button className="flex items-center text-xl font-bold text-white 
                    rounded-lg bg-[#143601] px-4 py-2 hover:bg-dark-primary"
                        onClick={toggleOpen}>
                        <EditIcon color='white' className='group-hover:fill-black mr-4' size='20px' />
                        Đặt câu hỏi
                    </button>
                    {/* <UserUpload
                            subjectId="1"
                            subjectName={"Hehe"}
                            // categories={docs.map((doc) => doc.category)}
                            onEndUpload={() => mutateDocs()}
                        >
                            <div className="bg-primary hover:bg-dark-primary px-3 py-2 rounded-lg flex gap-2 items-center">
                                <FaPlus className={'fill-secondary'} size={'1.1em'} />
                                <Text strong className="text-secondary text-fs-inherit">Tải lên</Text>
                            </div>
                    </UserUpload> */}
                </div>
            </div>
            { isOpen && (
            <div style={{"position": "relative",
          "padding": "24px", 
          "background": "#FCFCFC",
          "borderRadius": "8px",
          "marginBottom" : "8px"}} >
              <div className='flex justify-between'>
                <TitleWithBox title={'Đặt câu hỏi'} size="middle" boxClassName="px-2 text-white" color="#AAD576"/>
                <div className='h-full bg-[#538D22] rounded-full p-2 cursor-pointer' onClick={toggleOpen}>
                  <FaPlus className={'fill-secondary origin-center rotate-45'} size={'16px'} />
                </div>
              </div>
              <div style={{"marginTop": "32px", marginBottom: "32px"}}>
                <div style={{marginBottom: "14px", fontWeight: "600", color: "#33383F"}}>
                  Tiêu đề câu hỏi
                </div>
                <input
                    value={inputTitle}
                    onChange={e => {setTitle(e.target.value); }}
                    className={`focus:bg-white focus:border focus:border-[#9A9FA5] w-full h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold `}
                    placeholder="Em muốn hỏi về vấn đề gì?">

                </input>
              </div>
              <div>
                <div style={{marginBottom: "14px", fontWeight: "600", color: "#33383F"}}>
                  Nội dung câu hỏi 
                </div>
                <textarea rows={4} className="mainText focus:bg-white border-2 focus:border-[#9A9FA5] w-full p-[10px] rounded-lg bg-[#F4F4F4] font-semibold" name="answer" 
                  placeholder="Nội dung câu hỏi của em là gì?" 
                  value={inputReply}  
                  onChange={e => {setReply(e.target.value); }} >
              </textarea>
            </div>
            <div className="flex justify-end items-center mt-2">
                    <div className={isSending===0?"flex items-center mr-4": "hidden items-center"}>
                                <ClipLoader
                                color="#1A4301"
                                size={24}
                                cssOverride={{
                                    'borderWidth': '4px'
                                }}
                                />
                    </div>
                  <button className="flex items-center font-bold text-white 
                          rounded-lg bg-[#143601] px-4 py-2 hover:bg-dark-primary"
                              onClick={onSubmit}>
                              Gửi câu hỏi
                  </button>
            </div> 
          </div> )}
            <CauHoiList comments={data ?? []} />
        </div> 


    </main >
  );
}


function CauHoiList({ comments }: { comments: CauHoiType[] }) {
    // console.log("commentLIST", comments)
    return comments.map(comment => (
      <div key={comment.id} className="comments__item">
        <CauHoiInfo {...comment} />
      </div>
    )) 
  }


function CauHoiInfo({
    id,
    name,
    createdAt,
    link,
    content,
    userName,
    studentId,
    editable = false,
}: any) {
  // console.log(Id, pageId, pageType, author, content, parent, usersLiked, usersDisLiked, timestamp, hasLiked, hasDisLiked, editable)
  const [otherAvt, setOtherAvt] = useState('')
  const [cnt, setCnt] = useState(0);
  const date = new Date(createdAt);
  // console.log(date)
  console.log(id, name, createdAt, link, content, userName, studentId)
  const now = Date.now();
  const diff = now - createdAt;
  const hlink = '/chang-3/hoi-dap/cau-hoi?documentId=' + id
  let commentDate = '';
  if (diff <= 1000 * 5) {
    commentDate = 'Vừa xong'
  } else if (diff < 1000 * 60) {
    commentDate = `${Math.floor(diff / 1000)} giây trước`
  } else if (diff < 1000 * 60 * 60) {
    commentDate = `${Math.floor(diff / (1000 * 60))} phút trước`
  } else if (diff < 1000 * 60 * 60 * 24) {
    commentDate = `${Math.floor(diff / (1000 * 60 * 60))} giờ trước`
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    commentDate = `${Math.floor(diff / (1000 * 60 * 60 * 24))} ngày trước`
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    commentDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    })
  } else {
    commentDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  useEffect(() => {
    Fetcher.get<any, any>('/users/' + studentId)
        .then((response) => {
            setOtherAvt(response.avatar);
            // console.log(otherAvt);
        }).catch((error) => {
            console.log(error);
        });
    },[studentId]);

  useEffect(() => {
    Fetcher.get<any, any>('/users/' + studentId)
    .then((response) => {
        setOtherAvt(response.avatar);
        // console.log(otherAvt);
    }).catch((error) => {
        console.log(error);
    });
},[studentId]);
  Fetcher.get<any, any>('/page/comment-count/D/' + id)
    .then((response) => {
        setCnt(response.count);
        // console.log(otherAvt);
    }).catch((error) => {
        console.log(error);
    });

  
  return (
    <div className='bg-white p-4 w-full my-2 shadow' style={{ "padding": "24px", 
    "background": "#FCFCFC",
    "borderRadius": "8px"}}>
        <a className='py-4 border-y-2 w-full' href={hlink}>
            <div className='flex w-full'>
                <Avatar src={otherAvt} size={50} />
                <div className='flex-col mx-4 text-[#143601]'>
                    <div className='font-bold text-lg'>
                        {userName}
                    </div>
                    <div className='text-sm text-[#73A942]'>
                        { commentDate }
                    </div>
                </div>
            </div>

            <div className='flex-col my-4 text-[#143601] font-bold text-2xl'>
                {name}
            </div>

            <div>
                { content }
            </div>
            
            <div className='flex justify-between mt-4'>
                <div className='flex items-center justify-center text-[#73A942] text-sm'> 
                    <MessageIcon size='16px' className='icon mr-2'/> 
                    {cnt} phản hồi
                </div>
                <div className="flex justify-end items-end mt-2">
                    <a className="font-bold text-white rounded-lg bg-primary py-2 px-4 hover:bg-dark-primary" href={hlink}>
                        Trả lời
                    </a>
                </div>
            </div>
            
        </a>
    </div>
  )
}
