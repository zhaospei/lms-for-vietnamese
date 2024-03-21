"use client"
import React, { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import HomeImage from '@/public/images/home_main.png';
import Fetcher from '@/api/Fetcher';
import { useRouter } from 'next/navigation';
import { Result, Spin, Typography } from 'antd';
import Link from 'next/link';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import DoneIcon from '@/public/images/done.png'
import Image from 'next/image'
import { BRICES_FONT } from '@/styles/fonts';
const { Text } = Typography
import { Avatar, Badge, Divider, Select, Popover } from "antd";

export default function SignUp() {

  const [mssv, setMssv] = useState("");
  const [password1, setPassword1] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [noMSSV, setNoMSSV] = useState(false);
  const [password2, setPassword2] = useState("");
  const [fullname, setFullname] = useState("");
  const [classnameE, setClassnameE] = useState("focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold");
  const [classnameP1, setClassnameP1] = useState("focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold");
  const [classnameP2, setClassnameP2] = useState("focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold");
  const [note, setNote] = useState("");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [sendEmail, setSendEmail] = useState(false);


  const router = useRouter();

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  function ChangeStatus1() {
    if (type1 == "password") setType1("text");
    else setType1("password")
  }

  function ChangeStatus2() {
    if (type2 == "password") setType2("text");
    else setType2("password")
  }

  async function HandleAccount() {
    try {
      let data = await Fetcher.post('/users/', {
        "name": fullname,
        "studentid": mssv,
        "password": password1
      });
      setSendEmail(true)
      // console.log(data);
      // router.push("/signin");
    } catch (error) {
      setNote("Tài khoản không hợp lệ hoặc đã tồn tại.")
    }
  }

  function HandleBlank() {
    if (mssv.length === 0) {
      setClassnameE("focus:bg-white border-2 focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold border-red-500")
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.")
    }
    else {
      setClassnameE("focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold")
    }

    if (mssv.length === 0 && password1.length === 0) {
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.")
    }

    if (password2.length === 0) {
      setClassnameP2("focus:bg-white border-1 focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold border-red-500");
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.");
    }
    else {
      setClassnameP2("focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold");
    }

    if (password1.length === 0) {
      setClassnameP1("focus:bg-white border-1 focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold border-red-500");
      setNote("Bạn phải nhập đầy đủ thông tin được đánh dấu *.");
    }
    else {
      setClassnameP1("focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold");
    }

    if (password1 !== password2 && password1.length !== 0 && password2.length !== 0 && mssv.length !== 0) {
      setNote("Mật khẩu và mật khẩu nhập lại không trùng khớp.")
    }
  }

  function HandleClick() {
    HandleBlank();
    if (mssv.length !== 0 && password1.length !== 0 && password2.length !== 0 && password1 === password2) { HandleAccount(); }
  }

  if (sendEmail)
    return (
      <main className='flex items-center h-screen w-creen justify-center bg-secondary'>
        <Result
          title={<Text strong className='text-lg'>{`Đường dẫn kích hoạt đã được gửi tới ${mssv}. Kiểm tra thư rác nếu hòm thư chính không có.`}</Text>}
          extra={[
            <Link href={'/'} key={'home'}>
              <MyButtonWrapper className="border-2 px-2">
                <span className="font-semibold text-base">Trang chủ</span>
              </MyButtonWrapper>
            </Link>,
            <Link key={'signin'} href={'/signin'}>
              <MyButtonWrapper className="border-2 px-2">
                <span className="font-semibold text-base">Đăng nhập</span>
              </MyButtonWrapper>
            </Link>
          ]}
          icon={
            <Image src={DoneIcon} alt="" width={50} height={50} className="ml-auto mr-auto" />
          }
        />
      </main>
    )
  return (
    <main className="bg-white flex" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className='flex w-[600px] bg-[#F4F4F4] relative items-center'
        style={{
          backgroundImage: `url(${HomeImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'

        }}>
        <div className="z-[1] absolute w-[600px] h-full top-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6' }}>

        </div>
        {/* <div className={BRICES_FONT.className}>
              <p className="text-[#FFC700]">Chinh phục Chuyên đề</p> 
              <p style={{fontSize: '128px', lineHeight: "96px"}}>Ngữ văn <span className="text-[#007F73]" style={{fontSize: '200px'}}>10</span></p>
            </div> */}
        <div className="absolute z-[100] text-white flex flex-col items-center justify-center w-full">
          <p className="tracking-tighter text-white text-[48px] font-bold"> Bạn đã có tài khoản? </p>
          <button className=" hover:bg-white hover:text-green-900 bg-green-200 bg-green-900 text-[36px] my-6 font-mainfont px-8 py-2">
            <Link href="/signin">
              Đăng nhập ngay
              {/* <Avatar className="" src={'https://static.vecteezy.com/system/resources/previews/024/241/000/original/colorful-shiba-inu-dog-shiba-inu-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png'} size={96}></Avatar> */}
              {/* <div className="text-[64px] text-sky-700 font-bold my-8 tracking-tighter">UETable</div> */}
            </Link>
          </button>
        </div>
        
        
      </div>

      <div className="flex bg-white justify-center items-center" style={{ padding: '96px 24px', flexGrow: '1' }}>

        <div className='max-w-[400px]'>

          {/* <div className="w-full mb-4 relative">
              <input
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                type="text"
                name='email'
                className={`focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold ${inputFocused && inputValue === '' ? 'border-red-500' : ''}`}
                placeholder="Nhập MSSV">
              </input>
              {noMSSV && inputValue === '' && (
                <p className="text-red-500 mt-2 ml-2 text-sm font-medium">*Vui lòng nhập MSSV</p>
              )}
            </div> */}

          <div className="text-[48px] text-black font-bold my-8 ">
            <p className='tracking-tighter text-[#114232]'>Tạo tài khoản mới</p>
            <p className='text-lg font-normal text-gray-700'>Tham gia diễn đàn trao đổi và xem lại bất kì lúc nào, cũng như sử dụng nhiều tính năng khác khi là một thành viên của Chinh phục chuyên đề ngữ văn 10!</p>
          </div>

          {/* <div className="relative top-2 left-1 w-16">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                    <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">MSSV</label>
                  </div>
                </div> <br /> */}
          {/* <div className="w-full mb-4 relative">
                  <input
                    value={mssv}
                    type="text"
                    onFocus={handleInputFocus}
                    id='mssv'
                    className={`focus:bg-white focus:border focus:border-[#9A9FA5] w-full pl-8 h-[48px] px-[10px] rounded-lg bg-[#F4F4F4] font-semibold ${inputFocused && mssv === '' ? 'border-red-500' : ''}`}
                    placeholder="Nhập MSSV"
                    onChange={(evt) => setMssv(evt.target.value)}
                    >
                  </input>
                  {noMSSV && mssv === '' && (
                    <p className="text-red-500 mt-2 ml-2 text-sm font-medium">*Vui lòng nhập MSSV</p>
                  )}
                </div> */}
          <div className='flex flex-col'> 

          <input className={classnameE} type="text" id="mssv" placeholder='Nhập tài khoản email' value={mssv} onChange={(evt) => setMssv(evt.target.value)} /> <br />

          {/* <div className="relative top-2 left-1 w-[72px]">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="Full Name" className="text-xs text-gray-400 w-full font-medium">Họ và tên</label>
                  </div>
                </div> <br /> */}
          <input className={classnameE} type="text" id="Full Name" placeholder='Nhập họ và tên' value={fullname} onChange={(evt) => setFullname(evt.target.value)} /> <br />

          {/* <div className="relative top-2 left-1 w-20">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                    <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Mật khẩu</label>
                  </div>
                </div> */}

          {/* <div className="relative top-10 left-[300px]">
            {type1 == "password" && (<EyeInvisibleOutlined  onClick={ChangeStatus1} />)}
            {type1 == "text" && (<EyeOutlined onClick={ChangeStatus1} />)}
          </div> */}

          <input className={classnameP1} type={type1} maxLength={32} id="password" placeholder='Nhập mật khẩu' value={password1} onChange={(evt) => setPassword1(evt.target.value)} />  <br />

          {/* <div className="relative top-2 left-1 w-[132px]">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                    <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Nhập lại mật khẩu</label>
                  </div>
                </div> */}

          {/* <div>
            {type2 == "password" && (<EyeInvisibleOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus2} />)}
            {type2 == "text" && (<EyeOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus2} />)}
          </div> */}

          <input className={classnameP2} type={type2} maxLength={32} id="password" placeholder='Nhập lại mật khẩu' value={password2} onChange={(evt) => setPassword2(evt.target.value)} />  <br />
          </div>

          <div className="text-sm text-red-600 w-full font-medium italic">{note}</div>
          <div className="flex justify-center mt-[20px]">
            {/* <button className="font-bold bg-slate-300 hover:bg-sky-300 text-black rounded-2xl w-28 h-10"
              onClick={() => router.push("/signin")}>Đăng nhập</button> */}

            <button className="font-bold text-xl bg-black hover:bg-green-900 text-white rounded-lg w-full py-2"
              onClick={() => HandleClick()}>Đăng ký</button>
          </div>

        </div>
      </div>

    </main>
  )
}
