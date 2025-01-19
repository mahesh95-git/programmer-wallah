import Navbar from '@/components/shared/navbar'
import React from 'react'

function layout({children}) {
  return (
   <>
    <Navbar />
  {children}
   </>
  )
}

export default layout