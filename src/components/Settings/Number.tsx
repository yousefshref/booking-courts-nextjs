import { Tooltip } from '@mui/material'
import React, { useContext, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import DisplayContent from '../Utlits/DisplayContent'
import { SettingsContextProvider } from '@/contexts/SettingsContext'

const Number = ({ numbers, settings, getNumbers }: any) => {
  const [createOpen, setCreateOpen] = useState(false)

  const settingsContext = useContext(SettingsContextProvider)
  return (
    <div className='flex animateToTop flex-col gap-3 relative'>
      <div className='flex gap-3'>
        <p className='my-auto'>الارقام المميزة</p>
        <Tooltip title={<p className='font_light'>ارقام العملاء الذين لا تنطبق عليهم الاعدادات</p>}>
          <span className='my-auto text-blue-600'>
            <ImInfo />
          </span>
        </Tooltip>
      </div>
      <hr className='my-1 bg-indigo-600 py-[0.5px]' />
      <div className='numbersContainer flex flex-col gap-5 p-3 rounded-md shadow-md'>
        <div>
          <button onClick={() => setCreateOpen(true)} className='successBtn sm:min-w-0 min-w-full'>انشاء رقم جديد</button>
        </div>
        {
          numbers?.length > 0 ?
            numbers?.map((number: any) => (
              <div
                className={`number flex gap-3 justify-between
              transition-all animated-border p-2 rounded-full
              `}
                key={number?.id}>
                <p className='my-auto'>{number?.number}</p>
                <span onClick={(e) => {
                  e.preventDefault()
                  settingsContext?.deleteNumber(number?.id).then((e: any) => e.success ? getNumbers() : console.log('no'))
                }} className='bg-red-400 transition-all p-2 rounded-full cursor-pointer my-auto hover:bg-red-300 text-neutral-800'>
                  <BiTrash />
                </span>
              </div>
            ))
            :
            <div className='errorContainer'>
              <p>لا يوجد ارقام</p>
            </div>
        }
      </div>


      {/* create new one */}
      <DisplayContent setOpen={setCreateOpen} open={createOpen}>
        <form onSubmit={(e) => {
          settingsContext?.createNumber(e, settings?.id, setCreateOpen).then((e: any) => e.id && getNumbers())
        }} className='flex mt-5 flex-col gap-2'>
          <p>اضافة رقم عميل جديد</p>
          <hr className='my-2 py-[0.5px] bg-indigo-700' />
          <input name='number' type="number" placeholder='اكتب رقم جديد' />
          <div className='mt-3'>
            <button className='successBtn min-w-full sm:min-w-0'>انشاء</button>
          </div>
        </form>
      </DisplayContent>
    </div>
  )
}

export default Number