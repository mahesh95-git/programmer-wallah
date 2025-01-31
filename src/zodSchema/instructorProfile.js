import { z } from "zod";

export const instructorProfileSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters long.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters long.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    expertise: z.string().min(2, {
        message: "Expertise/Subject Area must be specified.",
    }),
    bio: z.string().min(10, {
        message: "Bio must be at least 10 characters long.",
    }),
    contactNumber: z.string().regex(/^\+?[0-9]{7,15}$/, {
        message: "Enter a valid contact number.",
    }),
    qualifications: z.string().min(2, {
        message: "Qualifications must be specified.",
    }),
});