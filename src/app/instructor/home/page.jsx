import { MonthlyRevenues } from '@/components/shared/MonthlyRevnues';
import { MonthlyStudent } from '@/components/shared/MonthlyStudent';
import RecentCourses from '@/components/shared/RecentCourses';
import { LibraryBig, User } from 'lucide-react';
import React from 'react';

function Page() {
  return (
    <div className="grid grid-cols-5 gap-4 row-span-6 min-h-screen bg-gray-100 p-2">
      {/* Small Div 1 */}
      <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col p-5">
       <div className='flex justify-center items-center flex-col'>
        <User width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Students</p>
       </div>
       <p className='text-2xl'>10000</p>
      </div>

      {/* Small Div 2 */}
      <div className="bg-white shadow-lg  rounded-lg flex justify-center items-center flex-col  ">
       <div className='flex justify-center items-center flex-col'>
        <LibraryBig width={50} height={50} className="text-gray-700" />
        <p className='opacity-50'>Courses</p>
       </div>
       <p className='text-2xl'>1000</p>
      </div>
      {/* Big Div 1 */}
      <div className="col-span-3 row-span-4 bg-white shadow-lg p-2 rounded-lg flex justify-center items-center">
        <MonthlyRevenues/>
      </div>

      {/* Big Div 2 */}
      <div className="col-span-2 row-span-4 bg-white shadow-lg p-2 rounded-lg flex flex-col ">
        <h1 className='opacity-50 border-b-2 h-10 text-center'>Recent Courses</h1>
        <div>
            <RecentCourses/>
        </div>
      </div>
      <div className="col-span-3  bg-white shadow-lg p-4 rounded-lg flex justify-center items-center">
       <MonthlyStudent/>
      </div>
    </div>
  );
}

export default Page;
