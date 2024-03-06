import React from 'react';
import {getPostData, getSortedPostsData} from "../../../../lib/posts";
import {notFound} from "next/navigation";
import Header from "@/components/Header";
import {PostHeader} from "@/components/PostHeader";
import {PostBody} from "@/components/PostBody";


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
    const {slug} = params;
    if (!posts.find(post => post.id === slug)) {
        return notFound();
    }
    const {title, coverImage, date, author, contentHtml} = await getPostData(slug);

    return (
        <div className={'container-2xl px-5 mx-auto'}>
            <Header/>
            <article className="mb-32">
                <PostHeader
                    title={title}
                    coverImage={coverImage}
                    date={date}
                    author={author}
                />
                <PostBody content={contentHtml}/>
            </article>

        </div>
    );
}
