import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getClientEmailHtml, getAdminEmailHtml, QuoteFormData } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, location, service, description } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Kötelező mezők hiányoznak.' }, { status: 400 });
    }

    const formData: QuoteFormData = { name, email, phone, location, service, description };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 1. Email az ügyfélnek
    await transporter.sendMail({
      from: `"Barella Épületgépészet" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '✅ Ajánlatkérése megérkezett – Barella Épületgépészet',
      html: getClientEmailHtml(formData),
    });

    // 2. Értesítő email a Barellának
    await transporter.sendMail({
      from: `"Barella Weboldal" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // barella.gep@gmail.com
      replyTo: email,
      subject: `🔔 Új ajánlatkérés: ${name} – ${service}`,
      html: getAdminEmailHtml(formData),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email küldési hiba:', error);
    return NextResponse.json({ error: 'Email küldés sikertelen.' }, { status: 500 });
  }
}
