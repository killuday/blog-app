import { remark } from "remark";
import html from "remark-html";
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase environment variables');
    }

    return createClient(supabaseUrl, supabaseServiceKey);
}

export async function getSortedPostsData() {
    try {
        const supabaseAdmin = getAdminClient();
        const { data: posts, error } = await supabaseAdmin
            .from('posts')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }

        return (posts ?? []) as BlogPost[];
    } catch (err) {
        console.error('Failed to initialize Supabase client:', err);
        return [];
    }
}

export async function getPostData(id: string) {
    const supabaseAdmin = getAdminClient();
    const { data: post, error } = await supabaseAdmin
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        console.error(`Error fetching post ${id}:`, error);
        throw new Error(`Post with id ${id} not found`);
    }

    const processedContent = await remark()
        .use(html)
        .process(post.content);

    const contentHtml = processedContent.toString();

    const blogPostWithHTML: BlogPost & { contentHtml: string } = {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        coverImage: post.coverImage,
        author: post.author,
        authorImage: post.authorImage,
        contentHtml,
    }

    return blogPostWithHTML;
}
