import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { registrationSchema } from "@/lib/validators/registration";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registrationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("residents").insert({
      ...result.data,
      status: "pending",
      household_size: result.data.household_size || 1,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, message: "This email is already registered." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, message: "Failed to submit registration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Registration submitted successfully." });
  } catch {
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
