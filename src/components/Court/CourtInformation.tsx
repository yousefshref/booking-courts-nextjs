import React, { useContext, useEffect, useState } from 'react'
import { BiBook, BiEdit, BiLocationPlus, BiSolidOffer, BiTrash } from "react-icons/bi"
import { BsClock, BsTools } from "react-icons/bs"
import { CgLock } from "react-icons/cg"
import { MdEvent } from "react-icons/md"
import { CiBookmark } from "react-icons/ci";
import { Button, IconButton, Tooltip } from "@mui/material"
import { tConvert } from "@/utlits/Functions"
import Link from "next/link"
import CourtImageComponent from "@/components/Court/CourtImage"
import { FcRating } from 'react-icons/fc'
import LoadingComponent from '../Utlits/LoadingComponent'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { CourtsContextProvider } from '@/contexts/CourtsContext'
import CourtBooks from './CourtBooks'

const CourtInformation = ({ court }: any) => {
  const userContext = useContext(AuthContextProvider)
  const courtContext = useContext(CourtsContextProvider)

  const [tools, setTools] = useState([])
  useEffect(() => {
    if (court?.additional_court) {
      setTools(court?.additional_court[0]?.tools_court)
    }
  }, [court?.additional_court])


  // books open the slider
  const [booksOpen, setBooksOpen] = useState(false)

  return (
    <div className='flex flex-col gap-8'>
      {
        court?.id && (
          <div className="buttons flex sm:flex-row flex-col-reverse gap-5 justify-between mx-auto w-full max-w-6xl">
            {
              court?.closed_now ? (
                <Button startIcon={<CgLock />} className='flex gap-1' variant="contained" disabled>
                  الملعب مغلق
                </Button>
              ) : (
                <div className='flex gap-5'>
                  <Link href={`/courts/${court?.id}/create/`}>
                    <Button
                      startIcon={<CiBookmark />}
                      className="flex gap-2 font_light"
                      variant="outlined"
                      size="large"
                      href=""
                    >
                      أحجز
                    </Button>
                  </Link>
                  {
                    userContext?.user?.is_staff || userContext?.user?.is_superuser &&
                    <Button
                      startIcon={<BiBook />}
                      className="flex gap-2 font_light"
                      variant="outlined"
                      color='secondary'
                      size="large"
                      href=""
                      onClick={() => setBooksOpen(court?.id)}
                    >
                      حجوزات اليوم
                    </Button>
                  }
                </div>
              )
            }

            {
              userContext?.user?.is_superuser || userContext?.user?.is_staff ? (
                <div className='flex gap-5'>
                  <Tooltip title={<p className='font_light'>تعديل علي الملعب</p>} enterDelay={200} leaveDelay={200}>
                    <IconButton onClick={() => courtContext?.setEditableCourt(true)} color="primary">
                      <BiEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={<p className='font_light'>حذف الملعب</p>} enterDelay={200} leaveDelay={200}>
                    <IconButton onClick={(e) => courtContext?.deleteCourt(e, court?.id)} color="error">
                      <BiTrash />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : null
            }
          </div>
        )
      }

      {/* books */}
      {
        (userContext?.user?.is_superuser || userContext?.user?.is_staff) ? <CourtBooks open={booksOpen} setOpen={setBooksOpen} /> : null
      }

      <div className="TOP md:flex-row flex-col flex gap-5 justify-between w-full max-w-6xl mx-auto from-neutral-200 to-indigo-50 bg-gradient-to-bl rounded-md shadow-xl p-3">
        <div className="flex flex-col gap-4 md:min-w-[300px]">
          {
            court?.id ? <div className="w-fit h-fit">
              <CourtImageComponent court={court} />
            </div> : <LoadingComponent />
          }
          <div className="flex flex-col gap-2">

            <div className="p-3 rounded-md bg-white shadow-lg w-full md:max-w-2xl">
              {
                court?.court_types?.name?.length > 0 && court?.court_types2?.name?.length > 0 ?
                  <div className="flex gap-1 justify-between">
                    <p className="my-auto">{court?.court_types?.name}</p>
                    <p className="my-auto">-</p>
                    <p className="my-auto">{court?.court_types2?.name}</p>
                  </div>
                  : <LoadingComponent />
              }
            </div>

            {
              court?.id ?
                court?.closed_from && (
                  <div className="p-3 rounded-md bg-white shadow-lg w-full md:max-w-2xl">
                    <div className="flex gap-1">
                      <span className="my-auto text-lg text-red-700">
                        <CgLock />
                      </span>
                      <p className="my-auto text-sm">يغلق من: {tConvert(court?.closed_from?.slice(0, 5))} - حتي: {tConvert(court?.closed_to?.slice(0, 5))}</p>
                    </div>
                  </div>
                )
                : <LoadingComponent />
            }

          </div>
        </div>
        <div className="left flex flex-col gap-4 w-full md:max-w-2xl">

          <div className="p-3 flex rounded-md bg-white shadow-lg w-full">
            {
              court?.title?.length > 0 && court?.description?.length > 0 ?
                <div className=" flex flex-col gap-1">
                  <h3>{court?.title}</h3>
                  <small className="font_light text-gray-600">{court?.description}</small>
                  <p>{court?.state_details?.name}</p>
                  <p className="text-green-600 text-2xl">{court?.price_per_hour} EGP</p>
                </div>
                : <LoadingComponent />
            }
          </div>

          <div className="p-3 flex rounded-md bg-white shadow-lg w-full md:max-w-2xl">
            {
              court?.open ?
                <div className="flex gap-1">
                  <span className="my-auto text-lg text-yellow-700">
                    <BsClock />
                  </span>
                  <p className="my-auto">يفتح من: {tConvert(court?.open?.slice(0, 5))} - حتي: {tConvert(court?.close?.slice(0, 5))}</p>
                </div>
                : <LoadingComponent />
            }
          </div>

          {
            court?.offer_price_per_hour ?
              <div className="p-3 rounded-md bg-white shadow-lg w-full md:max-w-2xl">
                <div className="flex gap-1">
                  <span className="my-auto text-lg text-indigo-600">
                    <BiSolidOffer />
                  </span>
                  <p className="my-auto">عرض خاص وخصم <span className="text-2xl text-green-600">{court?.offer_price_per_hour} EGP</span></p>
                </div>
                <p className="my-auto">العرض متاح من: {tConvert(court?.offer_from?.slice(0, 5))} - حتي: {tConvert(court?.offer_to?.slice(0, 5))}</p>
              </div>
              : ''
          }

          {
            court?.event_price ?
              <div className="p-3 rounded-md bg-white shadow-lg w-full md:max-w-2xl">
                <div className="flex gap-1">
                  <span className="my-auto text-lg text-orange-600">
                    <MdEvent />
                  </span>
                  <p className="my-auto">متاح حجز مناسبات</p>
                </div>
                <p className="my-auto">معاد المناسبات من: {tConvert(court?.event_from?.slice(0, 5))} - حتي: {tConvert(court?.event_to?.slice(0, 5))}</p>
              </div>
              : ''
          }

        </div>
      </div>

      {
        tools?.length > 0 || court?.court_features?.length > 0 ?
          <div className="BOTTOM flex flex-col gap-4 w-full max-w-2xl mx-auto p-2 shadow-xl from-indigo-100 to-gray-200 bg-gradient-to-br">

            {
              tools?.length > 0 ?
                <div className="tools flex flex-col gap-1 p-3 bg-white shadow-lg rounded-md">
                  <div className="flex gap-1">
                    <span className="my-auto">
                      <BsTools />
                    </span>
                    <p className="my-auto">ادوات متاحة للأستخدام</p>
                  </div>
                  <ul className="font_light">
                    {
                      tools?.map((tool: any) => (
                        <li key={tool?.id}>- {tool?.title}</li>
                      ))
                    }
                  </ul>
                </div>
                : null
            }

            {
              court?.court_features?.length > 0 &&
              <div className="feats flex flex-col gap-1 p-3 bg-white shadow-lg rounded-md">
                <div className="flex gap-1">
                  <span className="my-auto">
                    <FcRating />
                  </span>
                  <p className="my-auto">مميزات الملعب</p>
                </div>
                <ul className="font_light">
                  {
                    court?.court_features?.map((f: any) => (
                      <li key={f?.id} className="flex justify-between">
                        <p className="my-auto">- {f?.feature}</p>
                        <p className="flex gap-3">
                          {
                            f?.is_free ?
                              <span className="my-auto text-green-600">
                                مجانية
                              </span>
                              :
                              <span className="my-auto text-red-600">
                                رسوم
                              </span>
                          }
                          {
                            f?.is_available ?
                              <span className="my-auto text-green-600">
                                متاحة
                              </span>
                              :
                              <span className="my-auto text-red-600">
                                مغلقة
                              </span>
                          }
                        </p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            }

          </div>
          : null
      }

      <div className="location flex flex-col gap-4 w-full max-w-2xl mx-auto p-2 shadow-xl from-indigo-100 to-gray-200 bg-gradient-to-br">
        <div className="tools flex flex-col gap-1 p-3 bg-white shadow-lg rounded-md">
          {
            court?.location ?
              <Link href={court?.location} className="flex gap-1 transition-all hover:text-blue-600 text-blue-700">
                <span className="my-auto">
                  <BiLocationPlus />
                </span>
                <p className="my-auto">أضغط لتري المكان</p>
              </Link>
              : <LoadingComponent />
          }
        </div>
      </div>
    </div>
  )
}

export default CourtInformation