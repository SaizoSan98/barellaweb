import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email és jelszó szükséges' }, { status: 400 });
    }

    const success = await login(email, password);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Hibás email vagy jelszó' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Bejelentkezés sikertelen' }, { status: 500 });
  }
}
