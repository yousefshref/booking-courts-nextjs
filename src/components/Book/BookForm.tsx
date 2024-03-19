import { CourtsContextProvider } from '@/contexts/CourtsContext'
import React, { useContext, useState } from 'react'
import Slot from '../Slot'
import { getCurrentDate } from '@/utlits/Functions'

const BookForm = ({ loading, setTimesOpen, name, setName, phone, setPhone }: any) => {
  const courtContext = useContext(CourtsContextProvider)
  const slots = courtContext?.slotsArray
  const selected = courtContext?.selectedSlots
  const court = courtContext?.court

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (selected?.length > 0) {
        setTimesOpen(true)
      } else {
        alert("يجب ان تختار وقت الحجز")
      }
    }} className={`${!loading ? 'animatedForm w-full from-indigo-50 via-indigo-100 to-blue-50 bg-gradient-to-tl flex flex-col gap-5 max-w-3xl shadow-lg mx-auto p-4' : "hidden"}`}>
      <div className='name flex flex-col gap-3 w-full'>
        <label>الاسم</label>
        <input required placeholder='اسم اللاعب' value={name} onChange={(e: any) => setName(e.target.value)} type="text" />
      </div>
      <div className='phone flex flex-col gap-3 w-full'>
        <label>رقم الهاتف</label>
        <input required placeholder='يرجي كتابة الهاتف بشكل صحيح' value={phone} onChange={(e: any) => setPhone(e.target.value)} type="number" />
      </div>
      <div className='date flex flex-col gap-3 w-full'>
        <label>تاريخ الحجز</label>
        <input required value={courtContext?.selectedDate} onChange={(e: any) => {
          if (e.target.value >= getCurrentDate()) {
            courtContext?.setSelectedDate(e.target.value)
          }
        }} type="date" />
      </div>
      <hr className='p-[0.5px] bg-indigo-300' />
      <div className='flex flex-wrap justify-around gap-4 p-2'>
        {
          slots?.map((slot: any) => (
            <Slot court={court} slot={slot} key={slot} />
          ))
        }
      </div>
      <button className='font_light p-2 rounded-md w-full bg-green-400 transition-all hover:bg-green-300'>اكمل عملية الحجز</button>
    </form>
  )
}

export default BookForm


