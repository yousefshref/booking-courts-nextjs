import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const TeacherComponent = ({ teacher }) => {
  return (
    <div key={teacher?.id} className='relative p-3 border rounded-md shadow-md border-amber-200 teacher'>
      {/* edit and delete */}
      <div className='absolute flex gap-5 text-lg left-2'>
        <span className='text-red-600 transition-all cursor-pointer hover:text-red-500'>
          <FaRegTrashAlt />
        </span>
        <span className='text-blue-600 transition-all cursor-pointer hover:text-blue-500'>
          <FaEdit />
        </span>
      </div>

      <div className='flex gap-2 top'>
        <span className='my-auto text-4xl'>
          <CgProfile />
        </span>
        <div className='flex flex-col'>
          <p className='my-auto'>{teacher?.user_details?.username}</p>
          <small>{teacher?.user_details?.email}</small>
        </div>
      </div>
      <div className='flex gap-3 names'>
        <p>{teacher?.user_details?.first_name}</p>
        <p>{teacher?.user_details?.last_name}</p>
      </div>
      <hr className='my-2' />
      <div className='flex justify-between gap-4'>
        <div className='flex flex-col levels'>
          {
            teacher?.levels_details?.map((level) => (
              <div key={level?.id} className='p-1'>
                <p>- {level?.name}</p>
              </div>
            ))
          }
        </div>
        <div className='flex flex-col subjects'>
          {
            teacher?.subjects_details?.map((subject) => (
              <div key={subject?.id} className='p-1'>
                <p>- {subject?.name}</p>
              </div>
            ))
          }
        </div>
      </div>
      <hr className='my-2' />
      <small>تاريخ الانضمام: {teacher?.user_details?.date_joined?.slice(0, 10)}</small>
    </div>
  )
}

export default TeacherComponent