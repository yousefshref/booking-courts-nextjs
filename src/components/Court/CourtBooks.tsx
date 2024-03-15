import React, { useContext, useEffect } from 'react'
import DisplayContent from '../Utlits/DisplayContent'
import { CourtsContextProvider } from '@/contexts/CourtsContext'
import { paiedWith } from '@/utlits/Variabels'

import Book from '../Book/Book'
import { BooksContextProvider } from '@/contexts/BooksContext'

const CourtBooks = ({ open, setOpen }: any) => {
  const courtContext = useContext(CourtsContextProvider)
  const bookContext = useContext(BooksContextProvider)
  useEffect(() => {
    if (open) {
      courtContext?.getCourtBooks(open)
    }
  }, [open, courtContext?.booksSearch, courtContext?.booksSearch, courtContext?.booksBookDate, courtContext?.booksIsCancelled, courtContext?.booksIsPaid, courtContext?.booksPaid])

  const books = courtContext?.courtBooks



  return (
    <DisplayContent open={open} setOpen={setOpen}>
      <div className='container w-full flex flex-col gap-3'>
        <p>حجوزات الملعب</p>
        <hr className='p-[0.5px] bg-indigo-500' />
        {/* search */}
        <div className='flex flex-wrap gap-5'>
          <div className='search flex flex-col w-full max-w-xs'>
            <p>معلومات المستخدم</p>
            <input onChange={(e) => courtContext?.setBooksSearch(e.target.value)} value={courtContext?.booksSearch} type="text" placeholder='الاسم او رقم الهاتف' />
          </div>
          <div className='bookDate flex flex-col w-full max-w-xs'>
            <p>تاريخ الحجز</p>
            <input onChange={(e) => courtContext?.setBooksBookDate(e.target.value)} value={courtContext?.booksBookDate} type="date" />
          </div>
          <div className='isCancelled flex flex-col w-full max-w-xs'>
            <p>هل تم الالغاء</p>
            <select onChange={(e) => courtContext?.setBooksIsCancelled(e.target.value)} value={courtContext?.booksIsCancelled}>
              <option value="">لا</option>
              <option value="true">نعم</option>
            </select>
          </div>
          <div className='isPaied flex flex-col w-full max-w-xs'>
            <p>تم الدفع</p>
            <select onChange={(e) => courtContext?.setBooksIsPaid(e.target.value)} value={courtContext?.booksIsPaid}>
              <option value="">لا</option>
              <option value="true">نعم</option>
            </select>
          </div>
          <div className='paied flex flex-col w-full max-w-xs'>
            <p>طريقة الدفع</p>
            <select onChange={(e) => courtContext?.setBooksPaid(e.target.value)} value={courtContext?.booksPaid}>
              <option value="">أختر</option>
              {
                paiedWith?.map((p: any) =>
                  <option key={p} value={p}>{p}</option>
                )
              }
            </select>
          </div>
        </div>
        <hr className='p-[0.5px] bg-indigo-500' />
        {/* books */}
        <div className='flex flex-wrap gap-8 justify-around'>
          {
            books?.length > 0 ?
              books?.map((book: any) => (
                <Book court={courtContext?.court} book={book} key={book?.id} />
              ))
              :
              <div className='p-4 rounded-md border border-red-800 text-red-800 bg-red-200 w-full max-w-full'>
                <p>لا يوجد حجوزات اليوم</p>
              </div>
          }
        </div>
      </div>
    </DisplayContent>
  )
}

export default CourtBooks