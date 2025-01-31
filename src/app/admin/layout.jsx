"use client";

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Receipt,
  Bell,
  BarChart3,
} from 'lucide-react';

function Layout({ children }) {
  const navOptions = [
    {
      label: 'Home',
      href: '/admin',
      icon: <LayoutDashboard size={20} className="text-primary" />,
    },
    {
      label: 'Students',
      href: '/admin/students',
      icon: <Users size={20} className="text-primary" />,
    },
    {
      label: 'Instructors',
      href: '/admin/instructors',
      icon: <GraduationCap size={20} className="text-primary" />,
    },
    {
      label: 'Courses',
      href: '/admin/courses',
      icon: <BookOpen size={20} className="text-primary" />,
    },
    
    {
      label: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart3 size={20} className="text-primary" />,
    },
   
    
  ];

  return (
    <div className="flex w-full min-h-screen gap-2">
      <div className="w-1/5 h-screen border-r-2 shadow-lg p-4">
        <nav className="flex flex-col space-y-6">
          <h2 className="text-xl font-semibold mb-4">
            <span className="rounded-full p-3 shadow-lg mr-2">
              <span>P<span className="text-orange-500">W</span></span>
            </span>
           Admin Dashboard
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