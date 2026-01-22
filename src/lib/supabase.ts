import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or Anon Key. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Admin client for bypass RLS on the server.
 * Initialized only when accessed to prevent client-side errors.
 */
let adminClient: ReturnType<typeof createClient> | null = null;

export const getSupabaseAdmin = () => {
    if (typeof window !== 'undefined') {
        throw new Error('getSupabaseAdmin cannot be called on the client side.');
    }

    if (!supabaseServiceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin operations.');
    }

    if (!adminClient) {
        adminClient = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }
    return adminClient!;
};


/**
 * Creates a Supabase client with the Clerk JWT for authenticated requests.
 * This ensures that RLS policies are applied correctly.
 * 
 * @param clerkToken The JWT token obtained from Clerk (user.getToken('supabase'))
 */
export const createClerkSupabaseClient = (clerkToken: string) => {
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${clerkToken}`,
            },
        },
    });
};
