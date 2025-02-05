"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Eye, SquarePen } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { instructorProfileSchema } from "@/zodSchema/instructorProfile";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function InstructorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [certificatePreview, setCertificatePreview] = useState("");
  const { toast } = useToast();
  const { fetchData, loading, data, error } = useFetch();

  const form = useForm({
    resolver: zodResolver(instructorProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      expertise: "",
      bio: "",
      contactNumber: "",
      qualifications: "",
    },
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchData({
      url: "/api/instructor/profile",
      method: "GET",
    });
  }, []);

  // Handle API response
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }

    if (data?.user) {
      const fields = [
        "firstName",
        "lastName",
        "email",
        "expertise",
        "bio",
        "contactNumber",
        "qualifications",
      ];
      setProfilePicture(data.user.profile);
      setCertificatePreview(data.user?.qualificationCertificate);

      fields.forEach((field) => {
        form.setValue(field, data.user[field] || "");
      });
    }
  }, [data, error, form.setValue]);

  async function onSubmit(formData) {
    try {
      const form = new FormData();
      if (profileFile) {
        form.append("profilePicture", profileFile);
      }
      if (certificateFile) {
        form.append("qualificationcCertificate", certificateFile);
      }
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("qualifications", formData.qualifications);
      form.append("bio", formData.bio);
      form.append("contactNumber", formData.contactNumber);
      form.append("expertise", formData.expertise);
      form.append("email", formData.email);

      await fetchData({
        url: "/api/instructor/profile",
        method: "PUT",
        body: form,
      });
      toast({
        title: "profile update successfylly",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="flex flex-col items-center p-2">
      <Button
        onClick={() => setIsEditing(!isEditing)}
        className="self-end mb-4 bg-[#373636] text-white hover:bg-[#252525] hover:text-white"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl space-y-6 p-8 rounded-lg bg-white shadow-sm"
        >
          <h1 className="text-center text-2xl font-semibold mb-6">
            Instructor Profile
          </h1>

          <div className="flex justify-center mb-8 relative">
            <div className="relative w-32 h-32">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">
                    {form.watch("firstName")?.[0]}
                    {form.watch("lastName")?.[0]}
                  </span>
                </div>
              )}
              {isEditing && (
                <>
                  <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg">
                    <SquarePen className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileFile(file);
                        setProfilePicture(URL.createObjectURL(file));
                      }
                    }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled={!isEditing}
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expertise</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={!isEditing}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="h-10" />
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
                  <FormLabel>Qualifications</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEditing && (
              <div className="flex  items-center justify-center gap-2">
                <Label>upate Certificate</Label>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCertificateFile(file);
                    }
                  }}
                />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 w-full">
              {certificatePreview && (
                <div className="flex w-full gap-4 items-center text-nowrap">
                  <div className="">view qualification Certificate</div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="ml-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Qualification Certificate</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center">
                        <img
                          src={certificatePreview}
                          alt="Qualification Certificate"
                          className="max-w-full max-h-[600px] object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <Button
              type="submit"
              className="bg-[#373636] text-white hover:bg-[#252525] hover:text-white w-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
