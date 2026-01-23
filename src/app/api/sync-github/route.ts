import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get GitHub access token from Clerk
        const client = await clerkClient();
        const response = await client.users.getUserOauthAccessToken(userId, 'github');

        if (!response.data || response.data.length === 0) {
            return NextResponse.json({ error: 'GitHub access token not found' }, { status: 400 });
        }

        const githubToken = response.data[0].token;

        // Fetch GitHub Profile
        const profileResponse = await fetch('https://api.github.com/user', {
            headers: { Authorization: `token ${githubToken}` },
        });
        const profileData = await profileResponse.json();

        // Fetch GitHub Repositories
        const reposResponse = await fetch('https://api.github.com/user/repos?per_page=100&sort=updated', {
            headers: { Authorization: `token ${githubToken}` },
        });
        const reposData = await reposResponse.json();

        // Upsert Profile to Supabase
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) {
            throw new Error('Failed to initialize Supabase Admin client');
        }
        const { error: profileError } = await (supabaseAdmin as any)
            .from('profiles')
            .upsert({
                id: userId, // Clerk ID (string)
                username: profileData.login,
                full_name: profileData.name,
                avatar_url: profileData.avatar_url,
                bio: profileData.bio,
                location: profileData.location,
                followers_count: profileData.followers,
                following_count: profileData.following,
                github_id: profileData.id.toString(),
                updated_at: new Date().toISOString(),
            });

        if (profileError) {
            console.error('Profile sync error:', profileError);
            return NextResponse.json({ error: 'Failed to sync profile' }, { status: 500 });
        }

        // Upsert Repositories to Supabase
        const reposToUpsert = reposData.map((repo: any) => ({
            id: repo.id,
            user_id: userId,
            name: repo.name,
            description: repo.description,
            stars_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            html_url: repo.html_url,
            updated_at: new Date().toISOString(),
        }));

        const { error: reposError } = await getSupabaseAdmin()
            .from('repositories')
            .upsert(reposToUpsert);

        if (reposError) {
            console.error('Repos sync error:', reposError);
            return NextResponse.json({ error: 'Failed to sync repositories' }, { status: 500 });
        }

        return NextResponse.json({ success: true, profile: profileData, reposCount: reposData.length });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
