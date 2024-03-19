import React, { useContext, useEffect, useState } from 'react'
import DisplayContent from '../Utlits/DisplayContent'
import { BooksContextProvider } from '@/contexts/BooksContext'
import LoadingComponent from '../Utlits/LoadingComponent'
import Book from './Book'
import { getCurrentDate } from '@/utlits/Functions'
import Link from 'next/link'
import { AuthContextProvider } from '@/contexts/AuthContext'

const AllTimes = ({ setOpen, open }: any) => {
  const bookContext = useContext(BooksContextProvider)
  const userContext = useContext(AuthContextProvider)

  // search
  const [from, setFrom] = useState(getCurrentDate())
  const [to, setTo] = useState('')
  const [search, setSearch] = useState('')
  const [isCancelled, setIsCancelled] = useState('')


  // fetch
  const [times, setTimes] = useState([])
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(true)

  const getAllTimes = async (
    search: any,
    from: any,
    to: any,
    isCancelled: any,
  ) => {
    try {
      const res = await bookContext?.getAllTimes(search, from, to, isCancelled)
      setTimes(res)
    } catch (err) {
      console.log(err);
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      getAllTimes(search, from, to, isCancelled)
    }
  }, [open])


  // cash paied
  // wallet paied
  const totalCashPrice = times?.filter((f: any) => f?.is_paied && f?.paied == 'عند الوصول')?.reduce((a: any, b: any) => a + b?.total_price, 0)
  const totalWalletPrice = times?.filter((f: any) => f?.is_paied && f?.paied == 'محفظة الكترونية')?.reduce((a: any, b: any) => a + b?.total_price, 0)

  return (
    <DisplayContent setOpen={setOpen} open={open}>
      {/* search */}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap gap-5 justify-around'>
          <div className='flex flex-row gap-1 w-full md:max-w-xs'>
            <div className='flex flex-col gap-1 w-full md:max-w-xs'>
              <label>الحجز من</label>
              <input
                value={from}
                onChange={(e: any) => setFrom(e.target.value)}
                type="date" />
            </div>
            <div className='flex flex-col gap-1 w-full md:max-w-xs'>
              <label>الحجز الي</label>
              <input
                value={to}
                onChange={(e: any) => setTo(e.target.value)} type="date" />
            </div>
          </div>
          <div className='flex flex-col gap-1 w-full md:max-w-xs'>
            <label>بحث</label>
            <input
              value={search}
              onChange={(e: any) => setSearch(e.target.value)} type="text" placeholder='رقم هاتف او اسم الحجز' />
          </div>
          <div className='flex flex-col gap-1 w-full md:max-w-xs'>
            <label>هل تم الالغاء</label>
            <select
              value={isCancelled}
              onChange={(e: any) => setIsCancelled(e.target.value)}>
              <option value="">لا</option>
              <option value="True">نعم</option>
            </select>
          </div>
        </div>
        <div className='p-4'>
          <button onClick={() => {
            getAllTimes(search, from, to, isCancelled)
          }} className='btn-prim-rounded'>بحث</button>
        </div>
      </div>
      <hr className='py-[0.5px] mb-3 bg-indigo-500' />
      {/* money summerize */}
      <div className='flex flex-wrap gap-5 justify-around'>
        <div className='flex my-auto flex-wrap gap-5'>
          <div className='cahs flex'>
            <p>اجمالي المدفوع عند الوصول: {totalCashPrice} EGP</p>
          </div>
          <div className='cahs flex'>
            <p>اجمالي المدفوع بمحفظة الكترونية: {totalWalletPrice} EGP</p>
          </div>
        </div>
        <div className='my-auto'>
          {
            userContext?.user?.x_pay_phone ? (
              <a target="_blank" href="https://xpay.linkawyx.com/" rel="noopener noreferrer">
                <button className='text-xs btn-sec-rounded'>سحب الاموال</button>
              </a>
            ) : (
              <a target="_blank" href="https://wa.me/201023455435" rel="noopener noreferrer">
                <button className='text-xs btn-sec-rounded'>تواصل مع الدعم لسحب اموال المحفظة</button>
              </a>
            )
          }
        </div>
      </div>
      <hr className='py-[0.5px] my-3 bg-indigo-500' />
      {/* times */}
      <div className=''>
        {
          loading &&
          <div className='flex bg-gray-200 p-2 w-full rounded-md'>
            <LoadingComponent withText />
          </div>
        }
        {
          err &&
          <div className='errorContainer w-full'>
            <p>هناك مشكلة ما... يرجي التحدث مع الدعم</p>
          </div>
        }
        {
          times?.length > 0 ? (
            <div className='flex flex-wrap gap-5 justify-around'>
              {
                times?.map((time: any) => (
                  <Book book={time} court={time?.book_time?.book_details} key={time?.id} />
                ))
              }
            </div>
          ) : (
            <div className='warningContainer w-full'>
              <p>لا يوجد اوقات</p>
            </div>
          )
        }
      </div>
    </DisplayContent>
  )
}

export default AllTimes