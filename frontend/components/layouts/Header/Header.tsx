"use client";

import { THEME } from "@/styles/theme";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import LogoIcon from '../../../public/images/logo.png';
import LogoIconDark from '../../../public/images/logo_dark.png';
import LogoUET from '../../../public/images/logo_dark.png';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/auth/authSlice";
import { authSelector } from "@/redux/auth/authSelector";
import { AuthState } from "@/redux/auth/authSlice";
import HomeMain from '../../../public/images/tree.jpg';
import { Avatar, Badge, Divider, Select, Popover } from "antd";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import SearchBar from "../../common/SearchBar/SearchBar";
import Link from "next/link";
import { MAIN_FONT } from "@/styles/fonts";
import NotificationIcon from "../../common/(Icons)/NotificationIcon";
import Fetcher from "@/api/Fetcher";
import { useRouter, useSearchParams } from "next/navigation";
// import Cookies from "universal-cookie";
import { UserInfoResponse } from "@/api/userAPI";
// import { cookies } from "@/app/(dashboard)/layout";
import { contentt } from "../Settings";
import Notifications from "./Notifications";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import { getURL } from "@/utils/navigation";
import { usePathname } from 'next/navigation';
import { ProgressBar } from "../../common/ProgressBar";

interface TabProps {
  selected: boolean;
  children: ReactNode;
}

import Cookies from 'universal-cookie';
const cookies = new Cookies()

const links = ['/', '/chang-1', '/chang-2', '/chang-3']


export default function Header() {
  const [avtStrokeColor, setAvtStrokeColor] = useState<string>('#fff');
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [scroll, setScroll] = useState(false)
  const [openAvt, setOpenAvt] = useState(false)
  const searchValue = useRef('')
  const searchParams = useSearchParams();
  

  const handleOnSearch = useDebouncedCallback((): void => {
    router.replace(getURL('/search', {
      subjectName: searchValue.current
    }))
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    if (authState?.signedIn) {
      Fetcher.get<any, UserInfoResponse>('/users/' + authState?.studentId)
        .then((response) => {
          dispatch(authActions.updateAuthState({
            avtLink: response.avatar
          }))
        });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [authState?.signedIn, authState?.studentId, dispatch]);
  // console.log(value)

  const handleSignOut = () => {
    cookies.remove('authToken', {
      path: '/'
    });
    dispatch(authActions.updateAuthState({
      signedIn: false,
      logging: false,
      name: '',
      studentId: '',
    }));
    router.push('/');
  }

  const handleProfile = () => {
    setOpenAvt(false)
    router.push('/profile?studentid=' + cookies.get('studentid'));
  }
  const mainRef = useRef<HTMLElement | null>(null);
  const pathName = usePathname();
  // console.log(pathName)
  if ('.pdf' === pathName.slice(-4)) {
    return <header
    className="sticky w-full top-0  z-[1000] bg-white shadow h-[60px]"
    style={{
      transition: 'padding-left 0.3s ease-in-out',
      // background: `url(${HomeMain.src})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: '100% 100%'
    }}
  >
    {/* <div className="z-[1] absolute w-full h-full top-0" style={{ transition: 'border-radius 0.3s ease-in-out',
          boxShadow: 'inset 1px 0px 0px #F4F4F4, inset 0 -1px 0px #EFEFEF'}}>

   </div> */}

    <div
      className="relative flex jutify-center items-center z-[100] h-full"
      style={{
        // borderTopLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
        // borderBottomLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
        transition: 'border-radius 0.3s ease-in-out',
      }}
    >
      
      <div className="h-full flex text-lg jutify-center items-center mx-auto">
        <a onClick={() => router.back()} className="cursor-pointer sp-back-to-site w-[80px] h-[60px] absolute top-0 left-0" style={{"background": "url(https://kenh14cdn.com/web_images/icon-arrow.png) center center #ff6a02 no-repeat;"}}></a>
        <h3 className="m-1 group"> 
          <a href="/" className="text-primary font-semibold group-hover:text-primary cursor-pointer transition-font-size duration-500 ease-in-out">
            <Image src={LogoUET} alt="logo" height={50} className="mr-8"/>
          </a>
          
          {/* <div className="h-1 w-0 bg-primary transition-width duration-500 ease-in-out group-hover:w-full"></div> */}
        </h3>

    </div>
    </div>
  </header>;
  }

  const isHome = links.includes(pathName);

  return isHome ? (
    <header
      className="w-full top-0 z-[1000] mt-[16px] text-base"
      style={{
        transition: 'padding-left 0.3s ease-in-out',
        // background: `url(${HomeMain.src})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '100% 100%'
      }}
    >
      {/* <div className="z-[1] absolute w-full h-full top-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.6'}}>

     </div> */}

      <div
        className="relative flex items-center h-[100px] px-16 z-[100]"
        style={{
          // borderTopLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
          // borderBottomLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
          transition: 'border-radius 0.3s ease-in-out',
        }}
      >
        <div className="flex-1 text-base md:flex-row flex-col md:items-center items-start gap-5 md:flex">
          <h3 className="m-1 group mr-16 bg-[rgba(0,0,0,.5)] px-4 py-2 rounded-full"> 
            <a href="/" className="text-white font-semibold  cursor-pointer transition-font-size duration-500 ease-in-out">
              <Image src={LogoIcon} alt="logo" height={50} />
            </a>
            
            {/* <div className="h-1 w-0 bg-primary transition-width duration-500 ease-in-out group-hover:w-full"></div> */}
          </h3>

          <h3 className="m-1 group bg-[rgba(0,0,0,.5)] px-4 py-2 rounded-full"> 
            <a href="/chang-1" className="text-white font-semibold  cursor-pointer transition-font-size duration-500 ease-in-out">
              Chặng 1: Hành trang tri thức
            </a>
            <div className="h-1 w-0 bg-white transition-width duration-500 ease-in-out group-hover:w-full"></div>
          </h3>

          <h3 className="m-1 group bg-[rgba(0,0,0,.5)] px-4 py-2 rounded-full"> 
            <a href="/chang-2" className="text-white font-semibold  cursor-pointer transition-font-size duration-500 ease-in-out">
              Chặng 2: Trò chơi ôn tập
            </a>
            <div className="h-1 w-0 bg-white transition-width duration-500 ease-in-out group-hover:w-full"></div>
          </h3>

          <h3 className="m-1 group bg-[rgba(0,0,0,.5)] px-4 py-2 rounded-full"> 
            <a href="/chang-3" className="text-white font-semibold  cursor-pointer transition-font-size duration-500 ease-in-out">
              Chặng 3: Diễn đàn - Triển lãm
            </a>
            <div className="h-1 w-0 bg-white transition-width duration-500 ease-in-out group-hover:w-full"></div>
          </h3>

          {/* <SearchBar
            placeholder="Tìm kiếm học phần"
            className="w-[25vw]"
            onPressEnter={() => handleOnSearch()}
            onChange={(e) => searchValue.current = e.target.value}
            defaultValue={searchParams.get('subjectName') ?? ''}
          /> */}
        </div>
        {/* <LanguaguesSelector /> */}
        {
          authState.signedIn ?
            <div className="flex mr-5 items-center">
              {/* <Notifications /> */}
              <button
                onMouseEnter={() => setAvtStrokeColor('#ccc')}
                onMouseLeave={() => setAvtStrokeColor('#fff')}
              >
                <div className="relative flex">
                  <Popover
                    content={contentt(handleProfile, handleSignOut, cookies.get('role'))}
                    trigger="click"
                    arrow={false}
                    placement='bottomLeft'
                    open={openAvt}
                    onOpenChange={(vis) => setOpenAvt(vis)}
                  // className="bg-white"
                  >
                    <Avatar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={authState.avtLink} size={40}></Avatar>
                    <svg width="50" height="50" viewBox="0 0 32 32"><circle r="15" cx="16" cy="16" fill="none" strokeWidth="2" style={{ stroke: avtStrokeColor }}></circle></svg>
                  </Popover>
                </div>
              </button>
              {/* <div className="ml-3 text-white">
                <div className="font-semibold ">Xin chào,</div>
                <div className="text-xs font-semibold">{` ${authState.name}`}</div>
              </div> */}
            </div>
            :
            <div className="flex gap-4">
              <Link href='/signup'>
                <button
                  className="bg-gray-200 hover:bg-gray-300 shadow rounded-lg text-primary px-[17px] py-[7px]"
                >
                  Đăng ký
                </button>
              </Link>
              <Link href='/signin'>
                <button
                  className="bg-primary hover:bg-dark-primary shadow rounded-[10px] text-secondary"
                  style={{
                    padding: "7px 17px",
                  }}
                >
                  Đăng nhập
                </button>
              </Link>
            </div>
        }
      </div>
    </header>
  )
  : (    <header
    className="sticky w-full top-0  z-[1000] bg-white shadow"
    style={{
      transition: 'padding-left 0.3s ease-in-out',
      // background: `url(${HomeMain.src})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: '100% 100%'
    }}
  >
    <div className="z-[1] absolute w-full h-full top-0" style={{ transition: 'border-radius 0.3s ease-in-out',
          boxShadow: 'inset 1px 0px 0px #F4F4F4, inset 0 -1px 0px #EFEFEF'}}>

   </div>

    <div
      className="relative flex items-center px-8 z-[100] h-[80px]"
      style={{
        // borderTopLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
        // borderBottomLeftRadius: scroll ? 0 : THEME.LAYOUT_ELEMENT_BORDER_RADIUS,
        transition: 'border-radius 0.3s ease-in-out',
      }}
    >
      <div className="flex-1 text-lg md:flex-row flex-col md:items-center items-start gap-5 md:flex">
        <h3 className="m-1 group"> 
          <a href="/" className="text-primary font-semibold  cursor-pointer transition-font-size duration-500 ease-in-out">
            <Image src={LogoUET} alt="logo" height={50} className="mr-8"/>
          </a>
          
          {/* <div className="h-1 w-0 bg-primary transition-width duration-500 ease-in-out group-hover:w-full"></div> */}
        </h3>

        <h3 className="m-1 group"> 
          <a href="/chang-1" className="text-primary font-semibold  cursor-pointer transition-font-size duration-500 ease-in-out">
            Chặng 1: Hành trang tri thức
          </a>
          <div className="h-1 w-0 bg-primary transition-width duration-500 ease-in-out group-hover:w-full"></div>
        </h3>

        <h3 className="m-1 group"> 
          <a href="/chang-2" className="text-primary font-semibold cursor-pointer transition-font-size duration-500 ease-in-out">
            Chặng 2: Trò chơi ôn tập
          </a>
          <div className="h-1 w-0 bg-primary transition-width duration-500 ease-in-out group-hover:w-full"></div>
        </h3>

        <h3 className="m-1 group"> 
          <a href="/chang-3" className="text-primary font-semibold cursor-pointer transition-font-size duration-500 ease-in-out">
            Chặng 3: Diễn đàn - Triển lãm
          </a>
          <div className="h-1 w-0 bg-primary transition-width duration-500 ease-in-out group-hover:w-full"></div>
        </h3>

        {/* <SearchBar
          placeholder="Tìm kiếm học phần"
          className="w-[25vw]"
          onPressEnter={() => handleOnSearch()}
          onChange={(e) => searchValue.current = e.target.value}
          defaultValue={searchParams.get('subjectName') ?? ''}
        /> */}
      </div>
      {/* <LanguaguesSelector /> */}
      {
        authState.signedIn ?
          <div className="flex mr-5 items-center">
            {/* <Notifications /> */}
            <button
              onMouseEnter={() => setAvtStrokeColor('#ccc')}
              onMouseLeave={() => setAvtStrokeColor('#fff')}
            >
              <div className="relative flex">
                <Popover
                  content={contentt(handleProfile, handleSignOut, cookies.get('role'))}
                  trigger="click"
                  arrow={false}
                  placement='bottomLeft'
                  open={openAvt}
                  onOpenChange={(vis) => setOpenAvt(vis)}
                // className="bg-white"
                >
                  <Avatar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={authState.avtLink} size={40}></Avatar>
                  <svg width="50" height="50" viewBox="0 0 32 32"><circle r="15" cx="16" cy="16" fill="none" strokeWidth="2" style={{ stroke: avtStrokeColor }}></circle></svg>
                </Popover>
              </div>
            </button>
            {/* <div className="ml-3 text-white">
              <div className="font-semibold ">Xin chào,</div>
              <div className="text-xs font-semibold">{` ${authState.name}`}</div>
            </div> */}
          </div>
          :
          <div className="flex gap-4">
            <Link href='/signup'>
              <button
                className="bg-gray-200 hover:bg-gray-300 shadow rounded-lg text-primary px-[17px] py-[7px]"
              >
                Đăng ký
              </button>
            </Link>
            <Link href='/signin'>
              <button
                className="bg-primary hover:bg-dark-primary shadow rounded-[10px] text-secondary"
                style={{
                  padding: "7px 17px",
                }}
              >
                Đăng nhập
              </button>
            </Link>
          </div>
      }
    </div>
  </header>);
}

const languages = ['Tiếng Việt', 'English'];
function LanguaguesSelector() {
  return (
    <Select
      defaultValue={languages[0]}
      // onChange={handleProvinceChange}
      options={languages.map((language: string, i: number) => ({
        label: <span className="font-semibold">{language}</span>,
        value: language,
      }))}
      className={`w-[110px] mr-[30px] h-[45%]`}
    />
  )
}

