import React, { useContext, useState } from 'react'
import AllTimes from '../Book/AllTimes'
import { AuthContextProvider } from '@/contexts/AuthContext'

const Header = () => {
  const [open, setOpen] = useState(false)
  const authContext = useContext(AuthContextProvider)
  return (
    <div className="w-full flex flex-col justify-center animateToTop max-w-5xl mx-auto md:h-[calc(100vh-500px)] h-[calc(100vh-300px)] rounded-md shadow-lg transition-all duration-300 via-indigo-100 me-auto">
      <div id='courstHeader' className="w-full courtsHeaderAnimation transition-all duration-300 h-full p-5 flex flex-col justify-center">
        <h1>هل تبحث عن مكان معين ؟</h1>
        <div className='flex flex-wrap gap-5 mt-5'>
          <button onClick={() => {
            const courtContiner = document.getElementById('courtContiner')
            courtContiner?.scrollIntoView({ behavior: "smooth" })
          }} className='font_light btn-prim-rounded md:min-w-0 min-w-full'>ابحث الأن</button>

          {
            authContext?.user?.is_superuser || authContext?.user?.is_staff ?
              <button onClick={() => setOpen(true)} className='font_light btn-prim-rounded md:min-w-0 min-w-full'>جميع الحجوزات</button>
              : null
          }
        </div>
      </div>

      {/* display all times */}
      <AllTimes setOpen={setOpen} open={open} />
    </div>
  )
}

export default Header