import { paiedWith } from '../../utlits/Variabels'
import { tConvert } from '@/utlits/Functions'
import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { BiFootball, BiParty } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { IoCash, IoCashOutline } from 'react-icons/io5'
import { MdEvent, MdSportsFootball } from 'react-icons/md'
import { BsArrowDown } from 'react-icons/bs'
import { CourtsContextProvider } from '@/contexts/CourtsContext'
import { FaFootball } from 'react-icons/fa6'
import { AuthContextProvider } from '@/contexts/AuthContext'

const Time = ({ time, index }: any) => {
  const courtContext = useContext(CourtsContextProvider)
  const userContext = useContext(AuthContextProvider)

  const court = courtContext?.court
  const selectedSlots = courtContext?.selectedSlots
  const tools = court?.additional_court[0]?.tools_court

  const exist = selectedSlots?.find((e: any) => e?.index == index)


  const [isPaiedValue, setIsPaiedValue] = useState<any>(exist.is_paied == 'true' ? true : false)
  useEffect(() => {
    setIsPaiedValue(exist.is_paied == 'true' ? true : false)
  }, [exist.is_paied, selectedSlots])

  const [withBallValue, setWithBallValue] = useState<any>(exist.with_ball == 'true' ? true : false)
  useEffect(() => {
    setWithBallValue(exist.with_ball == 'true' ? true : false)
  }, [exist.with_ball, selectedSlots])

  const [eventValue, setEventValue] = useState<any>(exist.event == 'true' ? true : false)
  useEffect(() => {
    setEventValue(exist.event == 'true' ? true : false)
  }, [exist.event, selectedSlots])


  // ball
  const [ballPrice, setBallPrice] = useState(withBallValue ? court?.ball_price : 0)
  useEffect(() => {
    setBallPrice(withBallValue ? court?.ball_price : 0)
  }, [withBallValue])

  // event
  const [eventPrice, setEventPrice] = useState(eventValue ? court?.event_price : 0)
  useEffect(() => {
    setEventPrice(eventValue ? court?.event_price : 0)
  }, [eventValue])

  // tools
  const [selectedTools, setSelectedTools] = useState<any>([])
  const selectedTool = selectedTools?.filter((e: any) => e?.book_from == time?.book_from && e?.book_to == e?.book_to)

  const toolsTotalPrice = selectedTool?.length > 0 ? selectedTool?.reduce((a: any, b: any) => {
    return a + b?.tool?.price
  }, 0) : 0


  // offers
  // if inside offers times
  const isOffer = court?.offer_price_per_hour && Number(court?.offer_from?.slice(0, 2)) <= Number(time?.book_from?.slice(0, 2)) && Number(court?.offer_to?.slice(0, 2)) >= Number(time?.book_to?.slice(0, 2))
  const offerPrice = isOffer ? court?.offer_price_per_hour : 0

  // price
  const price = court?.price_per_hour


  // total Price
  const totalPrice = price + ballPrice + eventPrice + toolsTotalPrice + offerPrice


  const [paied_with, set_paied_with] = useState(exist.paied)
  useEffect(() => {
    set_paied_with(exist.paied)
  }, [paied_with])


  return (
    <div className='from-indigo-100 via-purple-100 to-indigo-100 bg-gradient-to-br p-3 flex flex-col gap-1 rounded-md shadow-md'>
      <div className='flex justify-between'>
        <p>من: {tConvert(time?.book_from)} حتي: {tConvert(time?.book_to)}</p>
        {
          isOffer &&
          <div className='offer flex gap-2 text-indigo-600'>
            <span className='my-auto'>
              <BiParty />
            </span>
            <p className='my-auto'>تم اضافة العرض وخصم: {offerPrice} EGP</p>
          </div>
        }
      </div>
      <hr className='p-[0.5px] bg-indigo-700 my-2' />
      {/* boot to date */}
      <Accordion>
        <AccordionSummary expandIcon={<BsArrowDown />}>تثبيت الساعة</AccordionSummary>
        <AccordionDetails>
          <div className='flex from-neutral-100 to-gray-100 shadow-lg bg-gradient-to-tr p-3 flex-col gap-2'>
            <div className='flex gap-2'>
              <label className='my-auto'>تثبيت الساعة</label>
              <Tooltip title={<p className='font_light'>سيتم تثبيت هذا الوقت كل 7 ايام</p>}>
                <span className='text-blue-500 my-auto'>
                  <ImInfo />
                </span>
              </Tooltip>
            </div>
            <input defaultValue={exist?.book_to_date} onChange={(e: any) => {
              exist.book_to_date = e.target.value
            }} type="date" />
          </div>
        </AccordionDetails>
      </Accordion>
      {/* event and with ball and is paied */}
      <Accordion>
        <AccordionSummary expandIcon={<BsArrowDown />}>
          <div className='flex w-full justify-between flex-wrap'>
            <p className='my-auto'>تفاصيل اخري</p>
            <div className='flex gap-1 my-auto'>
              {
                court?.ball_price ? <div className='ball flex gap-1'>
                  <span className='my-auto'>
                    <BiFootball />
                  </span>
                  <p className='my-auto'>: {ballPrice} EGP</p>
                  {
                    court?.event_price && Number(time?.book_from?.slice(0, 2)) >= Number(court?.event_from?.slice(0, 2)) && Number(time?.book_to?.slice(0, 2)) <= Number(court?.event_to?.slice(0, 2))
                      ?
                      <p>-</p>
                      : null
                  }
                </div>
                  : null
              }
              {
                court?.event_price && Number(time?.book_from?.slice(0, 2)) >= Number(court?.event_from?.slice(0, 2)) && Number(time?.book_to?.slice(0, 2)) <= Number(court?.event_to?.slice(0, 2)) ? <div className='ball flex gap-1'>
                  <span className='my-auto'>
                    <MdEvent />
                  </span>
                  <p className='my-auto'>: {eventPrice} EGP</p>
                </div>
                  : null
              }
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex flex-col gap-6'>

            {
              // exist && time inside court event range
              court?.event_price && Number(time?.book_from?.slice(0, 2)) >= Number(court?.event_from?.slice(0, 2)) && Number(time?.book_to?.slice(0, 2)) <= Number(court?.event_to?.slice(0, 2)) ?
                <div className='event shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2'>
                  <input defaultChecked={eventValue} onChange={(e: any) => {
                    exist.event = exist.event == 'true' ? 'false' : 'true'
                    setEventValue(exist.event == 'true' ? 'false' : 'true')
                  }} className='w-fit shadow-none' type="checkbox" />
                  <div className='flex gap-1'>
                    <span className='my-auto'>
                      <MdEvent />
                    </span>
                    <label className='my-auto'>هل تحجز لمناسبة ؟</label>
                  </div>
                </div>
                : null
            }

            {
              court?.ball_price ?
                <div className='ball shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2'>
                  <input defaultChecked={withBallValue} onChange={(e: any) => {
                    exist.with_ball = exist.with_ball == 'true' ? 'false' : 'true'
                    setWithBallValue(exist.with_ball == 'true' ? 'false' : 'true')
                  }} className='w-fit shadow-none' type="checkbox" />
                  <div className='flex gap-1'>
                    <span className='my-auto'>
                      <BiFootball />
                    </span>
                    <label className='my-auto'>هل تريد الحجز بالكرة ؟</label>
                  </div>
                </div>
                : null
            }

            {
              userContext?.user?.is_staff || userContext?.user?.is_superuser ?
                <div className='is_paied shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2'>
                  <input defaultChecked={isPaiedValue} onChange={(e: any) => {
                    exist.is_paied = exist.is_paied == 'true' ? 'false' : 'true'
                    setIsPaiedValue(exist.is_paied == 'true' ? 'false' : 'true')
                  }} className='w-fit shadow-none' type="checkbox" />
                  <div className='flex gap-1'>
                    <span className='my-auto'>
                      <IoCashOutline />
                    </span>
                    <label className='my-auto'>هل تم الدفع ؟</label>
                  </div>
                </div>
                : null
            }

            <div className='paiedWith flex-col shadow-lg bg-gradient-to-tr p-3 from-indigo-50 to-gray-100 flex gap-2'>
              <div className='flex gap-1'>
                <span className='my-auto'>
                  <IoCashOutline />
                </span>
                <label className='my-auto'>طريقة الدفع</label>
              </div>
              <select value={paied_with ?? ''} onChange={(e: any) => {
                if (userContext?.user?.is_superuser || userContext?.user?.is_staff) {
                  exist.paied = e.target.value
                  set_paied_with(e.target.value)
                } else {
                  if (e.target.value == 'محفظة الكترونية') {
                    userContext?.setMessage('الميزة ليست متاحة لك')
                    userContext?.setMessageDisplay('yes')
                    set_paied_with('عند الوصول')
                    exist.paied = 'عند الوصول'
                  }
                }
              }}>
                {
                  paiedWith?.map((p: any) => (
                    <option key={p} value={p}>{p}</option>
                  ))
                }
              </select>
            </div>

          </div>
        </AccordionDetails>
      </Accordion>
      {/* tools */}
      {
        tools?.length > 0 ?
          <Accordion>
            <AccordionSummary expandIcon={<BsArrowDown />}>
              <div className='flex gap-3 w-full flex-wrap justify-between'>
                <p>الادوات المتاحة</p>
                <p>{toolsTotalPrice} EGP</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className='flex p-3 flex-col gap-3 h-full max-h-[300px] overflow-scroll'>
                {
                  tools?.map((tool: any, index: any) => (
                    <div onClick={() => {
                      const toolExist = exist?.tools?.includes(tool?.id)
                      if (toolExist) {
                        exist.tools = exist?.tools?.filter((e: any) => e !== tool?.id)
                        setSelectedTools(selectedTools?.filter((e: any) => e?.tool?.tool?.id !== tool?.id && e?.index !== index))
                      } else {
                        exist?.tools?.push(tool?.id)
                        setSelectedTools((e: any) => [...e, {
                          tool: tool,
                          index: index,
                          book_from: time?.book_from,
                          book_to: time?.book_to,
                        }])
                      }
                    }} key={index} className={`
                p-3 px-5 cursor-pointer transition-all duration-500 rounded-full flex justify-between
                ${selectedTools?.find((e: any) => e?.book_from == time?.book_from && e?.book_to == time?.book_to && e?.tool?.id == tool?.id) ? "bg-green-300 hover:bg-green-200" : "bg-indigo-300 hover:bg-indigo-200"}
                `}>
                      <p className='my-auto'>{tool?.title}</p>
                      <p className='my-auto'>
                        {tool?.price} EGP
                      </p>
                    </div>
                  ))
                }
              </div>
            </AccordionDetails>
          </Accordion>
          : null
      }


      <div className='text-neutral-800 mt-2'>
        <p id='totalPrice' aria-valuetext={totalPrice}>السعر النهائي: {totalPrice} EGP</p>
      </div>
    </div>
  )
}

export default Time