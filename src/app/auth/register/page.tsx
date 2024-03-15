'use client'
import { AuthContextProvider } from '@/contexts/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { BsType } from 'react-icons/bs'
import { CgPassword, CgProfile } from 'react-icons/cg'
import { MdAlternateEmail, MdOutlineManageAccounts } from 'react-icons/md'
import { RiLockPasswordLine } from "react-icons/ri";

const page = () => {
  const authContext = useContext(AuthContextProvider)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="hidden">
      </div>
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            أنشئ حساب جديد
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => authContext?.registerFunction(e)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">أسم المستخدم</label>
              <div className='flex gap-1 relative'>
                <span className='absolute z-40 top-[50%] text-2xl translate-y-[-50%] right-1'>
                  <CgProfile />
                </span>
                <input id="username" name="username" type="text" required className="appearance-none rounded-none relative ps-8 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="أسم المسخدم" />
              </div>
              {authContext?.err?.username && <span className='err-message'>{authContext?.err?.username}</span>}
            </div>
            <div>
              <label className="sr-only">رقم الهاتف</label>
              <div className='flex gap-1 relative'>
                <span className='absolute z-40 top-[50%] translate-y-[-50%] right-1'>
                  <Image alt='egypt' width={25} height={25} src={'/images/eg.png'} />
                </span>
                <input id="phone" name="phone" type="number" required className="appearance-none ps-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="رقم الهاتف" />
              </div>
              {authContext?.err?.phone && <span className='err-message'>{authContext?.err?.phone}</span>}
            </div>
            <div>
              <label className="sr-only">البريد الالكتروني</label>
              <div className='flex gap-1 relative'>
                <span className='absolute z-40 top-[50%] text-2xl translate-y-[-50%] right-1'>
                  <MdAlternateEmail />
                </span>
                <input id="email-address" name="email" type="email" required className="appearance-none ps-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="البريد الالكتروني" />
              </div>
              {authContext?.err?.email && <span className='err-message'>{authContext?.err?.email}</span>}
            </div>
            <div>
              <label className="sr-only">هل انت عميل ام صاحب مكان ؟</label>
              <div className='flex gap-1 relative'>
                <span className='absolute z-40 top-[50%] text-2xl translate-y-[-50%] right-1'>
                  <MdOutlineManageAccounts />
                </span>
                <select className="appearance-none rounded-none relative block w-full px-3 ps-8 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="is_superuser">
                  <option value="">أختر نوع الحساب</option>
                  <option value="False">عميل</option>
                  <option value="True">بائع او صاحب مكان</option>
                </select>
              </div>
              {authContext?.err?.is_superuser && <span className='err-message'>{authContext?.err?.is_superuser}</span>}
            </div>
            <div>
              <label className="sr-only">كلمة المرور</label>
              <div className='flex gap-1 relative'>
                <span className='absolute z-40 top-[50%] text-2xl translate-y-[-50%] right-1'>
                  <RiLockPasswordLine />
                </span>
                <input id="password" name="password" type="password" required className="appearance-none ps-8 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="كلمة المرور" />
              </div>
              {authContext?.err?.password && <span className='err-message'>{authContext?.err?.password}</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                لديك حساب بالفعل؟
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M3 8v6a5 5 0 0010 0V8a3 3 0 00-6 0V6a3 3 0 00-6 0v2a3 3 0 006 0zM7 6v2a1 1 0 102 0V6a1 1 0 10-2 0z" />
                </svg>
              </span>
              أنشئ الحساب
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
