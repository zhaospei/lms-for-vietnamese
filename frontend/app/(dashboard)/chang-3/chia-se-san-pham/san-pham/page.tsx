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
    link: any,
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
    const [link, setLink] = useState("");
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
                setLink(response.link);
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
        <Main title = "Tài liệu" className="relative max-w-[75vw] mx-auto rounded-lg my-12 flex justify-between">
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
            <div style={{maxWidth: '50%'}}>
                <div className = {``}>
                        {(link[link.length - 1] === 'f' || link[link.length - 1] === 'F')  && (
                            <embed src = {link} width = "100%" height="700px"/>
                        )}
                        {(link[link.length - 1] === 'g' || link[link.length - 1] === 'G') && (
                            <Image src = {link} alt = "Không tải được ảnh" width='100%' height='100%'/>
                        )}
                </div>
            </div>
            <div className="w-full h-full p-4 ml-8 pt-8">
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
                    <div className="flex ">
                        <div className={isLiking===0?"flex items-center mr-2": "hidden items-center"}>
                                    <ClipLoader
                                    color="#1A4301"
                                    size={24}
                                    cssOverride={{
                                        'borderWidth': '4px'
                                    }}
                                    />
                        </div>
                        <button className="flex items-center button-stroke product__favorite mx-4 px-4 py-2 rounded-lg" style={{boxShadow: "0 0 0 2px #EFEFEF inset"}} onClick={toggleLike}>
                                {/* <svg class="icon icon-heart-fill">
                                <use xlink:href="#icon-heart-fill"></use>
                                </svg><span>32</span> */} 
                                <HeartIcon size={24}  solid={isLike} solidOnHover className="mr-2"/>
                                {likeCnt}
                        </button>

                    </div>

                </div>
                <div className="flex justify-between mb-4">
                    <div>
                    </div>
                    
                </div>

                <div className = {`flex flex-col mb-8`}>
                    <div> 
                    { content }
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden mt-8">
                        <Comment pageId={documentId} pageType='D'/>
                    </div>
                    
                    
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

            </div>
            
            {/* <Comment pageId={documentId} pageType='D'/> */}
        </Main>
    </>)
}
