'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LikeOutlined, DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography, Progress, Avatar, DatePicker, DatePickerProps, List, Space } from 'antd';
import Image from 'next/image';
import Fetcher from '@/api/Fetcher';
import { UserInfoResponse } from '@/api/userAPI';
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

const cookies = new Cookies();
export default function Profile() {

  const searchParams = useSearchParams();
  const studentid = searchParams.get('studentid') || '';

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [mssv, setMSSV] = useState("");
  const [bio, setBio] = useState("");
  const [changedImage, hasChangedImage] = useState(false);
  const [setUpAccount, hasSetUpAccount] = useState(true);
  const [personalInfo, finishedPersonalInfo] = useState(true);
  const [biography, hasBiogrpahy] = useState(true);
  const [other, setOther] = useState(false);
  const [docData, setDocData] = useState<DocumentClass[]>([]);
  const router = useRouter();
  const [percentage, setPercentage] = useState(20);
  const currentStudentId = cookies.get('studentid');
  const [otherAvt, setOtherAvt] = useState('')
  const [searchDoc, setSearchDoc] = useState('');
  const handleSearchDoc = useDebouncedCallback((search) => {
    setSearchDoc(search)
  }, 300)
  const filterDoc = useMemo(() => search(searchDoc, docData, ['name', 'subjectName']), [docData, searchDoc])

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useDispatch();
  const { avtLink } = useSelector(authSelector)

  useEffect(() => {
    if (studentid != currentStudentId) setOther(true);
    Fetcher.get<any, UserInfoResponse>('/users/' + studentid)
      .then((response) => {
        // dispatch(authActions.updateAuthState({
        //   avtLink: response.avatar
        // }))
        setOtherAvt(response.avatar)
        setMSSV(response.studentId);
        setName(response.name);
        setBirth(response.date);
        setBio(response.bio);
      }).catch((error) => {
        if (error.status == 401) {
          router.push('/signin');
        }
        else if (error.status == 404) {
          router.push('/');
        }
      });

    Fetcher.get<any, Omit<DocumentClass, 'ext'>[]>('/document/getMyDocumentByStudentId', {
      params: {
        "studentId": studentid,
      }
    }).then((response) => {
      let data = response;
      for (let i = 0; i < data.length; i++) {
        let time = data[i].createdAt.split('-');
        let date = time[2].split('T');
        data[i].createdAt = date[0] + '/' + time[1] + '/' + time[0];

      }
      setDocData(response.map((g) => ({ ...g, ext: getExtOfFile(g.link).ext })));
    }).catch((error) => {

    })
  }, [studentid, currentStudentId, other, router, dispatch]);

  useEffect(() => {
    setPercentage(20);
    if (avtLink) {
      hasChangedImage(true);
      setPercentage(p => p + 30);
    } else {
      hasChangedImage(false);
    }
    if (bio) {
      hasBiogrpahy(true);
      setPercentage(p => p + 20);
    } else {
      hasBiogrpahy(false);
    }
    if (name && mssv && birth) {
      finishedPersonalInfo(true);
      setPercentage(p => p + 30);
    } else {
      finishedPersonalInfo(false);
    }
  }, [bio, name, avtLink, birth, mssv])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File | undefined;
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null); // To clear the selected file
    }
  };

  const handleFinishEditName = (newName: string) => {
    dispatch(authActions.updateAuthState({
      name: newName
    }))
    setName(newName);
    Fetcher.put('/users/', {
      "name": newName,
      "avatar": avtLink,
      "birth": birth,
    }).then((response) => {

    }).catch((error) => {

    });
  }

  const handleFinishEditBirth: DatePickerProps['onChange'] = (date, dateString) => {
    setBirth(dateString);
    Fetcher.put('/users/', {
      "name": name,
      "avatar": avtLink,
      "birth": dateString,
    }).then((response) => {

    }).catch((error) => {

    });
  }

  const handleFinishEditBio = (newBio: string) => {
    setBio(newBio);
    Fetcher.post('/users/changeBio', {
      "bio": newBio,
    }).then((response) => {

    }).catch((error) => {

    });
  }

  const changeImage = () => {
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop();

      const allowedExtensions = ["jpg", "jpeg", "png"];

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const dataURL = e.target.result as string;
            dispatch(authActions.updateAuthState({
              avtLink: dataURL
            }))
            hasChangedImage(true);
          }
        };
        reader.readAsDataURL(selectedFile);
        const formData = new FormData();
        formData.append('up', selectedFile);
        Fetcher.post('/users/changeAvatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then((response) => {

        }).catch((error) => {

        });
      }
      else {
        alert("Vui lòng upload ảnh bằng JPG hoặc PNG.");
      }
    }
  };

  return (
    <main className='min-h-screen'>
        <div className='flex items-center justify-center m-12'>
            <div className='bg-[#AAD576] font-bold text-3xl rounded-full inline-block px-3'>
              Chặng 1: Dữ liệu đa phương thức
            </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-12 px-20 mt-10">
            <div className='bg-[#AAD576] rounded px-8 py-4'>
              <div className='text-2xl'>
                CỬA 1
              </div>
              <div className='text-4xl font-bold'>
                Tri thức nền tảng
              </div>
            </div>
            <div className='bg-[#AAD576] rounded px-8 py-4'>
              <div className='text-2xl'>
                  CỬA 2
                </div>
                <div className='text-4xl font-bold'>
                  Gợi mở
                </div>
            </div>
            <div className="row-start-2 bg-[#AAD576] rounded px-8 py-4">
            <div className='text-2xl'>
                CỬA 3
              </div>
              <div className='text-4xl font-bold'>
               Tài liệu tham khảo
              </div>
            </div>
            <div className="row-start-2 bg-[#AAD576] rounded px-8 py-4">
            <div className='text-2xl'>
                CỬA 4
              </div>
              <div className='text-4xl font-bold'>
              Bài mẫu
              </div>
            </div>
        </div>


    </main >
  );
}