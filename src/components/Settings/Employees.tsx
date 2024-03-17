import React, { useContext, useState } from 'react'
import Staff from './Staff';
import DisplayContent from '../Utlits/DisplayContent';
import { StaffsContextProvider } from '@/contexts/StaffsContext';
import Book from '../Book/Book';
import CourtComponent from '../Court/CourtComponent';

const Employees = ({ staffs, getStaffs }: any) => {
  const staffsContext = useContext(StaffsContextProvider)

  const [open, setOpen] = useState(false)
  const [more, setMore] = useState(false)

  const [staffOpen, setStaffOpen] = useState(null)

  const [booksmore, setbooksmore] = useState(false)
  const [courtsmore, setcourtsmore] = useState(false)

  const staff = staffs?.find((e: any) => e?.name == staffOpen)


  return (
    <div className='flex animateToTop flex-col gap-3'>
      <div className='flex justify-between'>
        <p>الموظفين</p>
        <div className='max-w-[200px] w-full'>
          <button onClick={() => setOpen(true)} className='successBtn'>موظف جديد</button>
        </div>
      </div>
      <hr className='my-2 py-[0.5px] bg-indigo-500' />
      {/* staffs */}
      <div className='flex flex-col gap-3'>
        <div className='p-2 flex-wrap rounded-md flex gap-5 justify-between bg-white'>
          {
            staffs?.slice(0, 2)?.map((staff: any) => (
              <Staff setStaffOpen={setStaffOpen} staff={staff} key={staff?.id} />
            ))
          }
        </div>
        {
          !more && staffs?.length > 2 &&
          <div className='
          showMore text-gray-500 text-center
          '>
            <p onClick={() => setMore(true)} className='cursor-pointer hover:underline'>رؤية الكل</p>
          </div>
        }
        {
          more &&
          <div className='p-2 flex-wrap rounded-md flex gap-5 justify-between bg-white'>
            {
              staffs?.slice(2)?.map((staff: any) => (
                <Staff setStaffOpen={setStaffOpen} staff={staff} key={staff?.id} />
              ))
            }
          </div>
        }
        {
          more && staffs?.length > 2 &&
          <div className='
          showMore text-gray-500 text-center
          '>
            <p onClick={() => setMore(false)} className='cursor-pointer hover:underline'>اخفاء</p>
          </div>
        }

      </div>

      {/* staff details */}
      <DisplayContent open={staffOpen} setOpen={setStaffOpen}>
        <br />
        {/* search */}
        <div className='flex gap-3'>
          <div className='from'>
            <label>من</label>
            <input onChange={(e) => staffsContext?.setbookfrom(e.target.value)} type="date" />
          </div>
          <div className='to'>
            <label>حتي</label>
            <input onChange={(e) => staffsContext?.setbookto(e.target.value)} type="date" />
          </div>
        </div>
        <br />
        {/* books */}
        <div className='flex gap-5 flex-col'>
          <p>الحجوزات</p>
          <hr />
          {
            staff?.books?.length > 0 ?
              <div className='flex flex-col gap-4'>
                <div className='flex gap-5 flex-wrap justify-between'>
                  {
                    staff?.books?.slice(0, 5)?.map((book: any) => (
                      <Book getStaffs={getStaffs} court={book?.book_time?.court_details} book={book} key={book?.id} />
                    ))
                  }
                </div>
                {
                  !booksmore && staff?.books?.length > 5 ?
                    <div className='text-center mt-3'>
                      <p onClick={() => setbooksmore(true)} className='text-gray-600 hover:underline cursor-pointer'>المزيد</p>
                    </div>
                    : null
                }
                <div className='flex gap-5 flex-wrap justify-between'>
                  {
                    booksmore &&
                    staff?.books?.slice(5)?.map((book: any) => (
                      <Book getStaffs={getStaffs} court={book?.book_time?.court_details} book={book} key={book?.id} />
                    ))
                  }
                </div>
                {
                  booksmore && staff?.books?.length > 2 ?
                    <div className='text-center mt-3'>
                      <p onClick={() => setbooksmore(false)} className='text-gray-600 hover:underline cursor-pointer'>اخفاء</p>
                    </div>
                    : null
                }
              </div>
              : <div className='errorContainer w-full'>
                <p>لا يوجد حجوزات</p>
              </div>
          }
        </div>
        <br />
        {/* courts */}
        <div className='flex gap-5 flex-col'>
          <p>الملاعب</p>
          <hr />
          {
            staff?.courts?.length > 0 ?
              <div className='flex flex-col gap-4'>
                <div className='flex gap-5 flex-col'>
                  {
                    staff?.courts?.slice(0, 2)?.map((court: any) => (
                      <CourtComponent court={court} key={court?.id} />
                    ))
                  }
                </div>
                {
                  !courtsmore && staff?.courts?.length > 2 ?
                    <div className='text-center mt-3'>
                      <p onClick={() => setcourtsmore(true)} className='text-gray-600 hover:underline cursor-pointer'>المزيد</p>
                    </div>
                    : null
                }
                <div className='flex gap-5 flex-wrap justify-between'>
                  {
                    courtsmore &&
                    staff?.courts?.slice(2)?.map((book: any) => (
                      <Book getStaffs={getStaffs} court={book?.book_time?.court_details} book={book} key={book?.id} />
                    ))
                  }
                </div>
                {
                  courtsmore && staff?.courts?.length > 2 ?
                    <div className='text-center mt-3'>
                      <p onClick={() => setcourtsmore(false)} className='text-gray-600 hover:underline cursor-pointer'>اخفاء</p>
                    </div>
                    : null
                }
              </div>
              : <div className='errorContainer w-full'>
                <p>لا يوجد حجوزات</p>
              </div>
          }
        </div>
      </DisplayContent>


      {/* create */}
      <DisplayContent open={open} setOpen={setOpen}>
        <div className='flex flex-col gap-4'>
          <p>ادخل بيانات الموظف</p>
          <hr className='my-2 py-[0.5px] bg-indigo-500' />
          <form onSubmit={(e) => {
            e.preventDefault()
            staffsContext?.createStaff(e, setOpen).then((e: any) => e.token && getStaffs())
          }} className='flex flex-col gap-3 w-full max-w-md mx-auto'>
            <div>
              <label>اسم المستخدم</label>
              <input required type="text" name='username' />
            </div>
            <div>
              <label>رقم الهاتف</label>
              <input required type="number" name='phone' />
            </div>
            <div>
              <label>البريد الالكتروني</label>
              <input required type="email" name='email' />
            </div>
            <div>
              <label>كلمة السر</label>
              <input required type="password" name='password' />
            </div>
            <div className='mt-5'>
              <button className='successBtn min-w-full'>
                تم
              </button>
            </div>
          </form>
        </div>
      </DisplayContent>
    </div>
  )
}

export default Employees