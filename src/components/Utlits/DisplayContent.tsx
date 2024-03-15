import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayContent = ({ children, open, setOpen }: any) => {
  return (
    <div className={`
    fixed flex flex-col z-50 transition-all duration-500 justify-end w-screen from-black to-transparent bg-gradient-to-t bottom-0 left-0
    ${open ? "h-screen" : "h-0"}
    `}>
      <div className={
        `
        z-50 fixed flex flex-col gap-1 overflow-scroll left-0 bg-white bottom-0 w-screen rounded-t-2xl
        transition-all duration-700 ${open ? 'max-h-[calc(100vh-200px)] h-[calc(100vh-200px)] p-5' : 'h-0 p-0'}
        `
      }>
        <div className='buttons'>
          <span onClick={() => setOpen(false)} className='w-fit bg-red-400 p-1 rounded-full transition-all hover:bg-red-300 flex cursor-pointer'>
            <CgClose />
          </span>
        </div>

        {children}

      </div>

    </div>
  )
}

export default DisplayContent