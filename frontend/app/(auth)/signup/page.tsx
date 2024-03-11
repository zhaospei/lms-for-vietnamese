"use client"
import React, { useState } from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Fetcher from '@/api/Fetcher';
import { useRouter } from 'next/navigation';
import { Result, Spin, Typography } from 'antd';
import Link from 'next/link';
import MyButtonWrapper from '@/components/common/(MyButton)/MyButtonWrapper';
import DoneIcon from '@/public/images/done.png'
import Image from 'next/image'
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
          title={<Text strong className='text-lg'>{`Đường dẫn kích hoạt đã được gửi tới ${mssv}@vnu.edu.vn`}</Text>}
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
    <main className="bg-white flex" style={{minHeight: 'calc(var(--vh, 1vh) * 100)'}}>
      <div className='flex w-[400px] bg-[#F4F4F4]'>
          <button className="bg-transparent text-[48px] my-6 text-primary font-bold font-mainfont">
            <Link href="/">
              <Avatar className="" src={'https://static.vecteezy.com/system/resources/previews/024/241/000/original/colorful-shiba-inu-dog-shiba-inu-portrait-dog-sticker-clip-art-dog-lover-design-ai-generated-png.png'} size={96}></Avatar>
              {/* <div className="text-[64px] text-sky-700 font-bold my-8 tracking-tighter">UETable</div> */}
            </Link>
          </button>
      </div>

      <div className="flex bg-white justify-center items-center" style={{padding: '96px 24px', flexGrow: '1'}}>

        <div style={{maxWidth: '296px'}}> 

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

          <div className="text-[48px] text-black font-semibold my-8 tracking-tighter">Đăng Ký</div>

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

                <input className={classnameE} type="text" id="mssv" placeholder='Nhập mã số sinh viên' value={mssv} onChange={(evt) => setMssv(evt.target.value)} /> <br />
                
                {/* <div className="relative top-2 left-1 w-[72px]">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="Full Name" className="text-xs text-gray-400 w-full font-medium">Họ và tên</label>
                  </div>
                </div> <br /> */}
                <input className="border hover:border-sky-500 w-full h-14 rounded-lg px-2" type="text" id="Full Name" placeholder='Nhập họ và tên' value={fullname} onChange={(evt) => setFullname(evt.target.value)} /> <br />

                {/* <div className="relative top-2 left-1 w-20">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                    <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Mật khẩu</label>
                  </div>
                </div> */}

                <div>
                  {type1 == "password" && (<EyeInvisibleOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus1} />)}
                  {type1 == "text" && (<EyeOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus1} />)}
                </div>

                <input className={classnameP1} type={type1} maxLength={32} id="password" placeholder='Nhập mật khẩu' value={password1} onChange={(evt) => setPassword1(evt.target.value)} />  <br />

                {/* <div className="relative top-2 left-1 w-[132px]">
                  <div className="absolute bg-white w-full px-2">
                    <label htmlFor="mssv" className="text-xs w-full text-red-600 font-medium">*  </label>
                    <label htmlFor="mssv" className="text-xs text-gray-400 w-full font-medium">Nhập lại mật khẩu</label>
                  </div>
                </div> */}

                <div>
                  {type2 == "password" && (<EyeInvisibleOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus2} />)}
                  {type2 == "text" && (<EyeOutlined className="relative top-10 left-[300px]" onClick={ChangeStatus2} />)}
                </div>

                <input className={classnameP2} type={type2} maxLength={32} id="password" placeholder='Nhập lại mật khẩu' value={password2} onChange={(evt) => setPassword2(evt.target.value)} />  <br />

                
                <div className="text-sm text-red-600 w-full font-medium italic">{note}</div>
              <div className="mx-10 flex justify-between">
                <button className="font-bold bg-slate-300 hover:bg-sky-300 text-black rounded-2xl w-28 h-10"
                  onClick={() => router.push("/signin")}>Đăng nhập</button>

                <button className="font-bold bg-black hover:bg-sky-300 text-white rounded-2xl w-28 h-10"
                  onClick={() => HandleClick()}>Đăng ký</button>
              </div>

          </div>
        </div>

    </main>
  )
}
