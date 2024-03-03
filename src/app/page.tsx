import Intro from "@/components/Intro";
import {MoreStories} from "@/components/MoreStories";
import {HeroPost} from "@/components/HeroPost";
import {getSortedPostsData} from "../../lib/posts";

export default function Home() {
    const allPosts = getSortedPostsData();

    const heroPost = allPosts[0];

    const morePosts = allPosts.slice(1);
    return (
        <div className='container-2xl mx-auto px-5'>
            <Intro/>
            <HeroPost title={heroPost.title}
                      coverImage={heroPost.coverImage}
                      date={heroPost.date}
                      author={heroPost.author}
                      slug={heroPost.id}
                      excerpt={heroPost.excerpt}/>
            <MoreStories/>

        </div>
    )
}
