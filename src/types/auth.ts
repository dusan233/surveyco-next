import {
  loginSchema,
  signUpSchema,
  verifyEmailAddressSchema,
} from "@/lib/validationSchemas";
import { z } from "zod";

export type VerifyEmailAddressData = z.infer<typeof verifyEmailAddressSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
