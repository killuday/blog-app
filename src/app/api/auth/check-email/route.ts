import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Fetch users list from Supabase Auth
        const { data, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) {
            console.error('Error listing users:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Check if the email exists in the users list
        const exists = data.users.some(user => user.email?.toLowerCase() === email.toLowerCase());

        return NextResponse.json({ exists });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
