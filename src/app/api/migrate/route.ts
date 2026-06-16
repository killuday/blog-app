import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ message: 'Missing Supabase environment variables' }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        const postsDirectory = path.join(process.cwd(), 'blogposts');
        const fileNames = fs.readdirSync(postsDirectory);

        let successCount = 0;
        let errors = [];

        for (const fileName of fileNames) {
            if (!fileName.endsWith('.md')) continue;

            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Parse metadata
            const matterResult = matter(fileContents);
            const { title, excerpt, date, coverImage, author, authorImg } = matterResult.data;
            const content = matterResult.content;

            // Insert into Supabase
            const { data, error } = await supabaseAdmin
                .from('posts')
                .upsert([
                    {
                        id,
                        title,
                        excerpt,
                        date,
                        coverImage,
                        author,
                        authorImage: authorImg,
                        content
                    }
                ], { onConflict: 'id' });

            if (error) {
                console.error(`Error inserting ${id}:`, error);
                errors.push({ id, error });
            } else {
                successCount++;
            }
        }

        if (errors.length > 0) {
            return NextResponse.json({ message: 'Migration completed with errors', successCount, errors }, { status: 500 });
        }

        return NextResponse.json({ message: 'Migration successful', successCount });

    } catch (error: any) {
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
