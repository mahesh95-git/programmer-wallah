import { MonthlyRevenues } from '@/components/shared/MonthlyRevnues';
import { IndianRupee, LibraryBig, User, UserRoundCog, UsersRound } from 'lucide-react';
import React from 'react';

function Page() {
  return (
    <div className="grid grid-cols-5 gap-4  bg-gray-100 p-2">
      <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col h-52">
       <div className='flex justify-center items-center flex-col'>
        <User width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Students</p>
       </div>
       <p className='text-2xl'>10000</p>
      </div>

      {/* Small Div 2 */}
      <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col h-52">
       <div className='flex justify-center items-center flex-col'>
        <UserRoundCog width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Instructors</p>
       </div>
       <p className='text-2xl'>1000</p>
      </div>
       {/* Small Div 2 */}
       <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col h-52">
       <div className='flex justify-center items-center flex-col'>
        <LibraryBig width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Courses</p>
       </div>
       <p className='text-2xl'>1000</p>
      </div>
      <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col h-52">
       <div className='flex justify-center items-center flex-col'>
        <IndianRupee width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Total Revenue</p>
       </div>
       <p className='text-2xl'>1000K</p>
      </div>
      <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col h-52">
       <div className='flex justify-center items-center flex-col'>
        <UsersRound width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Active Users</p>
       </div>
       <p className='text-2xl'>5.2K</p>
      </div>
      
      <div className="col-span-5  bg-white shadow-lg p-4 rounded-lg flex justify-center items-center">
      <MonthlyRevenues/>
      </div>
    </div>
  );
}

export default Page;
