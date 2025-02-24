"use client"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookCheck, BookOpen, Clock, IndianRupee, Loader2, Users } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useFetch from "@/hooks/useFetch";
import { Input } from "@/components/ui/input";

const CourseCard = ({ course, changeStatus, loading }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const handleStatusChange = async () => {
    await changeStatus(course.id);
  };

  return (
    <Card className="flex flex-col">
      <div className="relative h-36 w-full">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
        <Badge
          className="absolute top-4 right-4 capitalize"
          variant={
            course.level === "beginner"
              ? "secondary"
              : course.level === "intermediate"
              ? "default"
              : "destructive"
          }
        >
          {course.level}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(course.totalDuration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.chapterCount} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrollmentCount} enrolled</span>
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          <Badge variant={course.isFree ? "secondary" : "default"}>
            {course.isFree ? "Free" :<><IndianRupee width={15}/>{course.price}</> }
          </Badge>
          {course.status === "published" && (
            <div className="flex text-sm items-center gap-1">
              <BookCheck className="w-4 h-4" /> published
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/instructor/home/course/manage/${course.id}`}>
          <Button className="flex bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white">
            Edit
          </Button>
        </Link>
        {course.status === "draft" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Publish</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish Course</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to publish this course? Once published, it will be visible to all students.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleStatusChange} disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Publish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Link href={`/instructor/home/course/manage/preview/${course.id}`}>
          <Button variant="outline">Preview</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function ManageCoursesPage() {
  const { fetchData:featchCourse, loading:courseLoading, data:courseData, error } = useFetch();
  const { fetchData:changeCourseStatus, loading:statusLoading,} = useFetch();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(30);
  // Custom debounce using useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Fetch courses when debounced query changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await featchCourse({
          url: debouncedQuery
            ? `/api/instructor/action/course?search=${debouncedQuery}&limit=${limit}&page=${currentPage}`
            : `/api/instructor/action/course?limit=${limit}&page=${currentPage}`,
          method: "GET",
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [debouncedQuery,limit,currentPage]);

  useEffect(() => {
    if (courseData) {
      setTotalPages(courseData?.data.total);
      
      setCourses(courseData?.data?.courses || []);
    }
  }, [courseData]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading courses. Please try again.</p>
      </div>
    );
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeStatus=async(id)=>{
  await changeCourseStatus({
    url:`/api/instructor/action/course/${id}`,
    method:"PUT"
  })
  }

  return (
    <div className="container mx-auto py-2 px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">
            Manage and track your created courses
          </p>
        </div>
        <Link href="/instructor/home/course/new">
          <Button>Create New Course</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex gap-2 items-center col-span-full">
          <Input
            placeholder="Search Course"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {courseLoading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : courses.length > 0 ? (
          <>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} changeStatus={changeStatus} loading={statusLoading}/>
            ))}
            {totalPages > limit && (
              <div className="col-span-full">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="col-span-full flex justify-center items-center h-64">
            <p className="text-gray-500">No courses found</p>
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
}
