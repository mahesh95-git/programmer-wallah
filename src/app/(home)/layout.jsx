import Navbar from '@/components/shared/navbar'
import React from 'react'

function layout({children}) {
  return (
   <div className="flex mx-auto flex-col gap-4 p-4 w-[70%] justify-center items-center min-h-screen">
    <Navbar />
  {children}
   </div>
  )
}

export default layout