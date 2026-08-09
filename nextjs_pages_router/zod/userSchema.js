import { z } from "zod";

const userSchema = z.object({
    fname: z.string().trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long"),
    lname: z.string().trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name is too long"),
    email: z.email("Invalid email address").trim(),
    city: z.string().trim().min(2, "City is required").max(100, "City name is too long"),
});

export default userSchema;