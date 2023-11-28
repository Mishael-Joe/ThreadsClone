import * as z from 'zod';

export const userValidaton = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3, {message: 'Minimum 3 Characters'}).max(30),
    username: z.string().min(3, {message: 'Minimum 3 Characters'}).max(30),
    bio: z.string().min(3).max(1000),
})