import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  event_date: z.string().min(1, "Event date is required"),
  end_date: z.string().optional().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
  image_url: z.string().optional().or(z.literal("")),
  category: z.enum(["general", "meeting", "festival", "maintenance", "social"]),
  is_published: z.boolean().default(true),
});

export type EventFormData = z.infer<typeof eventSchema>;