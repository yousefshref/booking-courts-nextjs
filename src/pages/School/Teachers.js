import React, { useContext, useEffect, useState } from 'react'
import Container from '../../components/Container'
import SchoolNavigator from '../../components/SchoolNavigator'
import { ApiContextProvider } from '../../context/ApiContext'
import Loading from '../../components/Loading'
import { GoPlus } from "react-icons/go";
import { Error } from '../../components/Error'
import TeacherComponent from '../../components/school/TeacherComponent'
import CreateTeacher from '../../components/school/CreateTeacher'
import UpdateTeacher from '../../components/school/UpdateTeacher'

const Teachers = () => {
  const apiContext = useContext(ApiContextProvider)

  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const getTeachers = async () => {
    try {
      const res = await apiContext?.getTeachers()
      setTeachers(res);
    } catch (err) {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTeachers()
  }, [])

  const [open, setOpen] = useState(false)
  return (
    <Container>
      <SchoolNavigator>

        {/* create new teacher */}
        <CreateTeacher getTeachers={getTeachers} open={open} setOpen={setOpen} />

        {/* update teacher */}
        <UpdateTeacher />


        <div className='flex flex-col gap-2'>
          {/* search */}
          <div className='flex flex-col w-full gap-3 mx-auto max-w-7xl'>
            <div className='flex justify-between gap-2'>
              <div className='flex flex-col gap-1 w-72 usernameOrEmail'>
                <p>اسم المستخدم او الايميل</p>
                <input placeholder='اكتب' />
              </div>
              <div className='flex gap-3 w-72'>
                <div className='flex flex-col gap-1 usernameOrEmail'>
                  <p>الاسم الاول</p>
                  <input placeholder='اكتب' />
                </div>
                <div className='flex flex-col gap-1 usernameOrEmail'>
                  <p>الاسم الثاني</p>
                  <input placeholder='اكتب' />
                </div>
              </div>
            </div>
            <button className='my-auto btn-primary h-fit'>أبحث</button>
          </div>
          {/* data */}
          <div className='flex gap-5 p-2 teachersContainer'>
            {/* create */}
            <div onClick={() => setOpen(true)} className='flex flex-col justify-center p-3 transition-all border border-orange-200 cursor-pointer hover:bg-orange-50 w-72 h-44 createNewTeacher'>
              <span className='mx-auto'>
                <GoPlus />
              </span>
            </div>
            {/* teachers */}
            <div className='flex flex-col w-[calc(100%-290px)] h-fit gap-4 teachers'>
              {
                teachers?.length > 0 &&
                teachers?.map((teacher) => (
                  <TeacherComponent key={teacher?.id} teacher={teacher} />
                ))
              }

              {
                teachers?.length == 0 &&
                <div className='warningContainer'>
                  <p>لا يوجد مدرسين حاليا.</p>
                </div>
              }

              {
                loading && <Loading />
              }

              {
                err && <Error />
              }

            </div>
          </div>
        </div>
      </SchoolNavigator>
    </Container>
  )
}

export default Teachers
