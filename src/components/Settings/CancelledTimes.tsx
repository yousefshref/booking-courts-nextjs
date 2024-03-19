import React from 'react'
import Book from '../Book/Book'

const CancelledTimes = ({
  cancelledTimes,
  cancelled_from, setcancelled_from,
  cancelled_to, setcancelled_to,
  cancelled_search, setcancelled_search,

}: any) => {
  return (
    <div className='animateToTop flex flex-col gap-4'>
      <p>الحجوزات الملغية اليوم</p>
      <hr />
      <div className='search flex gap-3 flex-wrap'>
        <div className='flex flex-col gap-1'>
          <p>تاريخ الحجز من</p>
          <input type="date"
            onChange={(e) => setcancelled_from(e.target.value)}
            defaultValue={cancelled_from} />
        </div>
        <div className='flex flex-col gap-1'>
          <p>تاريخ الحجز حتي</p>
          <input type="date"
            onChange={(e) => setcancelled_to(e.target.value)}
            defaultValue={cancelled_to}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <p>الاسم او رقم الهاتف</p>
          <input type="text"
            onChange={(e) => setcancelled_search(e.target.value)}
            defaultValue={cancelled_search}
          />
        </div>
      </div>
      <hr />
      <div className='flex flex-wrap gap-3 justify-around'>
        {
          cancelledTimes?.length > 0 ?
            cancelledTimes?.map((time: any) => (
              <Book book={time} court={time?.book_time?.court_details} key={time?.id} />
            ))
            : <div className='errorContainer w-full'>
              <p>لا يوجد حجوزات حاليا</p>
            </div>
        }
      </div>
    </div>
  )
}

export default CancelledTimes