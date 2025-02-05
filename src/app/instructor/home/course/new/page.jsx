"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import courseSchema from "@/zodSchema/course";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";

export default function CourseForm() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [lessonFiles, setLessonFiles] = useState({});
  const { fetchData, data, loading,error } = useFetch();
  const {toast}=useToast();
  const [lessonPreviews, setLessonPreviews] = useState({});
  const [chapters, setChapters] = useState([
    {
      title: "",
      lessons: [
        {
          videoUrl: "",
          duration: 0,
          order: 1,
        },
      ],
      order: 1,
    },
  ]);

useEffect(()=>{

  if(data){
    toast({
      title:data?.message||"Course created successfully"
    })
  }
  if(error){
    toast({
      title:error|| "error while creating course try again"    })
  }
},data,error)

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      isFree: false,
      thumbnail: "",
      category: "",
      level: "beginner",
      whatYouLearn: [], // Add this new field
      language:"",
      chapters: [
        {
          title: "",
          lessons: [
            {
              videoUrl: "",
              duration: 0,
              order: 1,
            },
          ],
          order: 1,
        },
      ],
    },
  });

  async function onSubmit(data) {
     const formData = new FormData();
     formData.append('thumbnail', thumbnailFile);

    Object.entries(lessonFiles).forEach(([fileId, file])=>{
      formData.append(`video_${fileId}`,file);
    })
     formData.append('courseData', JSON.stringify(data));
     try {
      await fetchData({
        url:"/api/instructor/action/course",
        method:"POST",
        body:formData
      })
     
     } catch (error) {
      console.log(error)

     }
  }
  const handleChapterLessonFile = (chapterIndex, lessonIndex, event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Update file state
      setLessonFiles((prev) => ({
        ...prev,
        [`${chapterIndex}-${lessonIndex}`]: file,
      }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLessonPreviews((prev) => ({
        ...prev,
        [`${chapterIndex}-${lessonIndex}`]: previewUrl,
      }));

      form.setValue(
        `chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`,
        file.name
      );
    }
  };
  const handleThumbnailChange = (event) => {
    const file = event.target.files?.[0];
    setThumbnailFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        form.setValue("thumbnail", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addChapter = () => {
    const newChapter = {
      title: "",
      lessons: [
        {
          videoUrl: "",
          duration: 0,
          order: 1,
        },
      ],
      order: chapters.length + 1,
    };
    setChapters([...chapters, newChapter]);
    const currentChapters = form.getValues("chapters") || [];
    form.setValue("chapters", [...currentChapters, newChapter]);
  };
  const addLesson = (chapterIndex) => {
    const updatedChapters = [...chapters];
    const newLesson = {
      videoUrl: "",
      duration: 0,
      order: updatedChapters[chapterIndex].lessons.length + 1,
    };

    // Add new lesson to the chapters state
    updatedChapters[chapterIndex].lessons.push(newLesson);
    setChapters(updatedChapters);

    // Get current form values
    const currentFormValues = form.getValues();
    const currentChapterLessons =
      currentFormValues.chapters[chapterIndex].lessons || [];

    // Update form state while preserving existing lesson data
    form.setValue(`chapters.${chapterIndex}.lessons`, [
      ...currentChapterLessons,
      newLesson,
    ]);
  };

  const removeChapter = (index) => {
    if (chapters.length > 1) {
      const updatedChapters = chapters.filter((_, i) => i !== index);
      setChapters(updatedChapters);
      form.setValue("chapters", updatedChapters);
    }
  };

  const removeLesson = (chapterIndex, lessonIndex) => {
    if (chapters[chapterIndex].lessons.length > 1) {
      const updatedChapters = [...chapters];
      updatedChapters[chapterIndex].lessons = updatedChapters[
        chapterIndex
      ].lessons.filter((_, i) => i !== lessonIndex);

      // Update chapters state
      setChapters(updatedChapters);

      // Get current form values
      const currentFormValues = form.getValues();
      const updatedLessons = currentFormValues.chapters[
        chapterIndex
      ].lessons.filter((_, i) => i !== lessonIndex);

      // Update form state
      form.setValue(`chapters.${chapterIndex}.lessons`, updatedLessons);

      // Clean up video states for removed lesson
      const fileKey = `${chapterIndex}-${lessonIndex}`;
      setLessonFiles((prev) => {
        const updated = { ...prev };
        delete updated[fileKey];
        return updated;
      });
      setLessonPreviews((prev) => {
        const updated = { ...prev };
        delete updated[fileKey];
        return updated;
      });

      // Update remaining lessons' file keys
      const updatedFiles = {};
      const updatedPreviews = {};
      Object.keys(lessonFiles).forEach((key) => {
        const [chIdx, lsnIdx] = key.split("-").map(Number);
        if (chIdx === chapterIndex && lsnIdx > lessonIndex) {
          // Shift the keys for lessons after the removed one
          updatedFiles[`${chIdx}-${lsnIdx - 1}`] = lessonFiles[key];

          updatedPreviews[`${chIdx}-${lsnIdx - 1}`] = lessonPreviews[key];
        } else if (chIdx !== chapterIndex) {
          // Keep other chapters' lessons as is
          updatedFiles[key] = lessonFiles[key];
          updatedPreviews[key] = lessonPreviews[key];
        }
      });

      setLessonFiles(updatedFiles);
      setLessonPreviews(updatedPreviews);
    }
  };
  const addLearningObjective = () => {
    const currentObjectives = form.getValues("whatYouLearn") || [];
    form.setValue("whatYouLearn", [...currentObjectives, ""]);
  };

  const removeLearningObjective = (index) => {
    const currentObjectives = form.getValues("whatYouLearn");
    const updatedObjectives = currentObjectives.filter((_, i) => i !== index);
    form.setValue("whatYouLearn", updatedObjectives);
  };

  return (
    <div className="p-2 bg-gray-50">
      <p className="text-2xl font-bold p-2">Create a New Course</p>
      <div className="py-2 flex gap-6 px-2">
        <div className="flex-1">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-8">
              Course Chapters
            </h1>

            <Form {...form}>
              <form className="space-y-6">
                {chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapterIndex}
                    className="space-y-4 p-4 border rounded-lg relative"
                  >
                    <div className="absolute right-4 top-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeChapter(chapterIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    <h3 className="text-lg font-semibold">
                      Chapter {chapterIndex + 1}
                    </h3>

                    <FormField
                      control={form.control}
                      name={`chapters.${chapterIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chapter Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter chapter title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="space-y-4 p-4 border rounded-lg relative"
                      >
                        <div className="absolute right-4 top-4">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeLesson(chapterIndex, lessonIndex)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        <h4 className="text-md font-semibold">
                          Lesson {lessonIndex + 1}
                        </h4>

                        <FormField
                          control={form.control}
                          name={`chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video Upload</FormLabel>
                              <FormControl>
                                <div className="mb-8">
                                  <div className="relative w-full p-2 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                    {lessonPreviews[
                                      `${chapterIndex}-${lessonIndex}`
                                    ] ? (
                                      <div className="flex items-center space-x-2">
                                        <video
                                          src={
                                            lessonPreviews[
                                              `${chapterIndex}-${lessonIndex}`
                                            ]
                                          }
                                          className="w-20 h-20 object-cover rounded"
                                          controls
                                        />
                                        <p className="text-sm text-gray-500">
                                          {
                                            lessonFiles[
                                              `${chapterIndex}-${lessonIndex}`
                                            ]?.name
                                          }
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center h-full">
                                        <ImagePlus className="w-10 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">
                                          Click to upload lesson video
                                        </p>
                                      </div>
                                    )}
                                    <input
                                      type="file"
                                      accept="video/*"
                                      onChange={(e) =>
                                        handleChapterLessonFile(
                                          chapterIndex,
                                          lessonIndex,
                                          e
                                        )
                                      }
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration (minutes)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter duration"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(parseFloat(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`chapters.${chapterIndex}.lessons.${lessonIndex}.order`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Order</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    value={lessonIndex + 1}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    <FormField
                      control={form.control}
                      name={`chapters.${chapterIndex}.order`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={chapterIndex + 1}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addLesson(chapterIndex)}
                      className="w-full mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lesson
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addChapter}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Chapter
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Course Details
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="mb-8">
                  <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <ImagePlus className="w-12 h-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload course thumbnail
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter course title"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your course"
                          {...field}
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Language </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter course language"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  {/* What You'll Learn Section */}
                  <h1 className="font-bold text-gray-900 mb-8 text-sm">
                    What Students Will Learn
                  </h1>

                  <div className="space-y-4">
                    {form.watch("whatYouLearn")?.map((objective, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`whatYouLearn.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter a learning objective"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLearningObjective(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addLearningObjective}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Learning Objective
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                            disabled={form.watch("isFree")}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Free Course
                          </FormLabel>
                          <FormDescription>
                            Make this course available for free
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter course category"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select course Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">draft</SelectItem>
                          <SelectItem value="published">published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading} className="w-full h-12">
                {loading?"creating...":"submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
