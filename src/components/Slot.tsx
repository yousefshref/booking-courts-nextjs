import React, { useContext, useState } from 'react'

import { convertTo24HourFormat, getCurrentDate, tConvert } from '@/utlits/Functions'
import { CourtsContextProvider } from '@/contexts/CourtsContext';
import { BooksContextProvider } from '@/contexts/BooksContext';

const Slot = ({ slot }: any) => {

  const courtContext = useContext(CourtsContextProvider)
  const bookContext = useContext(BooksContextProvider)

  const selectedSlots = courtContext?.selectedSlots
  const setSelectedSlots = courtContext?.setSelectedSlots
  const check = courtContext?.check
  const closedTimes = courtContext?.closedTimes

  const selectedDate = courtContext?.selectedDate

  const bookFrom = convertTo24HourFormat(slot.split('-')[1]);
  const bookTo = convertTo24HourFormat(slot.split('-')[0]);


  const addNewSelectedSlot = (slot: any) => {
    const slotObj = {
      "index": selectedSlots?.length + 1,
      "book_from": bookFrom,
      "book_to": bookTo,
      book_to_date: null,
      with_ball: 'false',
      event: 'false',
      paied: 'عند الوصول',
      is_paied: 'false',
      is_cancelled: 'false',
      is_cancelled_day: null,
      tools: [],
    };

    const index = selectedSlots?.findIndex((item: any) => item.book_from === bookFrom && item.book_to === bookTo);

    if (index === -1) {
      // Slot does not exist, add it to the array
      setSelectedSlots([...selectedSlots, slotObj]);
    } else {
      // Slot exists, remove it from the array
      setSelectedSlots((prevTime: any) => prevTime.filter((_: any, i: any) => i !== index));
    }
  };

  const selected = selectedSlots?.find((s: any) => s?.book_from == bookFrom && s?.book_to == bookTo)


  // booked
  const booked = check?.find((b: any) => b?.split('-')[0]?.slice(0, 5) == bookFrom && b?.split('-')[1]?.slice(0, 5) == bookTo)

  // closed
  const closed = closedTimes?.find((b: any) => b?.split('-')[1]?.slice(0, 5) == bookFrom && b?.split('-')[0]?.slice(0, 5) == bookTo)


  // hide (if today == selectedDate && currentTime > bookFrom)
  const currentDate = new Date();
  const hide = getCurrentDate() == selectedDate && Number(currentDate.toLocaleTimeString()?.split(':')[0]) >= Number(convertTo24HourFormat(slot.split('-')[1])?.split(':')[0])


  const [bookedOpen, setBookedOpen] = useState<any>(null)


  return (
    hide ? null :
      <div
        className={`
        p-2 text-center rounded-full transition-all cursor-pointer
        w-full md:max-w-[150px] text-sm md:text-base
        ${selected ? "bg-green-400 hover:bg-green-200" : "bg-indigo-300 hover:bg-indigo-200"}
        ${booked && "bg-red-400 hover:bg-red-200"}
        ${closed && "bg-yellow-400 hover:bg-yellow-200"}
      `}
        onClick={() => {
          if (booked && !bookedOpen) {
            setBookedOpen(slot)
          }
          if (closed) {
            alert('هذا الوقت مغلق');
          }
          if (!closed && !booked) {
            addNewSelectedSlot(slot)
          }
        }}
      >
        {slot}


        {/* if booked create notification */}
        {
          bookedOpen == slot ?
            <div className='fixed flex z-50 flex-col gap-5 w-screen h-screen top-0 right-0'>
              <div className='from-neutral-100 to-indigo-100 w-screen h-screen top-0 left-0 via-indigo-50 bg-gradient-to-br opacity-50 -z-20 right-0'></div>
              <div className='flex flex-col justify-center w-full h-screen fixed top-0 right-0 p-5'>
                <div className='bg-white text-start p-5 mx-auto w-full max-w-2xl z-50 top-0 ring-0'>
                  <p>هل تريد تنبيهك في حالة فراغ هذا الوقت ؟</p>
                  <hr className='my-2 p-[0.5px] bg-indigo-600' />
                  <div className='btns flex gap-3 justify-between'>
                    <button onClick={(e) => bookContext?.createNotification(e, bookedOpen, setBookedOpen)} type='button' className='successBtn'>نعم</button>
                    <button onClick={() => {
                      setBookedOpen(false)
                    }} type='button' className='errorBtn'>لا</button>
                  </div>
                </div>
              </div>
            </div>
            : null
        }

      </div>
  )
}

export default Slot