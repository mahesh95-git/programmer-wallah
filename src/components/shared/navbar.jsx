import React from 'react'
import UserSearch from './Input'
import Link from 'next/link'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
function Navbar() {
  return (
    <nav className='px-5 py-4 gap-2 rounded-full fixed w-[70%] border-2 items-center border-gray-200  flex-1 flex justify-between top-2'>
       <div className='flex-1'>
        <h1 className='tracking-wide'><span className='text-3xl text-orange-500'>W</span><span className='text-2xl'>code</span></h1>
       </div>
       <ul className='flex  gap-6 justify-center items-center'>
        <Link href={"/"}><li>Home</li></Link>
        <Link href={"/courses"}><li>Courses</li></Link>
        <Link href={"/about"}><li>About</li></Link>
        <SignedIn>
            <UserButton/>
        </SignedIn>
        <SignedOut>
            <SignInButton className='border-2 border-gray-100 p-2 rounded-full hover:bg-gray-200'/>
        </SignedOut>

       </ul>
      
       
    </nav>
  )
}

export default Navbar