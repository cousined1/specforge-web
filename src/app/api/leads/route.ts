import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';

export async function POST(req: NextRequest) {
  try {
    const { email, name, company, interest } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Store lead in InsForge database
    const { data, error } = await insforge.database
      .from('leads')
      .insert([
        {
          email,
          name,
          company,
          interest,
          source: 'chatbot',
        }
      ]);

    if (error) {
      console.error('Lead creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
