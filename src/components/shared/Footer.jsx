
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 border-t-4 border-indigo-500 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">
              <span className="text-black">Programmer</span>
              <span className="text-orange-500">Wallah</span>
            </span>
          </div>
          <p className="text-gray-600">Where education meets real-world needs.</p>
        </div>

        {/* Helpful Links */}
        <div>
          <h3 className="text-blue-600 font-semibold mb-4">HELPFUL LINKS</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Courses</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Privacy policy</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Refund Policy</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">GET IN TOUCH</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:alpha@apnacollege.in" className="text-gray-600 hover:text-gray-900">
                maheshrathodd.dev@gmail.com
              </a>
            </li>
           
            <li className="text-gray-600">
              Support Team : 10am-6pm
            </li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">CONNECT WITH US</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Twitter</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Youtube</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Instagram</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Linkedin</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-600">
        Copyright © 2025
      </div>
    </footer>
  );
};


export default Footer