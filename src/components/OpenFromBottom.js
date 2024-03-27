import React from 'react'
import { CgClose } from 'react-icons/cg'

const OpenFromBottom = ({ open, setOpen, children }) => {
  return (
    <div className={`
        fixed bottom-0 bg-opacity-50 backdrop-blur-sm overflow-hidden right-0 z-50 w-full bg-center bg-cover transition-all duration-700
        ${open ? "h-full p-2" : "h-0 p-0"}
        `}>
      <span onClick={() => setOpen(false)} className={`
            flex text-white transition-all bg-red-700 rounded-full cursor-pointer hover:bg-red-500 w-fit h-fit
            ${open ? "p-2 opacity-100" : "p-0 opacity-0"}
          `}>
        <CgClose />
      </span>
      <hr className='my-3' />
      {children}
    </div>
  )
}

export default OpenFromBottom
