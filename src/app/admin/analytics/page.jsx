import { AdminMonthlyStudentJoin } from '@/components/shared/adminMonthlyStudentJoin';
import { 
  AmdinRevenue } from '@/components/shared/adminRevenue';
import React from 'react';

function Page() {
  return (
    <div className="grid grid-cols-4 gap-4 grid-rows-4 min-h-screen bg-gray-100 p-2">
     
      {/* Small Div 2 */}
      <div className="bg-white row-span-2 col-span-4 shadow-lg  rounded-lg flex justify-center items-center flex-col">
      <AmdinRevenue/>
      </div>

      {/* Big Div 2 */}
      <div className="col-span-2 row-span-3 bg-white shadow-lg p-2 rounded-lg flex flex-col ">
       <AdminMonthlyStudentJoin title={"Monthly Student Enroll"} />
      </div>
     
     {/* Big Div 2 */}
     <div className="col-span-2 row-span-3 bg-white shadow-lg p-2 rounded-lg flex flex-col ">
     <AdminMonthlyStudentJoin title={"Monthly Instrucotr Enroll"}/>
       </div>
    </div>
  );
}

export default Page;
