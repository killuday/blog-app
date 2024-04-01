import React from 'react';
import {getPostData, getSortedPostsData} from "../../../../lib/posts";
import {notFound} from "next/navigation";
import Header from "@/components/Header";
import {PostHeader} from "@/components/PostHeader";
import {PostBody} from "@/components/PostBody";
import {MoreStories} from "@/components/MoreStories";
import Footer from "@/components/Footer";


export function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map(post => ({
        slug: post.id,
    }))
}

export function generateMetadata({params}: { params: { slug: string } }) {

    const posts = getSortedPostsData()

    const {slug} = params

    const post = posts.find(post => post.id === slug)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({params}: { params: { slug: string } }) {
    const posts = getSortedPostsData();
    const morePosts = posts.filter(post => post.id !== params.slug);
    const {slug} = params;
    if (!posts.find(post => post.id === slug)) {
        return notFound();
    }
    const {title, coverImage, date, author, contentHtml,authorImage} = await getPostData(slug);

    return (
        <div className={'container px-5 mx-auto'}>
            <Header/>
            <article className="mb-32">
                <PostHeader
                    title={title}
                    coverImage={coverImage}
                    date={date}
                    author={author}
                    authorImage={authorImage}
                />
                <PostBody content={contentHtml}/>
                <MoreStories posts={morePosts}/>
                <Footer />
            </article>

        </div>
    );
}
