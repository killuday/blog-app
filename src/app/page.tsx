import Intro from "@/components/Intro";
import {MoreStories} from "@/components/MoreStories";
import {HeroPost} from "@/components/HeroPost";
import {getSortedPostsData} from "../../lib/posts";
import Footer from "@/components/Footer";

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
                      authorImage={heroPost.authorImage}
                      excerpt={heroPost.excerpt}/>
            <MoreStories/>


        </div>
    )
}
