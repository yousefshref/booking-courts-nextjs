import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BiExpand } from 'react-icons/bi';
import { BsArrowDown, BsArrowLeft, BsArrowRight, BsArrowUp } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { server } from '../../../server';


const CourtImage = ({ court }: any) => {
  const [activeImage, setActiveImage] = useState<any>(null)
  useEffect(() => {
    if (court?.court_image) {
      setActiveImage(court?.court_image[0])
    }
  }, [court, court?.court_image])
  const [openImage, setOpenImage] = useState(false)

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      const video = document.getElementById('video') as HTMLVideoElement;
      if (video) {
        video.addEventListener('click', function () {
          if (!video.paused) {
            video.pause();
          }
        });
      }
    });
  }, [])

  return (
    <>
      <div className="img flex flex-col md:flex-row gap-2">
        <div className='relative'>
          {
            activeImage?.image ?
              <Image className="rounded-md md:h-[250px] md:w-[250px] w-full " loading="lazy" alt="alt" width={200} height={200} src={server + activeImage?.image} />
              : (
                <>
                  <video id="video" width="250" height="250" controls>
                    <source src={server + activeImage?.video} type="video/mp4" />
                  </video>
                </>
              )
          }
          <span onClick={() => setOpenImage(true)} className='absolute top-1 right-1 cursor-pointer bg-white p-1 w-fit rounded-full'>
            <BiExpand />
          </span>
        </div>
        <div className="images flex md:flex-col flex-row gap-2
              h-full max-h-[250px] p-1 md:max-w-[200px] max-w-[300px] overflow-hidden
            ">
          {
            court?.court_image?.length > 3 &&
            <span onClick={() => {
              const smallImages = document.getElementById(`smallImages_${court?.id}`)
              if (smallImages) {
                smallImages.scrollTo({
                  top: smallImages.scrollTop - 50,
                  behavior: 'smooth'
                });
              }
            }} className='mx-auto hidden md:block shadow-lg p-1 bg-indigo-100 text-neutral-800 rounded-full w-fit transition-all hover:bg-indigo-50 cursor-pointer'>
              <BsArrowUp />
            </span>
          }
          {
            court?.court_image?.length > 3 &&
            <span onClick={() => {
              const smallImages = document.getElementById(`smallImages_${court?.id}`)
              if (smallImages) {
                smallImages.scrollTo({
                  left: smallImages.scrollLeft - 50,
                  behavior: 'smooth'
                });
              }
            }} className='mx-auto my-auto h-fit block md:hidden shadow-lg p-1 bg-indigo-100 text-neutral-800 rounded-full w-fit transition-all hover:bg-indigo-50 cursor-pointer'>
              <BsArrowRight />
            </span>
          }
          <div id={`smallImages_${court?.id}`} className='imagesContaoiner flex md:flex-col flex-row transition-all duration-700 h-full overflow-scroll gap-3'>
            {
              court?.court_image?.length > 0 && court?.court_image?.map((image: any) => (
                <span onClick={() => setActiveImage(image)} className={`cursor-pointer `} key={image?.id}>
                  <Image className={`max-w-[50px] max-h-[50px] transition-all rounded-md ${activeImage?.id == image?.id && 'border-indigo-500 border-2 w-[55px] h-[55px]'}`} loading="lazy" alt="alt" width={200} height={200} src={server + image?.image} />
                </span>
              ))
            }
            {
              court?.court_video?.length > 0 && court?.court_video?.map((image: any) => (
                <span onClick={() => setActiveImage(image)} className={`cursor-pointer `} key={image?.id}>
                  {/* <Image className={`max-w-[50px] max-h-[50px] transition-all rounded-md ${activeImage?.id == image?.id && 'border-indigo-500 border-2 w-[55px] h-[55px]'}`} loading="lazy" alt="alt" width={200} height={200} src={server + image?.video} /> */}
                  <video id="video" width="50" height="50" className='rounded-md'>
                    <source src={server + image?.video} type="video/mp4" />
                  </video>
                </span>
              ))
            }
          </div>
          {
            court?.court_image?.length > 3 &&
            <span onClick={() => {
              const smallImages = document.getElementById(`smallImages_${court?.id}`)
              if (smallImages) {
                smallImages.scrollTo({
                  left: smallImages.scrollLeft + 50,
                  behavior: 'smooth'
                });
              }
            }} className='mx-auto my-auto h-fit block md:hidden shadow-lg p-1 bg-indigo-100 text-neutral-800 rounded-full w-fit transition-all hover:bg-indigo-50 cursor-pointer'>
              <BsArrowLeft />
            </span>
          }
          {
            court?.court_image?.length > 3 &&
            <span onClick={() => {
              const smallImages = document.getElementById(`smallImages_${court?.id}`)
              if (smallImages) {
                smallImages.scrollTo({
                  top: smallImages.scrollTop + 50,
                  behavior: 'smooth'
                });
              }
            }} className='mx-auto hidden md:block shadow-lg p-1 bg-indigo-100 text-neutral-800 rounded-full w-fit transition-all hover:bg-indigo-50 cursor-pointer'>
              <BsArrowDown />
            </span>
          }
        </div>
      </div>

      {/* open image */}
      <div className={`flex ${openImage ? 'w-opacity-100 p-5' : 'opacity-0 -z-50 p-0 h-0'} duration-700 transition-all fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex-col gap-2 z-30 max-w-xl w-full mx-auto`}>
        <span onClick={() => setOpenImage(false)} className={`
        bg-red-700 transition-all hover:bg-red-600 text-white w-fit p-2 rounded-full cursor-pointer text-2xl
        ${openImage ? "opacity-100" : "opacity-0"}
        `}>
          <CgClose />
        </span>
        <span className={`
            overflow-hidden transition-all duration-500 ${openImage ? 'h-full w-full' : 'h-[200px] w-0'}
            `}>
          <Image className={`rounded-md w-full`} layout='responsive' loading="lazy" alt="alt" width={500} height={500} src={server + activeImage?.image} />
        </span>
      </div>
    </>
  )
}

export default CourtImage