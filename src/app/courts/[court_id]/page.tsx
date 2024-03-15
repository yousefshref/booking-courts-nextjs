'use client'

import CourtEdit from "@/components/Court/CourtEdit"
import CourtInformation from "../../../components/Court/CourtInformation"
import Container from "@/components/Utlits/Container"

import { CourtsContextProvider } from "@/contexts/CourtsContext"

import { useContext } from "react"


const page = () => {
  const courtContext = useContext(CourtsContextProvider)
  const court = courtContext?.court

  return (
    <Container>
      <CourtInformation court={court} />

      <CourtEdit court={court} />
    </Container>
  )
}

export default page
