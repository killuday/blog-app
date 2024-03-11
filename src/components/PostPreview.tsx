import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import DateFormatter from "@/components/DateFormatter";
import Avatar from "@/components/Avatar";

type Props = {
    title: string;
    coverImage: string;
    date: string;
    excerpt: string;
    author: string;
    slug: string;
    authorImage: string;
};

export function PostPreview({
                                title,
                                coverImage,
                                date,
                                excerpt,
                                author,
                                slug,
                                authorImage
                            }: Props) {
    return (
        <div>
            <div className="mb-5">
                <CoverImage slug={slug} title={title} src={coverImage}/>
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link
                    as={`/posts/${slug}`}
                    href="/posts/[slug]"
                    className="hover:underline"
                >
                    {title}
                </Link>
            </h3>
            <div className="text-lg mb-4">
                <DateFormatter dateString={date}/>
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            <Avatar name={author} picture={authorImage}/>
        </div>
    );
}