import React, { useState } from 'react'

const Staff = ({ staff, setStaffOpen }: any) => {


  return (
    <div onClick={() => setStaffOpen(staff?.name)} className='court transition-all cursor-pointer hover:bg-indigo-100 hover:shadow-lg rounded-md bg-indigo-50 shadow-md text-center md:max-w-xs w-full p-3'>
      <p className='text-2xl'>{staff?.name}</p>
      <hr className='my-2 py-[0.5px] bg-indigo-500' />
      <div className='flex flex-col gap-5'>
        <div className='courtsBooks w-fit mx-auto flex gap-3'>
          <div className='courts flex'>
            <p>الملاعب: {staff?.courts?.length}</p>
          </div>
          <div className='books flex'>
            <p>الحجوزات: {staff?.books?.length}</p>
          </div>
        </div>
        <div className='moneyDetails text w-full justify-between flex gap-4'>
          <div className='from-green-500 to-green-800 bg-clip-text bg-gradient-to-t text-transparent success flex flex-col text-center'>
            <p className='text-xl'>{staff?.moneyDetails?.success ?? 0}</p>
            <p className='text-xs'>EGP</p>
          </div>
          <div className='from-yellow-500 to-yellow-800 bg-clip-text bg-gradient-to-t text-transparent success flex flex-col text-center'>
            <p className='text-xl'>{staff?.moneyDetails?.waiting ?? 0}</p>
            <p className='text-xs'>EGP</p>
          </div>
          <div className='from-red-500 to-red-800 bg-clip-text bg-gradient-to-t text-transparent success flex flex-col text-center'>
            <p className='text-xl'>{staff?.moneyDetails?.faild ?? 0}</p>
            <p className='text-xs'>EGP</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Staff