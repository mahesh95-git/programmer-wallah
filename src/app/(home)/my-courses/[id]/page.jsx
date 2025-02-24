"use client";
import React, { useEffect, useState } from "react";
import { PlayCircle, Clock, BookOpen, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";
import CertificateGenerator from "@/components/shared/courseCertificate";

function App({ params }) {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [totalProgress, setTotalProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const {
    data: reviewData,
    loading: reviewLoading,
    fetchData: submitReview,
    error: reviewError,
  } = useFetch();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const { toast } = useToast();
  const { id } = React.use(params);
  const {
    data: courseChapters,
    fetchData: fetchCourseChapters,
    loading: courseChaptersLoading,
    error,
  } = useFetch();

  useEffect(() => {
    const savedProgress = localStorage.getItem(`course-${id}-progress`);
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        setCompletedLessons(new Set(parsedProgress));
      } catch (error) {
        console.error("Error parsing saved progress:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (reviewData?.success) {
      toast({
        title: reviewData?.message,
      });
    }
    if (reviewError) {
      toast({
        title: reviewError,
        variant: "destructive",
      });
    }
  }, [reviewData, reviewError]);

  useEffect(() => {
    if (courseChapters) {
      setChapters(courseChapters.data.chapters);
    }
  }, [courseChapters]);

  useEffect(() => {
    (async () => {
      try {
        fetchCourseChapters({
          url: `/api/my-course/${id}`,
          method: "GET",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const calculateTotalLessons = () => {
    return chapters.reduce(
      (total, chapter) => total + chapter.lessons.length,
      0
    );
  };

  useEffect(() => {
    if (completedLessons.size > 0) {
      const totalLessons = calculateTotalLessons();
      const progress = (completedLessons.size / totalLessons) * 100;
      setTotalProgress(progress);
      localStorage.setItem(
        `course-${id}-progress`,
        JSON.stringify(Array.from(completedLessons))
      );
      localStorage.setItem(`${id}-progress`, Math.floor(progress));
    }
  }, [completedLessons, chapters, id]);

  const markLessonComplete = (chapterIndex, lessonIndex) => {
    const lessonId = `${chapterIndex}-${lessonIndex}`;
    setCompletedLessons((prev) => {
      const updated = new Set(prev);
      updated.add(lessonId);
      return updated;
    });
  };

  const isLessonCompleted = (chapterIndex, lessonIndex) => {
    const lessonId = `${chapterIndex}-${lessonIndex}`;
    return completedLessons.has(lessonId);
  };

  const handleVideoPlay = (url, chapterIndex, lessonIndex) => {
    setSelectedLesson(url);
    setCurrentChapterIndex(chapterIndex);
    setCurrentLessonIndex(lessonIndex);
  };

  const handleVideoComplete = () => {
    markLessonComplete(currentChapterIndex, currentLessonIndex);
    playNextVideo();
  };

  const playNextVideo = () => {
    const currentChapter = chapters[currentChapterIndex];
    if (!currentChapter) return;

    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
      handleVideoPlay(
        nextLesson.videoUrl,
        currentChapterIndex,
        currentLessonIndex + 1
      );
    } else if (currentChapterIndex < chapters.length - 1) {
      const nextChapter = chapters[currentChapterIndex + 1];
      if (nextChapter.lessons.length > 0) {
        handleVideoPlay(
          nextChapter.lessons[0].videoUrl,
          currentChapterIndex + 1,
          0
        );
      }
    }
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitReview({
        url: `/api/my-course/review?id=${id}`,
        body: JSON.stringify({
          rating,
          review,
        }),
        method: "POST",
      });

      setIsReviewDialogOpen(false);
      setRating(0);
      setReview("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  }

  console.log(courseChapters)
  const CertificateSection = () => {
    // if (totalProgress < 100) return null;
    return (
      <Alert className="mt-4">
        <AlertTitle className="text-lg font-semibold">
          🎉 Congratulations on completing the course!
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <p>You've successfully completed all lessons in this course.</p>
            <CertificateGenerator
              studentName={courseChapters?.data?.studentName}
              courseName={courseChapters?.data?.title}
              completionDate={new Date().toLocaleDateString()}
            />
          </div>
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="min-h-screen w-full mt-16 bg-gray-50">
      <div className="bg-gradient-to-r from-[#04121d] to-[#547e93] text-white">
        <div className="max-w-6xl mx-auto px-2 py-4">
          <h1 className="text-3xl font-bold">
            {courseChapters?.data?.title}
          </h1>
          <div className="mt-4">
            <div className="flex items-center gap-4 mb-2">
              <span>Course Progress:</span>
              <span>{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
          <div className="mt-4">
            <Dialog
              open={isReviewDialogOpen}
              onOpenChange={setIsReviewDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="secondary">Write a Review</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Course Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with this course
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button disabled={reviewLoading} onClick={handleSubmitReview}>
                    {reviewLoading ? "submiting.." : "Submit review"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    src={selectedLesson}
                    className="w-full h-[400px]"
                    autoPlay
                    controls
                    onEnded={handleVideoComplete}
                  ></video>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600">
                  Select a lesson to start learning
                </h2>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Course Content</h3>
            <div className="space-y-4">
              {chapters.map((chapter, chapterIndex) => (
                <Accordion type="single" collapsible key={chapter.title}>
                  <AccordionItem value={chapter.order}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                        <span>{chapter.title}</span>
                        <span className="text-sm text-gray-500">
                          {
                            chapter.lessons.filter((_, lessonIndex) =>
                              isLessonCompleted(chapterIndex, lessonIndex)
                            ).length
                          }
                          /{chapter.lessons.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {chapter.lessons.map((item, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between gap-3 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                          onClick={() =>
                            handleVideoPlay(
                              item.videoUrl,
                              chapterIndex,
                              lessonIndex
                            )
                          }
                        >
                          <div className="flex items-center gap-3">
                            {isLessonCompleted(chapterIndex, lessonIndex) ? (
                              <CheckCircle className="text-green-500" />
                            ) : (
                              <PlayCircle />
                            )}
                            {lessonIndex + 1} lesson
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(item.duration)}</span>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
            <CertificateSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
