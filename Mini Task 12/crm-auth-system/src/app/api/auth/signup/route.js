import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { signupSchema } from '@/lib/validation';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    const { name, email, password, role } = parsed.data;

    await connectDB();

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    // The User model pre-save hook hashes the password automatically
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'AGENT',
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[SIGNUP ERROR]', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
