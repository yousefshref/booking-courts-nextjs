import { CourtsContextProvider } from '@/contexts/CourtsContext'
import { StateContextProvider } from '@/contexts/StateContext'
import React, { useContext } from 'react'
import CourtComponent from '../Court/CourtComponent'
import Loading from '../Utlits/Loading'
import LoadingComponent from '../Utlits/LoadingComponent'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { IoCreate } from 'react-icons/io5'
import Link from 'next/link'
import CourtCreate from './CourtCreate'

const Courts = () => {
  const courtContext = useContext(CourtsContextProvider)
  const stateContext = useContext(StateContextProvider)
  const userContext = useContext(AuthContextProvider)

  const courts = courtContext?.courts
  const states = stateContext?.states



  return (
    <div className='w-full max-w-5xl mx-auto  p-5'>
      {/* search */}
      <div className='flex flex-col animateToTop gap-3'>
        <div className='prices flex flex-col gap-2'>
          <p>السعر</p>
          <div className='flex gap-3'>
            <input placeholder='ادني سعر' onChange={courtContext?.setPriceFrom} value={courtContext?.priceFrom} type="number" />
            <input placeholder='اقصي سعر' onChange={courtContext?.setPriceFrom} value={courtContext?.priceFrom} type="number" />
          </div>
        </div>
        <hr className='my-2 p-[0.5px] bg-indigo-500' />
        <div className='state flex flex-col gap-2'>
          <p>المكان</p>
          <select value={courtContext?.state} onChange={(e) => courtContext?.setState(e.target.value)} className='flex gap-3'>
            <option value="">أختر المنطقة</option>
            {
              states?.map((state: any) => (
                <option
                  key={state?.id}
                  value={state?.id}
                >
                  {state?.name}
                </option>
              ))
            }
          </select>
        </div>
        <hr className='my-2 p-[0.5px] bg-indigo-500' />
        <div className='types flex flex-col gap-2'>
          <p>تفاصيل الملعب</p>
          <div className='flex gap-3'>
            <select onChange={(e) => courtContext?.setType1(e.target.value)} value={courtContext?.type1}>
              <option value="">نوع الملعب</option>
              {
                courtContext?.types?.map((t: any) => (
                  <option key={t?.id} value={t?.id}>{t?.name}</option>
                ))
              }
            </select>
            <select onChange={(e) => courtContext?.setType2(e.target.value)} value={courtContext?.type2}>
              <option value="">حجم الملعب</option>
              {
                courtContext?.types2?.map((t: any) => (
                  <option key={t?.id} value={t?.id}>{t?.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className='eventAndOffers flex flex-col gap-2'>
          <p>اضافات اخري</p>
          <div className='flex gap-3'>
            <select onChange={(e) => courtContext?.setEventSearch(e.target.value)} value={courtContext?.eventSearch}>
              <option value="">حجز مناسبات ؟</option>
              <option value="true">نعم</option>
              <option value="">لا</option>
            </select>
            <select onChange={(e) => courtContext?.setOffer(e.target.value)} value={courtContext?.offer}>
              <option value="">عروض فقط ؟</option>
              <option value="true">نعم</option>
              <option value="">لا</option>
            </select>
          </div>
        </div>
      </div>

      <hr className='my-5' />

      {/* create */}
      {
        userContext?.user?.is_staff || userContext?.user?.is_superuser ? (
          <div className='flex'>
            <button onClick={() => courtContext?.setCreateCourtOpen(true)} className='successBtn flex gap-2'>
              <span className='my-auto'>
                <IoCreate />
              </span>
              <p className='my-auto'>انشاء ملعب جديد</p>
            </button>
          </div>
        )
          : null
      }
      <hr className='my-5' />

      {/* courts */}
      <div className='courts flex flex-col gap-5'>
        {
          courts?.length > 0 ?
            courts?.map((court: any) => (
              <CourtComponent court={court} key={court?.id} />
            ))
            :
            <div className='p-5 w-full h-[300px] flex flex-col justify-center'>
              <div className='mx-auto'>
                <LoadingComponent withText={true} />
              </div>
            </div>
        }
      </div>


      {/* court create */}
      {
        userContext?.user?.is_staff || userContext?.user?.is_superuser ?
          <CourtCreate />
          : null
      }
    </div>
  )
}

export default Courts