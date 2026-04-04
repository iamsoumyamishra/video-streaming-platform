import { VerifyUserSignUp, VerifyUserSignIn } from "../lib/verification.ts";
import * as z from "zod"

export type UserSignUpType = z.infer<typeof VerifyUserSignUp>
export type UserSignInType = z.infer<typeof VerifyUserSignIn>