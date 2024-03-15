'use client'
import BookForm from "@/components/Book/BookForm"
import TimesCustomization from "@/components/Book/TimesCustomization"
import Container from "@/components/Utlits/Container"
import Loading from "@/components/Utlits/Loading"
import { CourtsContextProvider } from "@/contexts/CourtsContext"
import { useContext, useEffect, useState } from "react"


const page = () => {
  const courtContext = useContext(CourtsContextProvider)

  const slots = courtContext?.slotsArray

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slots?.length > 0) {
      setLoading(false)
    }
  }, [slots?.length])


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')


  const [timesOpen, setTimesOpen] = useState(false)


  if (loading) {
    return <Loading />
  }

  return (
    <Container>
      <BookForm setTimesOpen={setTimesOpen} name={name} phone={phone} setName={setName} setPhone={setPhone} loading={loading} />

      <TimesCustomization name={name} phone={phone} setTimesOpen={setTimesOpen} timesOpen={timesOpen} />
    </Container>
  )
}

export default page

