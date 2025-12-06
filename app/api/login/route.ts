import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();

  const user1Pass = process.env.USER1_PASSWORD;
  const user1UUID = process.env.USER1_UUID;
  const user2Pass = process.env.USER2_PASSWORD;
  const user2UUID = process.env.USER2_UUID;

  let userId = null;
  let username = null;

  if (password === user1Pass) {
    userId = user1UUID;
    username = 'MAU';
  } else if (password === user2Pass) {
    userId = user2UUID;
    username = 'DURU';
  }

  if (userId) {
    const cookieStore = await cookies();
    cookieStore.set('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return NextResponse.json({ success: true, username });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}