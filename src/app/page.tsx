import Intro from "@/components/Intro";
import {MoreStories} from "@/components/MoreStories";
import {HeroPost} from "@/components/HeroPost";
import {getSortedPostsData} from "../../lib/posts";
import SplashCursor from "@/components/SplashCursor";

export const revalidate = 0; // Disable caching to always fetch fresh posts

export default async function Home() {
    const allPosts = await getSortedPostsData();

    if (!allPosts || allPosts.length === 0) {
        return (
            <div className='container mx-auto px-5 text-center py-20'>
                <h1 className="text-4xl font-bold mb-4">No posts found</h1>
                <p className="text-gray-600">Please run the migration script or create a new post in the admin dashboard.</p>
            </div>
        )
    }

    const heroPost = allPosts[0];

    const morePosts = allPosts.slice(1);
    return (
        <div className='container mx-auto px-5'>
            <Intro/>
            <HeroPost title={heroPost.title}
                      coverImage={heroPost.coverImage}
                      date={heroPost.date}
                      author={heroPost.author}
                      slug={heroPost.id}
                      authorImage={heroPost.authorImage}
                      excerpt={heroPost.excerpt}/>
            <MoreStories posts={morePosts}/>
            <SplashCursor />

        </div>
    )
}
