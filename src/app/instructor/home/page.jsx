import { AmdinRevenue } from '@/components/shared/adminRevenue';
import { MonthlyRevenues } from '@/components/shared/MonthlyRevnues';
import { MonthlyStudent } from '@/components/shared/MonthlyStudent';
import RecentCourses from '@/components/shared/RecentCourses';
import { LibraryBig, User } from 'lucide-react';
import React from 'react';

function Page() {
  return (
    <div className="grid grid-cols-1 gap-4  min-h-screen bg-gray-100 p-2">
      
      <div className=" bg-white shadow-lg p-2 rounded-lg flex justify-center items-center">
        <AmdinRevenue />
      </div>
      <div className="  bg-white shadow-lg p-4 rounded-lg flex justify-center items-center">
       <MonthlyStudent/>
      </div>
    </div>
  );
}

export default Page;
