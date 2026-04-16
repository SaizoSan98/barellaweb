import { NextRequest, NextResponse } from 'next/server';
import { auth, changePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Nem vagy bejelentkezve' }, { status: 401 });
  }

  try {
    const { email, currentPassword, newPassword } = await request.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Minden mező kötelező' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Az új jelszó legalább 8 karakter legyen' }, { status: 400 });
    }

    const result = await changePassword(email, currentPassword, newPassword);

    if (result.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Szerverhiba' }, { status: 500 });
  }
}
