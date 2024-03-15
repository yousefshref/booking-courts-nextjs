'use client'
import Courts from "@/components/Courts/Courts"
import Header from "@/components/Courts/Header"
import Container from "@/components/Utlits/Container"

const page = () => {
  // all courts
  // create court
  // edit - delete court
  // search and filter
  // court books
  return (
    <Container>
      <Header />
      <Courts />
    </Container>
  )
}

export default page

