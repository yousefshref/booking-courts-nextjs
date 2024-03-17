import React from 'react'

const Header = () => {
  return (
    <div className="w-full flex flex-col justify-center animateToTop max-w-5xl mx-auto md:h-[calc(100vh-500px)] h-[calc(100vh-300px)] rounded-md shadow-lg transition-all duration-300 via-indigo-100 me-auto">
      <div id='courstHeader' className="w-full courtsHeaderAnimation transition-all duration-300 h-full p-5 flex flex-col justify-center">
        <h1>هل تبحث عن مكان معين ؟</h1>
        <div className='flex mt-5'>
          <button onClick={() => {
            const courtContiner = document.getElementById('courtContiner')
            courtContiner?.scrollIntoView({ behavior: "smooth" })
          }} className='font_light searchBtn md:min-w-0 min-w-full'>ابحث الأن</button>
        </div>
      </div>
    </div>
  )
}

export default Header