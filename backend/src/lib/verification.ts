import * as z from "zod"

export const VerifyUserSignUp = z.object({
    action: z.enum(["registration"]),
    name: z.string("name is not a string").max(100, "name is too long"),
    email: z.email("invalid email").max(100, "invalid email"),
    password: z.string("invalid password").min(6, "password too short").max(100, "password too long")
})

export const VerifyUserSignIn = z.object({
    action: z.enum(["login"]),
    email: z.email("invalid email").max(100, "invalid email"),
    password: z.string("invalid password").min(6, "password too short").max(100, "password too long")
})