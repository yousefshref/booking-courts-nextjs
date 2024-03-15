import { CourtsContextProvider } from '@/contexts/CourtsContext'
import React, { useContext } from 'react'
import Time from './Time'
import { BooksContextProvider } from '@/contexts/BooksContext'

const TimesCustomization = ({ timesOpen, setTimesOpen, name, phone }: any) => {
  const courtContext = useContext(CourtsContextProvider)
  const bookContext = useContext(BooksContextProvider)
  const times = courtContext?.selectedSlots
  const courtSettings = courtContext?.courtSettings


  const totalPricePTag = document.querySelectorAll('#totalPrice')
  var totalPrices = 0
  totalPricePTag?.forEach((e: any) => {
    totalPrices += Number(e?.ariaValueText)
  })



  return (
    <div className={`
    top-0 justify-center left-0 w-screen fixed overflow-hidden
      ${timesOpen ? "opacity-100 z-20" : "opacity-0 -z-20"}
    `}>
      <div className={
        `
        from-neutral-800 via-indigo-950 to-black w-screen h-screen bg-gradient-to-tr transition-all duration-500 -z-20 opacity-30
        `
      }></div>
      <div className={`
        top-0 left-0 w-screen h-screen fixed flex flex-col justify-center p-3
      `}>

        <div className={`
        flex md:flex-row flex-col gap-4 w-full max-w-5xl justify-between transition-all duration-500 max-h-[calc(100vh-200px)] mx-auto rounded-md 
        min-h-fit
        `}>
          {/* times */}
          <div className='bg-white flex p-4 flex-col rounded-md w-full max-w-2xl mx-auto h-full min-h-fit max-h-full overflow-y-scroll'>
            <div className='tims flex flex-col gap-5'>
              {
                times?.map((time: any, index: any) => (
                  <Time index={index + 1} time={time} key={index} />
                ))
              }
            </div>


            {/* conditions and totalPrices */}
            <div className='flex flex-col gap-2 p-4 w-full from-indigo-100 to-blue-100 bg-gradient-to-bl mt-5 shadow-lg'>
              <p>اجمالي السعر: {totalPrices} EGP</p>
              {
                courtSettings?.paying_warning ?
                  <div className='flex flex-col gap-2 '>
                    <hr className='py-[0.5px] bg-indigo-500' />
                    <small className='text-red-700 font_light'>{courtSettings?.paying_warning}</small>
                  </div>
                  : null
              }
            </div>



            {/* buttons */}
            <div className='flex flex-col mt-auto'>
              <hr className='p-[0.5px] bg-indigo-300 my-5' />
              <div className='flex justify-between gap-5'>
                <button onClick={(e) => {
                  bookContext?.createBook(e, {
                    name: name,
                    phone: phone,
                  })
                }} className='bg-green-400 transition-all duration-500 hover:bg-green-300 font_light p-2 px-5 rounded-md'>حسنا</button>
                <button onClick={() => setTimesOpen(false)} className='border-red-400 border transition-all duration-500 hover:bg-red-200 font_light p-2 px-5 rounded-md'>الغاء</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TimesCustomization