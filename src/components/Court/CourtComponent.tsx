import React from 'react'
import Link from 'next/link'
import CourtImageComponent from './CourtImage'

const CourtComponent = ({ court }: any) => {
  return (
    <div className="
    flex bg-white shadow-md transition-all duration-300 hover:shadow-lg gap-3 justify-between rounded-md relative flex-col md:flex-row">
      <div className="right
        md:flex-row flex-col w-fit md:w-full transition-all
        flex gap-8 p-4">
        <CourtImageComponent court={court} />
        <Link href={`/courts/${court?.id}`} className="top flex flex-col justify-center">
          <div className="my-auto flex flex-col gap-1">
            <h3 className='transition-all hover:text-sky-700'>{court?.title}</h3>
            <p className="font_light text-gray-600">{court?.description}</p>
          </div>
          <div className="mt-auto">
            <p>{court?.state_details?.name}</p>
            <p>{court?.court_types2?.name}</p>
          </div>
        </Link>
      </div>
      <div className="price p-2 w-[200px] md:text-end text-start md:absolute left-0 text-emerald-500">
        <p className="text-2xl font_light font-bold">{court?.price_per_hour} EGP</p>
      </div>
    </div>
  )
}

export default CourtComponent