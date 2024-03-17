'use client'
import Book from '@/components/Book/Book'
import CancelledTimes from '@/components/Settings/CancelledTimes'
import Employees from '@/components/Settings/Employees'
import Number from '@/components/Settings/Number'
import SettingsComponent from '@/components/Settings/SettingsComponent'
import Container from '@/components/Utlits/Container'
import Loading from '@/components/Utlits/Loading'
import LoadingComponent from '@/components/Utlits/LoadingComponent'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { BooksContextProvider } from '@/contexts/BooksContext'
import { CourtsContextProvider } from '@/contexts/CourtsContext'
import { SettingsContextProvider } from '@/contexts/SettingsContext'
import { StaffsContextProvider } from '@/contexts/StaffsContext'
import { formatNumber, getCurrentDate } from '@/utlits/Functions'
import React, { useContext, useEffect, useState } from 'react'
import { MdNumbers } from 'react-icons/md'

const page = () => {
  const userContext = useContext(AuthContextProvider)
  const user = userContext?.user

  const staffsContext = useContext(StaffsContextProvider)
  const settingsContext = useContext(SettingsContextProvider)
  const bookContext = useContext(BooksContextProvider)



  // settings
  const [cancelled, setCancelled] = useState<any>()
  const [cancelled_from, setcancelled_from] = useState<any>(getCurrentDate())
  const [cancelled_to, setcancelled_to] = useState<any>(getCurrentDate())
  const [cancelled_search, setcancelled_search] = useState<any>(getCurrentDate())

  const [settings, setSettings] = useState<any>()
  const [settingsError, setSettingsError] = useState(false)
  const [loadingSettings, setLoadingSettings] = useState(true)
  const fetchSettings = async () => {
    try {
      const res = await settingsContext?.getSettings(cancelled_from, cancelled_to, cancelled_search)
      setSettings(res.settings);
      setCancelled(res.cancelled_books)
    } catch (err) {
      setSettingsError(true)
    } finally {
      setLoadingSettings(false)
    }
  }
  useEffect(() => {
    if (userContext?.user?.is_staff || userContext?.user?.is_superuser) fetchSettings()
  }, [cancelled_from, cancelled_to, cancelled_search, user])

  // settings
  const [numbers, setNumbers] = useState<any>()
  const [numbersError, setNumbersError] = useState(false)
  const [loadingNumbers, setLoadingNumbers] = useState(true)
  const fetchData = async () => {
    try {
      const res = await settingsContext?.getNumbers(settings?.id)
      setNumbers(res);
    } catch (err) {
      setNumbersError(true)
    } finally {
      setLoadingNumbers(false)
    }
  }
  useEffect(() => {
    if (settings?.id && (userContext?.user?.is_staff || userContext?.user?.is_superuser)) {
      fetchData()
    }
  }, [settings, user])


  // staffs
  const [staffs, setStaffs] = useState<any>()
  const [staffsError, setStaffsError] = useState(false)
  const [loadingStaffs, setLoadingStaffs] = useState(true)
  const getStaffs = async () => {
    try {
      const res = await staffsContext?.getStaffs()
      setStaffs(res);
    } catch (err) {
      setStaffsError(true)
    } finally {
      setLoadingStaffs(false)
    }
  }
  useEffect(() => {
    if (userContext?.user?.is_staff || userContext?.user?.is_superuser) getStaffs()
  }, [staffsContext?.bookfrom, staffsContext?.bookto, user])





  // client
  const [bookfrom, setbookfrom] = useState(getCurrentDate())
  const [bookto, setbookto] = useState('')
  const [books, setbooks] = useState<any>()
  const [booksError, setbooksError] = useState(false)
  const [booksloading, setbooksLoading] = useState(true)
  const getBooks = async () => {
    setbooksLoading(true)
    try {
      const res = await bookContext?.getBooks(bookfrom, bookto)
      setbooks(res);
    } catch (err) {
      setbooksError(true)
    } finally {
      setbooksLoading(false)
    }
  }
  useEffect(() => {
    if (!userContext?.user?.is_staff || !userContext?.user?.is_superuser) getBooks()
  }, [user, bookfrom, bookto])


  return (
    <Container>
      {
        user?.is_superuser || user?.is_staff ?
          // admin
          <div className='flex flex-col gap-16 w-full max-w-5xl mx-auto'>
            {/* name and money details */}
            <div className='main relative animateToTop'>
              {
                !loadingSettings && (user?.is_superuser || user?.is_staff) ?
                  <button onClick={() => {
                    fetchSettings()
                    userContext?.setMessage('تم تحديث الارباح')
                    userContext?.setMessageDisplay('yes')
                  }} className='closeBtn text-xs'>تحديث الارباح</button>
                  : <div className='closeBtn'>
                    <LoadingComponent />
                  </div>
              }
              <div className='font_light mt-5 text-center flex flex-col gap-1'>
                <h3>{user?.username}</h3>
                <p>{user?.email}</p>
              </div>
              <div className='moneyDetails flex justify-around flex-wrap gap-5'>
                <div className='flex text-center flex-col'>
                  {
                    settings?.id && (user?.is_staff || user?.is_superuser) ?
                      <p className='
                text-8xl
                from-green-500 to-neutral-800 bg-clip-text bg-gradient-to-t text-transparent
                  '>{formatNumber(settings?.total_money ?? 0)}</p>
                      : <LoadingComponent />
                  }
                  <p>الارباح</p>
                </div>
                <div className='flex text-center flex-col'>
                  {
                    settings?.id && (user?.is_staff || user?.is_superuser) ?
                      <p className='text-8xl from-yellow-500 to-neutral-800 bg-clip-text bg-gradient-to-t text-transparent'>{formatNumber(settings?.waiting_money ?? 0)}</p>
                      : <LoadingComponent />
                  }
                  <p>المنتظرة</p>
                </div>
                <div className='flex text-center flex-col'>
                  {
                    settings?.id && (user?.is_staff || user?.is_superuser) ?
                      <p className='text-8xl from-red-500 to-neutral-800 bg-clip-text bg-gradient-to-t text-transparent'>{formatNumber(settings?.cancelled_money ?? 0)}</p>
                      : <LoadingComponent />
                  }
                  <p>الملغية</p>
                </div>
              </div>
            </div>


            {/* settings and numbers */}
            {
              loadingSettings && (user?.is_superuser || user?.is_staff) ?
                <div className={`flex flex-col gap-4 animateToTop p-5 bg-white`}>
                  <div className='flex flex-col gap-5'>
                    <div className='payingWaring flex flex-col gap-1 w-fit'>
                      <LoadingComponent withText />
                    </div>
                    <div className='payingLimite flex flex-col gap-1 w-fit'>
                      <LoadingComponent withText />
                    </div>
                    <div className='canceleLimit flex flex-col gap-1 w-fit'>
                      <LoadingComponent withText />
                    </div>
                  </div>
                </div>

                :
                settingsError ? <div className='errorContainer'><p>لا يوجد لديك اعدادات... يرجي الاتصال بالدعم لو تتكر المشكلة باستمرار</p></div>
                  : <SettingsComponent settings={settings} />
            }

            {/* numbers */}
            {
              loadingNumbers && (user?.is_superuser || user?.is_staff) ?
                <div className='payingWaring animateToTop flex flex-col gap-1 w-fit'>
                  <LoadingComponent withText />
                </div>
                :
                numbersError ? <div className='errorContainer'><p>لا يوجد لديك اعدادات... يرجي الاتصال بالدعم لو تتكر المشكلة باستمرار</p></div>
                  : <Number getNumbers={fetchData} settings={settings} numbers={numbers} />
            }



            {/* employees */}
            {
              loadingStaffs && (user?.is_superuser || user?.is_staff) ?
                <div className='payingWaring animateToTop flex flex-col gap-1 w-fit'>
                  <LoadingComponent withText />
                </div>
                :
                staffsError ? <div className='errorContainer'><p> هناك مشكلة ما... يرجي الاتصال بالدعم لو تتكر المشكلة باستمرار</p></div>
                  : <Employees getStaffs={getStaffs} staffs={staffs} />
            }


            {/* cancelled */}
            {
              loadingSettings && (user?.is_superuser || user?.is_staff) ?
                <div className='payingWaring flex flex-col gap-1 w-fit'>
                  <LoadingComponent withText />
                </div>
                :
                settingsError ? <div className='errorContainer'><p>هناك مشكلة ما... يرجي الاتصال بالدعم لو تتكر المشكلة باستمرار</p></div>
                  : <CancelledTimes
                    cancelled_from={cancelled_from}
                    cancelled_to={cancelled_to}
                    cancelled_search={cancelled_search}
                    setcancelled_from={setcancelled_from}
                    setcancelled_to={setcancelled_to}
                    setcancelled_search={setcancelled_search}
                    cancelledTimes={cancelled} />
            }

          </div>
          :
          // user
          <div className='flex flex-col gap-16 w-full max-w-5xl mx-auto'>
            {
              booksError ? <div className='errorContainer'><p>يرجي الاتصال بالدعم لو تتكر المشكلة باستمرار</p></div>
                :
                <div className='flex flex-col gap-4 text-center'>
                  <div className='flex flex-col gap-2'>
                    <h3>{user?.username ?? <LoadingComponent />}</h3>
                    <small>{user?.email ?? <LoadingComponent />}</small>
                    <div className='flex flex-col text-center'>
                      <p className='text-2xl'>{books?.length == 0 ? 0 : books?.length}</p>
                      {
                        books &&
                        <small>حجوزات</small>
                      }
                    </div>
                  </div>
                  <div className='flex flex-col gap-3 text-start'>
                    <p>اخر الحجوزات</p>
                    <hr />
                    <div className='search flex flex-wrap gap-5'>
                      <div className='flex flex-col gap-1'>
                        <p>تاريخ حجز من</p>
                        <input type="date"
                          defaultValue={bookfrom}
                          onChange={(e) => setbookfrom(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <p>تاريخ حجز حتي</p>
                        <input type="date"
                          defaultValue={bookto}
                          onChange={(e) => setbookto(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className='flex flex-wrap justify-around gap-3'>
                      {
                        !booksloading ?
                          books?.length > 0 ?
                            books?.map((book: any) => (
                              <Book getBooks={getBooks} book={book} court={book?.book_time?.court_details} key={book?.id} />
                            ))
                            : <div className='errorContainer w-full'>
                              <p>لا يوجد حجوزات حاليا</p>
                            </div>
                          :
                          <div className='p-2 w-full transition-all duration-200 bg-neutral-200'>
                            <div className='flex w-full'>
                              <LoadingComponent withText />
                            </div>
                          </div>
                      }
                    </div>
                  </div>
                </div>
            }
          </div>
      }
    </Container >
  )
}

export default page