import markdownStyles from "./markdown-styles.module.css";
import Footer from "@/components/Footer";

type Props = {
    content: string;
};

export function PostBody({ content }: Props) {
    return (
        <div className="max-w-2xl mx-auto">
            <div
                className={markdownStyles["markdown"]}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <Footer />
        </div>
    );
}