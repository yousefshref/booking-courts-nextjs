'use client'
import Image from "next/image";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineContactSupport, MdOutlineLibraryBooks, MdOutlineSportsFootball } from "react-icons/md";
import { RiFootballFill, RiSearchEyeLine } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";
import { TfiSearch } from "react-icons/tfi";
import { FaRegCirclePlay, FaRegUser } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { FcInfo, FcRating, FcVip } from "react-icons/fc";
import { CgClose } from "react-icons/cg";
import { CourtsContextProvider } from "@/contexts/CourtsContext";
import CourtComponent from "../components/Court/CourtComponent";
import Link from "next/link";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function Home() {

  const courtContext = useContext(CourtsContextProvider)
  const userContext = useContext(AuthContextProvider)

  const workFlowArray = [
    {
      id: 0,
      icon: <RiSearchEyeLine />,
      title: 'ابحث عن الملاعب',
      description: 'هناك العديد من الملاعب, كره القدم التنس كرة السلة, اشعر بالاريحية وانت تختار ملعب بناء علي طلباتك.',
      btn_icon: <TfiSearch />,
      btn_title: 'اكتشف الملاعب',
      href: userContext?.user?.id ? `/courts` : '/auth/login'
    },
    {
      id: 1,
      icon: <IoBookmarkOutline />,
      title: 'احجز الملعب',
      description: 'بعد الانتهاء من الحجز سوف يكون من السهل عليك تتبع الحجز وسهولة التعديل عليه حسب رغباتك.',
      btn_icon: <MdOutlineLibraryBooks />,
      btn_title: 'حجوزاتك',
      href: userContext?.user?.id ? `/profile` : '/auth/login'
    },
    {
      id: 2,
      icon: <LuPartyPopper />,
      title: 'مبرووك',
      description: 'الأن ستصلك رسالة بنجاح عملية الحجز, ويمكنك الذهاب في الوقت المناسب لك.',
      btn_icon: <MdOutlineContactSupport />,
      btn_title: 'لديك مشكلة ما ؟',
      href: `https://wa.me/201203316333`
    },
  ]

  const videoElements = [
    {
      id: 0,
      icon: <FcVip />,
      title: 'المميزات',
    },
    {
      id: 1,
      icon: <FcInfo />,
      title: 'كيفية الأستخدام',
    },
    {
      id: 2,
      icon: <FcRating />,
      title: 'ماذا ستستفيد',
    },
  ]


  useEffect(() => {
    const textHeader = document.getElementById('textHeader')
    const imageHeader = document.getElementById('imageHeader')
    if (textHeader) {
      setTimeout(() => {
        textHeader.className += ' opacity-100 mt-0'
      }, 500)
    }
    if (imageHeader) {
      setTimeout(() => {
        imageHeader.className += ' opacity-100 mt-0'
      }, 700)
    }
  }, [])


  const [visibleDiv, setVisibleDiv] = useState<any>([]);

  useEffect(() => {
    const handleScroll = () => {
      const divs = document.querySelectorAll('.animate-me');
      let currentVisibleDiv: any = null;

      divs.forEach((div) => {
        const top = div.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight * 0.75) {
          currentVisibleDiv = div.id;
        }
      });

      // Check if currentVisibleDiv is not already in visibleDiv before appending
      if (currentVisibleDiv && !visibleDiv.includes(currentVisibleDiv)) {
        setVisibleDiv((prevVisibleDiv: any) => [...prevVisibleDiv, currentVisibleDiv]);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleDiv]);


  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <div className="flex flex-col gap-8">

      {/* landing */}
      <div className={
        `
        ladning shadow-2xl shadow-neutral-200 flex flex-col justify-center md:from-slate-100 md:to-white from-indigo-300 to-white bg-gradient-to-tl  w-screen relative p-5 h-[70vh] overflow-hidden
        `
      }>
        <div className="indigo-triangle md:block hidden absolute bottom-0 right-0"></div>

        <div className="balls md:hidden block absolute left-0 top-0 w-screen h-screen">
          <span className="text-7xl opacity-30 absolute -top-5">
            <RiFootballFill />
          </span>
          <span className="text-3xl opacity-30 top-[50%] right-0 absolute">
            <RiFootballFill />
          </span>
          <span className="text-3xl opacity-30 top-[20%] right-[50%] absolute">
            <RiFootballFill />
          </span>
          <span className="text-4xl opacity-30 top-[25%] right-[80%] absolute">
            <RiFootballFill />
          </span>
          <span className="text-2xl opacity-30 top-[15%] right-[70%] absolute">
            <RiFootballFill />
          </span>
          <span className="text-6xl opacity-30 top-[62%] translate-y-[50%] left-0 absolute">
            <RiFootballFill />
          </span>
        </div>

        <div className="info flex md:justify-around z-10">
          <div className="text my-auto">
            <h1 id="textHeader" className="lg:text-6xl opacity-0 transition-all duration-500 mt-20 md:text-4xl sm:text-5xl text-4xl">جربت تسهلها علي نفسك؟ <br /> <span className="text-slate-900">وتحجز ملعب اونلاين!</span></h1>
          </div>
          <div className="phoneImage my-auto hidden md:block">
            <Image id="imageHeader" className="max-w-[600px] w-full opacity-0 transition-all duration-700 mt-20" loading="lazy" src={'/images/phone.png'} width={300} height={300} alt="phone" />
          </div>
        </div>
      </div>

      {/* how it works */}
      <div id="div1" className={`
      animate-me p-8 flex md:flex-row flex-wrap gap-5 justify-around transition-all
      duration-500
      ${visibleDiv.includes('div1') ? 'opacity-100 mt-1' : 'mt-20 opacity-0 '}
      `}>
        {
          workFlowArray?.map((work: any) => (
            <div key={work?.id} className="glowing-border gap-2 flex flex-col justify-center bg-white p-5 w-full max-w-[400px] h-[200px] rounded-md">
              <div className="top flex gap-1 text-2xl">
                <span className="my-auto lg:text-4xl text-2xl">
                  {work?.icon}
                </span>
                <b className="my-auto text-lg lg:text-2xl">{work?.title}</b>
              </div>
              <div className="info">
                <small className="lg:text-sm text-xs font_light">{work?.description}</small>
              </div>
              <div className="btns mt-3 flex w-full">
                <Link href={work?.href}>
                  <button className="btn-prim-rounded font_light lg:text-base text-sm tracking-wide flex gap-1">
                    <span className="my-auto">
                      {work?.btn_icon}
                    </span>
                    <p>{work?.btn_title}</p>
                  </button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>

      {/* video */}
      {/* <div id="div2" className={`
      animate-me video flex lg:flex-row flex-col justify-around p-8 bg-white gap-5
      transition-all duration-500
      ${visibleDiv.includes('div2') ? 'opacity-100 mt-1' : 'mt-20 opacity-0 '}
      `}>
        <div className="text w-full flex flex-col justify-between text-start">
          <div className="flex w-full max-w-[400px] mx-auto flex-col justify-between h-full">
            <div className="flex flex-col gap-1">
              <h3 className="mx-auto lg:hidden block">مازلت تريد معرفة اكثر ؟</h3>
              <div className="feature flex lg:flex-col flex-row gap-5">
                {
                  videoElements?.map((el: any) => (
                    <div key={el?.id} className="flex icon_moving w-[100px] flex-col gap-1 text-center">
                      <span className="lg:text-7xl text-3xl mx-auto">
                        {el?.icon}
                      </span>
                      <p className="font_light hidden lg:block">{el?.title}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="videoContainer w-full">
          <div className="video flex flex-col justify-center relative bg-[url('https://www.bankrate.com/2023/06/23124314/Stock-market-basics.jpeg?auto=webp&optimize=high')] bg-cover h-[400px] p-3 mx-auto max-w-[600px] rounded-md w-full">
            <span onClick={() => setVideoOpen(true)} className="text-3xl mx-auto bg-indigo-700 transition-all hover:bg-indigo-600 text-white p-3 rounded-full cursor-pointer">
              <FaRegCirclePlay />
            </span>
          </div>
        </div>

        <div className={
          `
        videoOpen bg-black bg-opacity-60 flex flex-col w-screen overflow-hidden justify-center fixed z-20 top-0 left-0 transition-all duration-700
        ${videoOpen ? "h-screen p-5" : "h-[0px] p-0"}
        `
        }>
          <div className="flex flex-col gap-1 mx-auto w-full max-w-4xl h-full max-h-[500px]">
            <span onClick={() => setVideoOpen(false)} className="bg-red-700 transition-all hover:bg-red-600 text-white w-fit p-2 rounded-full cursor-pointer text-2xl">
              <CgClose />
            </span>
            <iframe className="h-full" src="https://www.youtube.com/embed/-dNlg4gwgaY" title="طحالب | 26 | علي وكوكو" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>

      </div> */}

      {/* latest courts */}
      {/* <div id="div3" className={`
      courts animate-me p-5 flex flex-col gap-2 from-neutral-200 to-neutral-100 bg-gradient-to-b via-neutral-200 transition-all duration-500
      ${visibleDiv.includes('div3') ? 'opacity-100 mt-1' : 'mt-20 opacity-0'}
      `}>
        <div className="flex flex-col gap-2 w-full max-w-6xl mx-auto ">
          <p className="text-2xl">أخر الملاعب</p>

          <div className="flex flex-col gap-4 h-full max-h-[500px] overflow-scroll">
            {
              courtContext?.latestCourts?.map((court: any) => (
                <CourtComponent court={court} key={court?.id} />
              ))
            }
          </div>


        </div>
      </div> */}

      {/* footer */}
      <div id="div4" className={`footer p-5 flex gap- justify-between w-full max-w-6xl mx-auto transition-all duration-500 animate-me ${visibleDiv.includes('div4') ? 'opacity-100 mt-5' : 'mt-20 opacity-0'}`}>
        <span>
          <Image className="logo-animate" loading="lazy" alt="" width={300} height={300} src={'/images/logo.png'} />
        </span>
        <div className="contace font_light flex flex-col gap-3">
          <div className="phone flex flex-col">
            <label>الهاتف</label>
            <label>01203316333</label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}