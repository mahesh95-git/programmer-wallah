import React from 'react';
import Link from 'next/link';
import { User, PlusSquare, Video, FileText, BarChart, Speaker, Home, ReceiptText } from 'lucide-react';

function Layout({ children }) {

  const navOptions=[
    {
      label: 'Home',
      href: '/instructor/home',
      icon: <Home  size={20} className="text-gray-700"/>,
    },
    {
      label: 'Profile',
      href: '/instructor/home/profile',
      icon: <User  size={20} className="text-gray-700"/>,
    },
    {
      label: 'Create New Course',
      href: '/instructor/home/course/new',
      icon: <PlusSquare  size={20} className="text-gray-700"/>,
    },
    {
      label: 'Go to Live Sessions',
      href: '/instructor/home/live-sessions',
      icon: <Video  size={20} className="text-gray-700"/>,
    },
    {
      label: 'Manage Courses',
      href: '/instructor/home/course/manage',
      icon: <FileText  size={20} className="text-gray-700"/>,
    },
    
    {
      label: 'Coupun Codes',
      href: '/instructor/home/course/coupon-codes',
      icon: <ReceiptText  size={20} className="text-gray-700"/>,
    },
  ]
  return (
    <div className="flex w-full min-h-screen gap-2">
      {/* Sidebar Navigation */}
      <div className="w-1/5 h-screen border-r-2 shadow-lg p-4">
        <nav className="flex flex-col space-y-6">
          <h2 className="text-xl font-semibold mb-4">
            <span className="rounded-full p-3 shadow-lg mr-2">
              <span>P<span className="text-orange-500">W</span></span>
            </span>
            Instructor Dashboard
          </h2>
          <ul className="space-y-4">
            {
              navOptions.map((itmes)=>(
                <li className="flex items-center gap-3 border-b-2 p-3 hover:bg-gray-100 hover:shadow-md rounded-md cursor-pointer" key={itmes.label}>
                {itmes.icon}
                <Link href={itmes.href}>
                  <span className="hover:text-blue-500">{itmes.label}</span>
                </Link>
              </li>
              ))
            }
           
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 shadow-lg border-l-2 bg-white ">
        {children}
      </div>
    </div>
  );
}

export default Layout;
