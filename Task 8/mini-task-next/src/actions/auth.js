// src/actions/auth.js
'use server';

// We have to go up two directories to reach the root, then into lib/models, so thats why we use ../../
import { connectDB } from '../../lib/mongodb.js';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


// --- SIGNUP USER ---
export async function signupUser(formData) {
  // Extract data from the form
  const email = formData.get('email');
  const password = formData.get('password');

  // Connect to the database
  await connectDB();

  // Check if the email already exists 
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: 'This email is already registered.' };
  }

  // Hash the password using bcrypt 
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to MongoDB
  await User.create({ email, password: hashedPassword });

  // Redirect to the signin page upon success
  redirect('/signin');
}

// --- LOGIN FUNCTION ---
export async function loginUser(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  await connectDB();

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  // Compare the password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: 'Invalid email or password.' };
  }

  // Set a secure, HTTP-only cookie to keep the user logged in
  const cookieStore = await cookies();
  
  // We are storing their email in the session for the dashboard to read
  cookieStore.set('session', user.email, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',  
    path: '/',
    maxAge: 60 * 60 * 24 * 7, 
  });

  // Redirect to the protected dashboard
  redirect('/dashboard');
}

// --- LOGOUT FUNCTION ---
export async function logoutUser() {
  // Delete the session cookie
  const cookieStore = await cookies();
  cookieStore.delete('session');
  
  // Redirect back to the signin page
  redirect('/signin');
}