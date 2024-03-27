import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-3 p-2 text-gray-400 bg-orange-100">
      <div className="w-5 h-5 border-t-4 border-gray-400 rounded-full animate-spin"></div>
      <p>جاري التحميل</p>
    </div>
  )
}

export default Loading
