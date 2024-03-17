import React from 'react'

const Message = ({ message, display }: any) => {

  return (
    <div className={`
        bg-indigo-300 shadow-lg rounded-md text-neutral-800
        fixed right-[50%] p-3 w-fit translate-x-[50%] transition-all duration-300 
        ${display == 'yes' ? 'top-2' : '-top-14'}
        `}>
      <p>{message}</p>
    </div>
  )
}

export default Message