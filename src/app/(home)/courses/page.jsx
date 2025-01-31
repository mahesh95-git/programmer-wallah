"use client"
import React, { useState } from 'react';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CourseCard from '@/components/shared/Course';
import { ListFilter } from 'lucide-react';
import Link from 'next/link';
function Page() {
  const courseCategories = [
    "Mobile Development",
    "Database Management",
    "Front-End Development",
    "Back-End Development",
    "Full Stack Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Artificial Intelligence",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Artificial Intelligence",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
  ];

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="w-full min-h-screen ">
      {/* Course Categories */}
      <div className="w-full flex gap-4 items-end h-36 scroll-m-100 border-b-2 pb-1 border-gray-200 snap-x overflow-x-auto " style={{
        scrollbarWidth: 'none',
        scrollbarColor: 'transparent transparent',
        scrollbarTrack: 'none',
        scrollbarThumb: 'none',
      }} >
        {courseCategories.map((category, index) => (
          <div
            key={index}
            className={` text-nowrap rounded-lg cursor-pointer snap-center transition-opacity duration-300 text-lg py-3 ${activeCategory === index
              ? 'opacity-100 text-black'
              : 'opacity-50'
              }`}
            onClick={() => setActiveCategory(index)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className='flex  gap-3 items-center'>
        <div className='text-lg flex items-center gap-1  rounded-md my-5 p-3 border-2' ><ListFilter />Filter (10)</div>
        <Select>
          <SelectTrigger className="w-[180px] h-14 text-lg">
            <SelectValue placeholder="Sort by" defaultValue={"Most Popular"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Most Popular</SelectItem>
            <SelectItem value="dark">Most Rated</SelectItem>
            <SelectItem value="system">Most Recent</SelectItem>
          </SelectContent>
        </Select>
        <h1 className='text-lg'>
          All {courseCategories[activeCategory||0]} Courses
        </h1>
      </div>
      <div>

      </div>
      {/* Content Section */}
      <div className=" w-full flex gap-3">
        <div className="min-w-56">
          {/* Ratings Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold my-2">Ratings</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">4 Stars & Up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">3 Stars & Up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">2 Stars & Up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-four" id="option-four" />
                    <Label htmlFor="option-four">1 Star & Up</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Subcategory Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold my-2">Subcategory</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frontend" id="frontend" />
                    <Label htmlFor="frontend">Frontend Development</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="backend" id="backend" />
                    <Label htmlFor="backend">Backend Development</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fullstack" id="fullstack" />
                    <Label htmlFor="fullstack">Fullstack Development</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Price Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold my-2">Price</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="free">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free">Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paid" id="paid" />
                    <Label htmlFor="paid">Paid</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Level Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold my-2">Level</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="beginner">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Languages Section */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold my-2">Languages</AccordionTrigger>
              <AccordionContent >
                <div className="flex items-center space-x-2 mb-2">

                  <input type="checkbox" id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">

                  <input type="checkbox" name="" id="hinid" />
                  <Label htmlFor="hindi">Hindi</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <input type="checkbox" name="" id="spanish" />
                  <Label htmlFor="spanish">Spanish</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" name="" id="french" />
                  <Label htmlFor="french">French</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className='w-full '>
        <Link href={"/courses/1"}>
        <CourseCard />
        </Link>
         
          
          <div className='my-4'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
