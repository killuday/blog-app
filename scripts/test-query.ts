import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function run() {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const anonClient = createClient(supabaseUrl, supabaseAnon);

    const { data: adminData } = await adminClient.from('posts').select('*');
    console.log('Admin fetch count:', adminData?.length);

    const { data: anonData, error: anonError } = await anonClient.from('posts').select('*');
    console.log('Anon fetch count:', anonData?.length, 'Error:', anonError?.message);
}

run();
