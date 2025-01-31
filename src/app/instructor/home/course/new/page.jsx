"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import * as z from "zod";



export default function CourseForm() {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [chapters, setChapters] = useState([
    { title: "", description: "", videoUrl: "", duration: 0, order: 1 },
  ]);

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
      chapters: [{ title: "", description: "", videoUrl: "", duration: 0, order: 1 }],
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  const handleThumbnailChange = (event) => {
    const file = event.target.files?.[0];
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
      description: "",
      videoUrl: "",
      duration: 0,
      order: chapters.length + 1,
    };
    setChapters([...chapters, newChapter]);
    const currentChapters = form.getValues("chapters") || [];
    form.setValue("chapters", [...currentChapters, newChapter]);
  };

  const removeChapter = (index) => {
    if (chapters.length > 1) {
      const updatedChapters = chapters.filter((_, i) => i !== index);
      setChapters(updatedChapters);
      form.setValue("chapters", updatedChapters);
    }
  };

  return (<div className="p-2 bg-gray-50">
    <p className="text-2xl font-bold p-2">Create a New course</p>
    <div className=" py-2 flex gap-6 px-2">

      <div className="flex-1">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Course Chapters</h1>

          <Form {...form}>
            <form className="space-y-6">
              {chapters.map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <div className="absolute right-4 top-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeChapter(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <h3 className="text-lg font-semibold">Chapter {index + 1}</h3>

                  <FormField
                    control={form.control}
                    name={`chapters.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter chapter title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`chapters.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe this chapter"
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mb-8">
                    <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      {thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <ImagePlus className="w-12 h-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">Click to upload course chapter</p>
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`chapters.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter duration"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`chapters.${index}.order`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={index + 1}
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
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Course Details</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <p className="mt-2 text-sm text-gray-500">Click to upload course thumbnail</p>
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
                      <Input placeholder="Enter course title" {...field} className="h-12" />
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
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                        <FormLabel className="text-base">Free Course</FormLabel>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select course level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-12">
                Create Course
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div></div>

  );
}