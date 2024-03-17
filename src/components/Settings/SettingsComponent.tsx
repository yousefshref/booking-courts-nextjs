import { SettingsContextProvider } from '@/contexts/SettingsContext'
import { Tooltip } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ImInfo } from 'react-icons/im'

const SettingsComponent = ({ settings }: any) => {

  const daysWithHours = [
    {
      name: 'يوم',
      value: 24,
    },
    {
      name: 'يومين',
      value: 48,
    },
    {
      name: 'ثلاثة أيام',
      value: 72,
    },
    {
      name: 'أربعة أيام',
      value: 96,
    },
    {
      name: 'خمسة أيام',
      value: 120,
    },
    {
      name: 'ستة أيام',
      value: 144,
    },
    {
      name: 'سبعة أيام',
      value: 168,
    },
  ]

  const settingsContext = useContext(SettingsContextProvider)

  const [payingWarning, setPayingWarning] = useState(settings?.paying_warning)
  const [payingLimite, setPayingLimite] = useState(settings?.paying_time_limit)
  const [canceleLimite, setCancelLimit] = useState(settings?.cancel_time_limit)

  return (
    <div className={`flex flex-col gap-4 animateToTop p-5 bg-white shadow-lg`}>
      <form onSubmit={(e: any) => {
        e.preventDefault()
        settingsContext?.updateSettings(payingWarning, payingLimite, canceleLimite)
      }} className='settings flex flex-col gap-2'>
        <p>الاعدادات</p>
        <hr className='my-1 bg-indigo-600 py-[0.5px]' />
        <div className='flex flex-col gap-5'>
          <div className='payingWaring flex flex-col gap-1'>
            <div className='flex gap-3'>
              <label>تحذير قبل الحجز</label>
              <Tooltip title={<p className='font_light'>تحذير يظهر للعميل قبل الحجز</p>}>
                <span className='text-blue-500 my-auto'>
                  <ImInfo />
                </span>
              </Tooltip>
            </div>
            <div className=''>
              {
                payingWarning ? (
                  <input onChange={(e) => setPayingWarning(e.target.value)} defaultValue={payingWarning} type="text" placeholder='أكتب شروط حجز الملعب' />
                ) : <input onChange={(e) => setPayingWarning(e.target.value)} defaultValue={payingWarning} type="text" placeholder='أكتب شروط حجز الملعب' />
              }
            </div>
          </div>
          <div className='payingLimite flex flex-col gap-1'>
            <div className='flex gap-3'>
              <label>الحد الاقصي للدفع</label>
              <Tooltip title={<p className='font_light'>سيتم حذف الحجز لو لم يتم الدفع في هذا الوقت المحدد</p>}>
                <span className='text-blue-500 my-auto'>
                  <ImInfo />
                </span>
              </Tooltip>
            </div>
            <div className=''>
              {
                payingLimite > 0 ? (
                  <select onChange={(e) => setPayingLimite(e.target.value)} defaultValue={payingLimite}>
                    <option value="0">لا يوجد</option>
                    {
                      daysWithHours?.map((d: any) => (
                        <option key={d?.value} value={d?.value}>{d?.name}</option>
                      ))
                    }
                  </select>
                ) : <select onChange={(e) => setPayingLimite(e.target.value)} defaultValue={payingLimite}>
                  <option value="0">لا يوجد</option>
                  {
                    daysWithHours?.map((d: any) => (
                      <option key={d?.value} value={d?.value}>{d?.name}</option>
                    ))
                  }
                </select>
              }
            </div>
          </div>
          <div className='canceleLimit flex flex-col gap-1'>
            <div className='flex gap-3'>
              <label>الحد الاقصي لالغاء الحجز</label>
              <Tooltip title={<p className='font_light'>بعد هذا اليوم لا يمكنة ان يلغي الحجز</p>}>
                <span className='text-blue-500 my-auto'>
                  <ImInfo />
                </span>
              </Tooltip>
            </div>
            <div>
              {
                canceleLimite > 0 ? (
                  <select onChange={(e) => setCancelLimit(e.target.value)} defaultValue={canceleLimite}>
                    <option value="0">لا يلغي الحجز</option>
                    {
                      daysWithHours?.map((d: any) => (
                        <option key={d?.value} value={d?.value}>{d?.name}</option>
                      ))
                    }
                  </select>
                ) : <select onChange={(e) => setCancelLimit(e.target.value)} defaultValue={canceleLimite}>
                  <option value="0">لا يلغي الحجز</option>
                  {
                    daysWithHours?.map((d: any) => (
                      <option key={d?.value} value={d?.value}>{d?.name}</option>
                    ))
                  }
                </select>
              }
            </div>
          </div>
        </div>
        <div className='mt-1 w-full'>
          <button className='successBtn sm:min-w-fit min-w-full'>حسنا</button>
        </div>
      </form>
    </div>
  )
}

export default SettingsComponent