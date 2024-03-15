'use client'
import { BooksContextProvider } from '@/contexts/BooksContext'
import { Alert } from '@mui/material'
import React, { useContext } from 'react'
import { FaCheck } from 'react-icons/fa6'
import Loading from '@/components/Utlits/Loading'


const App = ({ children }) => {
  const bookContext = useContext(BooksContextProvider)

  return (
    <div>
      {children}
      {/* message success of deleteing */}
      {
        bookContext?.deleteOpenMessage?.length > 0 &&
        <div className='fixed z-50 bottom-2 right-3 p-2'>
          <Alert className='flex gap-1' icon={<FaCheck />} severity="success">
            {bookContext?.deleteOpenMessage}
          </Alert>
        </div>
      }
      {/* {
        bookContext?.loading &&
        <Loading />
      } */}
    </div>
  )
}

export default App