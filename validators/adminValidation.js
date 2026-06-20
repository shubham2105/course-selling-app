const {z} = require("zod");

const adminSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

module.exports ={
    adminSchema
}