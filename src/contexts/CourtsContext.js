'use client'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { server } from '../utlits/Variabels'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { tConvert } from '@/utlits/Functions'
import { AuthContextProvider } from './AuthContext'
import { BooksContextProvider } from './BooksContext'

const CourtsContext = ({ children }) => {
  const [editableCourt, setEditableCourt] = useState(null)
  const [createCourtOpen, setCreateCourtOpen] = useState(null)

  const [loading, setloading] = useState(true)
  const [err, setErr] = useState()

  const router = useRouter()
  const path = usePathname()
  const params = useParams()


  const userContext = useContext(AuthContextProvider)

  const [submitLoading, setsubmitLoading] = useState(false)



  const [types, setTypes] = useState([])
  const getTypes = async () => {
    const res = await axios.get(`${server}get_court_types/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setTypes(res.data)
  }
  useEffect(() => {
    if (localStorage.getItem('token') && path.includes('courts')) {
      getTypes()
    }
  }, [path])



  const [types2, setTypes2] = useState([])
  const getTypes2 = async () => {
    const res = await axios.get(`${server}get_court_types_2/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setTypes2(res.data)
  }
  useEffect(() => {
    if (localStorage.getItem('token') && path.includes('courts')) {
      getTypes2()
    }
  }, [path])






  const [court, setCourt] = useState({})
  const [slots, setSlots] = useState([])
  // const [bookedTimes, setBookedTimes] = useState([])
  const [bookWarning, setBookWarning] = useState('')
  const [numbers, setNumbers] = useState([])
  // searhc and filter
  const [isEvent, setIsEvent] = useState('')
  const [search, setSearchTimes] = useState('')
  const [paiedWith, setPaiedWith] = useState('')
  const [bookDate, setBookDate] = useState(getCurrentDate())
  const [isPaied, setIsPaied] = useState('')
  const [courtSettings, setCourtSettings] = useState('')

  const getCourt = async () => {
    try {
      const res = await axios.get(`${server}courts/${params.court_id}/?event=${isEvent}&search=${search}&paied_with=${paiedWith}&book_date=${bookDate}&is_paied=${isPaied}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      setCourt(res.data.court)
      setSlots(res.data.slots)
      setBookWarning(res.data.paying_warning)
      setCourtSettings(res.data.court_settings)
    }
    catch {
      console.log('err get court');
    }
  }
  useEffect(() => {
    if (params.court_id) {
      getCourt()
    }
  }, [params.court_id, path, isEvent, search, paiedWith, bookDate, isPaied])






  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because month is zero-indexed
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  const slotsArray = slots?.map((slot) => {
    const slot_1 = slot?.split('-')[0]?.slice(0, 5)
    const slot_2 = slot?.split('-')[1]?.slice(0, 5)
    return `${tConvert(slot_2)}-${tConvert(slot_1)}`
  })
  const [selectedDate, setSelectedDate] = useState(getCurrentDate())

  const [withBall, setWithBall] = useState('')
  const [event, setEvent] = useState('')
  const [selectedSlots, setSelectedSlots] = useState([])

  const [check, setCheck] = useState([])
  const [closedTimes, setClosedTimes] = useState([])

  const checkCourtBooks = async () => {
    const res = await axios.get(`${server}books/check/${params.court_id}/?slots=${slotsArray}&court_date=${selectedDate}&with_ball=${withBall}&event=${event}&selected_times=${JSON.stringify(selectedSlots)}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setCheck(res.data.booked);
    setClosedTimes(res.data.closed_times);
  }

  useEffect(() => {
    if (params.court_id && localStorage.getItem('token') && slotsArray.length > 0 && path.includes('create')) {
      checkCourtBooks()
    }
  }, [params.court_id, selectedDate, withBall, event, selectedSlots, slotsArray?.length, path])



  const [courts, setCourts] = useState([])
  const [latestCourts, setLatestCourts] = useState([])
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [state, setState] = useState('')
  const [type1, setType1] = useState('')
  const [type2, setType2] = useState('')
  const [offer, setOffer] = useState('')
  const [eventSearch, setEventSearch] = useState('')

  const getCourts = async () => {
    const res = await axios.get(`${server}courts/?price_from=${priceFrom}&price_to=${priceTo}&state=${state}&type=${type1}&type2=${type2}&offer=${offer}&event=${eventSearch}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setCourts(res.data.courts)
    setLatestCourts(res.data.lates_courts)
    if (res.data) {
    }
  }
  useEffect(() => {
    if ((path == '/courts' || path == '/')) {
      getCourts()
    }
  }, [path, priceFrom, priceTo, state, type1, type2, offer, eventSearch])






  const createCourtVideos = async (id, videos) => {

    const form = new FormData()
    videos?.map(async (video) => {
      form.append('court', id)
      form.append('video', video)
      const res = await axios.post(`${server}courts/videos/create/`, form, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
    })
    getCourt()

  }

  const deleteCourtVideo = async (video_id) => {
    const res = await axios.delete(`${server}courts/videos/${video_id}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    getCourt()
  }


  const createCourtImages = async (id, images) => {
    images?.map((e) => console.log(e))
    const form = new FormData()
    images?.map(async (image) => {
      form.append('court', id)
      form.append('image', image)
      try {
        const res = await axios.post(`${server}courts/images/create/`, form, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    })
    getCourt()
  }

  const deleteCourtImage = async (image_id) => {
    const res = await axios.delete(`${server}courts/images/${image_id}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    getCourt()
  }


  const createCourtFeatures = async (id, features) => {
    features?.map(async (feature) => {
      const res = await axios.post(`${server}courts/features/create/`, {
        court: id,
        id: feature?.id,
        feature: feature?.feature,
        is_free: feature?.is_free,
        is_available: feature?.is_available,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
    })
    getCourt()
  }

  const deleteCourtFeature = async (feature_id) => {
    const res = await axios.delete(`${server}courts/features/${feature_id}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    getCourt()
  }


  const createCourtTools = async (courtPk, tools) => {
    const form = new FormData()
    tools?.map(async (t) => {
      const res = await axios.post(`${server}courts/tools/create/`, {
        court: courtPk,
        id: t?.id,
        title: t?.title,
        price: t?.price,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
    })
    getCourt()
  }

  const deleteCourtTool = async (toolId) => {
    const res = await axios.delete(`${server}courts/tools/${toolId}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    getCourt()
  }


  const createCourt = async (e,
    images, videos, setImages, setVideos,
    title, description, price, open, close, state, type1, type2, location,
    offerPrice, offerFrom, offerTo,
    eventPrice, eventFrom, eventTo,
    isClosed, closedFrom, closedTo,
    tools, features, ballPrice) => {

    e.preventDefault()

    const res = await axios.post(`${server}courts/create/`, {
      user: userContext?.user?.id,
      title: title,
      description: description,
      price_per_hour: price,
      open: open,
      close: close,
      state: state,
      type: type1,
      type2: type2,
      location: location,
      ball_price: ballPrice,
      offer_price_per_hour: offerPrice ? offerPrice : 0,
      offer_from: offerFrom ? offerFrom : null,
      offer_to: offerTo ? offerTo : null,
      event_price: eventPrice ? eventPrice : null,
      event_from: eventFrom ? eventFrom : null,
      event_to: eventTo ? eventTo : null,
      closed_now: isClosed,
      closed_from: closedFrom ? closedFrom : null,
      closed_to: closedTo ? closedTo : null,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })

    if (res.data.id) {
      createCourtImages(res.data.id, images)
      createCourtVideos(res.data.id, videos)
      createCourtTools(res.data.id, tools)
      createCourtFeatures(res.data.id, features)
      setCreateCourtOpen(false)
      setImages([])
      setVideos([])
      getCourts()
    } else {
      setErr(res.data)
      console.log(res.data);
    }
  }


  const updateCourt = async (
    e,
    images, videos, setImages, setVideos,
    title, description, price, open, close, state, type1, type2, location,
    offerPrice, offerFrom, offerTo,
    eventPrice, eventFrom, eventTo,
    isClosed, closedFrom, closedTo,
    tools, features, ballPrice
  ) => {
    e.preventDefault()
    const res = await axios.put(`${server}courts/${params.court_id}/update/`, {
      title: title,
      description: description,
      price_per_hour: price,
      open: open,
      close: close,
      state: state,
      type: type1,
      type2: type2,
      location: location,
      ball_price: ballPrice,
      offer_price_per_hour: offerPrice ? offerPrice : 0,
      offer_from: offerFrom ? offerFrom : null,
      offer_to: offerTo ? offerTo : null,
      event_price: eventPrice ? eventPrice : null,
      event_from: eventFrom ? eventFrom : null,
      event_to: eventTo ? eventTo : null,
      closed_now: isClosed,
      closed_from: closedFrom ? closedFrom : null,
      closed_to: closedTo ? closedTo : null,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })

    if (res.data.id) {
      createCourtImages(res.data.id, images)
      createCourtVideos(res.data.id, videos)
      createCourtTools(res.data.id, tools)
      createCourtFeatures(res.data.id, features)
      setEditableCourt(false)
      setImages([])
      setVideos([])
      getCourt()
    }
  }


  const deleteCourt = async (e, court_id) => {

    e.preventDefault()
    const res = await axios.delete(`${server}courts/${court_id}/delete/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    router.push('/courts')
    getCourts()

  }




  // court books
  const [courtBooks, setCourtBooks] = useState([])
  const [booksSearch, setBooksSearch] = useState('');
  const [booksBookDate, setBooksBookDate] = useState(getCurrentDate());
  const [booksIsCancelled, setBooksIsCancelled] = useState('');
  const [booksIsPaid, setBooksIsPaid] = useState('');
  const [booksPaid, setBooksPaid] = useState('');

  const getCourtBooks = async (court_id) => {
    const res = await axios.get(`${server}courts/${court_id}/books/?search=${booksSearch}&book_date=${booksBookDate}&is_cancelled=${booksIsCancelled}&is_paied=${booksIsPaid}&paied=${booksPaid}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    setCourtBooks(res.data)
  }



  return (
    <CourtsContextProvider.Provider
      value={{

        err,

        booksSearch, setBooksSearch,
        booksBookDate, setBooksBookDate,
        booksIsCancelled, setBooksIsCancelled,
        booksIsPaid, setBooksIsPaid,
        booksPaid, setBooksPaid,

        getCourtBooks,
        courtBooks,

        setCreateCourtOpen,
        createCourtOpen,


        setWithBall,
        setEvent,
        setSelectedSlots,
        selectedSlots,

        courts,
        latestCourts,
        numbers,
        setIsEvent,
        setSearchTimes,
        setPaiedWith,
        setBookDate,
        setIsPaied,
        isPaied,
        isEvent,
        search,
        paiedWith,
        bookDate,
        bookWarning,
        court,
        getCourt,
        // bookedTimes,

        slotsArray,
        setSelectedDate,
        selectedDate,
        check,
        closedTimes,


        deleteCourtVideo,
        deleteCourtImage,
        deleteCourtFeature,
        deleteCourtTool,
        createCourt,
        updateCourt,
        deleteCourt,
        setEditableCourt,
        editableCourt,

        courtSettings,


        withBall,

        types,
        types2,

        submitLoading,
        setsubmitLoading,

        slots,
        setloading,
        loading,


        setPriceFrom,
        setPriceTo,
        setState,
        setType1,
        setType2,
        setOffer,
        setEventSearch,

        priceFrom,
        priceTo,
        state,
        type1,
        type2,
        offer,
        eventSearch,
      }}
    >
      {children}
    </CourtsContextProvider.Provider>
  )
}

export const CourtsContextProvider = createContext()
export default CourtsContext