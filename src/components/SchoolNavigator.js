import React from 'react'

const SchoolNavigator = ({ children }) => {
  return (
    <div className='flex flex-col gap-3'>
      {/* header */}
      <div className='flex justify-around w-full gap-8 p-2 mx-auto overflow-x-scroll shadow-lg navigation max-w-7xl'>
        <a href='/school/teachers' className='flex flex-col gap-1'>
          <p>المدرسين</p>
          <hr className='bg-orange-200 py-[0.5px]' />
        </a>
        <a href='/' className='flex flex-col gap-1'>
          <p>الطلاب</p>
          <hr className='bg-orange-200 py-[0.5px]' />
        </a>
        <a href='/' className='flex flex-col gap-1'>
          <p>المواد الدراسية</p>
          <hr className='bg-orange-200 py-[0.5px]' />
        </a>
        <a href='/' className='flex flex-col gap-1'>
          <p>الفصول</p>
          <hr className='bg-orange-200 py-[0.5px]' />
        </a>
      </div>
      {/* content */}
      <div className='p-5'>
        {children}
      </div>
    </div>
  )
}

export default SchoolNavigator