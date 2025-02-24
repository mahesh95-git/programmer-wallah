import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";
import { Roboto, Lato } from "next/font/google";
import {
  BookOpen,
  Clock,
  Eye,
  PlayCircle,
  TrendingUp,
  User2,
  UserPlus,
  Users,
  Heart,
  HandHeart,
  Network,
  Brain,
  Shield,
  Cpu,
  Code2,
  Database,
  Server,
  Globe,
  Phone,
  CircuitBoard,
  Cloud,
  TrainFront,
} from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "900",
});

function Page() {
  return (
    <>
      <div className="w-full text-center flex flex-col justify-between items-center  h-screen ">
        <div
          className="flex flex-1 flex-col justify-center items-center gap-4 p-4"
          style={{
            fontFamily: roboto.variable,
          }}
        >
          <p className="text-4xl md:text-5xl font-bold">
            Code Smarter, Dream Bigger with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              Programmer Wallah
            </span>
          </p>
          <p
            className="w-10/12 md:w-8/12 text-gray-600 text-base md:text-lg"
            style={{
              fontFamily: roboto.variable,
            }}
          >
            Empowering you to master programming with interactive courses,
            real-time collaboration, hands-on projects, and expert guidance.
            Unlock your potential, build your dream career, and become a leader
            in the tech world. Join us today and turn your coding aspirations
            into reality!
          </p>
          <div className="flex gap-4 z-10">
            <Link href={"/courses"}>
              <button className="bg-gradient-to-r bg-purple-500  text-white rounded-full px-6 py-3 mt-3">
                Explore
              </button>
            </Link>
            <Link href={"/sign-in"}>
              <button className="bg-gradient-to-r from-orange-500 to-violet-500  hover:bg-orange-500 text-white rounded-full px-6 py-3 mt-3">
                Join Us
              </button>
            </Link>
          </div>
        </div>

        <div className="w-screen">
          <CourseEnrollment />
        </div>

        <BackgroundBeams />
      </div>
      <div className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <CourseCategories />
      </div>
      <div
        className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 "
        style={{
          fontFamily: roboto.variable,
        }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-400">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 leading-tight">
              Learn new skills online with top educators
            </h1>

            <p className="text-lg text-gray-600">
              The automated process all your website tasks. Discover tools and
              techniques to engage effectively with vulnerable children and
              young people.
            </p>

            <div className="space-y-6">
              <FeatureItem
                icon={<Users className="w-5 h-5 text-indigo-600" />}
                text="Techniques to engage effectively with vulnerable children and young people."
              />
              <FeatureItem
                icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
                text="Join millions of people from around the world learning together."
              />
              <FeatureItem
                icon={<Users className="w-5 h-5 text-indigo-600" />}
                text="Join millions of people from around the world learning together. Online learning is as easy and natural."
              />
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              alt="Students learning"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div
        className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 "
        style={{
          fontFamily: roboto.variable,
        }}
      >
        <StudentsSelectedForCompany />
      </div>

      <div
        className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 "
        style={{
          fontFamily: roboto.variable,
        }}
      >
        <StudentReviews />
      </div>
    </>
  );
}

function StudentsSelectedForCompany() {
  const company = [
    "/company/02fb63567e1b107d549d5d15e922424b.png",
    "/company/0f683ab474c5a018baa3bdd53330c9ae.png",
    "/company/1da11f6f0c244abc5abffc0556730e91.png",
    "/company/2c6580da38af7ceff65addfda59f06b9.png",
    "/company/4d6e24add7d7c5d618aeef1795dba038.png",
    "/company/622a116daf32436d38271cd6c49ee3af.png",
    "/company/9a47085894be9870158c9ad4e23c1a24.png",
    "/company/9e4198383730a6e7036b2c7cf50554d0.png",
    "/company/91cb8fef8fe424a1ae2406aa58a380d8.png",
    "/company/689bf09a2c1040423fba7a8db0248211.png",
    "/company/b5070669b92945ffb20fadc3ea552d16.png",
    "/company/cfe53c7856b98c0bf010ebcfc8cbfa29.png",
    "/company/e24ce5f542c45a73c05172d9c4f38e2e.png",
    "/company/ec5be16b046b62a2a860b67f9dc55b86.png",
    "/company/ee17a1d06126f8bfc5444ad666e8ba21.png",
  ];
  return (
    <div>
      <div className="text-center text-4xl font-bold  bg-clip-text text-transparent bg-neutral-700">
        Thousands of students achieved their dream job at
      </div>
      <div className="flex justify-between gap-3 flex-wrap mt-12">
        {company.map((items) => (
          <Image
            src={items}
            alt="Company Logo"
            width={200}
            height={200}
            className="rounded-lg shadow-md p-2"
            key={items}
          />
        ))}
      </div>
    </div>
  );
}
const CourseCategories = () => {
  const categories = [
    {
      title: "Web Development",
      slug:"Web-Development",
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      description:
        "Master frontend technologies like HTML, CSS, JavaScript, React, and more",
    },
    {
      title: "Backend Development",
      slug:"Backend-Development",
      icon: <Server className="w-8 h-8 text-green-500" />,
      description:
        "Learn server-side programming with Node.js, Python, Java, and databases",
    },
    {
      title: "Database Management",
      slug:"Database-Management",
      icon: <Database className="w-8 h-8 text-purple-500" />,
      description: "Explore SQL, NoSQL databases, and data modeling techniques",
      courses: 12,
    },
    {
      title: "Programming Languages",
      slug:"Programming-Languages",
      icon: <Code2 className="w-8 h-8 text-red-500" />,
      description:
        "Learn C, C++, Java, Python, and other popular programming languages",
    },
    {
      title: "Computer Architecture",
      icon: <Cpu className="w-8 h-8 text-yellow-500" />,
      slug:"Computer-Architecture",
      description:
        "Understand computer organization, assembly language, and system design",
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      slug:"Cybersecurity",
      description:
        "Learn network security, ethical hacking, and security best practices",
    },
    {
      title: "Artificial Intelligence",
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      slug:"Artificial-Intelligence",
      description:
        "Explore machine learning, deep learning, and AI applications",
    },
    {
      title: "DevOps",
      icon: <CircuitBoard className="w-8 h-8 text-teal-500" />,
      slug:"DevOps",
      description:
        "Master containerization, CI/CD, and cloud deployment strategies",
    },
    {
      title: "Mobile Development",
      slug:"Mobile-Development",
      icon: <Phone className="w-8 h-8 text-pink-500" />,
      description: "Build iOS and Android apps using React Native and Flutter",
    },
    {
      title: "Computer Networks",
      icon: <Network className="w-8 h-8 text-cyan-500" />,
      slug:"Computer-Networks",
      description:
        "Learn networking protocols, architecture, and administration",
    },
   
    {
      title: "Cloud Computing",
      slug:"Cloud-Computing",
      icon: <Cloud className="w-8 h-8 text-blue-400" />,
      description:
        "Learn AWS, Azure, Google Cloud, and cloud-native development",
    },
  ];

  return (
    <div className="w-full p-8">
      <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-500">
        Explore Our Course Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link 
          href={`/courses?category=${category.slug}`} 
          key={index}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                {category.icon}
                <CardTitle className="text-xl group-hover:text-purple-500 transition-colors">
                  {category.title}
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                {category.description}
              </CardDescription>
              <div className="mt-4 text-sm text-gray-500">
                {category.courses} courses available
              </div>
            </CardHeader>
          </Card>
        </Link>
        ))}
      </div>
    </div>
  );
};
function CourseEnrollment() {
  return (
    <div className="w-full bg-gradient-to-b from-transparent to-indigo-600 flex items-center justify-center p-10 flex-col  ">
      <div className="text-center mb-8">
        <h1 className="text-2xl  font-bold mb-2  bg-clip-text text-transparent bg-gradient-to-r from-purple-500  to-violet-400">
          INDIA'S MOST LOVED CODING COMMUNITY{" "}
          <Heart className="inline-block w-6 h-6 text-red-500 ml-2 animate-pulse" />
        </h1>
      </div>
      <div className="flex justify-center gap-10 items-center">
        <div className="flex justify-center flex-col items-center gap-1 text-white">
          <div className="flex justify-center items-center gap-3">
            <Users className="w-9 h-9 " />
            <div className="text-2xl font-bold text-blod mb-2">6,000,000+</div>
          </div>
          <div className=" uppercase tracking-wide text-white font-bold">
            Happy Learners
          </div>
        </div>
        <div className="flex justify-center flex-col items-center gap-1 text-white">
          <div className="flex justify-center items-center gap-3 ">
            <HandHeart className="w-9 h-9 " />
            <div className="text-2xl font-bold text-blod mb-2 uppercase">
              3 Core+
            </div>
          </div>
          <div className=" uppercase tracking-wide  font-bold">
            monthly views
          </div>
        </div>
        <div className="flex justify-center flex-col items-center gap-1  text-white">
          <div className="flex justify-center items-center gap-3">
            {/* <Link className="w-9 h-9 " /> */}
            <div className="text-2xl font-bold text-blod mb-2  ">
              1,000,000+
            </div>
          </div>
          <div className=" uppercase tracking-wide  font-bold">
            new monthly subscribers
          </div>
        </div>
      </div>
    </div>
  );
}
function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
export function CardHoverEffect() {
  const projects = [
    {
      title: "C",
      description:
        "A general-purpose, procedural programming language used for system programming.",
      link: "https://en.wikipedia.org/wiki/C_(programming_language)",
    },
    {
      title: "C++",
      description:
        "An extension of C that includes object-oriented features and supports both high- and low-level programming.",
      link: "https://en.wikipedia.org/wiki/C%2B%2B",
    },
    {
      title: "Java",
      description:
        "A class-based, object-oriented programming language designed for portability across platforms.",
      link: "https://www.java.com",
    },
    {
      title: "HTML & CSS",
      description:
        "The standard markup language for creating web pages, and a style sheet language used for designing web pages.",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      title: "React",
      description:
        "A JavaScript library for building user interfaces, maintained by Facebook.",
      link: "https://reactjs.org",
    },
    {
      title: "Node.js",
      description:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building server-side applications.",
      link: "https://nodejs.org",
    },
    {
      title: "Next.js",
      description:
        "A React-based framework for building server-side rendered and statically generated web applications.",
      link: "https://nextjs.org",
    },
    {
      title: "Socket.io",
      description:
        "A JavaScript library for real-time web applications, enabling real-time, bidirectional communication between web clients and servers.",
      link: "https://socket.io",
    },
    {
      title: "C#",
      description:
        "A modern, object-oriented programming language developed by Microsoft for building a wide range of applications.",
      link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    },
  ];

  return (
    <div className="">
      <h1
        className="  text-4xl text-center font-bold bg-clip-text text-transparent bg-purple-600"
        style={{
          fontFamily: roboto.variable,
        }}
      >
        Explore top subjects
      </h1>
      <HoverEffect items={projects} className={""} />
    </div>
  );
}
export function StudentReviews() {
  const testimonials = [
    {
      quote:
        "The React course provided everything I needed to build dynamic web applications. The hands-on projects helped me solidify my skills in component-based architecture and state management.",
      name: "Ankit Sharma",
      title: "React Development Mastery",
    },
    {
      quote:
        "Learning Data Structures and Algorithms was a game-changer for me. The course broke down complex concepts into simple examples and helped me solve competitive programming challenges effectively.",
      name: "Priya Deshmukh",
      title: "DSA for Competitive Programming",
    },
    {
      quote:
        "The Full Stack Development course was amazing! I now feel confident in building end-to-end web applications using the MERN stack. The instructor explained backend and frontend integration so well.",
      name: "Rahul Patel",
      title: "Full Stack Development Bootcamp",
    },
    {
      quote:
        "I loved the C++ programming course! The in-depth explanation of Object-Oriented Programming concepts and problem-solving techniques made me more confident in technical interviews.",
      name: "Sneha Kulkarni",
      title: "C++ Programming Essentials",
    },
    {
      quote:
        "The course on mastering system design gave me insights into how large-scale systems work. It was packed with real-world examples and best practices, making it invaluable for aspiring software architects.",
      name: "Vikram Rao",
      title: "Advanced System Design",
    },
  ];
  const testimonials2 = [
    {
      quote:
        "The React course provided everything I needed to build dynamic web applications. The hands-on projects helped me solidify my skills in component-based architecture and state management.",
      name: "Ankit Sharma",
      title: "React Development Mastery",
    },
    {
      quote:
        "Learning Data Structures and Algorithms was a game-changer for me. The course broke down complex concepts into simple examples and helped me solve competitive programming challenges effectively.",
      name: "Priya Deshmukh",
      title: "DSA for Competitive Programming",
    },
    {
      quote:
        "The Full Stack Development course was amazing! I now feel confident in building end-to-end web applications using the MERN stack. The instructor explained backend and frontend integration so well.",
      name: "Rahul Patel",
      title: "Full Stack Development Bootcamp",
    },
    {
      quote:
        "I loved the C++ programming course! The in-depth explanation of Object-Oriented Programming concepts and problem-solving techniques made me more confident in technical interviews.",
      name: "Sneha Kulkarni",
      title: "C++ Programming Essentials",
    },
    {
      quote:
        "The course on mastering system design gave me insights into how large-scale systems work. It was packed with real-world examples and best practices, making it invaluable for aspiring software architects.",
      name: "Vikram Rao",
      title: "Advanced System Design",
    },
    {
      quote:
        "The Python for Data Science course was extremely detailed. It gave me a strong foundation in Pandas, NumPy, and visualization techniques, making it easier to analyze data effectively.",
      name: "Riya Gupta",
      title: "Python for Data Science",
    },
    {
      quote:
        "The Web Development with Tailwind CSS course helped me speed up my design process. The utilities and flexibility made my projects more efficient and visually appealing.",
      name: "Arjun Mehta",
      title: "Modern Web Design with Tailwind CSS",
    },
    {
      quote:
        "I always struggled with understanding operating systems, but this course made it easy. The hands-on examples of process management and memory allocation were incredibly helpful.",
      name: "Megha Verma",
      title: "Operating Systems Made Easy",
    },
    {
      quote:
        "The Java course covered everything I needed for backend development. From multithreading to advanced concepts like Java Streams, it was a complete package.",
      name: "Kunal Joshi",
      title: "Java Backend Development",
    },
    {
      quote:
        "I joined the Cloud Computing course to understand AWS better, and I wasn’t disappointed! The labs and practical projects helped me deploy and manage applications with ease.",
      name: "Aditi Shekhar",
      title: "AWS Cloud Computing Mastery",
    },
    {
      quote:
        "The Machine Learning course introduced me to complex algorithms like decision trees and neural networks in a way that was easy to understand. I highly recommend it for beginners.",
      name: "Ishaan Kapoor",
      title: "Machine Learning Fundamentals",
    },
    {
      quote:
        "The Git and GitHub course was perfect for understanding version control. I now collaborate on projects confidently and contribute to open-source with ease.",
      name: "Nidhi Jain",
      title: "Mastering Git and GitHub",
    },
    {
      quote:
        "The Blockchain course gave me a deep understanding of decentralized applications and smart contracts. The Ethereum project was a real eye-opener!",
      name: "Rohit Tiwari",
      title: "Blockchain Development Masterclass",
    },
    {
      quote:
        "I took the SQL for Data Analytics course and loved it. It helped me write complex queries and optimize them for large datasets. Perfect for aspiring data analysts!",
      name: "Shreya Bhatt",
      title: "SQL for Data Analytics",
    },
    {
      quote:
        "The Cybersecurity course helped me understand vulnerabilities and how to protect systems from attacks. The practical scenarios made it a very hands-on experience.",
      name: "Siddharth Singh",
      title: "Cybersecurity Essentials",
    },
  ];

  return (
    <div>
      <div className="text-center text-4xl font-bold  bg-clip-text text-transparent bg-neutral-700">
        Students Who Chased Dreams and Landed Careers
      </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normall"
        className={"mt-12"}
      />
      <InfiniteMovingCards
        items={testimonials2}
        direction="left"
        speed="normall"
        className={"mt-3"}
      />
    </div>
  );
}

export default Page;
