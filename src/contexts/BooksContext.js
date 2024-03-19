'use client'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../utlits/Variabels'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { CourtsContextProvider } from './CourtsContext'
import { AuthContextProvider } from './AuthContext'

const BooksContext = ({ children }) => {
  const [loading, setloading] = useState(true)
  const [timeId, setTimeId] = useState(null)
  const [err, setErr] = useState()
  const [can_delete, setcan_delete] = useState(false)



  const router = useRouter()
  const path = usePathname()
  const params = useParams()

  const courtContext = useContext(CourtsContextProvider)
  const userContext = useContext(AuthContextProvider)

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because month is zero-indexed
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [dateFrom, setDateFrom] = useState(getCurrentDate())
  const [dateTo, setDateTo] = useState('')
  const [books, setBooks] = useState([])
  const [times, setTimes] = useState([])

  const getBooks = async (bookfrom, bookto) => {
    const res = await axios.get(`${server}books/?date_from=${bookfrom ?? ''}&date_to=${bookto ?? ''}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setTimes(res.data.times)
    return await res.data.times
  }

  useEffect(() => {
    if (localStorage.getItem('token') && (path.includes('books') || path.includes('profile'))) {
      getBooks()
    }
  }, [dateFrom, dateTo])



  const [book, setBook] = useState({})

  const getBook = async () => {
    setloading(treu)
    const res = await axios.get(`${server}books/${params.book_id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setBook(res.data.book)
    if (res.data) {
      setloading(false)
    }
  }

  useEffect(() => {
    if ((params.book_id) && localStorage.getItem('token')) {
      getBook()
    }
  }, [params.book_id, path])



  const createBook = async (e, infos) => {
    e.preventDefault()

    const res = await axios.post(`${server}books/create/`, {
      user: null,
      court: params.court_id,
      name: infos.name,
      phone: infos.phone,
      book_date: courtContext?.selectedDate,
      book_time: courtContext?.selectedSlots
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.id) {
      router.push(`/profile/`)
      courtContext?.setSelectedSlots([])
      getBooks()
      courtContext?.getCourt()
      setDeleteOpenMessage('تم الحجز بنجاح')
    }
    else {
      setErr(res.data)
    }
  }




  // const updateTime = async (e,
  //   time_id, tools,
  //   bookToDate, eventValue, withBallValue, paiedWithValue,
  //   isPaiedValue, isCancelled, cancelledDay
  // ) => {
  //   e.preventDefault()
  //   const data = {
  //     book_to_date: bookToDate,
  //     event: eventValue,
  //     with_ball: withBallValue,
  //     paied: paiedWithValue,
  //     is_paied: isPaiedValue,
  //     is_cancelled: isCancelled,
  //     is_cancelled_day: cancelledDay,
  //   }
  //   const res = await axios.put(`${server}books/time/${time_id}/update/?tools=${tools}`, data, {
  //     headers: {
  //       Authorization: `Token ${localStorage.getItem('token')}`
  //     }
  //   })
  // }


  const updateBook = async (e,
    name, phone, book_id,
    bookToDate, eventValue, withBallValue, isPaiedValue, paiedWithValue, selectedTools, isCancelled, isCancelledDay,
    overTime, time_id
  ) => {
    // e.preventDefault()

    // book
    const resBook = await axios.put(`${server}books/${book_id}/update/`, {
      name: name,
      phone: phone,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })


    // time
    const resTime = await axios.put(`${server}books/time/${time_id}/update/?tools=${selectedTools}`, {
      book_to_date: bookToDate,
      event: eventValue,
      with_ball: withBallValue,
      paied: paiedWithValue,
      is_paied: isPaiedValue,
      is_cancelled: isCancelled,
      is_cancelled_day: isCancelledDay,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (resTime.data) {
      getTime(resTime.data.id)
      // courtContext?.getCourt()
      courtContext?.getCourtBooks(resTime.data.book_time.court)
    }


    // overTime
    if (overTime?.book_from) {
      const resOverTime = await axios.post(`${server}books/over_time/create/`, {
        book: book_id,
        book_from: overTime?.book_from,
        book_to: overTime?.book_to,
        note: overTime?.note,
        price: overTime?.price,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
    }
    userContext?.setMessage('تم التعديل بنجاح')
    userContext?.setMessageDisplay('yes')

    return await resTime.data
  }


  const [deleteOpenMessage, setDeleteOpenMessage] = useState('')

  const deleteBook = async (e, bookId) => {
    const res = await axios.delete(`${server}books/${bookId}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.success) {
      getBooks()
      courtContext?.getCourt()
      if (userContext?.user?.is_superuser | userContext?.user?.is_staff) {
      } else {
        router.push('/profile')
      }
      setDeleteOpenMessage('تم الغاء الحجز')
    }
    courtContext?.setsubmitLoading(false)
  }
  useEffect(() => {
    if (deleteOpenMessage) {
      setTimeout(() => {
        setDeleteOpenMessage("")
      }, 4000)
    }
  }, [deleteOpenMessage])




  const [pinnedTimes, setPinnedTimes] = useState()

  const getTime = async (id) => {
    const res = await axios.get(`${server}books/time/${id ? id : timeId}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })

    setPinnedTimes(res.data.pinned_times)
    setcan_delete(res.data.can_delete)
  }

  useEffect(() => {
    if (localStorage.getItem('token') && timeId) {
      getTime()
    }
  }, [timeId])






  const createOverTime = async (from, to, note, price, book_id) => {
    const data = {
      book: book_id,
      book_from: from,
      book_to: to,
      note: note,
      price: price,
    }
    const res = await axios.post(`${server}books/over_time/create/`, data, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.id) {
      setDeleteOpenMessage('تم اضافة وقت اضافي بنجاح')
      courtContext?.getCourt()
      setTimeId(null)
    }
  }

  const deleteOverTime = async (over_time_id) => {
    const res = await axios.delete(`${server}books/over_time/${over_time_id}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.success) {
      setDeleteOpenMessage('تم الغاء الوقت الاضافي')
      courtContext?.getCourt()
      setTimeId(null)
    }
  }




  const createNotification = async (e, slot, setOpen) => {
    e.preventDefault()

    const res = await axios.post(`${server}notifications/create/`, {
      user: userContext?.user?.id,
      court: params.court_id,
      slot: `${slot?.split('-')[0]}-${slot?.split('-')[1]}`,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.data.id) {
      setOpen(null)
      setDeleteOpenMessage('سيتم ابلاغك في حال تم الغائها')
    }
    else {
      setErr(res.data)
    }
  }

  return (
    <BooksContextProvider.Provider
      value={{
        err,

        getBooks,

        dateFrom,
        dateTo,
        setDateFrom,
        setDateTo,
        times,
        books,
        timeId,
        setTimeId,
        book,
        can_delete,
        deleteOpenMessage,
        setDeleteOpenMessage,
        createBook,
        updateBook,
        deleteBook,

        // updateTime,
        deleteOverTime,
        createOverTime,

        pinnedTimes,
        getTime,
        setloading,
        loading,

        createNotification,

      }}
    >
      {children}
    </BooksContextProvider.Provider>
  )
}

export const BooksContextProvider = createContext()
export default BooksContext