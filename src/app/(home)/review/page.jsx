"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

export default function SubmitReviewPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (rating === 0) {
    //   toast.error("Please select a rating");
    //   return;
    // }

    // if (!title.trim()) {
    //   toast.error("Please enter a review title");
    //   return;
    // }

    // if (!comment.trim()) {
    //   toast.error("Please enter your review");
    //   return;
    // }

    // // Here you would typically send the data to your backend
    // toast.success("Thank you for your review!");
    
    // Reset form
    setRating(0);
    setTitle("");
    setComment("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Place your thought</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hover || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        } transition-colors duration-200`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Review Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your experience"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked or didn't like"
                  className="h-32"
                  maxLength={1000}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}