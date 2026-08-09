import { z } from "zod";

const paginationSchema = z.object({
    page: z.string().trim().default("1").pipe(z.coerce.number().int().min(1)),
    limit: z.string().trim().default("5").pipe(z.coerce.number().int().min(1).max(20)),
});

export default paginationSchema;