import React, { useContext, useEffect, useState } from 'react'
import OpenFromBottom from '../OpenFromBottom'
import { ApiContextProvider } from '../../context/ApiContext'

const CreateTeacher = ({ open, setOpen, getTeachers }) => {
  const apiContext = useContext(ApiContextProvider)

  const [teacherInfoOpen, setTeacherInfoOpen] = useState(false)

  const [levels, setLevels] = useState([])
  const getSchoolLevels = async () => {
    const res = await apiContext?.getSchoolLevels()
    setLevels(res)
  }
  useEffect(() => {
    getSchoolLevels()
  }, [])

  const [subject, setSubject] = useState([])
  const getSchoolSubject = async () => {
    const res = await apiContext?.getSchoolSubject()
    setSubject(res)
  }
  useEffect(() => {
    getSchoolSubject()
  }, [])


  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [selected_levels, setSelectedLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const creatTeacher = async () => {
    try {
      const res = await apiContext?.createNewAccount(username, email, password, first_name, last_name)
      if (res.id) {
        // create teacher profile
        const res_ = await apiContext?.createTeacherProfile(res.id, selected_levels, subjects)
        if (res_.id) {
          setOpen(false)
          setTeacherInfoOpen(false)
          getTeachers()
        }
      } else {
        apiContext?.setMessage(res.username || res.email || res.password || res.first_name || res.last_name);
        setTeacherInfoOpen(false)
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <OpenFromBottom open={open} setOpen={setOpen}>
      <div className='flex flex-col justify-center w-full h-full gap-3'>
        <div className='createTeacher'>
          {/* user infos */}
          <div className={`
          fixed translate-x-[50%] overflow-hidden right-[50%] translate-y-[-50%] transition-all duration-700 top-[50%] flex flex-col max-w-lg gap-2 rounded-md shadow-lg mx-auto bg-gradient-to-br from-orange-100 to-red-100
          ${teacherInfoOpen ? "w-0 p-0" : "p-2 w-full"}
          `}>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-col gap-1'>
                <p>اسم المستخدم المميز</p>
                <input
                  placeholder='أكتب اسم المستخدم'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>الاسم الاول</p>
                <input
                  placeholder='اكتب'
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>الاسم الثاني</p>
                <input
                  placeholder='اكتب'
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>البريد الالكتروني</p>
                <input
                  placeholder='بريدك الالكتروني'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p>كلمة المرور</p>
                <input
                  placeholder='اكتب كلمة مرور قوية'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={() => setTeacherInfoOpen(!teacherInfoOpen)} className='mt-2 btn-primary'>تم</button>
            </div>
          </div>

          {/* teacherinfos */}
          <div className={`
          fixed translate-x-[50%] overflow-hidden right-[50%] translate-y-[-50%] transition-all duration-700 top-[50%] flex flex-col max-w-lg gap-2 mx-auto rounded-md shadow-lg bg-gradient-to-br from-orange-100 to-red-100
          ${teacherInfoOpen ? "p-2 w-full" : "w-0 p-0"}
          `}>
            <div className='flex flex-col gap-1'>

              <div className='flex flex-col gap-1'>
                <p>مدرس للصفوف:</p>
                <div className='flex flex-col h-full gap-2 overflow-scroll max-h-40'>
                  {
                    levels?.map((l) => (
                      <div key={l?.id} className='flex gap-2 p-2 bg-indigo-100 rounded-md shadow-md'>
                        <input onChange={() => {
                          const exist = selected_levels?.find(f => f == l?.id)
                          if (exist) {
                            setSelectedLevels(selected_levels?.filter(f => f !== l?.id))
                          } else {
                            setSelectedLevels(prev => [...prev, l?.id])
                          }
                        }} checked={selected_levels?.find(f => f == l?.id) == l?.id} type='checkbox' className='my-auto w-fit h-fit' />
                        <p>{l?.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <p>متخصص في:</p>
                <div className='flex flex-col h-full gap-2 overflow-scroll max-h-40'>
                  {
                    subject?.map((l) => (
                      <div key={l?.id} className='flex gap-2 p-2 bg-indigo-100 rounded-md shadow-md'>
                        <input onChange={() => {
                          const exist = subjects?.find(f => f == l?.id)
                          if (exist) {
                            setSubjects(subjects?.filter(f => f !== l?.id))
                          } else {
                            setSubjects(prev => [...prev, l?.id])
                          }
                        }} checked={subjects?.find(f => f == l?.id) == l?.id} type='checkbox' className='my-auto w-fit h-fit' />
                        <p>{l?.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className='flex justify-between gap-2'>
                <button onClick={creatTeacher} className='mt-2 btn-primary'>انشاء</button>
                <button onClick={() => setTeacherInfoOpen(!teacherInfoOpen)} className='mt-2 btn-error'>االرجوع</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OpenFromBottom>
  )
}

export default CreateTeacher