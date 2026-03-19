import { z } from "zod";

export const registrationSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  unit_number: z.string().min(1, "Unit number is required"),
  building_name: z.string().optional().or(z.literal("")),
  move_in_date: z.string().optional().or(z.literal("")),
  household_size: z.number().min(1).max(20).optional(),
  emergency_contact_name: z.string().optional().or(z.literal("")),
  emergency_contact_phone: z.string().optional().or(z.literal("")),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;