"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";
import { instructorSchema } from "@/zodSchema/instructor";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function InstructorForm() {
  const { toast } = useToast();
  const [qualificationcCertificate, setQualificationcCertificate] = useState(null);
  const [profile, setProfile] = useState(null);
  const { fetchData, data, loading, error } = useFetch()
  const [profilePicture,setProfilePicture]=useState(null);
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      expertise: "",
      bio: "",
      contactNumber: "",
      qualifications: "",
    },
  });

  useEffect(() => {
    if (data && !error) {
      toast({
        title: data.message
      })
      router.push("/");

    } else if (error) {
      toast({
        variant: "destructive",
        title: data?.message||"internal server error"
      })
    }
  }, [data, error, loading])
  function onSubmit(data) {
    console.log(data)
    if (!qualificationcCertificate) {
      toast({
        type: "error",
        title: "Please select a qualification file",
        description: "Please select a qualification file",
      })
    }
    const sendData = async () => {
      try {
        const form = new FormData();
        form.append("profilePicture", profile);
        form.append("qualification", data.qualification);
        form.append("bio", data.bio)
        form.append("contactNumber", data.contactNumber)
        form.append("expertise", data.expertise)
        form.append("qualificationcCertificate", qualificationcCertificate)

       await fetchData({
          url: "api/instructor/new",
          method: "POST",
          body: form,

        })


      } catch (error) {
        console.error(error.message)
      }

    }
    sendData();
  }

  return (
    <div className="flex justify-center min-h-screen items-center p-10">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6   p-5 rounded-2xl shadow-slate-400 shadow-lg bg-white  " >
          <h1 className="text-center text-2xl">Join as an Instructor</h1>

          
          <div className="flex justify-center mb-8 relative">
            <div className="relative w-32 h-32 bg-[#d8d8da] rounded-full">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) :  (
                <>
                  <div className="absolute bottom-0 right-0 p-2 bg-[#e5e4e4] rounded-full shadow-lg">
                    <SquarePen className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfile(file);
                        setProfilePicture(URL.createObjectURL(file));
                      }
                    }}
                  />
                </>
              )}
            </div>
          </div>
          {/* <div className="flex justify-center flex-col items-center gap-6  relative">
            <div className="absolute z-20" >PF</div>
            <div className=" border-gray-300 w-32 h-32 absolute rounded-full bg-gray-300">
              <SquarePen className="w-9 h-9 absolute right-3 bottom-2" />
            </div>

            <input type="file" className=" w-32 h-32 bg-gray-200 border z-10 opacity-0  rounded-full cursor-pointer" accept="image/*" multiple={false} onChange={(event) => setProfile(event.target.files[0])} />
          </div> */}
          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Expertise/Subject Area</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your expertise (e.g., JavaScript, Python)" {...field} className="h-12" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Description/Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a bit about yourself (optional)"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number Field */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} className="h-12" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>qualification</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your qualifications" {...field} className="h-12" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="qualificationcCertificate" className="">Qualification Certificate</Label>
            <Input type="file" id="qualificationcCertificate" accept="image/*" multiple={false} onChange={(e) => setQualificationcCertificate(e.target.files[0])} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? "uploading.." : "submit"}</Button>
        </form>
      </Form>
    </div>
  );
}
