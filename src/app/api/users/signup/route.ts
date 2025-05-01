import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Save user to DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email (non-blocking)
    sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
    }).catch((err) => console.error("Email error:", err));

    return NextResponse.json({
        message: "User created successfully",
        success: true,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Signup error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
