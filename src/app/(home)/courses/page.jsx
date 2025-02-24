"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CourseCard from "@/components/shared/Course";
import { ListFilter, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import Pagination from "@/components/shared/pagination";

const ITEMS_PER_PAGE = 30;

const categoryTitles = [
  "Web Development",
  "Backend Development",
  "Database Management",
  "Programming Languages",
  "Computer Architecture",
  "Cybersecurity",
  "Artificial Intelligence",
  "DevOps",
  "Mobile Development",
  "Computer Networks",
  "Cloud Computing"
];

const initialFilters = {
  category: "",
  rating: "",
  price: "",
  level: "",
  languages: [],
  sort: "popular",
  page: 1
};

function Page({ searchParams }) {
  const { fetchData, data, loading, error } = useFetch();
  const { category ,page} =React.use(searchParams);
  const router = useRouter();
  
  const [filters, setFilters] = useState({
    ...initialFilters,
    category: category?.split("-").join(" ") || "",
    page: Number(page) || 1
  });

  // Function to build query string from filters
  const buildQueryString = () => {
    const queryParams = new URLSearchParams();

    if (filters.category) queryParams.append("category", filters.category);
    if (filters.rating) queryParams.append("rating", filters.rating);
    if (filters.price) queryParams.append("price", filters.price);
    if (filters.level) queryParams.append("level", filters.level);
    if (filters.languages.length > 0) {
      queryParams.append("language", filters.languages.join(","));
    }
    if (filters.sort) queryParams.append("sort", filters.sort);
    if (filters.page > 1) queryParams.append("page", filters.page.toString());
    queryParams.append("limit", ITEMS_PER_PAGE.toString());

    return queryParams.toString();
  };

  // Fetch courses whenever filters change
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const queryString = buildQueryString();
        await fetchData({
          url: `/api/courses${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        });
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleRemoveAllFilters = () => {
    setFilters(initialFilters);
    router.push(window.location.pathname, { scroll: false });
  };

  // Handle language checkbox changes
  const handleLanguageChange = (language, checked) => {
    setFilters(prev => ({
      ...prev,
      languages: checked
        ? [...prev.languages, language]
        : prev.languages.filter((lang) => lang !== language),
      page: 1 // Reset to first page when languages change
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'page') return count; // Don't count page in active filters
    if (Array.isArray(value)) {
      return count + value.length;
    }
    return count + (value ? 1 : 0);
  }, 0);

  const totalPages = Math.ceil((data?.totalCourses || 0) / ITEMS_PER_PAGE);

  return (
    <div className="w-full min-h-screen">
      <div className="flex gap-3 items-center mt-20">
        <div className="text-lg flex items-center gap-1 rounded-md my-5 p-3 border-2">
          <ListFilter />
          Filter ({activeFiltersCount})
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            className="h-14 flex items-center gap-2"
            onClick={handleRemoveAllFilters}
          >
            <X className="h-4 w-4" />
            Remove All Filters
          </Button>
        )}
        <Select 
          value={filters.sort}
          onValueChange={(value) => handleFilterChange("sort", value)}
        >
          <SelectTrigger className="w-[180px] h-14 text-lg">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rated">Most Rated</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
        <h1 className="text-lg">
          {loading ? "Loading..." : `${data?.totalCourses || 0} Courses Found`}
        </h1>
      </div>

      <div className="w-full flex gap-3">
        <div className="min-w-56">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold my-2">
                Ratings
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.rating}
                  onValueChange={(value) => handleFilterChange("rating", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="rating-4" />
                    <Label htmlFor="rating-4">4 Stars & Up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="rating-3" />
                    <Label htmlFor="rating-3">3 Stars & Up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="rating-2" />
                    <Label htmlFor="rating-2">2 Stars & Up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="rating-1" />
                    <Label htmlFor="rating-1">1 Star & Up</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold my-2">
                Category
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  {categoryTitles.map((title) => (
                    <div key={title} className="flex items-center space-x-2">
                      <RadioGroupItem value={title} id={title} />
                      <Label htmlFor={title}>{title}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold my-2">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.price}
                  onValueChange={(value) => handleFilterChange("price", value)}
                >
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

          <Accordion type="single" collapsible>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold my-2">
                Level
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.level}
                  onValueChange={(value) => handleFilterChange("level", value)}
                >
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

          <Accordion type="single" collapsible>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold my-2">
                Languages
              </AccordionTrigger>
              <AccordionContent>
                {["english", "hindi", "marathi",].map((language) => (
                  <div
                    key={language}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <input
                      type="checkbox"
                      id={language}
                      checked={filters.languages.includes(language)}
                      onChange={(e) =>
                        handleLanguageChange(language, e.target.checked)
                      }
                    />
                    <Label htmlFor={language}>
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full">
          {loading ? (
            <div>Loading courses...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid gap-4">
                {data?.courses?.map((course) => (
                  <Link key={course._id} href={`/courses/${course._id}`}>
                    <CourseCard course={course} />
                  </Link>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={filters.page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;