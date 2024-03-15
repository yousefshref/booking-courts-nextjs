import React from 'react'
import { CgSpinner } from 'react-icons/cg'

const LoadingComponent = ({ withText }: any) => {
  return (
    <div className='flex gap-2 mx-auto'>
      <span className='mx-auto'>
        <svg className="animate-spin h-5 flex  mr-3 text-2xl mx-auto w-fit" viewBox="0 0 24 24">
          <CgSpinner />
        </svg>
      </span>
      {
        withText &&
        <p>جاري التحميل</p>
      }
    </div>
  )
}

export default LoadingComponent