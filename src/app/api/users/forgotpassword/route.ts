import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Password reset email sent successfully",
    });
  } catch (error: unknown) {
    // console.error("Error in forgot password:", error);
    // return NextResponse.json({ error: error.message }, { status: 500 });
    if (error instanceof Error) {
      console.error("Error in forgot password:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If it's not an instance of Error, return a generic error message
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    
  }
}