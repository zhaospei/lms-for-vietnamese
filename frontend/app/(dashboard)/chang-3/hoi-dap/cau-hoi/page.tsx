"use client"
import React, { useEffect } from "react"
import { Typography } from 'antd';
import { Image } from 'antd';
import { useState } from "react";
import Fetcher from "@/api/Fetcher";
import { useRouter, useSearchParams } from "next/navigation";
import Main from "@/components/layouts/Main";
import Avatar from "antd/es/avatar/avatar";
import Comment  from "@/components/common/Comment/Comment"
import TitleWithBox from "@/components/common/TitleWithBox";
const {Text} = Typography;
import HeartIcon from "@/components/common/(Icons)/HeartIcon";
import DownloadIcon from "@/components/common/(Icons)/DownloadIcon";
import ClipLoader from "react-spinners/ClipLoader";
import ReportForm from '@/components/common/Report/Report';
import ReportIcon from '@/components/common/(Icons)/ReportIcon';
import { PageProps } from "@/types/PageProps";

interface Response {
    id: any,
    name: any,
    createdAt: any,
    // like: any,
    // download: any,
    // category: any,
    content: any,
    userName: any,
    // subject: any,
    // subjectId: any,
    userId : any,
    studentId: any,
}

type Props = PageProps<{
    documentId: string
}>

export default function Documentdetail() {
    const searchParams = useSearchParams();
    const documentId = searchParams.get('documentId') || '';
    console.log({documentId})
    const [filename, setFilename] = useState("");
    // const [subname, setSubname] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState<any>("");
    const [numoflike, setNumOfLike] = useState(0);
    const [numofDownload, setNumOfDownload] = useState(0);
    const [subjecttId, setSubjectId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [newStateLike, setNewStateLike] = useState(0);
    const [isLike, setLike] = useState(false);
    const [isLiking, setIsLiking] = useState(-1)
    const [openReportForm, setOpenReportForm] = useState(false);
    const toggleReportForm = () => setOpenReportForm(!openReportForm);
    const [likeCnt, setLikeCnt] = useState(0)

    const [imageURL, setImageURL] = useState("");
    const [time, setTime] = useState(0);

    const months : string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const router = useRouter();
    const likeReq = (score: any) => {
        // console.log(score)
        setIsLiking(0)
        Fetcher.post<any, any>('page/like/', {
          "pageId": documentId,
          "pageType": 'D',
          "score": score
        }).then((response : any) => {
          if (response.message === 'Successfully like!') {
            // router.reload();
            // setReply('')
            // setIsSending(1)
            setIsLiking(1)
            setNewStateLike(newStateLike + 1)
          }
          // console.log(response)
        }).catch((error) => {
          // console.log(error)
        })
      }
    const toggleLike = () => {
    // console.log(isLike)
        if (isLike) {
            likeReq(0)
        } else {
            likeReq(1)
        }
    // setLike(!isLike);
    // setDisLike(false);
    }

    // const [isliked, setIsliked] = useState(false);
    // const typeDoc = (link[link.length - 1] === 'f' || link[link.length - 1] === 'F')? 'PDF' : 'IMG'

    useEffect(() => {
            Fetcher.get<any, Response>('/document/getDocumentById', { params: { "id": documentId }}).then((response : Response) => {
                setFilename(response.name);
                // setSubname(response.subject);
                setContent(response.content);
                setAuthor(response.userName);
                // setSubjectId(response.subjectId);
                // setNumOfLike(response.like);
                // setNumOfDownload(response.download);
                setStudentId(response.studentId);
                setTime(response.createdAt);
                console.log(response);
                console.log(response.createdAt);
            })
            .catch(error => {
                console.log('Lỗi khi gọi API:', error)
            });
            console.log(studentId);

            Fetcher.get<any, any>('/users/' + studentId)
            .then((response) => {
                setImageURL(response.avatar);
                console.log(imageURL);
            }).catch((error) => {
                console.log(error);
            });

    }, [documentId, numoflike, imageURL, studentId, numoflike]);

    // function handleLike() {
    //     if(isliked === true) return;
    //     Fetcher.post('/page/like/', {
    //         'pageId' : documentId,
    //         'pageType' : 'D',
    //         'score' : 1
    //     }).then(response => {
    //         console.log(response);
    //         //setNumOfLike(numoflike + 1);
    //         setIsliked(true);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // };

    const handleDown = () => {
    };

    function handleAuthor() {
        console.log(studentId);
        router.push("/profile?studentid=" + studentId);
    }

    function handleSubject() {
        router.push("/all-subjects/documents?subjectId=" + subjecttId);
    }

    useEffect(() => {
        console.log(documentId, newStateLike)
        const uri = `page/like/D/${documentId}/`
        Fetcher.get<any, any>(uri).then((response) => {
            // let newData = response.count;
            console.log(response)
            setLikeCnt(response.likes)
            // setDisLikeCnt(response.dislikes)
            if (response.userLike === 1) {
              setLike(true)
            //   setDisLike(false)
            } else {
              setLike(false)
            //   setDisLike(false)
            }

        }).catch((error) => {

        });
    }, [documentId, newStateLike]);

    const date = new Date(time);
    const now = Date.now();
    const diff = now - time;
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

    return (<>
        <Main title = "Tài liệu" className="max-w-5xl mx-auto rounded-lg my-12  p-[30px]">
            <div data-test-id="back-button" className="z-[10] absolute flex items-center left-[-80px] top-0">
                <div className="rounded-full bg-green-300" style={{"animation": "1s cubic-bezier(0.165, 0.84, 0.44, 1) 0s 1 normal forwards running hideShadow"}}>
                    <button aria-label="Quay lại" className="H" data-test-id="back-icon-button" type="button" onClick={() => router.back()} >
                        <div className="" style={{}}>
                            <div className="flex items-center justify-center" style={{"height": "48px", "width": "48px"}}>
                                <svg className="Hn_ Uvi gUZ U9O kVc" height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
                                    <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            {/* <br />
            <div className = {`flex`}>
                <div className = {`ml-[10px]`}>
                    <div style={{marginBottom: '12px', fontSize: '32px', lineHeight: '1.25', letterSpacing: '-.03em', fontWeight: '600'}}>{filename}</div>
                </div>
            </div> */}
            {/* <br /> */}
            {/* <div className = {`font-medium text-xl my-[5px] text-orange-500 hover:text-orange-300 cursor-pointer`} onClick = {handleSubject}> <span className="text-black">trong</span> {subname}</div> */}
            <TitleWithBox title={filename} size="ultra" color="#143601" /> 
            <div className = {`mt-4 flex justify-between`}>
                {/* <div className = {`flex font-semibold`}> */}
                <div className="flex items-center cursor-pointer" onClick = {handleAuthor}>
                    <Avatar className="mr-4" src={imageURL} size={36}></Avatar>
                    <div style={{marginRight: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        <Text strong style={{fontSize: '14px'}}>
                        {author} <span style={{color: '#6F767E'}}> gửi vào lúc </span> { commentDate }

                        </Text>

                    </div>
                {/* </div>
                    { commentDate }
                <div> */}
                </div>

                    {/* <div className = {`flex items-center cursor-pointer`} onClick = {handleAuthor}>
                        <Avatar className="" src={imageURL} size={48}></Avatar>
                        <div style={{marginRight: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            <Text strong style={{fontSize: '18px'}}>
                            {author}
                            </Text>
                        </div>
                    </div>
                    <div className = {`flex bg-white hover:bg-slate-200 p-2 rounded-lg ml-[50px] cursor-pointer`}>
                        <FaBook className = {`text-blue-700`} style={{fontSize : '40px'}} />
                        <div className = {`ml-[10px] my-[5px] text-orange-500 hover:text-orange-300`} onClick = {handleSubject}>{subname}</div>
                    </div>
                    <div className = {`flex bg-white hover:bg-slate-200 p-2 rounded-lg ml-[50px] cursor-pointer`}>
                        <FiClock className = {`text-blue-700`} style={{fontSize : '40px'}} />
                        <div className = {`ml-[10px] my-[5px] text-purple-500 hover:text-purple-300`}>{months[new Date(time).getMonth()] + ' ' + new Date(time).getDate() + ', ' + new Date(time).getFullYear()}</div>
                    </div> */}
                {/* </div> */}
            </div>
            <div className="flex justify-between mb-4">
                <div>
                </div>
                
            </div>
            <div className = {`flex mb-8`}>
                <div> 
                { content }
                </div>
                {/* </div> */}

                {/* <div className = {`ml-[20px] my-[200px] `}>
                    <button className = {`text-black hover:text-blue-500`} onClick = {handleLike}>
                        <div className = {`flex flex-col items-center`}>
                            <div className = {`flex max-w-fit`}>
                                <div className = {`rounded-full bg-blue-500 hover:bg-blue-700 p-1`}>
                                    <BiSolidLike className = {`cursor-pointer text-white`} style={{fontSize : '30px'}}/>
                                </div>
                                <div className = {`ml-[10px] my-[5px] font-semibold text-[20px]`}>{numoflike} Like</div>
                            </div>
                        </div>
                    </button>
                    <br />
                    <br />
                    <br />
                    <button className = {`text-black hover:text-green-300`} onClick = {handleDown}>
                        <a className = {``} href = {link} download = "" target = "_blank">
                            <div className = {`flex flex-col items-center`}>
                                <button  className = {`flex`}>
                                    <IoMdDocument className = {`cursor-pointer text-green-500 hover:text-green-300`} style={{fontSize : '50px'}}/>
                                    <div className = {`text-[15px] max-w-[70px] my-[3px] font-semibold`}>Mở trong tab mới</div>
                                </button>
                            </div>
                        </a>
                    </button>
                </div> */}
                <ReportForm
                    // key={(editingSubject?.id ?? '') + editingSubject?.getFinalScore?.()}
                    // key={editingSubject.current?.id ?? ''}
                    reportInfo = {
                        {
                        pageId: documentId,
                        pageType: "D"
                        }
                    }
                    onSave= {(newSubject) => {
                        // console.log(newSubject)
                        Fetcher.post('/report/', {
                        "content": newSubject?.content,
                        "pageType": newSubject?.pageType,
                        "pageId": newSubject?.pageId,
                        "type": newSubject?.type,
                        }).then((response) => {
                        console.log(response)
                        setOpenReportForm(false);
                        }).catch((error) => {
                        console.log(error)
                        });
                    }}
                    open={openReportForm}
                    onCancel={() => setOpenReportForm(false)}
                    />
            </div>
            <Comment pageId={documentId} pageType='D'/>
        </Main>
    </>)
}
