import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, company, interest } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Store lead in memory for now - can be connected to DB later
    console.log('Lead captured:', { email, name, company, interest, source: 'chatbot' });

    return NextResponse.json({ success: true, message: 'Lead captured' });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
