import { NextResponse } from "next/server";
import { z } from "zod";

// In-memory mock storage (temporary)
const contactMessages: any[] = [];

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional().or(z.literal("")),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    // ✅ Validation
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // ✅ Mock insert (instead of DB)
    const newMessage = {
      id: Date.now().toString(),
      ...result.data,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    contactMessages.push(newMessage);

    console.log("New Contact Message:", newMessage);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully (mock).",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}