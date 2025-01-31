"use client";
import { z } from "zod"

export const instructorSchema = z.object({

    expertise: z.string().min(2, {
        message: "Expertise/Subject Area must be specified.",
    }),
    bio: z.string().min(10,"Bio must be at least 10 characters long."),
    contactNumber: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, {
            message: "Enter a valid contact number.",
        }),
    qualifications: z.string().min(2, {
        message: "Qualifications must be specified.",
    }),
})