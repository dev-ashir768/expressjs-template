import { z } from "zod";

const userSchema = {
    createUser: z.object({
        name: z.string().min(1),
        email: z.email(),
        password: z.string().min(8),
    })
}


export type CreateUserInput = z.infer<typeof userSchema.createUser>;

export default userSchema;