import CoverImage from "@/components/CoverImage";
import DateFormatter from "@/components/DateFormatter";
import Avatar from "@/components/Avatar";

type Props = {
    title: string;
    coverImage: string;
    date: string;
    author: string;
    authorImage:string;
};

export function PostHeader({title, coverImage, date, author,authorImage}: Props) {
    return (
        <>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">{title}</h1>
            <div className="hidden md:block md:mb-12">
                <Avatar name={author} picture={authorImage} />
            </div>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} src={coverImage}/>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar name={author} picture={authorImage} />
                </div>
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date}/>
                </div>
            </div>
        </>
    );
}