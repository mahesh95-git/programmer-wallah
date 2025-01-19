import React from 'react'
import UserSearch from './Input'
import Link from 'next/link'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Input } from '../ui/input'
function Navbar() {
  return (
    <nav className=' z-20 px-5 py-4 gap-2 rounded-full fixed w-[70%] border-2 items-center border-gray-200 bg-white flex justify-between top-2'>
      <div >
        <h1 className='tracking-wide'><span className='text-3xl black'>P</span><span className='text-2xl text-orange-500'>W</span></h1>
      </div>
      <ul className='flex   p  gap-6 justify-center items-center'>
        <Link href={"/"}><li>Home</li></Link>
        <Link href={"/courses"}><li>Courses</li></Link>
        <Link href={"/courses"}><li>Teach On Pw</li></Link>
        <input type="text" placeholder='search course' className="p-2 border-2 border-gray-200 bg-white rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton className='border-2 border-indigo-500 p-2 rounded-full hover:bg-gray-200' />
        </SignedOut>

      </ul>


    </nav>
  )
}

export default Navbar