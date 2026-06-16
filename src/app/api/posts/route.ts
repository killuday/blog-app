import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerAuthClient } from '../../../../lib/supabase/server';

export async function POST(request: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: 'Missing Supabase environment variables' }, { status: 500 });
        }
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Verify user is authenticated
        const supabase = createServerAuthClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, excerpt, date, coverImage, author, authorImage, content } = body;

        // Generate a simple slug from the title
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const { error } = await supabaseAdmin
            .from('posts')
            .insert([{ id, title, excerpt, date, coverImage, author, authorImage, content }]);

        if (error) {
            console.error('Error inserting post:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Post created successfully', id });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
