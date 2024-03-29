import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { BiPlus, BiPlusCircle, BiTrash } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { IconButton, Tooltip } from '@mui/material'
import { CourtsContextProvider } from '@/contexts/CourtsContext'
import { BooksContextProvider } from '@/contexts/BooksContext'
import { ImInfo } from 'react-icons/im'
import { StateContextProvider } from '@/contexts/StateContext'
import { MdTitle } from 'react-icons/md'
import { GrCurrency } from "react-icons/gr";
import { CiCircleCheck } from 'react-icons/ci'
import { server, times } from '@/utlits/Variabels'
import { AuthContextProvider } from '@/contexts/AuthContext'

const CourtEdit = ({ court }: any) => {

  const courtContex = useContext(CourtsContextProvider)
  const stateContex = useContext(StateContextProvider)
  const bookContext = useContext(BooksContextProvider)
  const authContext = useContext(AuthContextProvider)


  const [images, setImages] = useState<any>([])
  const [videos, setVideos] = useState<any>([])

  const [title, setTitle] = useState<any>(court?.title)
  const [description, setDescription] = useState<any>(court?.description)
  const [price, setPrice] = useState<any>(court?.price_per_hour)
  const [open, setOpen] = useState<any>(court?.open)
  const [close, setClose] = useState<any>(court?.close)
  const [state, setState] = useState<any>(court?.state)
  const [type1, setType1] = useState<any>(court?.type)
  const [type2, setType2] = useState<any>(court?.type2)
  const [location, setLocation] = useState<any>(court?.location)


  const [offerPrice, setOfferPrice] = useState<any>(court?.offer_price_per_hour)
  const [offerFrom, setOfferFrom] = useState<any>(court?.offer_from)
  const [offerTo, setOfferTo] = useState<any>(court?.offer_to)

  const [eventPrice, setEventPrice] = useState<any>(court?.event_price)
  const [eventFrom, setEventFrom] = useState<any>(court?.event_from)
  const [eventTo, setEventTo] = useState<any>(court?.event_to)

  const [isClosed, setIsClosed] = useState<any>(court?.closed_now)
  const [closedFrom, setClosedFrom] = useState<any>(court?.closed_from)
  const [closedTo, setClosedTo] = useState<any>(court?.closed_to)

  const [ballPrice, setBallPrice] = useState<any>(0)

  const [tools, setTools] = useState<any>([])
  const [features, setFeatures] = useState<any>([])

  useEffect(() => {
    if (court?.additional_court) {
      setTools(court?.additional_court[0]?.tools_court)
    }
  }, [court, court?.length])

  useEffect(() => {
    if (court?.court_features) {
      setFeatures(court?.court_features)
    }
  }, [court, court?.court_features, court?.length])

  useEffect(() => {
    if (court?.id) {
      setTitle(court?.title);
      setDescription(court?.description);
      setPrice(court?.price_per_hour);
      setOpen(court?.open);
      setClose(court?.close);
      setState(court?.state);
      setType1(court?.type);
      setType2(court?.type2);
      setLocation(court?.location);
      setOfferPrice(court?.offer_price_per_hour);
      setOfferFrom(court?.offer_from);
      setOfferTo(court?.offer_to);
      setEventPrice(court?.event_price);
      setEventFrom(court?.event_from);
      setEventTo(court?.event_to);
      setIsClosed(court?.closed_now);
      setClosedFrom(court?.closed_from);
      setClosedTo(court?.closed_to);
      setBallPrice(court?.ball_price);
    }
  }, [court?.id, courtContex?.editableCourt]);



  const handleSubmit = (e: any) => {

    // check images and videos
    if (images?.length == 0 && court?.court_image?.length == 0) {
      authContext?.setMessage('يجب ان تختار علي الاقل صورة واحدة')
      authContext?.setMessageDisplay('yes')
    } else {
      if ((offerPrice !== 0 && (!offerFrom || !offerTo)) || offerPrice == 0 && (offerFrom || offerTo)) {
        authContext?.setMessage('لا يمكن ترك السعر فارغ واختيار اوقات العروض او العكس.')
        authContext?.setMessageDisplay('yes')
      }
      else {
        if ((eventPrice && (!eventFrom || !eventTo)) || !eventPrice && (eventFrom || eventTo)) {
          authContext?.setMessage('لا يمكن ترك السعر فارغ واختيار اوقات المناسبات او العكس.')
          authContext?.setMessageDisplay('yes')
        }
        else {
          // tools
          const emptyTool = tools?.find((e: any) => e?.title == '')
          if (emptyTool) {
            authContext?.setMessage('يجب ان تملأ خانة الادوات او تحذفها')
            authContext?.setMessageDisplay('yes')
          }
          else {
            // features
            const emptyFeat = features?.find((e: any) => e?.feature === '' || e?.is_free === '' || e?.is_available === '')
            if (emptyFeat) {
              authContext?.setMessage('تأكد من صحة بيانات الميزات')
              authContext?.setMessageDisplay('yes')
            }
            else {
              // CREATE FINALLY
              courtContex?.updateCourt(
                e,
                images, videos, setImages, setVideos,
                title, description, price, open, close, state, type1, type2, location,
                offerPrice, offerFrom, offerTo,
                eventPrice, eventFrom, eventTo,
                isClosed, closedFrom, closedTo,
                tools, features, ballPrice
              )
            }
          }
        }
      }
    }

    // tools
    // features
  }

  return (
    <div className={`
    fixed flex flex-col transition-all duration-500 justify-end w-screen from-black to-transparent bg-gradient-to-t bottom-0 left-0
    ${courtContex?.editableCourt ? "h-screen" : "h-0"}
    `}>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
      }} className={
        `
        z-50 fixed flex flex-col gap-1 overflow-scroll left-0 bg-white bottom-0 w-screen rounded-t-2xl
        transition-all duration-700 ${courtContex?.editableCourt ? 'max-h-[calc(100vh-200px)] h-[calc(100vh-200px)] p-5' : 'h-0 p-0'}
        `
      }>
        <div className='buttons'>
          <span onClick={() => courtContex?.setEditableCourt(false)} className='w-fit bg-red-400 p-1 rounded-full transition-all hover:bg-red-300 flex cursor-pointer'>
            <CgClose />
          </span>
        </div>

        {/* images and videos */}
        <div className={`imagesAndVideos
        flex flex-col gap-2
        `}>
          <p>التعديل علي الصور والفديوهات</p>
          <hr className='p-[0.4px] w-full bg-indigo-600' />
          <div className='videos_images flex flex-col gap-3'>

            <div className='images flex gap-2 flex-col'>
              <p className='text-sm text-yellow-700'>من الأفضل ان تكون الصورة 250px X 250px</p>
              <div className='images flex gap-3 flex-wrap'>
                <Tooltip title={<p className='font_light'>اضف صورة جديدة</p>}>
                  <div onClick={() => {
                    const inputImageField = document.getElementById('inputImageField')
                    if (inputImageField) {
                      inputImageField?.click()
                      inputImageField.addEventListener('change', (e: any) => {
                        // not exist add
                        const existImage = images?.find((img: any) => img?.name == e.target.files[0]?.name)
                        if (existImage) {
                        } else {
                          setImages((prev: any) => [...images, e.target.files[0]])
                        }
                      });
                    }
                  }} className='addImage transition-all hover:bg-neutral-100 cursor-pointer p-2 w-[150px] flex flex-col justify-center h-[150px] border-indigo-600 border'>
                    <span className='mx-auto'>
                      <BiPlus />
                    </span>
                    <input hidden type="file" id="inputImageField" />
                  </div>
                </Tooltip>

                <div className='images flex-wrap flex gap-3'>
                  {
                    // exist images
                    court?.court_image?.map((img: any) => (
                      <div key={img?.id} className='relative'>
                        <span onClick={() => {
                          courtContex?.deleteCourtImage(img?.id)
                          bookContext?.setDeleteOpenMessage('تم حذف هذه الصورة')
                        }} className='closeBtn z-10'>
                          <CgClose />
                        </span>
                        <Image className='min-w-[150px] max-w-[150px] max-h-[150px] min-h-[150px]' alt={''} width={150} height={150} src={server + img?.image} />
                      </div>
                    ))
                  }
                  {/* new images */}
                  {
                    images?.length > 0 &&
                    images?.map((img: any, index: any) => (
                      <div key={index} className='relative'>
                        <span
                          onClick={() => {
                            const newImages = images?.filter((e: any) => e?.name != img?.name)
                            setImages(newImages)
                            bookContext?.setDeleteOpenMessage('تم حذف هذه الصورة')
                          }} className='closeBtn z-10'>
                          <CgClose />
                        </span>
                        <Image key={img?.name} className='min-w-[150px] max-w-[150px] max-h-[150px] min-h-[150px]' alt={''} width={150} height={150} src={URL.createObjectURL(img)} />
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>

            <div className='videos flex gap-2 flex-col'>
              <p className='text-sm text-yellow-700'>من الافضل ان يكون 250px X 250px وقليل الوقت</p>
              <div className='images flex gap-3 flex-wrap'>
                <Tooltip title={<p className='font_light'>اضف فديو جديدة</p>}>
                  <div onClick={() => {
                    const inputVideoField = document.getElementById('inputVideoField')
                    if (inputVideoField) {
                      inputVideoField?.click()
                      inputVideoField.addEventListener('change', (e: any) => {
                        // not exist add
                        const existVideo = videos?.find((video: any) => video?.name == e.target.files[0]?.name)
                        if (existVideo) {
                        } else {
                          setVideos((prev: any) => [...videos, e.target.files[0]])
                        }
                      });
                    }
                  }} className='addVideo transition-all hover:bg-neutral-100 cursor-pointer p-2 w-[150px] flex flex-col justify-center h-[150px] border-indigo-600 border'>
                    <span className='mx-auto'>
                      <BiPlus />
                    </span>
                    <input hidden type="file" id="inputVideoField" />
                  </div>
                </Tooltip>

                <div className='videos flex gap-3'>
                  {
                    // exist
                    court?.court_video?.map((video: any) => (
                      <div key={video?.id} className='relative'>
                        <span onClick={() => {
                          courtContex?.deleteCourtVideo(video?.id)
                          bookContext?.setDeleteOpenMessage('تم حذف هذا الفديو')
                        }} className='closeBtn z-10'>
                          <CgClose />
                        </span>
                        <video className='w-[150px] h-[150px]' width={150} height={150} src={server + video?.video}>
                        </video>
                      </div>
                    ))
                  }
                  {
                    // new
                    videos?.map((video: any, i: any) => (
                      <div key={i} className='relative'>
                        <span
                          onClick={() => {
                            const newVideos = images?.filter((e: any) => e?.name != video?.name)
                            setVideos(newVideos)
                            bookContext?.setDeleteOpenMessage('تم حذف هذا الفديو')
                          }}
                          className='closeBtn z-10'>
                          <CgClose />
                        </span>
                        <video className='w-[150px] h-[150px]' width={200} height={200} src={URL.createObjectURL(video)}>
                        </video>
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>

          </div>
        </div>

        <hr className='my-5' />

        {/* name descrioptn time types state price, types ... more */}
        <div className={`
        basicInfo flex flex-col gap-3
        `}>
          <b>المعلومات الأساسية</b>
          <hr className='p-[0.4px] w-full bg-indigo-600' />
          <div className='infosContainer w-full flex flex-wrap gap-5 justify-around'>

            {/* top */}
            <div className='TOP flex w-full flex-wrap gap-5 justify-around'>
              {/* name des price */}
              <div className='flex flex-col gap-5 w-full max-w-sm'>
                <div className='name ffg-1'>
                  <label>الأسم</label>
                  <input required onChange={(e: any) => {
                    setTitle(e.target.value)
                  }} value={title} type="text" placeholder='اسم الملعب' />
                </div>

                <div className='desc ffg-1'>
                  <label>الوصف</label>
                  <textarea required onChange={(e: any) => {
                    setDescription(e.target.value)
                  }} value={description} placeholder='اكتب وصف قليل مفيد' />
                </div>

                <div className='price ffg-1'>
                  <label>السعر لكل ساعة</label>
                  <input required onChange={(e: any) => {
                    setPrice(e.target.value)
                  }} type='number' value={price} placeholder='السعر بالمصري' />
                </div>
              </div>

              {/* time state */}
              <div className='flex flex-col gap-5  w-full max-w-sm'>

                <div className='state ffg-1'>
                  <label>أختر المكان</label>
                  <select onChange={(e) => setState(e.target.value)} value={state}>
                    <option value={''}>{'أختر المكان'}</option>
                    {
                      stateContex?.states?.map((s: any) => (
                        <option key={s?.id} value={s?.id}>{s?.name}</option>
                      ))
                    }
                  </select>
                </div>

                <div className='times ffg-1'>
                  <label>اوقات العمل</label>
                  <div className='flex gap-3'>
                    <div className='ffg-1'>
                      <label>من</label>
                      <select onChange={(e: any) => {
                        if (e.target.value > close) {
                          authContext?.setMessage('أختر وقت الانتهاء الاغلاق من الفتح')
                          authContext?.setMessageDisplay('yes')
                        } else {
                          setOpen(e.target.value)
                        }
                      }} value={open} required>
                        <option value={''}>{'أختر وقت الفتح'}</option>
                        {
                          times?.map((time: any, i: any) => (
                            <option key={i} value={time?.value}>{time?.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='ffg-1'>
                      <label>حتي</label>
                      <select onChange={(e: any) => {
                        if (e.target.value < open) {
                          authContext?.setMessage('أختر وقت الانتهاء الاغلاق من الفتح')
                          authContext?.setMessageDisplay('yes')
                        } else {
                          setClose(e.target.value)
                        }
                      }} value={close} required>
                        <option value={''}>{'أختر وقت الغلق'}</option>
                        {
                          times?.map((time: any, i: any) => (
                            <option key={i} value={time?.value}>{time?.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />

            {/* down (types location) */}
            <div className='DOWN flex w-full justify-around flex-wrap gap-5'>

              <div className='type1 ffg-1'>
                <label>نوع الملعب</label>
                <select required onChange={(e) => setType1(e.target.value)} value={type1}>
                  <option value="">اختر</option>
                  {
                    courtContex?.types?.map((type: any) => (
                      <option key={type?.id} value={type?.id}>{type?.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className='type2 ffg-1'>
                <label>مساحة الملعب</label>
                <select required onChange={(e) => setType2(e.target.value)} value={type2}>
                  <option value="">اختر</option>
                  {
                    courtContex?.types2?.map((type: any) => (
                      <option key={type?.id} value={type?.id}>{type?.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className='location ffg-1'>
                <label>المكان</label>
                <input required onChange={(e: any) => {
                  setLocation(e.target.value)
                }} value={location} type="url" placeholder='اسم الملعب' />
              </div>

            </div>


          </div>
        </div>

        <hr className='my-5' />

        {/* offers events location closed times is closed */}
        <div className='offers_events flex flex-col gap-2'>
          <b>معلومات اضافية</b>
          <hr className='p-[0.5px] w-full bg-indigo-600' />
          <div className='infos flex flex-wrap gap-8 justify-around'>

            <div className='offers flex flex-col gap-8 w-full max-w-xs'>
              <div className='off_price ffg-3 gap-8'>
                <div className='flex gap-8'>
                  <label className='my-auto'>سعر العرض (بالسالب)</label>
                  <Tooltip title={<p className='font_light'>لو تركتها فارغة هذا معناه انه لا يوجد عرض</p>}>
                    <span className='text-lg text-sky-600 my-auto'>
                      <ImInfo />
                    </span>
                  </Tooltip>
                </div>
                <input onChange={(e: any) => {
                  setOfferPrice(e.target.value)
                }} defaultValue={offerPrice} type="number" placeholder='مثال: -150' />
              </div>
              <div className='off_times ffg-3'>
                <div className='flex gap-4'>
                  <label className='my-auto'>اوقات العرض</label>
                </div>
                <div className='flex gap-3'>
                  <div className='ffg-1'>
                    <label className='flex gap-2 justify-between'>
                      <p>من</p>
                    </label>

                    <select onChange={(e: any) => {
                      if (e.target.value > offerTo) {
                        authContext?.setMessage('أختر وقت الانتهاء اكبر من البدء')
                        authContext?.setMessageDisplay('yes')
                      } else {
                        setOfferFrom(e.target.value)
                      }
                    }} value={offerFrom}>
                      <option value={''}>{'أختر وقت البدء'}</option>
                      {
                        times?.map((time: any, i: any) => (
                          <option key={i} value={time?.value}>{time?.name}</option>
                        ))
                      }
                    </select>

                  </div>
                  <div className='ffg-1'>
                    <label className='flex gap-2 justify-between'>
                      <p>حتي</p>
                    </label>

                    <select onChange={(e: any) => {
                      if (e.target.value < offerFrom) {
                        authContext?.setMessage('أختر وقت الانتهاء اكبر من البدء')
                        authContext?.setMessageDisplay('yes')
                      } else {
                        setOfferTo(e.target.value)
                      }
                    }} value={offerTo}>
                      <option value={''}>{'أختر وقت الانتهاء'}</option>
                      {
                        times?.map((time: any, i: any) => (
                          <option key={i} value={time?.value}>{time?.name}</option>
                        ))
                      }
                    </select>

                  </div>
                </div>
              </div>
            </div>

            <div className='events flex flex-col gap-8 w-full max-w-xs'>
              <div className='off_price ffg-1'>
                <div className='flex gap-4'>
                  <label className='my-auto'>سعر المناسبات</label>
                  <Tooltip title={<p className='font_light'>سيتم اضفاتها علي سعر الساعة الاساسي</p>}>
                    <span className='text-lg text-sky-600 my-auto'>
                      <ImInfo />
                    </span>
                  </Tooltip>
                </div>
                <input onChange={(e: any) => {
                  setEventPrice(e.target.value)
                }} value={eventPrice} type="number" placeholder='مثال: 50' />
              </div>
              <div className='off_times ffg-1'>
                <div className='flex gap-4'>
                  <label className='my-auto'>اوقات المناسبات</label>
                </div>
                <div className='flex gap-3'>
                  <div className='ffg-1'>
                    <label className='flex gap-2 justify-between'>
                      <p>من</p>
                    </label>

                    <select onChange={(e: any) => {
                      if (e.target.value > eventTo) {
                        authContext?.setMessage('أختر وقت الانتهاء اكبر من البدء')
                        authContext?.setMessageDisplay('yes')
                      } else {
                        setEventFrom(e.target.value)
                      }
                    }} value={eventFrom}>
                      <option value={''}>{'أختر وقت البدء'}</option>
                      {
                        times?.map((time: any, i: any) => (
                          <option key={i} value={time?.value}>{time?.name}</option>
                        ))
                      }
                    </select>

                  </div>
                  <div className='ffg-1'>
                    <label className='flex gap-2 justify-between'>
                      <p>حتي</p>
                    </label>

                    <select onChange={(e: any) => {
                      if (e.target.value < eventFrom) {
                        authContext?.setMessage('أختر وقت الانتهاء اكبر من البدء')
                        authContext?.setMessageDisplay('yes')
                      } else {
                        setEventTo(e.target.value)
                      }
                    }} value={eventTo}>
                      <option value={''}>{'أختر وقت الانتهاء'}</option>
                      {
                        times?.map((time: any, i: any) => (
                          <option key={i} value={time?.value}>{time?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>


            <div className='closed flex flex-col gap-8 w-full max-w-xs'>
              <div className='off_price ffg-1'>
                <div className='flex gap-4'>
                  <div className='flex gap-2'>
                    <label className='my-auto'>هل الملعب مغلق</label>
                    <Tooltip title={<p className='font_light'>اتركها فارغة لو لا يوجد اوقات مغلقة</p>}>
                      <span className='text-lg text-sky-600 my-auto'>
                        <ImInfo />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <select onChange={(e) => setIsClosed(e.target.value)} value={isClosed}>
                  <option value={'False'}>لا</option>
                  <option value={'True'}>نعم</option>
                </select>
              </div>
              <div className='off_times ffg-1'>
                <div className='flex gap-4'>
                  <label className='my-auto'>هل مغلق في اوقات معينة ؟</label>
                </div>
                <div className='flex gap-3'>
                  <div className='ffg-1'>
                    <label className='flex gap-2 justify-between'>
                      <p>حتي</p>
                    </label>

                    <select onChange={(e: any) => {
                      if (e.target.value > closedTo) {
                        authContext?.setMessage('أختر وقت الانتهاء اكبر من البدء')
                        authContext?.setMessageDisplay('yes')
                      } else {
                        setClosedFrom(e.target.value)
                      }
                    }} value={closedFrom}>
                      <option value={''}>{'أختر وقت بدأ'}</option>
                      {
                        times?.map((time: any, i: any) => (
                          <option key={i} value={time?.value}>{time?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='ffg-1'>
                    <label className='flex gap-2 justify-between'>
                      <p>من</p>
                    </label>

                    <select onChange={(e: any) => {
                      if (e.target.value < closedFrom) {
                        authContext?.setMessage('أختر وقت الانتهاء اكبر من البدء')
                        authContext?.setMessageDisplay('yes')
                      } else {
                        setClosedTo(e.target.value)
                      }
                    }} value={closedTo}>
                      <option value={''}>{'أختر وقت الانتهاء'}</option>
                      {
                        times?.map((time: any, i: any) => (
                          <option key={i} value={time?.value}>{time?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className='ballPrice flex flex-col gap-8 w-full max-w-xs'>
              <div className='off_price ffg-1'>
                <div className='flex gap-4'>
                  <div className='flex gap-2'>
                    <label className='my-auto'>سعر الكرة</label>
                    <Tooltip title={<p className='font_light'>لو لا يوجد كرة للملعب اتركة فارغ</p>}>
                      <span className='text-lg text-sky-600 my-auto'>
                        <ImInfo />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <input required onChange={(e: any) => {
                  setBallPrice(e.target.value)
                }} value={ballPrice} type="number" placeholder='سعر الكرة (لو موجودة)' />
              </div>
            </div>

          </div>
        </div>

        <hr className='my-5' />


        {/* tools and features */}
        <div className='tools_features w-full flex flex-col gap-2'>
          <p>الادوات والمميزات</p>
          <hr className='p-[0.5px] w-full bg-indigo-600' />
          <div className='contentContainer flex-wrap flex gap-5 justify-around'>

            <div className='tools flex flex-col gap-2 w-full max-w-sm'>
              <div className='flex gap-2 justify-between'>
                <p>-الأدوات التي يمكن استخدامها</p>
                <IconButton onClick={() => {
                  const err = tools?.find((f: any) => f?.title == '' || f?.price == 0)

                  if (err) {
                    alert('امليء الخانة الجديدة اولا')

                  } else {
                    const newObj = {
                      index: tools?.length + 1,
                      title: '',
                      price: 0,
                    }
                    setTools((prev: any) => [...prev, newObj])
                  }

                }} size='small' color='success'>
                  <BiPlusCircle />
                </IconButton>
              </div>
              <div className='tools flex flex-col gap-3'>

                {
                  tools?.length > 0 ?
                    tools?.map((tool: any, index: any) => (
                      <div key={index} className='tool flex flex-col gap-1'>
                        <div className='w-full'>
                          <IconButton onClick={() => {
                            const exist = tools?.find((t: any) => t?.price == tool?.price && t?.title == tool?.title)
                            if (exist?.index) {
                              setTools(tools?.filter((f: any) => f?.price !== tool?.price && f?.title !== tool?.title))
                              bookContext?.setDeleteOpenMessage('تم حذف الاداة')
                            } else {
                              courtContex?.deleteCourtTool(tool?.id)
                              bookContext?.setDeleteOpenMessage('تم حذف الاداة')
                            }
                          }} className='me-auto' size='small' color='error'>
                            <BiTrash />
                          </IconButton>
                        </div>
                        <div className='flex gap-3 justify-between'>
                          <div className='flex relative w-full'>
                            <input onChange={(e: any) => {
                              const exist = tools?.find((f: any) => f?.title == tool?.title && f?.price == tool?.price)
                              if (exist) {
                                exist.title = e.target.value
                              }
                            }} defaultValue={tool?.title} type="text" className='w-full max-w-full ps-5' placeholder='اسم الأداه' />
                            <span className='absolute top-[50%] translate-y-[-50%] right-1'>
                              <MdTitle />
                            </span>
                          </div>
                          <div className='flex relative w-full max-w-[100px]'>
                            <input onChange={(e: any) => {
                              const exist = tools?.find((f: any) => f?.title == tool?.title && f?.price == tool?.price)
                              if (exist) {
                                exist.price = e.target.value
                              }
                            }} defaultValue={tool?.price} type="number" className='w-full ps-6' placeholder='سعرها' />
                            <span className='absolute top-[50%] translate-y-[-50%] right-1'>
                              <GrCurrency />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                    :
                    <div className='flex p-2 rounded-md border gap-1 border-yellow-700 bg-yellow-200 text-yellow-700'>
                      <p>لا يوجد أدوات</p>
                    </div>
                }


              </div>

            </div>


            <div className='feature flex flex-col gap-2 w-full max-w-sm'>
              <div className='flex gap-2 justify-between'>
                <p>-مزايا الملعب</p>
                <IconButton onClick={() => {
                  const err = features?.find((f: any) => f?.feature == '')
                  if (err) {
                    alert('امليء الخانة الجديدة اولا')
                  } else {
                    const newObj = {
                      index: features?.length + 1,
                      feature: '',
                      is_free: false,
                      is_available: true,
                    }
                    setFeatures((prev: any) => [...prev, newObj])
                  }
                }} size='small' color='success'>
                  <BiPlusCircle />
                </IconButton>
              </div>
              <div className='features flex flex-col gap-3'>

                {
                  features?.length > 0 ?
                    features?.map((feature: any, index: any) => (
                      <div key={index} className='feature flex flex-col gap-1'>
                        <div className='w-full'>
                          <IconButton onClick={() => {
                            const exist = features?.find((t: any) => t?.feature == feature?.feature)
                            if (exist?.index) {
                              setFeatures(features?.filter((f: any) => f?.feature !== feature?.feature))
                              bookContext?.setDeleteOpenMessage('تم حذف الميزة')
                            } else {
                              courtContex?.deleteCourtFeature(feature?.id)
                              bookContext?.setDeleteOpenMessage('تم حذف الميزة')
                            }
                          }} className='me-auto' size='small' color='error'>
                            <BiTrash />
                          </IconButton>
                        </div>
                        <div className='flex gap-2 flex-col justify-between'>
                          <div className='flex relative w-full'>
                            <input onChange={(e: any) => {
                              const exist = features?.find((f: any) => f?.feature == feature?.feature)
                              if (exist) {
                                exist.feature = e.target.value
                              }
                            }} defaultValue={feature?.feature} type="text" className='w-full max-w-full ps-5' placeholder='اسم الأداه' />
                            <span className='absolute top-[50%] translate-y-[-50%] right-1'>
                              <MdTitle />
                            </span>
                          </div>
                          <div className='flex gap-3 w-full'>
                            <div className='flex relative w-full'>
                              <select onChange={(e: any) => {
                                const exist = features?.find((f: any) => f?.feature == feature?.feature)
                                if (exist) {
                                  exist.is_free = e.target.value
                                }
                              }} defaultValue={feature?.is_free ? "true" : "false"} className='w-full ps-6'>
                                <option value="">مجانية ؟</option>
                                <option value={"false"}>لا</option>
                                <option value={'true'}>نعم</option>
                              </select>
                              <span className='absolute top-[50%] translate-y-[-50%] right-1'>
                                <GrCurrency />
                              </span>
                            </div>
                            <div className='flex relative w-full'>
                              <select onChange={(e: any) => {
                                const exist = features?.find((f: any) => f?.feature == feature?.feature)
                                if (exist) {
                                  exist.is_available = e.target.value
                                }
                              }} defaultValue={feature?.is_available ? "true" : "false"} className='w-full ps-6'>
                                <option value="">متاحة ؟</option>
                                <option value={'true'}>نعم</option>
                                <option value={"false"}>لا</option>
                              </select>
                              <span className='absolute top-[50%] translate-y-[-50%] right-1'>
                                <CiCircleCheck />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    :
                    <div className='flex p-2 rounded-md border gap-1 border-yellow-700 bg-yellow-200 text-yellow-700'>
                      <p>لا يوجد أدوات</p>
                    </div>
                }


              </div>

            </div>


          </div>
        </div>


        <br />
        <br />
        <button className='md:max-w-xs w-full bg-green-300 hover:bg-green-200 p-2 rounded-md'>حسنا</button>
      </form>

    </div>
  )
}

export default CourtEdit