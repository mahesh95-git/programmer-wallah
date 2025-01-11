"use client";
import React from 'react'
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

function UserSearch() {
  return (
    <div className='flex items-center relative '>
        <Input  type="text" placeholder="search course" className="p-2" />
        <Search className='absolute right-2 '/>
    </div>
  )
}

export default UserSearch