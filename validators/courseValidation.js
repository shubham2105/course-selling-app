const {z} = require("zod");

const courseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.coerce.number().int().positive(),
    imageUrl: z.string().url().optional()
});

const udpateCoursechema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.coerce.number().int().positive().optional(),
    imageUrl: z.string().url().optional()
})
module.exports={
    courseSchema,
    udpateCoursechema
}