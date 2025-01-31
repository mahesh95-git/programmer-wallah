import React from 'react';
import { BookOpen, Clock, Globe, Star, Award, PlayCircle, CheckCircle2, DollarSign, ThumbsUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

function Page() {
  return (
    <div className="min-h-screen w-full bg-gray-50 mt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#04121d] to-[#547e93] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Advanced Web Development Masterclass</h1>
              <p className="text-lg mb-6">Master modern web development with practical projects and industry best practices</p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">4.9 (2.5k reviews)</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5" />
                  <span className="ml-1">English</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5" />
                  <span className="ml-1">40 hours</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" 
                  alt="Instructor" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">John Anderson</p>
                  <p className="text-sm text-blue-100">Senior Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Course Preview" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8 text-[#2b313f]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Build modern, responsive websites",
                  "Master JavaScript and React",
                  "Implement authentication and APIs",
                  "Deploy applications to production",
                  "Write clean, maintainable code",
                  "Work with databases and servers"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
              <div className="space-y-4">
                {[
                  { title: "Introduction to Web Development", lessons: 5, duration: "2.5 hours" },
                  { title: "HTML & CSS Fundamentals", lessons: 8, duration: "4 hours" },
                  { title: "JavaScript Deep Dive", lessons: 12, duration: "8 hours" },
                  { title: "React Framework", lessons: 15, duration: "10 hours" },
                ].map((section, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.lessons} lessons • {section.duration}</p>
                      </div>
                      <BookOpen className="w-5 h-5 text-[#2b313f]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Student Reviews</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-medium">4.9 out of 5</span>
                </div>
              </div>

              <div className="grid gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                    rating: 5,
                    date: "2 weeks ago",
                    review: "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand, and the hands-on projects really helped solidify my learning. I've already started applying what I learned in my work.",
                    helpful: 124
                  },
                  {
                    name: "Michael Chen",
                    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                    rating: 5,
                    date: "1 month ago",
                    review: "Comprehensive and well-structured course. The section on React was particularly helpful, and I appreciated the focus on best practices throughout. The instructor is clearly knowledgeable and responsive to questions.",
                    helpful: 89
                  },
                  {
                    name: "Emily Rodriguez",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80",
                    rating: 4,
                    date: "2 months ago",
                    review: "Great course overall! The content is up-to-date and relevant. I especially enjoyed the practical projects. Would have loved to see more advanced TypeScript examples, but that's a minor point.",
                    helpful: 56
                  }
                ].map((review, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">• {review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.review}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <button className="flex  items-center space-x-2 hover:text-[#2b313f]">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Pricing Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-lg text-gray-500 line-through">$199</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">50% discount - Limited time offer</p>
                <button className="w-full bg-[#2b313f] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#242935] transition-colors">
                  Enroll Now
                </button>
              <div className=' space-y-2 mt-2'>
              <p>Coupon Code</p>
              <div className='flex items-center gap-2'>
              <Input type="text" placeholder="Enter coupon code " className="h-12" />
              <button className=" bg-[#2b313f] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2b313f] transition-colors">
                  Apply
                </button>
              </div>
              </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-[#2b313f] mr-3" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-[#2b313f] mr-3" />
                  <span>Lifetime access</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;